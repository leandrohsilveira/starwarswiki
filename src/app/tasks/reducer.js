export const tasksInitialState = {
  tasks: [],
};

function tasksReducer(state = tasksInitialState, { type }) {
  switch (type) {
    default:
      return state;
  }
}

export default tasksReducer;
