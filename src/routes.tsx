import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./pages/_layouts/app";
import AuthLayout from "./pages/_layouts/auth";
import Dashboard from "./pages/app/dashboard";
import SignIn from "./pages/auth/signin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/", element: <Dashboard /> }],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ path: "/", element: <SignIn /> }],
  },
]);