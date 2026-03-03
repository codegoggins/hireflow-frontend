import { createBrowserRouter, Navigate } from "react-router-dom";
import authRoutes from "../views/auth/router";
import MainLayout from "../layout/MainLayout";
import ProtectedRouter from "./ProtectedRouter";
import ErrorBoundary from "../components/shared/ErrorBoundary";
import dashboardRoutes from "../views/dashboard/router";
import candidatesRoutes from "../views/candidates/router";
import interviewsRoutes from "../views/interviews/router";
import queueRoutes from "../views/queue/router";
import interviewersRoutes from "../views/interviewers/router";
import analyticsRoutes from "../views/analytics/router";
import departmentsRoutes from "../views/departments/router";
import reportsRoutes from "../views/reports/router";
import settingsRoutes from "../views/settings/router";

const router = createBrowserRouter([
  {
    path: "/auth",
    children: authRoutes,
    errorElement: <ErrorBoundary />,
  },
  {
    element: <ProtectedRouter />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/dashboard", children: dashboardRoutes },
          { path: "/candidates", children: candidatesRoutes },
          { path: "/interviews", children: interviewsRoutes },
          { path: "/queue", children: queueRoutes },
          { path: "/interviewers", children: interviewersRoutes },
          { path: "/analytics", children: analyticsRoutes },
          { path: "/departments", children: departmentsRoutes },
          { path: "/reports", children: reportsRoutes },
          { path: "/settings", children: settingsRoutes },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
]);

export default router;
