import axiosClients from "./axiosClients";

const getFeedbackByDoctorId = async (doctorId) => {
  return await axiosClients.get(`/Feedback/doctor/${doctorId}`);
};
const createFeedback = async (body) => {
  return await axiosClients.post("/Feedback", body);
};
const updateFeedback = async (id, body) => {
  return await axiosClients.put(`/Feedback/UpdateFeedback/${id}`, body);
};

export { getFeedbackByDoctorId, createFeedback, updateFeedback };
