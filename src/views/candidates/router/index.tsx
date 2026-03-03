import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Candidates = lazy(() => import("../Candidates"));

const candidatesRoutes: RouteObject[] = [
  { index: true, element: <Candidates /> },
];

export default candidatesRoutes;
