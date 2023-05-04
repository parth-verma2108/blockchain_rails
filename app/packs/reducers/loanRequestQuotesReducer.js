import merge from "lodash/merge";
import cloneDeep from "lodash/cloneDeep";

import {
  RECEIVE_LOAN_REQUEST_QUOTE,
  RECEIVE_LOAN_REQUEST_QUOTES,
} from "../actions/loanRequestQuotesActions";

const defaultState = {
  items: {},
  loaded: false,
};

const loanRequestQuotesReducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_LOAN_REQUEST_QUOTE:
      return merge({}, state, { items: action.payload, loaded: true });
    case RECEIVE_LOAN_REQUEST_QUOTES:
      let newItems = cloneDeep(state.items);
      const newLoanRequestQuotes = action.payload;

      return {
        ...state,
        items: { ...newItems, ...newLoanRequestQuotes },
        loaded: true,
      };
    default:
      return state;
  }
};

export default loanRequestQuotesReducer;
