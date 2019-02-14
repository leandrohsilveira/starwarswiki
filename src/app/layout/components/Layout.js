import React from 'react';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';

import LayoutHeader from './LayoutHeader';

function Layout({ title, children }) {
  return (
    <React.Fragment>
      <LayoutHeader title={title} />
      <Container className="mt-5">{children}</Container>
    </React.Fragment>
  );
}

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};

Layout.defaultProps = {
  title: '',
  children: null
};

export default Layout;
