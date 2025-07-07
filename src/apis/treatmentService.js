import axiosClients from "./axiosClient";

const getTreatmentList = async () => {
  return await axiosClients.get("/Treatment/GetAllTreatment");
};

export { getTreatmentList };
