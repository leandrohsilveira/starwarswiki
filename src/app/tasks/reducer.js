export const tasksInitialState = {
  tasks: [],
};

function tasksReducer(state = tasksInitialState, { type }) {
  switch (type) {
    default:
      return state;
  }
}

export const tasksSelector = state => state.tasks;

export default tasksReducer;
