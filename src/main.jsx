import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.js";
import { apiSlice } from "./redux/api/apiSlice.js";

store.dispatch(apiSlice.endpoints.fetchBlogs.initiate());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ReduxProvider>
  </React.StrictMode>,
);
