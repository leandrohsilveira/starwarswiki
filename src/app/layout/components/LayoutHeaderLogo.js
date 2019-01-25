import React from 'react';

import { Container } from 'reactstrap';

import logo from './logo.png';

function LayoutHeaderLogo() {
  return (
    <Container>
      <img className="col-xs-12 col-xl-6" src={logo} alt="Logo" />
    </Container>
  );
}

export default LayoutHeaderLogo;
