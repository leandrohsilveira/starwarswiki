import filmsActionsTypes from './actions';

export const filmsInitialState = {
  films: {},
  loading: {},
  count: null,
  pageable: {
    page: 1,
    limit: 10
  }
};

function getPageKey({ page, limit }, count = null) {
  const countTxt = count !== null ? `#${count}` : '';
  return `${page}#${limit}${countTxt}`;
}

function filmsReducer(state = filmsInitialState, { type, ...payload }) {
  switch (type) {
    case filmsActionsTypes.LOAD:
      return { ...state, pageable: payload.pageable };
    case filmsActionsTypes.FETCH_PAGE:
      return {
        ...state,
        loading: {
          ...state.loading,
          [getPageKey(payload.pageable)]: true
        }
      };
    case filmsActionsTypes.LOADED:
      return {
        ...state,
        films: {
          ...state.films,
          [getPageKey(payload.pageable, payload.count)]: payload.films
        }
      };
    case filmsActionsTypes.PAGE_FETCHED:
      return {
        ...state,
        loading: {
          [getPageKey(payload.pageable)]: false
        },
        count: payload.count
      };
    default:
      return state;
  }
}

export const filmsSelector = state => state.films;

export const filmsCountSelector = state => filmsSelector(state).count;

export const filmsPageableSelector = state => filmsSelector(state).pageable;

export const filmsPageSelector = (state, pageable, count) =>
  filmsSelector(state).films[getPageKey(pageable, count)];

export const filmsPageLoadingSelector = (state, pageable) =>
  filmsSelector(state).loading[getPageKey(pageable)];

export default filmsReducer;
