import { POST, PATCH } from "../utility/api";
import { receiveSession } from "./sessionActions";

export const updatePassword = (data) => (dispatch) => {
  return PATCH("/users/password", { user: data }).then((res) => {
    if (res.status === 201) {
      return dispatch(receiveSession(res.data.data));
    }
  });
};

export const createPassword = (data) => (dispatch) => {
  return POST("/users/password", { user: data }).then((res) => {
    if (res.status === 201) {
      return dispatch(receiveSession(res.data.data));
    }
  });
};
