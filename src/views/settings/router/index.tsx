import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Settings = lazy(() => import("../Settings"));

const settingsRoutes: RouteObject[] = [{ index: true, element: <Settings /> }];

export default settingsRoutes;
