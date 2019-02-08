import filmsActionsTypes from './actions';

export const filmsInitialState = {
  films: {},
  loading: false,
  loaded: false,
  pageable: {
    page: 0,
    limit: 10,
  },
};

function filmsReducer(state = filmsInitialState, { type, ...payload }) {
  switch (type) {
    case filmsActionsTypes.LOAD:
      return { ...state, loading: true, pageable: payload.pageable };
    case filmsActionsTypes.LOADED:
      return { ...state, loading: false, films: payload.films };
    default:
      return state;
  }
}

export const filmsSelector = state => state.films;

export default filmsReducer;
