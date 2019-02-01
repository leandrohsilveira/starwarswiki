const filmsActionsTypes = {
  LOAD: '[Films] Load films',
  LOADED: '[Films] Films loaded',
  FETCH_PAGE: '[Films] Fetch films page',
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

export default filmsActionsTypes;
