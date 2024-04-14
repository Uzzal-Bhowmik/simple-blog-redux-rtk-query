import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/firebase.config";
import {
  clearUser,
  selectAuth,
  setAuthLoading,
  setUser,
} from "../redux/slices/authSlice";
import axios from "axios";

const MainLayout = () => {
  const { user, token } = useSelector(selectAuth);

  // scroll to top on route change
  const location = useLocation();
  useEffect(() => {
    document.documentElement.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location]);

  // Monitor User Status
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        if (!user && !token) {
          dispatch(setAuthLoading(true));
          // get token from backend
          axios
            .post("http://localhost:3500/jwt", { email: currentUser.email })
            .then((res) => {
              const user = {
                uid: currentUser?.uid,
                email: currentUser?.email,
                displayName: currentUser?.displayName,
                photoURL: currentUser.photoURL,
              };

              // set user and token info
              dispatch(setUser({ user: user, token: res.data.token }));
              dispatch(setAuthLoading(false));
            })
            .catch((err) => {
              console.error(err);
              dispatch(setAuthLoading(false));
            });
        }
      } else {
        dispatch(clearUser());
        dispatch(setAuthLoading(false));
      }
    });

    return () => unsubscribe();
  }, [dispatch, user, token]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl">
        <Outlet />
      </main>
      <Toaster richColors />
    </>
  );
};

export default MainLayout;
