import merge from "lodash/merge";
import cloneDeep from "lodash/cloneDeep";

import { RECEIVE_ORGANIZATION, RECEIVE_ORGANIZATIONS } from "../actions/organizationActions";

const defaultState = {
  items: {},
  loaded: false,
};

const organizationsReducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ORGANIZATIONS:
      return { items: action.payload, loaded: true };
    case RECEIVE_ORGANIZATION:
      let newItems = cloneDeep(state.items);
      const newOrganization = action.payload;

      return {
        ...state,
        items: { ...newItems, ...newOrganization },
        loaded: true
      };
    default:
      return state;
  }
};

export default organizationsReducer;
