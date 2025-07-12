import axiosClients from "./axiosClients";

const getStepDetailList = async () => {
  return await axiosClients.get("/StepDetail/GetAllStepDetail");
};

const getStepDetailDetail = async (id) => {
  return await axiosClients.get(`/StepDetail/GetStepDetailById/${id}`);
};
const getStepDetailByTreatmentPlanId = async (treatmentPlanId) => {
  return await axiosClients.get(
    `/StepDetail/GetAllStepDetailByTreatmentPlanId/${treatmentPlanId}`
  );
};
const createStepDetail = async (data) => {
  return await axiosClients.post("/StepDetail/CreateStepDetail", data);
};
const updateStepDetail = async (id, data) => {
  return await axiosClients.put(`/StepDetail/UpdateStepDetail/${id}`, data);
};
const deleteStepDetail = async (id) => {
  return await axiosClients.delete(`/StepDetail/DeleteStepDetail/${id}`);
};

export {
  getStepDetailList,
  getStepDetailDetail,
  getStepDetailByTreatmentPlanId,
  createStepDetail,
  updateStepDetail,
  deleteStepDetail,
};
