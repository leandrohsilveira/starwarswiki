import React from "react";
import Layout from "app/layout/components/Layout";

function LayoutProvider({ children }) {
  return <Layout>{children}</Layout>;
}

export default LayoutProvider;
