export const filmsInitialState = {
  films: [],
};

function filmsReducer(state = filmsInitialState, { type }) {
  switch (type) {
    default:
      return state;
  }
}

export const filmsSelector = state => state.films;

export default filmsReducer;
