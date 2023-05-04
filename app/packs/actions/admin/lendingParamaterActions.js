import normalize from "json-api-normalizer";

import { GET, POST, PATCH } from "../../utility/api";

export const RECEIVE_LENDING_PARAMETERS = "RECEIVE_LENDING_PARAMETERS";

export const receiveLendingParameters = (lendingParameters) => ({
  type: RECEIVE_LENDING_PARAMETERS,
  payload: lendingParameters,
});

export const fetchLendingParameters = () => (dispatch) => {
  return GET("/api/lending_parameters").then((res) => {
    const normalized = normalize(res.data);
    return dispatch(receiveLendingParameters(normalized.loanRequest));
  });
};

export const fetchLendingParameter = (id) => (dispatch) => {
  return GET("/api/lending_parameters/" + id).then((res) => {
    const normalized = normalize(res.data);
    return dispatch(receiveLendingParameters(normalized.loanRequest));
  });
};

export const createLendingParameter = (data, submit) => (_dispatch) => {
  return POST("/api/lending_parameters", { lending_parameter: data, submit }).then(
    (res) => {
      return res && res.data && res.data.redirect;
    }
  );
};

export const updateLendingParameter = (id, data) => (_dispatch) => {
  return PATCH("/api/lending_parameters/" + id, { lending_parameter: data }).then(
    (res) => {
      return res && res.data && res.data.redirect;
    }
  );
};
