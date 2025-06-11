import { lazy } from "react";

const routers = [
  {
    path: "/",
    component: lazy(() => import("~pages/HomePage/HomePage")),
  },
  {
    path: "/service",
    component: lazy(() => import("~pages/Service/Service")),
  },
];

export default routers;
