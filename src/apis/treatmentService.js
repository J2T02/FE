import axiosClients from "./axiosClients";

const getTreatmentList = async () => {
  return await axiosClients.get("/Treatment/GetAllTreatment");
};

const getTreatmentDetail = async (id) => {
  return await axiosClients.get(`/TreamentPlan/GetTreatmentPlanById/${id}`);
};
const createTreatment = async (data) => {
  return await axiosClients.post("/TreamentPlan/CreateTreatmentPlan", data);
};
const updateTreatment = async (id, data) => {
  return await axiosClients.put(`/Treatment/UpdateTreatment/${id}`, data);
};
const deleteTreatment = async (id) => {
  return await axiosClients.delete(`/Treatment/DeleteTreatment/${id}`);
};

export {
  getTreatmentList,
  getTreatmentDetail,
  createTreatment,
  updateTreatment,
  deleteTreatment,
};
