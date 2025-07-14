import { lazy } from "react";

const routers = [
  // Cus and Guest
  {
    path: "/customer/register",
    component: lazy(() =>
      import("~pages/CustomerPage/RegisterPage/RegisterPage")
    ),
  },
  {
    path: "/login",
    component: lazy(() =>
      import("~pages/HomePage/LoginPage/LoginPage")
    ),
  },
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
    path: "/customerTreatmentplanDetailPage/:id",
    component: lazy(() =>
      import(
        "~pages/CustomerPage/Treatmentplan/TreatmentplanDetailPage/TreatmentplanDetailPage"
      )
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
      import(
        "~pages/CustomerPage/Treatmentplan/TreatmentStepPage/TreatmentStepPage"
      )
    ),
  },
  {
    path: "/biosamplelist/:id",
    component: lazy(() =>
      import(
        "~pages/CustomerPage/Treatmentplan/BiosampleListPage/BiosampleListPage"
      )
    ),
  },
  {
    path: "/biosampledetail/:id",
    component: lazy(() =>
      import(
        "~pages/CustomerPage/Treatmentplan/BiosampleDetailPage/BiosampleDetailPage"
      )
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
    path: "/blog/:id",
    component: lazy(() => import("~pages/Blog/BlogDetail")),
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
      import("~pages/HomePage/CustomerInfo/CustomerInfoForm")
    ),
  },
  {
    path: "/changepassword",
    component: lazy(() =>
      import("~pages/HomePage/ChangePasswordPage/ChangePasswordPage")
    ),
  },
  {
    path: "/forgotpassword",
    component: lazy(() =>
      import("~pages/HomePage/ForgotPasswordPage/ForgotPasswordPage")
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
    path: "/doctorpage/doctordetail/:doctorId",
    component: lazy(() =>
      import("~pages/DoctorPage/DoctorInfo/DoctorDetailManagement")
    ),
  },
  {
    path: "/doctorpage/bookingdetail/:id",
    component: lazy(() =>
      import("~pages/DoctorPage/BookingDetail/BookingDetailPage")
    ),
  },
  {
    path: "/doctorpage/treatmentplandetail/:id",
    component: lazy(() =>
      import(
        "~pages/DoctorPage/TreatmentplanManagement/TreatmentplanDetailPage/TreatmentplanDetailPage"
      )
    ),
  },
  {
    path: "/doctorpage/treatmentstep/:id",
    component: lazy(() =>
      import(
        "~pages/DoctorPage/TreatmentplanManagement/TreatmentStepPage/TreatmentStepPage"
      )
    ),
  },
  {
    path: "/doctorpage/stepdetail/:id",
    component: lazy(() =>
      import(
        "~pages/DoctorPage/TreatmentplanManagement/StepDetailPage/StepDetailPage"
      )
    ),
  },
  {
    path: "/doctorpage/biosamplelist/:id",
    component: lazy(() =>
      import(
        "~pages/DoctorPage/TreatmentplanManagement/BiosampleListPage/BiosampleListPage"
      )
    ),
  },
  {
    path: "/doctorpage/biosampledetail/:id",
    component: lazy(() =>
      import(
        "~pages/DoctorPage/TreatmentplanManagement/BiosampleDetailPage/BiosampleDetailPage"
      )
    ),
  },
  {
    path: "/doctorpage/testlist/:id",
    component: lazy(() =>
      import(
        "~pages/DoctorPage/TreatmentplanManagement/TestListPage/TestListPage"
      )
    ),
  },
  {
    path: "/doctorpage/testdetail/:id",
    component: lazy(() =>
      import(
        "~pages/DoctorPage/TreatmentplanManagement/TestDetailPage/TestDetailPage"
      )
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
  {
    path: "/admin/treatmentplandetail/:id",
    component: lazy(() =>
      import(
        "~pages/AdminPage/TreatmentplanManagement/TreatmentplanDetailPage/TreatmentplanDetailPage"
      )
    ),
  },
  {
    path: "/admin/treatmentstep/:id",
    component: lazy(() =>
      import(
        "~pages/AdminPage/TreatmentplanManagement/TreatmentStepPage/TreatmentStepPage"
      )
    ),
  },
  {
    path: "/admin/stepdetail/:id",
    component: lazy(() =>
      import(
        "~pages/AdminPage/TreatmentplanManagement/StepDetailPage/StepDetailPage"
      )
    ),
  },
  {
    path: "/admin/biosamplelist/:id",
    component: lazy(() =>
      import(
        "~pages/AdminPage/TreatmentplanManagement/BiosampleListPage/BiosampleListPage"
      )
    ),
  },
  {
    path: "/admin/biosampledetail/:id",
    component: lazy(() =>
      import(
        "~pages/AdminPage/TreatmentplanManagement/BiosampleDetailPage/BiosampleDetailPage"
      )
    ),
  },
  {
    path: "/admin/testlist/:id",
    component: lazy(() =>
      import(
        "~pages/AdminPage/TreatmentplanManagement/TestListPage/TestListPage"
      )
    ),
  },
  {
    path: "/admin/testdetail/:id",
    component: lazy(() =>
      import(
        "~pages/AdminPage/TreatmentplanManagement/TestDetailPage/TestDetailPage"
      )
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

  {
    path: "/payment-result/:id",
    component: lazy(() =>
      import("~pages/HomePage/BookingPage/PaymentResultPage")
    ),
  },
];

export default routers;
