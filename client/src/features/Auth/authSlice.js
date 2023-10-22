import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.username = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
