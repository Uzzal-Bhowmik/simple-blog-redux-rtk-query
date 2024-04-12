import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "./Navbar.css";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";

const Navbar = () => {
  const pathName = useLocation().pathname.replace("/", "");
  const { user, isAuthLoading } = useSelector((state) => state.auth);

  // Sign Out
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successful");
      })
      .catch((err) => {
        toast.error(err?.code);
      });
  };

  return (
    <NavigationMenu className="relative bottom-2 mt-0 h-20 w-full max-w-full border border-b-slate-200">
      <NavigationMenuList className="navlink-container">
        <NavigationMenuItem>
          <NavLink
            to="/"
            className={`${({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""} first-link`}
          >
            Home
          </NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavLink
            to="/authors"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Authors
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink
            to="/new-blog"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            New Blog
          </NavLink>
        </NavigationMenuItem>

        {!user?.uid && !isAuthLoading && (
          <>
            {pathName.includes("login") ? (
              <NavigationMenuItem>
                <NavLink to="/register">Register</NavLink>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem>
                <NavLink to="/login">Login</NavLink>
              </NavigationMenuItem>
            )}
          </>
        )}
      </NavigationMenuList>

      {isAuthLoading ? (
        <div>
          <LoaderIcon className="absolute right-2 top-1/3 animate-spin" />
        </div>
      ) : (
        user?.uid && (
          <DropdownMenu>
            <DropdownMenuTrigger className="absolute right-2">
              <Avatar>
                <AvatarImage src={user?.photoURL} />
                <AvatarFallback>
                  {user?.email?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-2">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button onClick={handleLogout}>Logout</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      )}
    </NavigationMenu>
  );
};

export default Navbar;
