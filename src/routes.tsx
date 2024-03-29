import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./pages/_layouts/app";
import AuthLayout from "./pages/_layouts/auth";
import Dashboard from "./pages/app/dashboard";
import Orders from "./pages/app/orders";
import SignIn from "./pages/auth/signin";
import SignUp from "./pages/auth/signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/orders", element: <Orders /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/auth/signin", element: <SignIn /> },
      { path: "/auth/signup", element: <SignUp /> },
    ],
  },
]);
