import axiosClients from "./axiosClients";

const GetAllDoctor = async () => {
  return await axiosClients.get("/Doctor/all");
} 

const GetSchedule = async (id) => {
  return await axiosClients.get(`/Doctor/GetAllDoctorScheduleIsTrue/${id}`);
} 

const Booking = async (body) => {
  return await axiosClients.post(`/Booking/Booking`, body);
}

const BookingHistory = async (id) => {
  return await axiosClients.get(`/Booking/History/${id}`);
}

const BookingDetail = async (id) => {
  return await axiosClients.get(`/BookingDetail/${id}`);
}

const GetCustomerInfo = async () => {
  return await axiosClients.get(`/Customer/id`);
}

export{GetAllDoctor, GetSchedule, Booking, BookingHistory, BookingDetail, GetCustomerInfo};