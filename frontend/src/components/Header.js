import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/logo.svg';
import '../css/header.css';

const navbarStyle = {
  backgroundColor: '#eeeeee',
};

const Header = ({ title }) => {
  return (
    <Navbar className="header" data-ts-theme="light">
      <Container className="header">
        <Logo alt={title} style={{ maxWidth: '15rem', maxHeight: '3rem' }} />
      </Container>
    </Navbar>
  );
};

export default Header;
