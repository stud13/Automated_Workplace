"""The automated workspace endpoints"""

import os
import uuid

from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from mongo_client import mongo_client

library = mongo_client.awlib
obp_collection = library.obp

load_dotenv(dotenv_path="./.env.local")


DEBUG = bool(os.environ.get("DEBUG", True))

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = DEBUG


@app.route("/api/library/obp/blocks", methods=["GET", "POST"])
def library_obp() -> dict:
    """The endpoint to get blocks and create new parent in obp library"""

    if request.method == "GET":
        obp_lib = obp_collection.find({})
        return jsonify([block for block in obp_lib])

    if request.method == "POST":
        # save image to the database
        block = request.get_json()
        # SP : ToDo: How to use ObjectId? It can be converted to the string but CORS appears in this case
        block["_id"] = block["id"] = str(uuid.uuid4())
        block["created_at"] = block["modified_at"] = str(datetime.now())
        if "blocks" not in block:
            return {"error": "The blocks section is required"}, 400
        children = block["blocks"]
        if len(children) < 1:
            return {"error": "At least one nested block is required"}, 400
        for child in children:
            if "id" not in child:
                child["id"] = str(uuid.uuid4())
            if "created_at" not in child:
                child["created_at"] = child["modified_at"] = str(datetime.now())
        result = obp_collection.insert_one(block)
        if not result:
            return {"error": "Block was not inserted. Please try again"}, 500
        return {"block": obp_collection.find_one({"id": block["id"]})}


@app.route("/api/library/obp/blocks/<block_id>", methods=["PATCH", "POST", "DELETE"])
def library_obp_block(block_id: str) -> dict:
    """
    The endpoint to update/delete block in obp library by id

    :param block_id: The id of the parent block to remove/update
    """

    if request.method == "PATCH":
        # update block in database
        block = request.get_json()
        block["modified_at"] = str(datetime.now())
        result = obp_collection.update_one({"id": block_id}, {"$set": block})
        if not result:
            return {"error": "Block was not updated. Please try again"}, 500
        if result and not result.modified_count:
            return {"error": "Block not found"}, 404
        return {"block": obp_collection.find_one({"id": block_id})}

    if request.method == "POST":
        # crate new child block in parent
        block = request.get_json()
        block["id"] = str(uuid.uuid4())
        block["created_at"] = block["modified_at"] = str(datetime.now())
        result = obp_collection.update_one(
            {"id": block_id}, {"$push": {"blocks": block}}
        )
        if not result:
            return {"error": "Block was not updated. Please try again"}, 500
        if result and not result.modified_count:
            return {"error": "Block not found"}, 404
        return {"block": obp_collection.find_one({"id": block_id})}

    if request.method == "DELETE":
        # delete block from database
        result = obp_collection.delete_one({"id": block_id})
        if not result:
            return {"error": "Block was not deleted. Please try again"}, 500
        if result and not result.deleted_count:
            return {"error": "Block not found"}, 404
        return {"deleted_id": block_id}


@app.route(
    "/api/library/obp/blocks/<parent_block_id>/<child_block_id>",
    methods=["PATCH", "DELETE"],
)
def library_obp_child_block(parent_block_id: str, child_block_id: str) -> dict:
    """
    The endpoint to delete block in obp library by id

    :param parent_block_id: The id of the parent block
    :param child_block_id : The id of the child block to remove
    """

    if request.method == "PATCH":
        # update child block in database
        block = request.get_json()
        block["modified_at"] = str(datetime.now())
        req_filter = {"id": parent_block_id, "blocks.id": child_block_id}
        fields = {}
        for key in block:
            fields.update({f"blocks.$.{key}": block[f"{key}"]})
        result = obp_collection.update_one(req_filter, {"$set": fields})
        if not result:
            return {"error": "Block was not updated. Please try again"}, 500
        if result and not result.modified_count:
            return {"error": "Block not found"}, 404
        return {"block": obp_collection.find_one({"id": parent_block_id})}

    if request.method == "DELETE":
        # get parent block and check last child
        block = obp_collection.find_one({"id": parent_block_id})
        if len(block["blocks"]) == 1:
            return {"error": "Cannot delete last nested block from parent"}, 400
        # delete child block
        result = obp_collection.update_one(
            {"id": parent_block_id}, {"$pull": {"blocks": {"id": child_block_id}}}
        )
        if not result:
            return {"error": "Block was not deleted. Please try again"}, 500
        if result and not result.modified_count:
            return {"error": "Block not found"}, 404
        return {"deleted_id": child_block_id}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
