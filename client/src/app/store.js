import { configureStore } from "@reduxjs/toolkit";
// import { setUpListeners } from "@reduxjs/toolkit/dist/query";
// import { apiSlice } from "./apiSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
  // middleware: (getDefaultMiddleware) => {
  //   getDefaultMiddleware().concat(apiSlice.middleware);
  // },
});

// setUpListeners(store.dispatch);

export default store;
