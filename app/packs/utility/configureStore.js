import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import throttle from "lodash/throttle";

import rootReducer from "../reducers/rootReducer";
import { loadState, saveState } from "./localStorage";

const middlewares = [thunk];

if (process.env.NODE_ENV !== "production") {
  const { createLogger } = require("redux-logger");
  middlewares.push(createLogger());
}

export default function configureStore() {
  let persistedState;

  if (window.currentUser) {
    persistedState = loadState("matrix-data-v1");
    persistedState = false;

    if (persistedState) {
      persistedState.session.currentUser = window.currentUser.data;
      delete window.currentUser;
    } else {
      persistedState = {
        session: { currentUser: window.currentUser.data },
      };

      delete window.currentUser;
    }
  }

  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(...middlewares)
  );

  store.subscribe(
    throttle(() => {
      saveState(store.getState(), "matrix-data-v1");
    }, 1000)
  );

  return store;
}
