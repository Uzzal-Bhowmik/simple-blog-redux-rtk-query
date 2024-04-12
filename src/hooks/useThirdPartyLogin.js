import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// google provider
const googleProvider = new GoogleAuthProvider();

const useThirdPartyLogin = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = (from) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        toast.success(`Authenticated as ${result.user.email}`);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };

  return { handleGoogleSignIn };
};

export default useThirdPartyLogin;
