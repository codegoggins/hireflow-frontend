import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Roles = lazy(() => import("../Roles"));

const rolesRoutes: RouteObject[] = [{ index: true, element: <Roles /> }];

export default rolesRoutes;
