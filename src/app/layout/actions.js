const layoutActionsTypes = {
  CHANGE_TITLE: "[Layout] Change title"
};

export const changeTitle = title => ({
  type: layoutActionsTypes.CHANGE_TITLE,
  title
});

export default layoutActionsTypes;
