import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

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

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="mx-auto max-w-6xl">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
