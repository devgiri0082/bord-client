let initialState = {
  userDetails: {
    userName: null,
    email: null,
  },
};

export default function userReducer(state = initialState, action) {
  switch (action.types) {
    default:
      return state;
  }
}
