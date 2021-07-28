import { createStore, applyMiddleware } from "redux";
import reducer from "../Redux/Reducer/reducer";
// import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
// let reducers = combineReducers({
//   user: reducer,
// });
let middleware = [thunk];
let store = createStore(reducer, applyMiddleware(...middleware));
export default store;
