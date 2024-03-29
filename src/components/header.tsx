import { Home, Pizza, UtensilsCrossed } from "lucide-react";
import { NavLink } from "react-router-dom";

import AccountMenu from "./account-menu";
import { ThemeToggle } from "./theme/theme-toggle";
import { Separator } from "./ui/separator";

function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <Pizza className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6" />
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) => {
              return (
                "flex items-center gap-1.5 text-sm font-medium hover:text-foreground" +
                (isActive ? "text-foreground" : "text-muted-foreground")
              );
            }}
          >
            <Home className="h-4 w-4" />
            Home
          </NavLink>

          <NavLink
            to="/orders"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <UtensilsCrossed className="h-4 w-4" />
            Orders
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />
          <AccountMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;
