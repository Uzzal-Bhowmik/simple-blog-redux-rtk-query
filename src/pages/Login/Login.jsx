import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import auth from "@/src/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const googleIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0.98em"
      height="1em"
      viewBox="0 0 256 262"
    >
      <path
        fill="black"
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      ></path>
      <path
        fill="black"
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      ></path>
      <path
        fill="black"
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
      ></path>
      <path
        fill="black"
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      ></path>
    </svg>
  );

  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        toast.success(`Authenticated as ${result.user?.email}`);
        form.reset();
        navigate(from, { replace: true });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.code, {
          className: "animate-shake animate-once",
        });
      });
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-slate-100">
      <form
        className="mx-auto w-[40%] rounded-xl border bg-white p-6 shadow-lg"
        onSubmit={handleLogin}
      >
        <h1 className="animate-fade-right">Login</h1>
        <p className="mb-4 mt-2 text-muted-foreground">
          Enter credentials to sign in to your account
        </p>

        <div className="flex items-center justify-center">
          <Button variant="outline" className="gap-2">
            {googleIcon} Google
          </Button>
        </div>

        <div className="mb-4 mt-3 flex w-full items-center gap-2">
          <div className="h-[0.5px] flex-grow bg-slate-300"></div>
          <p className="text-xs text-slate-400">OR CONTINUE WITH</p>
          <div className="h-[0.5px] flex-grow bg-slate-300"></div>
        </div>

        {/* inputs */}
        <div className="flex flex-col gap-5">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" placeholder="Email" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
          </div>
        </div>

        <Button className="mt-5 w-full" disabled={isLoading}>
          {isLoading ? "Logging In..." : "Sign In"}
        </Button>
        <p className="mt-2 text-center text-muted-foreground">
          Don&quot;t have an account?{" "}
          <Link to="/register" className="underline hover:text-black">
            Create One
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
