function mockLocalStorage(state) {
  let currentState = state;

  window.localStorage = {
    __mocked: true,
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
