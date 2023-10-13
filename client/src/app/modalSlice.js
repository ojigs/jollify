import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isLoginModal: false,
    isCreatePlaylistModal: false,
    isAddToPlaylistModal: false,
    addSongId: null,
    message: "",
  },
  reducers: {
    toggleLoginModal: (state) => {
      state.isLoginModal = !state.isLoginModal;
    },
    toggleCreatePlaylistModal: (state) => {
      state.isCreatePlaylistModal = !state.isCreatePlaylistModal;
    },
    toggleAddToPlaylistModal: (state) => {
      state.isAddToPlaylistModal = !state.isAddToPlaylistModal;
    },
    setSongId: (state, action) => {
      state.addSongId = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const {
  toggleLoginModal,
  toggleCreatePlaylistModal,
  toggleAddToPlaylistModal,
  setSongId,
  setMessage,
} = modalSlice.actions;

export default modalSlice.reducer;
