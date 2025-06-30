import axiosClients from "./axiosClients";

const loginDoctor = async (body) => {
  return await axiosClients.post("/Account/loginDoctor", body);
};

const getDoctorInfo = async (id) => {
  return await axiosClients.get(`/Doctor/${id}`);
};

export { loginDoctor, getDoctorInfo };
