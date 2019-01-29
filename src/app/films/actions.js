const filmsActionsTypes = {
  LOAD: '[Films] Load films',
  LOADED: '[Films] Films loaded',
};

export const loadFilms = () => ({
  type: filmsActionsTypes.LOAD,
});

export const filmsLoaded = films => ({
  type: filmsActionsTypes.LOADED,
  films,
});

export default filmsActionsTypes;
