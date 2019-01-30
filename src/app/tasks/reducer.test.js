import tasksReducer, { tasksInitialState, tasksSelector } from './reducer';

const featureInitialState = {
  tasks: tasksInitialState,
};

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

describe('The tasks state selector', () => {
  it('selects the "tasks" prop from root state', () => {
    const rootState = featureInitialState;
    const result = tasksSelector(rootState);
    expect(result).toBe(rootState.tasks);
  });
});
