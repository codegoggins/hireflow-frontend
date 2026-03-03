import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Interviews = lazy(() => import("../Interviews"));

const interviewsRoutes: RouteObject[] = [
  { index: true, element: <Interviews /> },
];

export default interviewsRoutes;
