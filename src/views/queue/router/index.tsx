import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Queue = lazy(() => import("../Queue"));

const queueRoutes: RouteObject[] = [{ index: true, element: <Queue /> }];

export default queueRoutes;
