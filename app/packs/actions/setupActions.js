import { PATCH } from "../utility/api";

export const updateSetup = (data) => (_dispatch) => {
  return PATCH("/api/setup", { ...data }).then((res) => {
    return res && res.data && res.data.redirect;
  });
};
