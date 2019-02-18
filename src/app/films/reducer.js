import filmsActionsTypes from './actions';

export const filmsInitialState = {
  films: {},
  count: null,
  pageable: {
    page: 0,
    limit: 10
  }
};

function getPageKey({ page, limit }) {
  return `${page}#${limit}`;
}

function filmsReducer(state = filmsInitialState, { type, ...payload }) {
  switch (type) {
    case filmsActionsTypes.LOAD:
      return { ...state, pageable: payload.pageable };
    case filmsActionsTypes.FETCH_PAGE:
      return {
        ...state,
        films: {
          ...state.films,
          [getPageKey(payload.pageable)]: false
        }
      };
    case filmsActionsTypes.LOADED:
      return {
        ...state,
        films: {
          ...state.films,
          [getPageKey(payload.pageable)]: payload.films
        }
      };
    case filmsActionsTypes.PAGE_FETCHED:
    default:
      return state;
  }
}

export const filmsSelector = state => state.films;

export default filmsReducer;
