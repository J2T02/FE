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
const forgotPasswordRequest = async (body) => {
  return await axiosClients.post("/Account/Otp/request", body);
};
const otpVerify = async (body) => {
  return await axiosClients.post("/Account/Otp/verify", body);
};
const resetPassword = async (body) => {
  return await axiosClients.post("/Account/forgot-password/reset", body);
};
const changePassword = async (body) => {
  return await axiosClients.post("/Account/change-password", body);
};
export {
  register,
  signIn,
  getInfo,
  forgotPasswordRequest,
  otpVerify,
  resetPassword,
  changePassword,
};
