import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./components/themeProvider.jsx";
import Home from "./pages/home.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductPage from "./components/productPage.jsx";
import { FilterProvider } from "./filtersContext.jsx";
import CheckOutPage from "./pages/checkOut.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "/:productId", Component: ProductPage },
      { path: "/checkout", Component: CheckOutPage },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <FilterProvider>
          <RouterProvider router={router} />
        </FilterProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
