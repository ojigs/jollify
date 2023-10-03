import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setUpListeners } from "@reduxjs/toolkit/dist/query";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./apiSlice";
import themeSlice from "./themeSlice";
import userSlice from "../features/Users/slice/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducers = combineReducers({
  theme: themeSlice,
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware().concat(apiSlice.middleware, thunk);
  },
});

export const persistor = persistStore(store);

setUpListeners(store.dispatch);
