import { createStore, applyMiddleware } from "redux";
import { AsyncStorage } from "react-native";

import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import omit from "lodash/omit";

const initialState = {};
const middleware = [thunk];

let blacklistTransform = createTransform((inboundState, key) => {
  if (key === "wishlistReducer") {
    return omit(inboundState, ["otherUserWishList"]);
  } else {
    return inboundState;
  }
});
const persistConfig = {
  key: "root2",
  storage: AsyncStorage,
  whitelist: ["wishlistReducer", "auth"],
  transforms: [blacklistTransform]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(...middleware)
);

export const persistor = persistStore(store);

export default store;
