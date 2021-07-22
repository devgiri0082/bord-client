import { USER_DETAILS } from "./ActionTypes";

export const userDetails = (value) => ({
  type: USER_DETAILS,
  payload: value,
});
