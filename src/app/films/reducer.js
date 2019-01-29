import filmsActionsTypes from './actions';

export const filmsInitialState = {
  films: [],
  loading: false,
};

function filmsReducer(state = filmsInitialState, { type, ...payload }) {
  switch (type) {
    case filmsActionsTypes.LOAD:
      return { ...state, loading: true };
    case filmsActionsTypes.LOADED:
      return { ...state, loading: false, films: payload.films };
    default:
      return state;
  }
}

export const filmsSelector = state => state.films;

export default filmsReducer;
