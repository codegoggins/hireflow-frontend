import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Departments = lazy(() => import("../Departments"));

const departmentsRoutes: RouteObject[] = [
  { index: true, element: <Departments /> },
];

export default departmentsRoutes;
