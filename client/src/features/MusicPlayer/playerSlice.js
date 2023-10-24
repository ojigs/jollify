import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    currentSong: null,
    currentIndex: 0,
    queue: [],
    isPlaying: false,
    currentTime: 0,
    duration: "0:00",
    volume: 50,
    isMuted: false,
    repeat: "off",
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
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    setQueue: (state, action) => {
      state.queue = action.payload.queue;
      state.currentIndex = action.payload.index || 0;
      state.currentSong = state.queue[state.currentIndex];
    },
    playNext: (state) => {
      if (state.currentIndex >= state.queue.length - 1) {
        state.currentIndex = 0;
        state.currentSong = state.queue[state.currentIndex];
      } else {
        state.currentSong = state.queue[state.currentIndex + 1];
        state.currentIndex += 1;
      }
    },
    playPrev: (state) => {
      if (state.currentIndex == 0) {
        state.currentIndex = state.queue.length - 1;
        state.currentSong = state.queue[state.queue.length - 1];
      } else {
        state.currentSong = state.queue[state.currentIndex - 1];
        state.currentIndex -= 1;
      }
    },
    setRepeat: (state) => {
      switch (state.repeat) {
        case "off":
          state.repeat = "single";
          break;
        case "single":
          state.repeat = "all";
          break;
        case "all":
          state.repeat = "off";
          break;

        default:
          break;
      }
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
  setCurrentSong,
  setQueue,
  playNext,
  playPrev,
  setRepeat,
} = playerSlice.actions;

export default playerSlice.reducer;
