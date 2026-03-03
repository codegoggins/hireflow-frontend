import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Analytics = lazy(() => import("../Analytics"));

const analyticsRoutes: RouteObject[] = [
  { index: true, element: <Analytics /> },
];

export default analyticsRoutes;
