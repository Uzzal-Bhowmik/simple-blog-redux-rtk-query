import { useSelector } from "react-redux";
import { selectAuth } from "../redux/slices/authSlice";
import { LoaderIcon } from "lucide-react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, isAuthLoading } = useSelector(selectAuth);
  const location = useLocation();

  if (isAuthLoading) {
    return <LoaderIcon className="mx-auto mt-12 block h-8 w-8 animate-spin" />;
  }

  if (user?.uid) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
