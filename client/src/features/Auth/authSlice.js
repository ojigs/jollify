import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: null,
    isAuthenticated: false,
    provider: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload;
      state.isAuthenticated = true;
    },
    setProvider: (state, action) => {
      state.provider = action.payload;
    },
    logoutUser: (state) => {
      state.username = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setProvider, logoutUser } = authSlice.actions;

export default authSlice.reducer;
