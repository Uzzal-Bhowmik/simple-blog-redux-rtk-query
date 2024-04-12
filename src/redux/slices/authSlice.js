import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user } = action.payload;

      if (user?.uid) {
        state.user = user;
      } else {
        state.user = null;
      }

      state.isAuthLoading = false;
    },
  },
});

// actions
export const { setUser } = authSlice.actions;

export default authSlice.reducer;
