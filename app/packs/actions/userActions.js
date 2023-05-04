import { POST, PATCH } from "../utility/api";

import { receiveSession } from "./sessionActions";

export const createUser = (data) => (dispatch) => {
  return POST("/users", { user: data }).then((res) => {
    return dispatch(receiveSession(res.data.data));
  });
};

export const editUser = (data) => (dispatch) => {
  return PATCH("/users", { user: data }).then((res) => {
    return dispatch(receiveSession(res.data.data));
  });
};
