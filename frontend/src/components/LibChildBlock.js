import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const LibChildBlock = () => {
  return (
    <Container className="library-decorator">
      <Row>
        <Col xs={3} className="" />
        <Col xs={7} className="library-body"></Col>
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
      <Row className="footer">
        <Col xs={3} />
        <Col xs={6} className="library-btn-add"></Col>
        <Col xs={3} className="library-btn-delete"></Col>
      </Row>
    </Container>
  );
};

export default LibChildBlock;
