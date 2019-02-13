const filmsActionsTypes = {
  LOAD: '[Films] Load films',
  LOADED: '[Films] Films loaded',
  FETCH_PAGE: '[Films] Fetch films page',
  PAGE_FETCHED: '[Films] Films page fetched',
};

export const loadFilms = pageable => ({
  type: filmsActionsTypes.LOAD,
  pageable,
});

export const filmsLoaded = (films, pageable) => ({
  type: filmsActionsTypes.LOADED,
  films,
  pageable,
});

export const fetchFilmsPage = pageable => ({
  type: filmsActionsTypes.FETCH_PAGE,
  pageable,
});

export const filmsPageFetched = (films, pageable) => ({
  type: filmsActionsTypes.PAGE_FETCHED,
  films,
  pageable,
});

export default filmsActionsTypes;
