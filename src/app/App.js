import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "app/config";
import LayoutProvider from "app/layout/providers/LayoutProvider";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LayoutProvider>Hello</LayoutProvider>
      </Provider>
    );
  }
}

export default App;
