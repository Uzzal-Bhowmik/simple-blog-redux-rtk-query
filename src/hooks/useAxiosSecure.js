import axios from "axios";
import { signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { toast } from "sonner";

// Create an interceptor instance of Axios with a base URL
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

// Add an interceptor to inject the authorization header
axiosSecure.interceptors.request.use(
  (config) => {
    // Get the access token from localStorage
    const accessToken = localStorage.getItem("rtk-query-token");

    // If an access token exists, add it to the request headers
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add an interceptor to handle 401 and 403 responses
axiosSecure.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // Unauthorized or Forbidden status received, log the user out and redirect to the login page
      signOut(auth)
        .then(() => {
          toast.warning("Session Expired. Try login again");
        })
        .catch((err) => {
          toast.error(err.code);
        });
    }
    return Promise.reject(error);
  },
);

export default axiosSecure;
