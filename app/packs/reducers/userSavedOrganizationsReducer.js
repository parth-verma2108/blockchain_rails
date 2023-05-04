import without from "lodash/without";

import {
  RECEIVE_USER_SAVED_ORGANIZATIONS,
  REMOVE_USER_SAVED_ORGANIZATIONS,
} from "../actions/userSavedOrganizationActions";

const defaultState = {
  items: [],
  loaded: false,
};

const userSavedOrganizationsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newItems;

  switch (action.type) {
    case RECEIVE_USER_SAVED_ORGANIZATIONS:
      return { items: action.payload, loaded: true };
    case REMOVE_USER_SAVED_ORGANIZATIONS:
      newItems = without(state.items, action.payload);

      return {
        items: newItems,
        loaded: true,
      };
    default:
      return state;
  }
};

export default userSavedOrganizationsReducer;
