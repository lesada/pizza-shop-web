import { useEffect } from "react";

import { isAxiosError } from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Header from "@/components/header";
import { api } from "@/lib/axios";

function AppLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;
          const code = error.response?.data?.code;

          if (status === 401 && code === "UNAUTHORIZED") {
            toast.error("You session has expired. Please sign in to continue.");
            navigate("/auth/signin", { replace: true });
          } else throw error;
        }
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return (
    <div className="antialiased flex min-h-screen flex-col">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
