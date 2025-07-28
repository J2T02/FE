import axiosClients from "./axiosClients";

const getDoctorList = async () => {
  return await axiosClients.get("/Doctor/all");
};

const loginDoctor = async (body) => {
  return await axiosClients.post("/Account/loginDoctor", body);
};

const getDoctorInfo = async (id) => {
  return await axiosClients.get(`/Doctor/${id}`);
};
const getDoctorInfoByAccId = async (accId) => {
  return await axiosClients.get(`/Doctor/GetSlotByAccId/${accId}`);
};
const getDoctorScheduleByDoctorId = async (doctorId) => {
  return await axiosClients.get(
    `/Doctor/GetAllDoctorScheduleByDoctorId/${doctorId}`
  );
};
const createDoctor = async (body) => {
  return await axiosClients.post("/Doctor", body);
};
const registerSchedule = async (body) => {
  return await axiosClients.post("/Doctor/RegisterSchedule", body);
};

export {
  loginDoctor,
  getDoctorInfo,
  getDoctorList,
  getDoctorInfoByAccId,
  getDoctorScheduleByDoctorId,
  createDoctor,
  registerSchedule,
};
