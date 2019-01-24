import layoutActionsTypes from "./actions";

export const layoutInitialState = {
  title: ""
};

function layoutReducer(state = layoutInitialState, { type, ...payload }) {
  switch (type) {
    case layoutActionsTypes.CHANGE_TITLE:
      return {
        ...state,
        title: payload.title
      };
    default:
      return state;
  }
}

export default layoutReducer;
