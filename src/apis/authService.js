import axiosClients from "./axiosClients";

const register = async (body) => {
  return await axiosClients.post("/Account/register", body);
};

const signIn = async (body) => {
  return await axiosClients.post("/Account/login", body);
};
const loginByGoogle = async (body) => {
  return await axiosClients.get("/LoginGoogle/login-url", body);
};
const loginByGoogleCallback = async (code) => {
  return await axiosClients.get(`/LoginGoogle/google-callback?code=${code}`);
};
const getInfo = async () => {
  return await axiosClients.get(`/Account`);
};
const forgotPasswordRequest = async (body) => {
  return await axiosClients.post("/Account/Otp/request", body);
};
const otpRequest = async (body) => {
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
const OtpRegister = async (body) => {
  return await axiosClients.post("/Account/OtpRegister/request", body);
};
export {
  register,
  signIn,
  loginByGoogle,
  loginByGoogleCallback,
  getInfo,
  forgotPasswordRequest,
  otpRequest,
  OtpRegister,
  otpVerify,
  resetPassword,
  changePassword,
};
