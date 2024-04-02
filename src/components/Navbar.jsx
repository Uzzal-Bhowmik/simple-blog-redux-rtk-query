import "./Navbar.css";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <NavigationMenu className="bottom-2 mt-0 h-20 w-full max-w-full border border-b-slate-200">
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
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
