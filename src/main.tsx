import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginPage from "./pages/LoginPage.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";

//routing
const router = createBrowserRouter([
     {
          path: "/login",
          element: <LoginPage></LoginPage>,
     },

     {
          path: "/",
          element: <HomePage></HomePage>,
     },
]);

createRoot(document.getElementById("root")!).render(
     <StrictMode>
          <RouterProvider router={router}></RouterProvider>
     </StrictMode>
);
