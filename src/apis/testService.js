import axiosClients from "./axiosClients";

const getTestByTreatmentPlanId = async (treatmentPlanId) => {
  return await axiosClients.get(
    `/Test/GetAllTestByTreatmentPlanId/${treatmentPlanId}`
  );
};

export { getTestByTreatmentPlanId };
