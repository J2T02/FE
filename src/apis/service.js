import axiosClients from "./axiosClients";

const GetAllService = async () => {
  return await axiosClients.get("/Services/GetAllService");
};
const GetServiceById = async (id) => {
  return await axiosClients.get(`/Services/GetServiceDetail/${id}`);
};
const CreateService = async (body) => {
  return await axiosClients.post("/Services/CreateService", body);
};
const UpdateService = async (id, body) => {
  return await axiosClients.put(`/Services/UpdateService/${id}`, body);
};
const distrubteService = async () => {
  return await axiosClients.get("/Services/ServiceUsageCounts");
};
export {
  GetAllService,
  GetServiceById,
  CreateService,
  UpdateService,
  distrubteService,
};
