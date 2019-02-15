import { createEpicMiddleware } from 'redux-observable';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore as createReduxStore
} from 'redux';

export function createTestStore(reducers, epics, initialState) {
  const epicMiddleware = createEpicMiddleware();

  const store = createReduxStore(
    combineReducers(reducers),
    initialState,
    compose(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(epics);

  return store;
}

export default { createStore: createTestStore };
