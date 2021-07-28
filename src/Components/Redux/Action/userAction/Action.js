import { LOADING, USER_DETAILS } from "./ActionTypes";

export const userDetails = (value) => ({
  type: USER_DETAILS,
  payload: value,
});

export const loading = (value) => {
  return {
    type: LOADING,
    payload: value,
  };
};
