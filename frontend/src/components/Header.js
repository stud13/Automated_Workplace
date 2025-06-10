import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/logo.svg';

const Header = ({ title }) => {
  return (
    <Navbar className="header" data-ts-theme="light">
      <Container className="header">
        <Logo className="logo" alt={title} />
      </Container>
    </Navbar>
  );
};

export default Header;
