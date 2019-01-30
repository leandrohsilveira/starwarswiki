const tasksActionsTypes = {
  SUBMIT: '[Tasks] Submit task',
};

export const submitTask = task => ({
  type: tasksActionsTypes.SUBMIT,
  task: {
    ...task,
    running: true,
  },
});

export default tasksActionsTypes;
