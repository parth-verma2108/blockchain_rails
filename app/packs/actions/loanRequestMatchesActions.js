import normalize from "json-api-normalizer";

import { GET, PATCH } from "../utility/api";

export const RECEIVE_LOAN_REQUEST_MATCHES = "RECEIVE_LOAN_REQUEST_MATCHES";
export const RECEIVE_LOAN_REQUEST_MATCH = "RECEIVE_LOAN_REQUEST_MATCH";

export const receiveLoanRequestMatches = (loanRequestMatches) => ({
  type: RECEIVE_LOAN_REQUEST_MATCHES,
  payload: loanRequestMatches,
});

export const receiveLoanRequestMatch = (loanRequestMatch) => ({
  type: RECEIVE_LOAN_REQUEST_MATCH,
  payload: loanRequestMatch,
});

export const fetchLoanRequestMatches = ({ loanRequestId }) => (dispatch) => {
  return GET("/api/loan_requests/" + loanRequestId + "/loan_request_matches").then((res) => {
    const normalized = normalize(res.data);
    return dispatch(receiveLoanRequestMatches(normalized.loanRequestMatch));
  });
};

export const updateLoanRequestMatchInterest = ({ loanRequestId, id, interest }) => (dispatch) => {
  return PATCH("/api/loan_requests/" + loanRequestId + "/loan_request_matches/" + id, { interest }).then(
    (res) => {
      const normalized = normalize(res.data);
      return dispatch(receiveLoanRequestMatch(normalized.loanRequestMatch));
    }
  );
};
