import normalize from "json-api-normalizer";

import { GET, PATCH } from "../utility/api";

export const RECEIVE_LOAN_REQUEST_QUOTES = "RECEIVE_LOAN_REQUEST_QUOTES";
export const RECEIVE_LOAN_REQUEST_QUOTE = "RECEIVE_LOAN_REQUEST_QUOTE";

export const receiveLoanRequestQuotes = (loanRequestQuotes) => ({
  type: RECEIVE_LOAN_REQUEST_QUOTES,
  payload: loanRequestQuotes,
});

export const receiveLoanRequestQuote = (loanRequestQuote) => ({
  type: RECEIVE_LOAN_REQUEST_QUOTE,
  payload: loanRequestQuote,
});

export const fetchLoanRequestQuotes = ({ loanRequestId }) => (dispatch) => {
  return GET("/api/loan_requests/" + loanRequestId + "/loan_request_quotes").then((res) => {
    const normalized = normalize(res.data);
    return dispatch(receiveLoanRequestQuotes(normalized.loanRequestQuote));
  });
};

export const updateLoanRequestQuoteInterest = ({ loanRequestId, id, interest }) => (dispatch) => {
  return PATCH("/api/loan_requests/" + loanRequestId + "/loan_request_quotes/" + id, { interest }).then(
    (res) => {
      const normalized = normalize(res.data);
      return dispatch(receiveLoanRequestQuote(normalized.loanRequestQuote));
    }
  );
};
