import React from "react";

import { render } from "react-testing-library";
import LayoutHeader from "./LayoutHeader";

describe("The LayoutHeader component", () => {
  describe("when title prop is falsy", () => {
    it('it renders a "Star Wars Wiki" text as title', () => {
      const { getByText } = render(<LayoutHeader />);

      const element = getByText("Star Wars Wiki");

      expect(element).toBeTruthy();
    });
  });

  describe('when title prop is "Wellcome"', () => {
    it('it renders a "Star Wars Wiki - Wellcome" text as title', () => {
      const { getByText } = render(<LayoutHeader title="Wellcome" />);

      const element = getByText("Star Wars Wiki - Wellcome");

      expect(element).toBeTruthy();
    });
  });
});
