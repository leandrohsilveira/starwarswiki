import { filmsInitialState } from './reducer';

const filmsActionsTypes = {
  LOAD: '[Films] Load films',
  LOADED: '[Films] Films loaded',
  FETCH_PAGE: '[Films] Fetch films page',
  PAGE_FETCHED: '[Films] Films page fetched'
};

export const loadFilms = (pageable = filmsInitialState.pageable) => ({
  type: filmsActionsTypes.LOAD,
  pageable
});

export const filmsLoaded = (films, pageable = filmsInitialState.pageable) => ({
  type: filmsActionsTypes.LOADED,
  films,
  pageable
});

export const fetchFilmsPage = (pageable = filmsInitialState.pageable) => ({
  type: filmsActionsTypes.FETCH_PAGE,
  pageable
});

export const filmsPageFetched = (
  { films, count },
  pageable = filmsInitialState.pageable
) => ({
  type: filmsActionsTypes.PAGE_FETCHED,
  films,
  count,
  pageable
});

export default filmsActionsTypes;
