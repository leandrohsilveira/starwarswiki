/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import reducers, { initialState } from 'app/reducers';
import epics from 'app/epics';

const epicMiddleware = createEpicMiddleware();

let composeEnhancers = compose;
if (
  process.env.NODE_ENV !== 'production'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

export const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(epicMiddleware)),
);

epicMiddleware.run(epics);
