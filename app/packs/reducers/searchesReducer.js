import cloneDeep from "lodash/cloneDeep";
import omit from "lodash/omit";

import {
  RECEIVE_SEARCH,
  RECEIVE_SEARCHES,
  REMOVE_SEARCH,
} from "../actions/searchActions";

const defaultState = {
  items: {},
  loaded: false,
};

const searchesReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newItems;

  switch (action.type) {
    case RECEIVE_SEARCHES:
      return { items: action.payload, loaded: true };
    case RECEIVE_SEARCH:
      newItems = cloneDeep(state.items);
      const newSearch = action.payload;

      return {
        ...state,
        items: { ...newItems, ...newSearch },
        loaded: true,
      };
    case REMOVE_SEARCH:
      newItems = omit(cloneDeep(state.items), [action.payload]);

      return {
        items: newItems,
        loaded: true,
      };
    default:
      return state;
  }
};

export default searchesReducer;
