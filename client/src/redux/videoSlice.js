import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentVideo: null,
  isLoading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isLoading = true;
    },
    fetchSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.currentVideo = payload;
    },
    fetchFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
    like: (state, { payload }) => {
      if (!state.currentVideo.likes.includes(payload)) {
        state.currentVideo.likes.push(payload);
        state.currentVideo.dislikes.splice(
          state.currentVideo.dislikes.findIndex((userId) => userId === payload),
          1
        );
      }
    },
    dislike: (state, { payload }) => {
      if (!state.currentVideo.dislikes.includes(payload)) {
        state.currentVideo.dislikes.push(payload);
        state.currentVideo.likes.splice(
          state.currentVideo.likes.findIndex((userId) => userId === payload),
          1
        );
      }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } =
  videoSlice.actions;
export default videoSlice.reducer;
