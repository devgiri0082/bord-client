import { LOADING, USER_DETAILS } from "../Action/userAction/ActionTypes";

let initialState = {
  userDetails: {
    userName: null,
    id: null,
  },
  loading: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_DETAILS:
      return { userDetails: action.payload, ...state };
    case LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
