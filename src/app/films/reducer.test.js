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
    describe('with initial state', () => {
      const action = loadFilms();
      it('it reduces to a state with "loading" true', () => {
        const state = filmsInitialState;
        const result = filmsReducer(state, action);
        expect(result.loading).toBeTruthy();
        expect(result.loaded).toBeFalsy();
      });
    });

    describe('with a truthy "loading" state', () => {
      const action = loadFilms();
      it('it reduces to a state with "loading" true', () => {
        const state = {
          ...filmsInitialState,
          loading: true,
        };
        const result = filmsReducer(state, action);
        expect(result.loading).toBeTruthy();
        expect(result.loaded).toBeFalsy();
      });
    });

    describe('with a pageable action prop', () => {
      const state = {
        ...filmsInitialState,
        pageable: {
          page: 0,
          limit: 10,
        },
      };
      const pageable = {
        page: 1,
        limit: 20,
      };
      const action = loadFilms(pageable);
      it('it reduces to a state with the pageable of the action', () => {
        const result = filmsReducer(state, action);
        expect(result.pageable).toEqual(pageable);
      });

      it('it reduces to a state with a different pageable of the previous state', () => {
        const result = filmsReducer(state, action);
        expect(result.pageable).not.toEqual(state.pageable);
      });
    });
  });

  describe(`when a "${filmsActionsTypes.LOADED}" action is provided`, () => {
    const films = [{ name: 'Name' }];
    const action = filmsLoaded(films);

    describe('with initial state', () => {
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

    describe('with a truthy "loading" state', () => {
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
