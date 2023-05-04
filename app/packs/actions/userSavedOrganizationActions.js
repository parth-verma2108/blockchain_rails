import normalize from "json-api-normalizer";
import { batch } from "react-redux";

import { POST, GET, DELETE } from "../utility/api";
import { receiveOrganizations } from "./organizationActions";

export const RECEIVE_USER_SAVED_ORGANIZATIONS = "RECEIVE_USER_SAVED_ORGANIZATIONS";
export const REMOVE_USER_SAVED_ORGANIZATIONS = "REMOVE_USER_SAVED_ORGANIZATIONS";

export const receiveUserSavedOrganizations = (userSavedOrganizations) => ({
  type: RECEIVE_USER_SAVED_ORGANIZATIONS,
  payload: userSavedOrganizations,
});

export const removeUserSavedOrganization = (userSavedOrganization) => ({
  type: REMOVE_USER_SAVED_ORGANIZATIONS,
  payload: userSavedOrganization,
});


export const createUserSavedOrganizations =
  (organization_ids, search_id) => (_dispatch) => {
    return POST("/api/user_saved_organizations", {
      ...{ organization_ids, search_id },
    });
  };

export const fetchUserSavedOrganizations = () => (dispatch) => {
  return GET("/api/user_saved_organizations").then((res) => {
    return dispatch(receiveUserSavedOrganizations(res.data));
  });
};

export const fetchSavedOrganizations = () => (dispatch) => {
  return GET("/api/user_saved_organizations?load_organizations=true").then((res) => {
    const normalized = normalize(res.data);
    return dispatch(receiveOrganizations(normalized.organization));
  });
}

export const destroySavedOrganization = (id) => (dispatch) => {
  return DELETE("/api/user_saved_organizations/" + id).then((_res) => {
    return dispatch(removeUserSavedOrganization(id));
  });
};
