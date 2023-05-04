import { PATCH } from "../utility/api";
import { receiveSession } from "./sessionActions";

export const updateProfile = (data) => (dispatch) => {
  return PATCH("/api/profile", { ...data }).then((res) => {
    return dispatch(receiveSession(res.data.data));
  });
};

export const updatePassword = (data) => (dispatch) => {
  return PATCH("/api/password", { ...data })
};
