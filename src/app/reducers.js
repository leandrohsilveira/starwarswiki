import { combineReducers } from 'redux';
import layoutReducer, { layoutInitialState } from 'app/layout/reducer';
import filmsReducer, { filmsInitialState } from './films/reducer';

export const initialState = {
  layout: layoutInitialState,
  films: filmsInitialState,
};

const reducers = combineReducers({
  layout: layoutReducer,
  films: filmsReducer,
});

export default reducers;
