import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const LibParentBlock = () => {
  return (
    <Container className="library-decorator">
      <Row>
        <Col xs={12}>
          <Row xs={12}>
            <Col xs={10} className="library-body"></Col>
            <Col xs={2} className="library-checkbox-container">
              <Checkbox
                {...label}
                sx={{
                  color: '#000000',
                  '&.Mui-checked': {
                    color: '#000000',
                  },
                }}
              ></Checkbox>
            </Col>
          </Row>
          <Row>
            <Col xs={8} className="library-btn-add"></Col>
            <Col xs={4} className="library-btn-delete"></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LibParentBlock;
