import axiosClients from "./axiosClients";

const getStepDetailList = async () => {
  return await axiosClients.get("/StepDetail/GetAllStepDetail");
};
const getStepDetailListByDoctorIdStatus1 = async (doctorId) => {
  return await axiosClients.get(
    `/StepDetail/GetStepDetailsByDoctorIdAndStatusIs1/${doctorId}`
  );
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
const updateStepDetailStatus = async (id, data) => {
  return await axiosClients.put(
    `/StepDetail/UpdateStepDetailStatus${id}`,
    data
  );
};
const deleteStepDetail = async (id) => {
  return await axiosClients.delete(`/StepDetail/DeleteStepDetail/${id}`);
};

export {
  getStepDetailList,
  getStepDetailListByDoctorIdStatus1,
  getStepDetailDetail,
  getStepDetailByTreatmentPlanId,
  createStepDetail,
  updateStepDetail,
  updateStepDetailStatus,
  deleteStepDetail,
};
