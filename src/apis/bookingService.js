import axiosClients from "./axiosClients";

const GetAllBooking = async () => {
  return await axiosClients.get("/Booking/GetAllBooking");
};
const checkBooking = async (bookingId, statusId) => {
  return await axiosClients.put(`/Booking/${bookingId}/status`, {
    status: statusId,
  });
};
const GetAllDoctor = async () => {
  return await axiosClients.get("/Doctor/all");
};
const filterDoctor = async (slotId, fromDate, toDate) => {
  return await axiosClients.get(
    `/Booking/Check-Slot?slotId=${slotId}&fromDate=${fromDate}&toDate=${toDate}`
  );
};
const GetSchedule = async (id) => {
  return await axiosClients.get(`/Doctor/GetAllDoctorScheduleIsTrue/${id}`);
};
const GetAllDoctorSchedule = async (id) => {
  return await axiosClients.get(`/Doctor/GetAllDoctorSchedule/${id}`);
};
const getAllDoctorScheduleByDoctorId = async (doctorId) => {
  return await axiosClients.get(
    `/Doctor/GetAllDoctorScheduleByDoctorId/${doctorId}`
  );
};
const Booking = async (body) => {
  return await axiosClients.post(`/Booking/Booking`, body);
};

const updatebookingDoctor = async (bookingId, doctorId) => {
  return await axiosClients.put(`/BookingUpdate/update-doctor/${bookingId}`, {
    doctorId: doctorId,
  });
};
const updatebookingSchedule = async (bookingId, schedule) => {
  return await axiosClients.put(`/BookingUpdate/update-schedule/${bookingId}`, {
    workDate: schedule.workDate,
    slotId: schedule.slotId,
  });
};

const BookingHistory = async (id) => {
  return await axiosClients.get(`/Booking/History/${id}`);
};

const BookingDetail = async (id) => {
  return await axiosClients.get(`/BookingDetail/${id}`);
};

const GetCustomerInfo = async (id) => {
  return await axiosClients.get(`/Customer/${id}`);
};

export {
  GetAllDoctor,
  GetSchedule,
  getAllDoctorScheduleByDoctorId,
  Booking,
  BookingHistory,
  BookingDetail,
  GetCustomerInfo,
  filterDoctor,
  updatebookingDoctor,
  updatebookingSchedule,
  GetAllDoctorSchedule,
  GetAllBooking,
  checkBooking,
};
