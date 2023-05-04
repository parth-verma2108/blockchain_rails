import merge from "lodash/merge";
import cloneDeep from "lodash/cloneDeep";

import {
  RECEIVE_LOAN_REQUEST_MATCH,
  RECEIVE_LOAN_REQUEST_MATCHES,
} from "../actions/loanRequestMatchesActions";

const defaultState = {
  items: {},
  loaded: false,
};

const loanRequestMatchesReducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_LOAN_REQUEST_MATCH:
      return merge({}, state, { items: action.payload, loaded: true });
    case RECEIVE_LOAN_REQUEST_MATCHES:
      let newItems = cloneDeep(state.items);
      const newLoanRequestMatches = action.payload;

      return {
        ...state,
        items: { ...newItems, ...newLoanRequestMatches },
        loaded: true,
      };
    default:
      return state;
  }
};

export default loanRequestMatchesReducer;
