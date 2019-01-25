import React from "react";
import Layout from "app/layout/components/Layout";
import useStoreStateSelector from "app/shared/hooks/useStoreStateSelector";
import { layoutSelector } from "../reducer";

function LayoutProvider({ children }) {
  const { title } = useStoreStateSelector(layoutSelector);
  return <Layout title={title}>{children}</Layout>;
}

export default LayoutProvider;
