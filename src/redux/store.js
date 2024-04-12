import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authorsReducer from "./slices/authorsSlice";
import blogsReducer from "./slices/blogsSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authors: authorsReducer,
    blogs: blogsReducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware);
  },
});
