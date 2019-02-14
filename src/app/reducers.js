import { combineReducers } from 'redux';
import layoutReducer, { layoutInitialState } from 'app/layout/reducer';
import filmsReducer, { filmsInitialState } from './films/reducer';
import tasksReducer, { tasksInitialState } from './tasks/reducer';

export const initialState = {
  layout: layoutInitialState,
  films: filmsInitialState,
  tasks: tasksInitialState
};

const reducers = combineReducers({
  layout: layoutReducer,
  films: filmsReducer,
  tasks: tasksReducer
});

export default reducers;
