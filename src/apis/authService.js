import axiosClients from "./axiosClients";

const register = async (body) => {
  return await axiosClients.post("/Account/register", body);
};

const signIn = async (body) => {
  return await axiosClients.post("/Account/login", body);
};

const getInfo = async () => {
  return await axiosClients.get(`/Account`);
};

export { register, signIn, getInfo };
