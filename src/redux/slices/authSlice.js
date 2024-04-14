import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthLoading: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },

    setAuthLoading: (state, action) => {
      state.isAuthLoading = action.payload;
    },
  },
});

// selectors
export const selectAuth = (state) => state.auth;

// actions
export const { setUser, clearUser, setAuthLoading } = authSlice.actions;

export default authSlice.reducer;
