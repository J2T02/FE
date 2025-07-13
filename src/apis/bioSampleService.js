import axiosClients from "./axiosClients";

const getAllBioSampleStatus = async () => {
  return await axiosClients.get("/BioSample/GetAllBioSampleStatuses");
};
const getAllBioSampleQualityStatus = async () => {
  return await axiosClients.get("/BioSample/GetAllBioQualityStatus");
};
const getBioAllSampleType = async () => {
  return await axiosClients.get("/BioSample/GetAllBioType");
};
const getBioSamplesBySampleId = async (sampleId) => {
  return await axiosClients.get(`/BioSample/GetBioSampleById/${sampleId}`);
};
const getBioSampleByPlanId = async (planId) => {
  return await axiosClients.get(
    `/BioSample/GetBioSampleByTreatmentPlanId/${planId}`
  );
};
const getBioSampleByStepDetailId = async (stepDetailId) => {
  return await axiosClients.get(
    `/BioSample/GetBioSampleByStepDetailId/${stepDetailId}`
  );
};
const createBioSample = async (data) => {
  return await axiosClients.post("/BioSample/CreateBioSample", data);
};
const updateBioSample = async (bioSampleId, data) => {
  return await axiosClients.put(
    `BioSample/UpdateBioSample/${bioSampleId}`,
    data
  );
};

export {
  getAllBioSampleStatus,
  getAllBioSampleQualityStatus,
  getBioAllSampleType,
  getBioSampleByStepDetailId,
  getBioSamplesBySampleId,
  getBioSampleByPlanId,
  createBioSample,
  updateBioSample,
};
