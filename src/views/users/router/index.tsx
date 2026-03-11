import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Users = lazy(() => import("../Users"));

const usersRoutes: RouteObject[] = [{ index: true, element: <Users /> }];

export default usersRoutes;
