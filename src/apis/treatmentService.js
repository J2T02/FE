import axiosClients from "./axiosClients";

const getTreatmentStepList = async () => {
  return await axiosClients.get("/TreamentPlan/GetAllTreatmentStep");
};
const getTreatmentList = async () => {
  return await axiosClients.get("/TreamentPlan/GetAllTreatmentPlans");
};
const getTreatmentListForDoctor = async (doctorId) => {
  return await axiosClients.get(
    `/TreamentPlan/GetTreatmentPlanByDoctorId/${doctorId}`
  );
};
const getTreatmentListForCustomer = async (customerId) => {
  return await axiosClients.get(
    `/TreamentPlan/GetTreatmentPlanByCustomerId/${customerId}`
  );
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
  return await axiosClients.put(
    `/TreamentPlan/UpdateTreatmentPlan/${id}`,
    data
  );
};
const deleteTreatment = async (id) => {
  return await axiosClients.delete(`/Treatment/DeleteTreatment/${id}`);
};

export {
  getTreatmentStepList,
  getTreatmentList,
  getTreatmentListForCustomer,
  getTreatmentDetail,
  getTreatmentListForDoctor,
  createTreatment,
  createTreatmentForGuest,
  updateTreatment,
  deleteTreatment,
};
