import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Local storage
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import {thunk} from "redux-thunk"; // ✅ Fix import

import { authReducer } from "./reducers/authReducer"; // Ensure this exists
import { productsReducer } from "./reducers/productsReducer"; // Ensure this exists

// Persist Config
const persistConfig = {
  key: "root",
  storage,
};

// Combine Reducers
const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer, // ✅ Include productsReducer here
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // ✅ Ignore these actions
      },
    }).concat(thunk), // ✅ Correct import
  devTools: process.env.NODE_ENV !== "production",
});

// Create persistor
export const persistor = persistStore(store);

export default store;
