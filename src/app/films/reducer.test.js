import filmsReducer, { filmsInitialState, filmsSelector } from './reducer';
import filmsActionsTypes, { loadFilms, filmsLoaded, fetchFilmsPage } from './actions';

const featureInitialState = {
  films: filmsInitialState,
};

describe('The films module reducer', () => {
  describe('when an unknown action is provided', () => {
    const unknownAction = { type: '=====' };

    it('it reduces to same state instance', () => {
      const state = filmsInitialState;
      const result = filmsReducer(state, unknownAction);
      expect(result).toBe(state);
    });
  });

  describe(`when a "${filmsActionsTypes.LOAD}" action is provided`, () => {
    const action = loadFilms();

    describe('and with initial state', () => {
      it('it reduces to a state with "loading" true', () => {
        const state = filmsInitialState;
        const result = filmsReducer(state, action);
        expect(result.loading).toBeTruthy();
      });
    });

    describe('and with a truthy "loading" state', () => {
      it('it reduces to a state with "loading" true', () => {
        const state = {
          ...filmsInitialState,
          loading: true,
        };
        const result = filmsReducer(state, action);
        expect(result.loading).toBeTruthy();
      });
    });
  });

  describe(`when a "${filmsActionsTypes.LOADED}" action is provided`, () => {
    const films = [{ name: 'Name' }];
    const action = filmsLoaded(films);

    describe('and with initial state', () => {
      it('it reduces to a state with "films" array not empty', () => {
        const state = filmsInitialState;
        const result = filmsReducer(state, action);
        expect(result.films).toEqual(films);
      });

      it('it reduces to a state with "loading" false', () => {
        const state = filmsInitialState;
        const result = filmsReducer(state, action);
        expect(result.loading).toBeFalsy();
      });
    });

    describe('and with a truthy "loading" state', () => {
      it('it reduces to a state with "films" array not empty', () => {
        const state = filmsInitialState;
        const result = filmsReducer(state, action);
        expect(result.films).toEqual(films);
      });

      it('it reduces to a state with "loading" true', () => {
        const state = {
          ...filmsInitialState,
          loading: true,
        };
        const result = filmsReducer(state, action);
        expect(result.loading).toBeFalsy();
      });
    });
  });

  describe(`when a "${filmsActionsTypes.FETCH_PAGE}" action is provided`, () => {
    const action = fetchFilmsPage();

    it('it reduces to same state instance', () => {
      const state = filmsInitialState;
      const result = filmsReducer(state, action);
      expect(result).toBe(state);
    });
  });
});

describe('The filmsState selector', () => {
  it('selects the "films" prop from root state', () => {
    const rootState = featureInitialState;
    const result = filmsSelector(rootState);
    expect(result).toBe(rootState.films);
  });
});
