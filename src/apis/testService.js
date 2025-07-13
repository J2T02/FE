import axiosClients from "./axiosClients";

const getTestByTreatmentPlanId = async (treatmentPlanId) => {
  return await axiosClients.get(
    `/Test/GetTestByTreatmentPlanId/${treatmentPlanId}`
  );
};
const getTestByStepDetailId = async (stepDetailId) => {
  return await axiosClients.get(`/Test/GetTestByStepDetailId/${stepDetailId}`);
};
const getTestTypeList = async () => {
  return await axiosClients.get("/Test/GetAllTestTypes");
};
const getTestById = async (testId) => {
  return await axiosClients.get(`/Test/GetTestById/${testId}`);
};
const getTestStatusList = async () => {
  return await axiosClients.get("/Test/GetAllTestStatuses");
};
const getTestQualityResultStatusList = async () => {
  return await axiosClients.get("/Test/GetAllTestQualityStatuses");
};
const createTest = async (data) => {
  return await axiosClients.post("/Test/CreateTest", data);
};
const updateTest = async (testId, data) => {
  return await axiosClients.put(`/Test/UpdateTest/${testId}`, data);
};

export {
  getTestByTreatmentPlanId,
  getTestByStepDetailId,
  getTestById,
  getTestTypeList,
  getTestStatusList,
  getTestQualityResultStatusList,
  createTest,
  updateTest,
};
