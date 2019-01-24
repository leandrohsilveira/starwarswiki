import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";

import reducers, { initialState } from "app/reducers";
import epics from "app/epics";

const epicMiddleware = createEpicMiddleware();

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(epics);
