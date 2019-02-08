function mockLocalStorage(state) {
  let currentState = state;

  window.localStorage = {
    getItem: key => currentState[key],
    setItem: (key, value) => {
      currentState = {
        ...currentState,
        [key]: value,
      };
    },
  };
}

export default mockLocalStorage;
