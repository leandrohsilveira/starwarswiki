import tasksReducer, { tasksInitialState } from './reducer';

describe('The tasks module reducer', () => {
  describe('when an unknown action is provided', () => {
    const unknownAction = { type: '=====' };

    it('it reduces to same state instance', () => {
      const state = tasksInitialState;
      const result = tasksReducer(state, unknownAction);
      expect(result).toBe(state);
    });
  });
});
