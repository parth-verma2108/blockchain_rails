import { POST, PATCH } from "../../utility/api";

export const createLender = (data) => (_dispatch) => {
  return POST("/api/setup", { ...data }).then((res) => {
    if (res.status === 201) {
      return res && res.data && res.data.redirect;
    } else {
      return res
    }
  })
};

export const updateLender = (data) => (_dispatch) => {
  return PATCH("/api/setup", { ...data }).then((res) => {
    if (res.status === 201) {
      return res && res.data && res.data.redirect;
    } else {
      return res
    }
  })
};
