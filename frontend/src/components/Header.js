import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/logo.svg';

const navbarStyle = {
  backgroundColor: '#eeeeee',
};

const Header = ({ title }) => {
  return (
    <Navbar style={navbarStyle} data-ts-theme="light">
      <Container>
        <Logo alt={title} style={{ maxWidth: '15rem', maxHeight: '3rem' }} />
      </Container>
    </Navbar>
  );
};

export default Header;
