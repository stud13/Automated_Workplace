import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const LibChildBlock = () => {
  return (
    <Container className="library-decorator">
      <Row>
        <Col xs={3} className="" />
        <Col xs={9}>
          <Row xs={12} className="library-body"></Row>
          <Row className="footer">
            <Col xs={8} className="library-btn-add"></Col>
            <Col xs={4} className="library-btn-delete"></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LibChildBlock;
