import React from 'react';
import { Container } from 'react-bootstrap';
import LibParentBlock from './LibParentBlock.js';
import LibChildBlock from './LibChildBlock.js';

const Library = () => {
  return (
    <Container className="library-container">
      <LibParentBlock />
      <LibChildBlock />
    </Container>
  );
};

export default Library;
