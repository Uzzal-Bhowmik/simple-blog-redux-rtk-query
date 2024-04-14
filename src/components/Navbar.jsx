import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "./Navbar.css";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
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
import { LoaderIcon, ShoppingBag } from "lucide-react";
import { selectAuth } from "../redux/slices/authSlice";
import { Badge } from "@/components/ui/badge";
import { selectCart } from "../redux/slices/cartSlice";

const Navbar = () => {
  const pathName = useLocation().pathname.replace("/", "");
  const { user, isAuthLoading } = useSelector(selectAuth);

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

  // cart data
  const cart = useSelector(selectCart);

  return (
    <NavigationMenu className="sticky top-0 mt-0 h-20 w-full max-w-full border-b border-b-slate-200 bg-white">
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

        <NavigationMenuItem>
          <Link to="/cart" className="flex items-center gap-1">
            <ShoppingBag />
            <Badge className="">{cart?.length}</Badge>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>

      {isAuthLoading ? (
        <div>
          <LoaderIcon className="absolute right-2 top-1/3 animate-spin" />
        </div>
      ) : (
        user?.uid && (
          <div className="absolute right-2 flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.photoURL} rel="noopener noreferrer" />
                  <AvatarFallback>
                    {user?.email?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-2">
                <DropdownMenuLabel className="text-base">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-base">
                  <Link to="/user-order">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="mt-6">
                  <Button onClick={handleLogout} className="w-full">
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      )}
    </NavigationMenu>
  );
};

export default Navbar;
