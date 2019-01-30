import tasksActionsTypes from './actions';

export const tasksInitialState = {
  tasks: [],
};

function tasksReducer(state = tasksInitialState, { type, ...payload }) {
  switch (type) {
    case tasksActionsTypes.SUBMIT:
      return {
        ...state,
        tasks: [...state.tasks, payload.task],
      };
    case tasksActionsTypes.COMPLETE:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task === payload.task) {
            return {
              ...task,
              running: false,
            };
          }
          return task;
        }),
      };
    case tasksActionsTypes.CLEAR:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.running || task !== payload.task),
      };
    default:
      return state;
  }
}

export const tasksSelector = state => state.tasks;

export default tasksReducer;
