import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.id = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
