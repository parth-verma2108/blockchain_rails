import cloneDeep from "lodash/cloneDeep";
import omit from "lodash/omit";

import {
  RECEIVE_LOAN_REQUESTS,
} from "../actions/loanRequestActions";

const defaultState = {
  items: {},
  loaded: false,
};

const loanRequestsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newItems;

  switch (action.type) {
    case RECEIVE_LOAN_REQUESTS:
      return { items: action.payload, loaded: true };
    default:
      return state;
  }
};

export default loanRequestsReducer;
