import React from 'react';
import { Container } from 'react-bootstrap';
import '../css/libParentBlock.css';

const LibParentBlock = () => {
  return (
    <Container className="parent-decorator">
      <div className="body"></div>
      <div className="footer">
        <div className="add"></div>
        <div className="delete"></div>
      </div>
    </Container>
  );
};

export default LibParentBlock;
