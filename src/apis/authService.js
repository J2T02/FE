import axiosClients from "./axiosClients";

const register = async (body) => {
  return await axiosClients.post("/Account/register", body);
};

const signIn = async (body) => {
  return await axiosClients.post("/Account/login", body);
};

const getCusInfo = async (userId) => {
  return await axiosClients.get(`/Customer/${userId}`);
};

export { register, signIn, getCusInfo };
