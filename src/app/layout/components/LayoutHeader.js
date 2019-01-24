import React from "react";
import { Navbar, NavbarBrand, Container } from "reactstrap";

function LayoutHeader({ title }) {
  return (
    <Navbar color="primary" dark>
      <Container>
        <NavbarBrand href="/">Star Wars Wiki - {title}</NavbarBrand>
      </Container>
    </Navbar>
  );
}

export default LayoutHeader;
