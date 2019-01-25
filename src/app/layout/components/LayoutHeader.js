import React from 'react';
import PropTypes from 'prop-types';

import { Navbar, NavbarBrand, Container } from 'reactstrap';
import LayoutHeaderLogo from './LayoutHeaderLogo';

function LayoutHeader({ title }) {
  return (
    <div className="bg-secondary text-primary">
      <LayoutHeaderLogo />
      <Navbar className="sticky-top" color="secondary" dark>
        <Container>
          <NavbarBrand href="/">
            Star Wars Wiki
            {title ? `- ${title}` : ''}
          </NavbarBrand>
        </Container>
      </Navbar>
    </div>
  );
}

LayoutHeader.propTypes = {
  title: PropTypes.string,
};

LayoutHeader.defaultProps = {
  title: '',
};

export default LayoutHeader;
