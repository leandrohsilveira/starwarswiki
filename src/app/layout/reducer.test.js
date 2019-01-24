import layoutReducer, { layoutInitialState } from "app/layout/reducer";

describe("The layout module reducer", () => {
  describe("when an unknown action is provided", () => {
    const unknownAction = { type: "=====" };

    it("it reduces to initial state", () => {
      const state = layoutInitialState;
      const result = layoutReducer(state, unknownAction);
      expect(result).toBe(state);
    });
  });
});
