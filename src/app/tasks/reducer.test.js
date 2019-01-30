import tasksReducer, { tasksInitialState, tasksSelector } from './reducer';
import tasksActionsTypes, { submitTask, completeTask } from './actions';

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

  describe(`when a "${tasksActionsTypes.SUBMIT}" action is provided`, () => {
    const effectAction = { type: 'Effect action' };

    const action = submitTask({
      id: 'fetchUser',
      name: 'Fetching user data',
      effect: effectAction,
    });

    it(`it reducers to a state with a task with an effect of "${effectAction.type}" action`, () => {
      const state = tasksInitialState;
      const result = tasksReducer(state, action);
      expect(result).toBeTruthy();
      expect(result.tasks[0]).toBeTruthy();
      expect(result.tasks[0].effect).toEqual(effectAction);
    });

    it('it reducers to a state with a task with "fetchUser" ID', () => {
      const state = tasksInitialState;
      const result = tasksReducer(state, action);
      expect(result).toBeTruthy();
      expect(result.tasks[0]).toBeTruthy();
      expect(result.tasks[0].id).toEqual('fetchUser');
    });

    it('it reducers to a state with a task with "Fetching user data" name', () => {
      const state = tasksInitialState;
      const result = tasksReducer(state, action);
      expect(result).toBeTruthy();
      expect(result.tasks[0]).toBeTruthy();
      expect(result.tasks[0].name).toEqual('Fetching user data');
    });

    it('it reducers to a state with a running task', () => {
      const state = tasksInitialState;
      const result = tasksReducer(state, action);
      expect(result).toBeTruthy();
      expect(result.tasks[0]).toBeTruthy();
      expect(result.tasks[0].running).toBeTruthy();
    });
  });

  describe(`when a "${tasksActionsTypes.COMPLETE}" action is provided`, () => {
    const task = {
      id: 'fetchUser',
      name: 'Fetching user data',
      effect: { type: 'Effect action' },
      running: true,
    };
    const state = {
      ...tasksInitialState,
      tasks: [task],
    };
    const action = completeTask(task);

    it(`it reducers to a state with a task with an effect of "${task.effect.type}" action`, () => {
      const result = tasksReducer(state, action);
      expect(result).toBeTruthy();
      expect(result.tasks[0]).toBeTruthy();
      expect(result.tasks[0].effect).toEqual(task.effect);
    });

    it('it reducers to a state with a task with "fetchUser" ID', () => {
      const result = tasksReducer(state, action);
      expect(result).toBeTruthy();
      expect(result.tasks[0]).toBeTruthy();
      expect(result.tasks[0].id).toEqual('fetchUser');
    });

    it('it reducers to a state with a task with "Fetching user data" name', () => {
      const result = tasksReducer(state, action);
      expect(result).toBeTruthy();
      expect(result.tasks[0]).toBeTruthy();
      expect(result.tasks[0].name).toEqual('Fetching user data');
    });

    it('it reducers to a state with a running task', () => {
      const result = tasksReducer(state, action);
      expect(result).toBeTruthy();
      expect(result.tasks[0]).toBeTruthy();
      expect(result.tasks[0].running).toBeFalsy();
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
