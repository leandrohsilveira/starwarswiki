const tasksActionsTypes = {
  SUBMIT: '[Tasks] Submit task',
  COMPLETE: '[Tasks] Complete task',
  CLEAR: '[Tasks] Clear task',
};

export const submitTask = task => ({
  type: tasksActionsTypes.SUBMIT,
  task: {
    ...task,
    running: true,
  },
});

export const completeTask = (task, { successful, contextChanged, effect } = {}) => ({
  type: tasksActionsTypes.COMPLETE,
  task,
  successful,
  contextChanged,
  effect,
});

export const clearTask = task => ({
  type: tasksActionsTypes.CLEAR,
  task,
});

export default tasksActionsTypes;
