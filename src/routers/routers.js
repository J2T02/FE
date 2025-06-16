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
  {
    path: "/service/:id",
    component: lazy(() => import("~pages/Service/ServiceDetail")),
  },
  {
    path: "/admin",
    component: lazy(() => import("~pages/AdminPage/AdminPage")),
  },
  {
    path: "/Doctor-Login",
    component: lazy(() => import("~pages/DoctorPage/LoginDoctor")),
  },
  {
    path: "/customer/booking",
    component: lazy(() => import("~pages/CustomerPage/MyBooking/MyBooking")),
  },
];

export default routers;
