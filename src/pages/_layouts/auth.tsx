import { Pizza } from "lucide-react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-2 antialiased">
      <div className="h-full border-r border-foreground/5 bg-muted text-muted-foreground flex flex-col justify-between p-10">
        <header className="flex items-center gap-3 text-lg text-foreground font-medium">
          <Pizza className="h-5 w-5" />
          <span className="font-semibold">Pizza Shop</span>
        </header>
        <footer className="text-sm">
          Partner panel © Pizza Shop {new Date().getFullYear()}
        </footer>
      </div>
      <main className="flex flex-col items-center justify-center relative">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
