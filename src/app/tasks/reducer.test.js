import tasksReducer, {tasksInitialState, tasksSelector} from './reducer';
import tasksActionsTypes, {clearTask, completeTask, submitTask} from './actions';

const featureInitialState = {
  tasks: tasksInitialState
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
      effect: effectAction
    });

    it('it reduces to a different state', () => {
      const state = tasksInitialState;
      const result = tasksReducer(state, action);
      expect(result).toBeTruthy();
      expect(result).not.toBe(state);
    });

    it(`it reduces to a state with a task with an effect of "${
      effectAction.type
    }" action`, () => {
      const result = tasksReducer(tasksInitialState, action);
      expect(result).toBeTruthy();
      expect(result.tasks[0]).toBeTruthy();
      expect(result.tasks[0].effect).toEqual(effectAction);
    });

    it('it reduces to a state with a task with "fetchUser" ID', () => {
      const result = tasksReducer(tasksInitialState, action);
      expect(result).toBeTruthy();
      expect(result.tasks[0]).toBeTruthy();
      expect(result.tasks[0].id).toEqual('fetchUser');
    });

    it('it reduces to a state with a task with "Fetching user data" name', () => {
      const result = tasksReducer(tasksInitialState, action);
      expect(result).toBeTruthy();
      expect(result.tasks[0]).toBeTruthy();
      expect(result.tasks[0].name).toEqual('Fetching user data');
    });

    it('it reduces to a state with a running task', () => {
      const result = tasksReducer(tasksInitialState, action);
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
      running: true
    };
    const state = {
      ...tasksInitialState,
      tasks: [task]
    };
    const action = completeTask(task);

    it('it reduces to a different state', () => {
      const result = tasksReducer(state, action);
      expect(result).toBeTruthy();
      expect(result).not.toBe(state);
    });

    it(`it reduces to a state with a task with an effect of "${
      task.effect.type
    }" action`, () => {
      const result = tasksReducer(state, action);
      expect(result).toBeTruthy();
      expect(result.tasks[0]).toBeTruthy();
      expect(result.tasks[0].effect).toEqual(task.effect);
    });

    it('it reduces to a state with a task with "fetchUser" ID', () => {
      const result = tasksReducer(state, action);
      expect(result).toBeTruthy();
      expect(result.tasks[0]).toBeTruthy();
      expect(result.tasks[0].id).toEqual('fetchUser');
    });

    it('it reduces to a state with a task with "Fetching user data" name', () => {
      const result = tasksReducer(state, action);
      expect(result).toBeTruthy();
      expect(result.tasks[0]).toBeTruthy();
      expect(result.tasks[0].name).toEqual('Fetching user data');
    });

    it('it reduces to a state with a running task', () => {
      const result = tasksReducer(state, action);
      expect(result).toBeTruthy();
      expect(result.tasks[0]).toBeTruthy();
      expect(result.tasks[0].running).toBeFalsy();
    });
  });

  describe(`when a "${tasksActionsTypes.CLEAR}" action is provided`, () => {
    describe('and the task is not running', () => {
      const task = {
        id: 'fetchUser',
        name: 'Fetching user data',
        effect: { type: 'Effect action' },
        running: false
      };
      const state = {
        ...tasksInitialState,
        tasks: [task]
      };
      const action = clearTask(task);

      it('it reduces to a different state', () => {
        const result = tasksReducer(state, action);
        expect(result).toBeTruthy();
        expect(result).not.toBe(state);
      });

      it('it reduces to a state with without the provided task', () => {
        const result = tasksReducer(state, action);
        expect(result).toBeTruthy();
        expect(result.tasks[0]).toBeFalsy();
      });
    });

    describe('and the task is running', () => {
      const task = {
        id: 'fetchUser',
        name: 'Fetching user data',
        effect: { type: 'Effect action' },
        running: true
      };
      const state = {
        ...tasksInitialState,
        tasks: [task]
      };
      const action = clearTask(task);

      it('it reduces to a different state', () => {
        const result = tasksReducer(state, action);
        expect(result).toBeTruthy();
        expect(result).not.toBe(state);
      });

      it(`it reduces to a state with a task with an effect of "${
        task.effect.type
      }" action`, () => {
        const result = tasksReducer(state, action);
        expect(result).toBeTruthy();
        expect(result.tasks[0]).toBeTruthy();
        expect(result.tasks[0].effect).toEqual(task.effect);
      });

      it('it reduces to a state with a task with "fetchUser" ID', () => {
        const result = tasksReducer(state, action);
        expect(result).toBeTruthy();
        expect(result.tasks[0]).toBeTruthy();
        expect(result.tasks[0].id).toEqual('fetchUser');
      });

      it('it reduces to a state with a task with "Fetching user data" name', () => {
        const result = tasksReducer(state, action);
        expect(result).toBeTruthy();
        expect(result.tasks[0]).toBeTruthy();
        expect(result.tasks[0].name).toEqual('Fetching user data');
      });

      it('it reduces to a state with a running task', () => {
        const result = tasksReducer(state, action);
        expect(result).toBeTruthy();
        expect(result.tasks[0]).toBeTruthy();
        expect(result.tasks[0].running).toBeTruthy();
      });
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
