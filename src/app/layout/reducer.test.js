import layoutReducer, {
  layoutInitialState,
  layoutSelector
} from 'app/layout/reducer';
import layoutActionsTypes, { changeTitle } from './actions';

describe('The layout module reducer', () => {
  describe('when an unknown action is provided', () => {
    const unknownAction = { type: '=====' };

    it('it reduces to initial state', () => {
      const state = layoutInitialState;
      const result = layoutReducer(state, unknownAction);
      expect(result).toBe(state);
    });
  });

  describe(`when the "${
    layoutActionsTypes.CHANGE_TITLE
  }" action was dispatched`, () => {
    describe('with "" as title payload', () => {
      let result;

      beforeEach(() => {
        const state = layoutInitialState;
        const action = changeTitle('');

        result = layoutReducer(state, action);
      });

      it('it reduces to a state with title value = ""', () => {
        expect(result.title).toBe('');
      });

      it('it reduces to a different state instance', () => {
        expect(result).not.toBe(layoutInitialState);
      });
    });

    describe('with "Test" as title payload', () => {
      let result;

      beforeEach(() => {
        const state = layoutInitialState;
        const action = changeTitle('Test');

        result = layoutReducer(state, action);
      });

      it('it reduces to a state with title value = "Test"', () => {
        expect(result.title).toBe('Test');
      });

      it('it reduces to a different state instance', () => {
        expect(result).not.toBe(layoutInitialState);
      });
    });
  });
});

describe('The layoutState selector', () => {
  it('selects the "layout" prop from root state', () => {
    const rootState = { layout: layoutInitialState };
    const result = layoutSelector(rootState);
    expect(result).toBe(layoutInitialState);
  });
});
