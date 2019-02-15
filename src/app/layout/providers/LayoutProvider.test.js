import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';
import { createTestStore } from '__test-utils__/redux.utils';

import LayoutProvider from './LayoutProvider';
import layoutActionsTypes, { changeTitle } from '../actions';
import layoutReducer, { layoutInitialState } from '../reducer';
import layoutEpics from '../epics';

const store = createTestStore(
  {
    layout: layoutReducer
  },
  layoutEpics,
  {
    layout: layoutInitialState
  }
);

describe('LayoutProvider component', () => {
  function mount() {
    return render(
      <Provider store={store}>
        <LayoutProvider />
      </Provider>
    );
  }

  it('with default state it renders "Star Wars Wiki" as title', done => {
    const { getByText } = mount();

    try {
      expect(getByText('Star Wars Wiki')).toBeDefined();
      done();
    } catch (e) {
      done.fail(e);
    }
  });

  describe(`when an action with type "${
    layoutActionsTypes.CHANGE_TITLE
  }" is emitted`, () => {
    it('it renders the text of "title" prop of the action as title', done => {
      const { getByText } = mount();
      const title = 'Title A';
      store.subscribe(() => {
        try {
          expect(getByText(title)).toBeDefined();
          done();
        } catch (e) {
          done.fail(e);
        }
      });
      store.dispatch(changeTitle(title));
    });
  });
});
