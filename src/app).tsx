import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import "./global.css";

import { ThemeProvider } from "./components/theme/theme-provider";
import { router } from "./routes";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider storageKey="@pizza-shop/theme">
        <Helmet titleTemplate="%s | Pizza Shop" />
        <Toaster richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
