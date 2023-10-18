import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    isPlaying: false,
    currentTime: 0,
    duration: "0:00",
    volume: 50,
    isMuted: false,
    prevVolume: 50,
  },
  reducers: {
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setIsMuted: (state, action) => {
      state.isMuted = action.payload;
    },
    setPrevVolume: (state, action) => {
      state.prevVolume = action.payload;
    },
  },
});

export const {
  setPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  setIsMuted,
  setPrevVolume,
} = playerSlice.actions;

export default playerSlice.reducer;
