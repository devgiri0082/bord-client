import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "../Redux/Reducer/userReducer";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
let reducers = combineReducers({
  user: userReducer,
});
let middleware = [createLogger(), thunk];
let store = createStore(reducers, applyMiddleware(...middleware));
export default store;
