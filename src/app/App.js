import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'app/config';
import LayoutProvider from 'app/layout/providers/LayoutProvider';

function App() {
  return (
    <Provider store={store}>
      <LayoutProvider>Hello</LayoutProvider>
    </Provider>
  );
}

export default App;
