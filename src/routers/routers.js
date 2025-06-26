import { lazy } from "react";

const routers = [
  // Cus and Guest
  {
    path: "/",
    component: lazy(() => import("~pages/HomePage/HomePage")),
  },
  {
    path: "/booking",
    component: lazy(() => import("~pages/HomePage/BookingPage/BookingPage")),
  },
  {
    path: "/services",
    component: lazy(() => import("~pages/Service/Service")),
  },
  {
    path: "/service/:id",
    component: lazy(() => import("~pages/Service/ServiceDetail")),
  },
  {
    path: "/doctors",
    component: lazy(() => import("~pages/Doctor/DoctorList")),
  },
  {
    path: "/doctordetail",
    component: lazy(() => import("~pages/CustomerPage/DoctorDetail/DoctorDetail")),
  },
  {
    path: "/customerdetail",
    component: lazy(() => import("~pages/CustomerPage/CustomerDetail/CustomerDetail")),
  },
  {
    path: "/blog",
    component: lazy(() => import("~pages/Blog/BlogList")),
  },
  {
    path: "/customer/booking",
    component: lazy(() => import("~pages/CustomerPage/MyBooking/MyBooking")),
  },
  //Receptionist
  {
    path: "/receptionist", // trang login doctor
    component: lazy(() => import("~pages/ReceptionistPage/ReceptionistPage")),
  },
  // doctor
  {
    path: "/doctorSignin", // trang login doctor
    component: lazy(() => import("~pages/DoctorPage/LoginDoctor")),
  },
  {
    path: "/doctorDashBoard", // trang login doctor
    component: lazy(() => import("~pages/DoctorPage/DoctorDashBoard")),
  },
  //admin
  {
    path: "/admin",
    component: lazy(() => import("~pages/AdminPage/AdminPage")),
  },

  {
    path: "/bookingDetail/:id",
    component: lazy(() => import("~pages/CustomerPage/MyBooking/BookingDetail/BookingDetailPage")),
  },

  {
    path: "/bookingUpdate/:id",
    component: lazy(() => import("~pages/HomePage/BookingPage/BookingUpdatePage")),
  },
];

export default routers;
