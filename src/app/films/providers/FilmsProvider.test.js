import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { combineMockedEpics } from '__test-utils__/rxjs.utils';
import { createTestStore } from '__test-utils__/redux.utils';
import tasksEpics from 'app/tasks/epics';

import tasksReducer, { tasksInitialState } from 'app/tasks/reducer';
import filmsReducer, { filmsInitialState } from '../reducer';
import filmsEpics from '../epics';
import FilmsProvider from './FilmsProvider';

const [epics, spy$] = combineMockedEpics(filmsEpics, tasksEpics);

const store = createTestStore(
  {
    films: filmsReducer,
    tasks: tasksReducer
  },
  epics,
  {
    films: filmsInitialState,
    tasks: tasksInitialState
  }
);

describe('FilmsProvider component', () => {
  function mount() {
    return render(
      <Provider store={store}>
        <FilmsProvider />
      </Provider>
    );
  }

  it('//TODO:', done => {
    mount();
    spy$.subscribe(() => {
      try {
        done.fail('not implemented yet');
      } catch (e) {
        done.fail(e);
      }
    });
    store.dispatch({ type: 'Remove this' });
  });
});
