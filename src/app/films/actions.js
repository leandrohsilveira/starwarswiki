const filmsActionsTypes = {
  LOAD: '[Films] Load films',
  LOADED: '[Films] Films loaded',
  FETCH_PAGE: '[Films] Fetch films page',
  FETCH_SUCCESS: '[Films] Fetch films page SUCCESS',
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

export const fetchFilmsPageSuccess = (films, pageable) => ({
  type: filmsActionsTypes.FETCH_SUCCESS,
  films,
  pageable,
});

export default filmsActionsTypes;
