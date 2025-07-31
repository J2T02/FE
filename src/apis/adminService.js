import axiosClients from "./axiosClients";

const GetAllAccount = async () => {
  return await axiosClients.get("/Account/getAllAccounts");
};
const dashboardRevenue = async (period) => {
  return await axiosClients.get(`/DashboardRevenue/revenue?period=${period}`);
};
const getAccountByRoleId = async (roleId) => {
  return await axiosClients.get(`/Account/roleId?roleId=${roleId}`);
};
const isActiveAccount = async (body) => {
  return await axiosClients.put(`/Account/isActive`, body);
};
const getAccountById = async (accId) => {
  return await axiosClients.get(`/Account/getAccountById?accId=${accId}`);
};
const createAccount = async (body) => {
  return await axiosClients.post(`/Account/CreateAccount`, body);
};
const updateDoctor = async (body) => {
  return await axiosClients.put(`/Doctor`, body);
};
export {
  GetAllAccount,
  getAccountByRoleId,
  isActiveAccount,
  getAccountById,
  createAccount,
  dashboardRevenue,
  updateDoctor,
};
