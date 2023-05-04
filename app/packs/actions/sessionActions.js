import { POST, DELETE } from "../utility/api";

export const RECEIVE_SESSION = "RECEIVE_SESSION";

export const receiveSession = (session) => ({
  type: RECEIVE_SESSION,
  payload: session,
});

export const createSession = (data) => (dispatch) => {
  return POST("/users/sign_in", { user: data }).then((res) => {
    if (res.status === 201) {
      return dispatch(receiveSession(res.data.data));
    }
  });
};

export const destroySession = () => (dispatch) => {
  return DELETE("/users/sign_out").then((_res) => {
    return dispatch(receiveSession(null));
  });
};
