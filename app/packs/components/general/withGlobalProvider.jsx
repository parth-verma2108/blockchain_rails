import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import configureStore from "../../utility/configureStore";

const store = configureStore();

const withGlobalProviders = (Component) => (props) => (
  <Provider store={store}>
    <BrowserRouter>
      <Component {...props} />
    </BrowserRouter>
  </Provider>
);

export default withGlobalProviders;
