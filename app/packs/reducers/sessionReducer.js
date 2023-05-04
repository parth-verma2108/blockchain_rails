import { RECEIVE_SESSION } from "../actions/sessionActions";
import merge from "lodash/merge";

const _defaultState = {
  currentUser: null,
};

export default function sessionsReducer(state = _defaultState, action) {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SESSION:
      return merge({}, state, { currentUser: action.payload });
    default:
      return state;
  }
}
