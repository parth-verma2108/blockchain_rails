import normalize from "json-api-normalizer";

import { GET, POST, PATCH } from "../utility/api";

export const RECEIVE_LOAN_REQUESTS = "RECEIVE_LOAN_REQUESTS";

export const receiveLoanRequests = (loanRequests) => ({
  type: RECEIVE_LOAN_REQUESTS,
  payload: loanRequests,
});

export const fetchLoanRequests = () => (dispatch) => {
  return GET("/api/loan_requests").then((res) => {
    const normalized = normalize(res.data);
    return dispatch(receiveLoanRequests(normalized.loanRequest));
  });
};

export const createLoanRequest = (data, submit) => (_dispatch) => {
  return POST("/api/loan_requests", { loan_request: data, submit }).then(
    (res) => {
      return res && res.data && res.data.redirect;
    }
  );
};

export const updateLoanRequest = (id, data) => (_dispatch) => {
  return PATCH("/api/loan_requests/" + id, { loan_request: data }).then(
    (res) => {
      return res && res.data && res.data.redirect;
    }
  );
};
