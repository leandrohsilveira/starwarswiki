import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import {
  combineMockedEpics,
  NOT_CALLED,
  spyType
} from '__test-utils__/rxjs.utils';
import { createTestStore } from '__test-utils__/redux.utils';
import tasksEpics from 'app/tasks/epics';

import tasksReducer, { tasksInitialState } from 'app/tasks/reducer';
import filmsReducer, { filmsInitialState } from '../reducer';
import filmsEpics from '../epics';
import FilmsProvider from './FilmsProvider';
import filmsActionsTypes from '../actions';
import mockFetch, { mockResult } from '../../../__test-utils__/fetch.utils';

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
  beforeAll(() => {
    mockFetch({
      '/api/films?page=0&limit=10': mockResult([
        {
          episode_id: 1,
          title: 'Film 1',
          director: 'Director 1',
          producer: 'Producer 1',
          release_date: '2019-01-01'
        }
      ])
    });
  });

  function mount() {
    return render(
      <Provider store={store}>
        <FilmsProvider />
      </Provider>
    );
  }
  it('after fetch page action epic, there is a text showing "Loading films..."', done => {
    const { getByText } = mount();
    spy$.pipe(spyType(filmsActionsTypes.FETCH_PAGE)).subscribe(effect => {
      try {
        expect(effect).not.toBe(NOT_CALLED);
        expect(getByText('Loading films...'));
        done();
      } catch (e) {
        done.fail(e);
      }
    });
  });

  it('after page loaded action epic, there is a text showing "Film 1"', done => {
    const { getByText } = mount();
    spy$.pipe(spyType(filmsActionsTypes.LOADED)).subscribe(effect => {
      try {
        expect(effect).not.toBe(NOT_CALLED);
        expect(getByText('Film 1'));
        done();
      } catch (e) {
        done.fail(e);
      }
    });
  });
});
