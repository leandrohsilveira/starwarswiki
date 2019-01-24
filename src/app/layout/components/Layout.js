import React from "react";
import { Container } from "reactstrap";

import LayoutHeader from "./LayoutHeader";

function Layout({ title, children }) {
  return (
    <React.Fragment>
      <LayoutHeader title={title} />
      <Container className="mt-5">{children}</Container>
    </React.Fragment>
  );
}

export default Layout;
