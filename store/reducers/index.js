import { combineReducers } from "redux";
import authReducer from "./authReducer";
import wishlistReducer from "./wishlistReducer";

const appReducer = combineReducers({
  auth: authReducer,
  wishlistReducer: wishlistReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USER") {
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;
