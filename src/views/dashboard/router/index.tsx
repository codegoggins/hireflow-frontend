import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Dashboard = lazy(() => import("../Dashboard"));

const dashboardRoutes: RouteObject[] = [
  { index: true, element: <Dashboard /> },
];

export default dashboardRoutes;
