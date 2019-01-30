const tasksActionsTypes = {
  SUBMIT: '[Tasks] Submit task',
  COMPLETE: '[Tasks] Complete task',
};

export const submitTask = task => ({
  type: tasksActionsTypes.SUBMIT,
  task: {
    ...task,
    running: true,
  },
});

export const completeTask = task => ({
  type: tasksActionsTypes.COMPLETE,
  task,
});

export default tasksActionsTypes;
