import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Reports = lazy(() => import("../Reports"));

const reportsRoutes: RouteObject[] = [{ index: true, element: <Reports /> }];

export default reportsRoutes;
