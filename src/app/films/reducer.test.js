import filmsReducer, { filmsInitialState, filmsSelector } from './reducer';
import filmsActionsTypes, {
  fetchFilmsPage,
  filmsLoaded,
  filmsPageFetched,
  loadFilms
} from './actions';

const featureInitialState = {
  films: filmsInitialState
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
    describe('without a pageable action prop', () => {
      const state = {
        ...filmsInitialState,
        pageable: {
          page: 1,
          limit: 40
        }
      };
      const action = loadFilms();
      it('it reduces to a state with the pageable of the action', () => {
        const result = filmsReducer(state, action);
        expect(result.pageable.page).toEqual(1);
        expect(result.pageable.limit).toEqual(10);
      });

      it('it reduces to a state with a different pageable of the previous state', () => {
        const result = filmsReducer(state, action);
        expect(result.pageable).not.toEqual(state.pageable);
      });
    });

    describe('with a pageable action prop', () => {
      const state = filmsInitialState;
      const pageable = {
        page: 1,
        limit: 20
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
    describe('with a pageable prop', () => {
      const pageable = { page: 2, limit: 30 };
      const action = filmsLoaded({ films, count: 1 }, pageable);

      it('it reduces to a state with a films pages map entry of "2#30#1" with the films of action', () => {
        const result = filmsReducer(filmsInitialState, action);
        const page = result.films['2#30#1'];
        expect(page).toBe(films);
      });
    });

    describe('without a pageable prop', () => {
      const action = filmsLoaded({ films, count: 1 });

      it('it reduces to a state with a films pages map entry of "0#10#1" with the films of action', () => {
        const result = filmsReducer(filmsInitialState, action);
        const page = result.films['1#10#1'];
        expect(page).toBe(films);
      });
    });
  });

  describe(`when an action with type "${
    filmsActionsTypes.FETCH_PAGE
  }" is emitted`, () => {
    describe('without a pageable prop', () => {
      const action = fetchFilmsPage();

      it('it reduces to a state with a films pages map entry of "1#10" key with value = true', () => {
        const result = filmsReducer(filmsInitialState, action);
        const page = result.loading['1#10'];
        expect(page).toBeDefined();
        expect(page).toBe(true);
      });
    });

    describe('with a pageable prop', () => {
      const pageable = {
        page: 1,
        limit: 30
      };
      const action = fetchFilmsPage(pageable);

      it('it reduces to a state with a films pages map entry of "1#30" key with value = true', () => {
        const result = filmsReducer(filmsInitialState, action);

        const page = result.loading['1#30'];
        expect(page).toBeDefined();
        expect(page).toBe(true);
      });
    });
  });

  describe(`when an action with type "${
    filmsActionsTypes.PAGE_FETCHED
  }" is emitted`, () => {
    const action = filmsPageFetched({ films: [], count: 0 });
    it('it reduces to a state with same "count" from the action payload', () => {
      const result = filmsReducer(
        { ...filmsInitialState, loading: { '1#10': true } },
        action
      );
      expect(result.loading['1#10']).toBe(false);
      expect(result.count).toBeDefined();
      expect(result.count).toBe(action.count);
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
