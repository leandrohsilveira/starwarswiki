const filmsActionsTypes = {
  LOAD: '[Films] Load films',
  LOADED: '[Films] Films loaded',
  FETCH_PAGE: '[Films] Fetch films page',
};

export const loadFilms = () => ({
  type: filmsActionsTypes.LOAD,
});

export const filmsLoaded = films => ({
  type: filmsActionsTypes.LOADED,
  films,
});

export const fetchFilmsPage = pageable => ({
  type: filmsActionsTypes.FETCH_PAGE,
  pageable,
});

export default filmsActionsTypes;
