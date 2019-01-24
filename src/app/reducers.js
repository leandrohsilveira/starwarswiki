import { combineReducers } from "redux";
import layoutReducer, { layoutInitialState } from "app/layout/reducer";

export const initialState = {
  layout: layoutInitialState
};

const reducers = combineReducers({
  layout: layoutReducer
});

export default reducers;
