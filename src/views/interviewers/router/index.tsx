import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Interviewers = lazy(() => import("../Interviewers"));

const interviewersRoutes: RouteObject[] = [
  { index: true, element: <Interviewers /> },
];

export default interviewersRoutes;
