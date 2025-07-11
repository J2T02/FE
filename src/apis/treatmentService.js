import axiosClients from "./axiosClients";

const getTreatmentList = async () => {
  return await axiosClients.get("/TreamentPlan/GetAllTreatmentPlans");
};

const getTreatmentDetail = async (id) => {
  return await axiosClients.get(`/TreamentPlan/GetTreatmentPlanById/${id}`);
};
const createTreatment = async (data) => {
  return await axiosClients.post("/TreamentPlan/CreateTreatmentPlan", data);
};
const createTreatmentForGuest = async (data) => {
  return await axiosClients.post(
    "/TreamentPlan/CreateTreatmentPlanForGuest",
    data
  );
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
  createTreatmentForGuest,
  updateTreatment,
  deleteTreatment,
};
