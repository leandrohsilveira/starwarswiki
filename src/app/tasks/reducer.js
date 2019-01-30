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
    default:
      return state;
  }
}

export const tasksSelector = state => state.tasks;

export default tasksReducer;
