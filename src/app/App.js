import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'app/config';
import { BrowserRouter, Route } from 'react-router-dom';
import LayoutProvider from 'app/layout/providers/LayoutProvider';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route
          component={props => <LayoutProvider {...props}>Hello</LayoutProvider>}
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
