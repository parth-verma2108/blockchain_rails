import { POST } from "../../utility/api";

export const createPassword = (user_id) => (_dispatch) => {
  return POST("/api/passwords", { user_id })
};
