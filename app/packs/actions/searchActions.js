import normalize from "json-api-normalizer";
import { batch } from "react-redux";

import { POST, GET, DELETE, PATCH } from "../utility/api";
import { receiveOrganizations } from "./organizationActions";
import { receiveOrganizationBranches } from "./organizationBranchActions";

export const RECEIVE_SEARCH = "RECEIVE_SEARCH";
export const REMOVE_SEARCH = "REMOVE_SEARCH";
export const RECEIVE_SEARCHES = "RECEIVE_SEARCHES";

export const receiveSearch = (search) => ({
  type: RECEIVE_SEARCH,
  payload: search,
});

export const receiveSearches = (id) => ({
  type: RECEIVE_SEARCHES,
  payload: id,
});

export const removeSearch = (search) => ({
  type: REMOVE_SEARCH,
  payload: search,
});


export const createSearch = (data) => (_dispatch) => {
  return POST("/api/searches", { search: data }).then((res) => {
    return res && res.data && res.data.redirect;
  });
};

export const updateSearch = (id, data) => (_dispatch) => {
  return PATCH("/api/searches/" + id, { search: data }).then((res) => {
    return res && res.data && res.data.redirect;
  });
};

export const fetchSearchResults = (id) => (dispatch) => {
  return GET("/api/searches/" + id + "/results").then((res) => {
    const normalized = normalize(res.data);

    return batch(() => {
      dispatch(receiveOrganizations(normalized.organization));
      dispatch(receiveOrganizationBranches(normalized.organizationBranch));
    });
  });
};

export const fetchSearches = () => (dispatch) => {
  return GET("/api/searches").then((res) => {
    const normalized = normalize(res.data);

    return dispatch(receiveSearches(normalized.search));
  });
};

export const fetchSearch = (id) => (dispatch) => {
  return GET("/api/searches/" + id).then((res) => {
    const normalized = normalize(res.data);

    return dispatch(receiveSearch(normalized.search));
  });
};

export const destroySearch = (id) => (dispatch) => {
  return DELETE("/api/searches/" + id).then((_res) => {
    return dispatch(removeSearch(id));
  });
};
