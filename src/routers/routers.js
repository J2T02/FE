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
    component: lazy(() =>
      import("~pages/CustomerPage/DoctorDetail/DoctorDetail")
    ),
  },
  {
    path: "/customerdetail",
    component: lazy(() =>
      import("~pages/CustomerPage/CustomerDetail/CustomerDetail")
    ),
  },
  {
    path: "/doctordetail",
    component: lazy(() =>
      import("~pages/CustomerPage/DoctorDetail/DoctorDetail")
    ),
  },
  {
    path: "/customerdetail",
    component: lazy(() =>
      import("~pages/CustomerPage/CustomerDetail/CustomerDetail")
    ),
  },
  {
    path: "/treatmentplandetail/:id",
    component: lazy(() =>
      import(
        "~pages/CustomerPage/Treatmentplan/TreatmentplanDetailPage/TreatmentplanDetailPage"
      )
    ),
  },
  {
    path: "/stepdetail/:id",
    component: lazy(() =>
      import("~pages/CustomerPage/Treatmentplan/StepDetailPage/StepDetailPage")
    ),
  },
  {
    path: "/treatmentstep/:id",
    component: lazy(() =>
      import("~pages/CustomerPage/Treatmentplan/TreatmentStepPage/TreatmentStepPage")
    ),
  },
  {
    path: "/biosamplelist/:id",
    component: lazy(() =>
      import("~pages/CustomerPage/Treatmentplan/BiosampleListPage/BiosampleListPage")
    ),
  },
   {
    path: "/biosampledetail/:id",
    component: lazy(() =>
      import("~pages/CustomerPage/Treatmentplan/BiosampleDetailPage/BiosampleDetailPage")
    ),
  },
  {
    path: "/testlist/:id",
    component: lazy(() =>
      import("~pages/CustomerPage/Treatmentplan/TestListPage/TestListPage")
    ),
  },
  {
    path: "/testdetail/:id",
    component: lazy(() =>
      import("~pages/CustomerPage/Treatmentplan/TestDetailPage/TestDetailPage")
    ),
  },
  {
    path: "/blog",
    component: lazy(() => import("~pages/Blog/BlogList")),
  },
  {
    path: "/customer/booking",
    component: lazy(() => import("~pages/CustomerPage/MyBooking/MyBooking")),
  },
  {
    path: "/customer/updatedoctorinbooking",
    component: lazy(() =>
      import(
        "~pages/CustomerPage/MyBooking/UpdateBooking/UpdateDoctorInBooking"
      )
    ),
  },
  {
    path: "/customer/updatescheduleinbooking/:id",
    component: lazy(() =>
      import(
        "~pages/CustomerPage/MyBooking/UpdateBooking/UpdateScheduleInBooking"
      )
    ),
  },
  {
    path: "/customer/updatebooking/:bookingId",
    component: lazy(() =>
      import("~pages/CustomerPage/MyBooking/UpdateBooking/UpdateBooking")
    ),
  },
  {
    path: "/customer/customerinfoform",
    component: lazy(() =>
      import("~pages/CustomerPage/CustomerInfo/CustomerInfoForm")
    ),
  },
  //Receptionist
  {
    path: "/receptionistsignin",
    component: lazy(() => import("~pages/ReceptionistPage/LoginReceptionist")),
  },
  {
    path: "/receptionist",
    component: lazy(() => import("~pages/ReceptionistPage/ReceptionistPanel")),
  },
  // doctor
  {
    path: "/doctorsignin", // trang login doctor
    component: lazy(() => import("~pages/DoctorPage/LoginDoctor")),
  },
  {
    path: "/doctorpage", // trang login doctor
    component: lazy(() => import("~pages/DoctorPage/DoctorPage")),
  },
  {
    path: "/doctorpage/bookingdetail/:id",
    component: lazy(() =>
      import("~pages/DoctorPage/BookingDetail/BookingDetailPage")
    ),
  },
  //admin
  {
    path: "/admin",
    component: lazy(() => import("~pages/AdminPage/AdminPage")),
  },
  {
    path: "/admin/bookingdetail/:id",
    component: lazy(() =>
      import("~pages/AdminPage/BookingDetail/BookingDetailPage")
    ),
  },

  //receptionist
  {
    path: "/receptionist",
    component: lazy(() => import("~pages/ReceptionistPage/ReceptionistPage")),
  },
  {
    path: "/receptionist/bookingdetail/:id",
    component: lazy(() =>
      import("~pages/ReceptionistPage/BookingDetail/BookingDetailPage")
    ),
  },
  {
    path: "/receptionist/treatmentplandetail/:id",
    component: lazy(() =>
      import(
        "~pages/ReceptionistPage/TreatmentplanDetailPage/TreatmentplanDetailPage"
      )
    ),
  },
  {
    path: "/receptionist/stepdetail/:id",
    component: lazy(() =>
      import("~pages/ReceptionistPage/StepDetailPage/StepDetailPage")
    ),
  },
  {
    path: "/receptionist/treatmentstep/:id",
    component: lazy(() =>
      import("~pages/ReceptionistPage/TreatmentStepPage/TreatmentStepPage")
    ),
  },
  {
    path: "/receptionist/biosamplelist/:id",
    component: lazy(() =>
      import("~pages/ReceptionistPage/BiosampleListPage/BiosampleListPage")
    ),
  },
   {
    path: "/receptionist/biosampledetail/:id",
    component: lazy(() =>
      import("~pages/ReceptionistPage/BiosampleDetailPage/BiosampleDetailPage")
    ),
  },
  {
    path: "/receptionist/testlist/:id",
    component: lazy(() =>
      import("~pages/ReceptionistPage/TestListPage/TestListPage")
    ),
  },
  {
    path: "/receptionist/testdetail/:id",
    component: lazy(() =>
      import("~pages/ReceptionistPage/TestDetailPage/TestDetailPage")
    ),
  },
  {
    path: "/bookingDetail/:id",
    component: lazy(() =>
      import("~pages/CustomerPage/MyBooking/BookingDetail/BookingDetailPage")
    ),
  },

  {
    path: "/bookingUpdate/:id",
    component: lazy(() =>
      import("~pages/HomePage/BookingPage/UpdateBookingPage")
    ),
  },
  {
    path: "/doctordetail/:doctorId",
    component: lazy(() =>
      import("~pages/AdminPage/DoctorManagement/DoctorDetailManagement")
    ),
  },
];

export default routers;
