import { combineReducers } from "redux";
import sessionReducer from "./sessionReducer";
import organizationsReducer from "./organizationsReducer";
import organizationBranchesReducer from "./organizationBranchesReducer";
import searchesReducer from "./searchesReducer";
import userSavedOrganizationsReducer from "./userSavedOrganizationsReducer";
import loanRequestsReducer from "./loanRequestsReducer";
import loanRequestQuotesReducer from "./loanRequestQuotesReducer";
import loanRequestMatchesReducer from "./loanRequestMatchesReducer";

export default combineReducers({
  session: sessionReducer,
  organizations: organizationsReducer,
  organizationBranches: organizationBranchesReducer,
  searches: searchesReducer,
  userSavedOrganizations: userSavedOrganizationsReducer,
  loanRequests: loanRequestsReducer,
  loanRequestQuotes: loanRequestQuotesReducer,
  loanRequestMatches: loanRequestMatchesReducer,
});
