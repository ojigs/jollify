import { configureStore } from "@reduxjs/toolkit";
import { setUpListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice";

const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

setUpListeners(store.dispatch);

export default store;
