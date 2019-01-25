import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'app/layout/components/Layout';
import useStoreStateSelector from 'app/shared/hooks/useStoreStateSelector';
import { layoutSelector } from '../reducer';

function LayoutProvider({ children }) {
  const { title } = useStoreStateSelector(layoutSelector);
  return <Layout title={title}>{children}</Layout>;
}

LayoutProvider.propTypes = {
  children: PropTypes.node,
};

LayoutProvider.defaultProps = {
  children: null,
};

export default LayoutProvider;
