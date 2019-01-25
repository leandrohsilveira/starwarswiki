import React from 'react';
import PropTypes from 'prop-types';

import { Navbar, NavbarBrand, Container } from 'reactstrap';

function LayoutHeader({ title }) {
  return (
    <Navbar color="secondary" dark>
      <Container>
        <NavbarBrand href="/">
          Star Wars Wiki
          {title ? `- ${title}` : ''}
        </NavbarBrand>
      </Container>
    </Navbar>
  );
}

LayoutHeader.propTypes = {
  title: PropTypes.string,
};

LayoutHeader.defaultProps = {
  title: '',
};

export default LayoutHeader;
