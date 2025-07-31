import axiosClients from "./axiosClients";

const getFeedbackByDoctorId = async (doctorId) => {
  return await axiosClients.get(`/Feedback/doctor/${doctorId}`);
};
const getAllFeedback = async () => {
  return await axiosClients.get("/Feedback/GetAllFeedbacks");
};
const feedBackForDoctor = async (body) => {
  return await axiosClients.post(`/Feedback/FeedbackForDoctor`, body);
};
const feedbackForTreatmentPlan = async (body) => {
  return await axiosClients.post(`/Feedback`, body);
};
const createFeedback = async (body) => {
  return await axiosClients.post("/Feedback", body);
};
const updateFeedback = async (id, body) => {
  return await axiosClients.put(`/Feedback/UpdateFeedback/${id}`, body);
};

export {
  getFeedbackByDoctorId,
  getAllFeedback,
  createFeedback,
  updateFeedback,
  feedBackForDoctor,
  feedbackForTreatmentPlan,
};
