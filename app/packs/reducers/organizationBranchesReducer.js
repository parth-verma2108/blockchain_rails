import merge from "lodash/merge";
import cloneDeep from "lodash/cloneDeep";

import {
  RECEIVE_ORGANIZATION_BRANCH,
  RECEIVE_ORGANIZATION_BRANCHES,
} from "../actions/organizationBranchActions";

const defaultState = {
  items: {},
  loaded: false,
};

const organizationBranchesReducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ORGANIZATION_BRANCH:
      return merge({}, state, { items: action.payload, loaded: true });
    case RECEIVE_ORGANIZATION_BRANCHES:
      let newItems = cloneDeep(state.items);
      const newOrganizationBranch = action.payload;

      return {
        ...state,
        items: { ...newItems, ...newOrganizationBranch },
        loaded: true,
      };
    default:
      return state;
  }
};

export default organizationBranchesReducer;
