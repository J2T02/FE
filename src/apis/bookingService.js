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

export{GetAllDoctor, GetSchedule, Booking};