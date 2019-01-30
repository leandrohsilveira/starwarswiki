const tasksActionsTypes = {
  SUBMIT: '[Tasks] Submit task',
};

export const submitTask = ({ id, name, effect }) => ({
  type: tasksActionsTypes.SUBMIT,
  id,
  name,
  effect,
});

export default tasksActionsTypes;
