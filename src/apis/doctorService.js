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

export { loginDoctor, getDoctorInfo, getDoctorList };
