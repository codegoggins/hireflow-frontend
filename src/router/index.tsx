import { createBrowserRouter, Navigate } from "react-router-dom";
import authRoutes from "../views/auth/router";

const router = createBrowserRouter([
  {
    path: "/auth",
    children: authRoutes,
  },
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
]);

export default router;
