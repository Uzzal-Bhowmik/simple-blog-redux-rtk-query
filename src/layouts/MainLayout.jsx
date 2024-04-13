import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { setUser } from "../redux/slices/authSlice";

const MainLayout = () => {
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
      dispatch(setUser({ user: currentUser }));
    });

    return () => unsubscribe();
  }, [dispatch]);

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
