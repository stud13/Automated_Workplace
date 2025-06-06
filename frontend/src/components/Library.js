import React from 'react';
import { Container } from 'react-bootstrap';
import LibParentBlock from './LibParentBlock.js';
import LibChildBlock from './LibChildBlock.js';
import '../css/library.css';

const Library = () => {
  return (
    <Container className="library">
      <LibParentBlock>
        <LibChildBlock />
      </LibParentBlock>
    </Container>
  );
};

export default Library;
