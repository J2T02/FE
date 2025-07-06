import axiosClients from "./axiosClients";

// ==================== API CALLS (COMMENTED) ====================
// const getFeedbackByDoctorId = async (doctorId) => {
//   return await axiosClients.get(`/Feedback/doctor/${doctorId}`);
// };
// const createFeedback = async (body) => {
//   return await axiosClients.post("/Feedback", body);
// };
// const updateFeedback = async (id, body) => {
//   return await axiosClients.put(`/Feedback/UpdateFeedback/${id}`, body);
// };

// ==================== MOCK DATA SERVICES ====================

// Mock feedback data
const mockFeedbacks = [
  {
    feedbackId: 1,
    doctorId: 1,
    doctorName: "BS. Nguyễn Thị Hoa",
    customerName: "Nguyễn Văn An",
    customerEmail: "anvanbinhtra@gmail.com",
    rating: 5,
    comment: "Bác sĩ rất tận tâm và chuyên nghiệp. Quá trình điều trị IVF diễn ra suôn sẻ.",
    serviceType: "IVF",
    treatmentDate: "2024-11-20",
    createdAt: "2024-11-25T10:30:00Z",
    isVerified: true,
    isPublic: true
  },
  {
    feedbackId: 2,
    doctorId: 1,
    doctorName: "BS. Nguyễn Thị Hoa",
    customerName: "Trần Thị Bình",
    customerEmail: "binhtra@gmail.com",
    rating: 4,
    comment: "Bác sĩ giải thích rất kỹ về quy trình. Cảm ơn bác sĩ đã giúp chúng tôi có con.",
    serviceType: "IVF",
    treatmentDate: "2024-10-15",
    createdAt: "2024-10-20T14:20:00Z",
    isVerified: true,
    isPublic: true
  },
  {
    feedbackId: 3,
    doctorId: 2,
    doctorName: "BS. Trần Văn Nam",
    customerName: "Lê Minh Tuấn",
    customerEmail: "tuanhuong@gmail.com",
    rating: 5,
    comment: "Bác sĩ Nam rất am hiểu về nam khoa. Điều trị hiệu quả và chu đáo.",
    serviceType: "IUI",
    treatmentDate: "2024-11-18",
    createdAt: "2024-11-22T16:45:00Z",
    isVerified: true,
    isPublic: true
  },
  {
    feedbackId: 4,
    doctorId: 3,
    doctorName: "BS. Lê Thị Mai",
    customerName: "Hoàng Đức Thành",
    customerEmail: "thanhlan@gmail.com",
    rating: 5,
    comment: "Tư vấn di truyền rất chi tiết và dễ hiểu. Cảm ơn bác sĩ Mai.",
    serviceType: "Tư vấn di truyền",
    treatmentDate: "2024-11-25",
    createdAt: "2024-11-26T09:15:00Z",
    isVerified: true,
    isPublic: true
  },
  {
    feedbackId: 5,
    doctorId: 1,
    doctorName: "BS. Nguyễn Thị Hoa",
    customerName: "Phạm Thu Hương",
    customerEmail: "huongpham@gmail.com",
    rating: 4,
    comment: "Quy trình điều trị rõ ràng, bác sĩ nhiệt tình. Hy vọng lần sau sẽ thành công.",
    serviceType: "IVF",
    treatmentDate: "2024-09-10",
    createdAt: "2024-09-15T11:30:00Z",
    isVerified: true,
    isPublic: true
  }
];

const getFeedbackByDoctorId = async (doctorId) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const doctorFeedbacks = mockFeedbacks.filter(f => f.doctorId === parseInt(doctorId));
  
  return {
    data: doctorFeedbacks,
    status: 200,
    message: "Success",
    totalCount: doctorFeedbacks.length,
    averageRating: doctorFeedbacks.length > 0 
      ? (doctorFeedbacks.reduce((sum, f) => sum + f.rating, 0) / doctorFeedbacks.length).toFixed(1)
      : 0
  };
};

const createFeedback = async (body) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const newFeedback = {
    feedbackId: mockFeedbacks.length + 1,
    ...body,
    createdAt: new Date().toISOString(),
    isVerified: false, // Needs admin verification
    isPublic: false
  };
  
  mockFeedbacks.push(newFeedback);
  
  return {
    data: newFeedback,
    status: 201,
    message: "Feedback created successfully. Waiting for verification."
  };
};

const updateFeedback = async (id, body) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const feedbackIndex = mockFeedbacks.findIndex(f => f.feedbackId === parseInt(id));
  
  if (feedbackIndex !== -1) {
    mockFeedbacks[feedbackIndex] = {
      ...mockFeedbacks[feedbackIndex],
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    return {
      data: mockFeedbacks[feedbackIndex],
      status: 200,
      message: "Feedback updated successfully"
    };
  } else {
    throw new Error("Feedback not found");
  }
};

// Additional feedback services
const getAllFeedbacks = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    data: mockFeedbacks,
    status: 200,
    message: "Success",
    totalCount: mockFeedbacks.length
  };
};

const getPublicFeedbacks = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const publicFeedbacks = mockFeedbacks.filter(f => f.isPublic && f.isVerified);
  
  return {
    data: publicFeedbacks,
    status: 200,
    message: "Success",
    totalCount: publicFeedbacks.length
  };
};

const deleteFeedback = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const feedbackIndex = mockFeedbacks.findIndex(f => f.feedbackId === parseInt(id));
  
  if (feedbackIndex !== -1) {
    const deletedFeedback = mockFeedbacks.splice(feedbackIndex, 1)[0];
    
    return {
      data: deletedFeedback,
      status: 200,
      message: "Feedback deleted successfully"
    };
  } else {
    throw new Error("Feedback not found");
  }
};

export { 
  getFeedbackByDoctorId, 
  createFeedback, 
  updateFeedback, 
  getAllFeedbacks, 
  getPublicFeedbacks, 
  deleteFeedback 
};
