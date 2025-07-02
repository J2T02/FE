
export const mockDoctors = [
  { doctorId: 1, name: "Nguyễn Văn A" },
  { doctorId: 2, name: "Trần Thị B" },
  { doctorId: 3, name: "Lê Văn C" },
  { doctorId: 4, name: "Phạm Thị D" },
];

export const mockDoctorSchedules = {
  1: [
    { scheduleId: 101, date: "2025-06-25", slotId: 1, isAvailable: true },
    { scheduleId: 102, date: "2025-06-26", slotId: 2, isAvailable: true },
  ],
  2: [
    { scheduleId: 201, date: "2025-06-25", slotId: 1, isAvailable: true },
    { scheduleId: 202, date: "2025-06-27", slotId: 2, isAvailable: false },
  ],
  3: [
    { scheduleId: 301, date: "2025-06-26", slotId: 1, isAvailable: true },
  ],
  4: [
    { scheduleId: 401, date: "2025-06-25", slotId: 2, isAvailable: true },
  ],
};

export const mockAvailableDoctorsByDateSlot = {
  "2025-06-25_1": [
    { doctorId: 1, name: "Nguyễn Văn A" },
    { doctorId: 3, name: "Lê Văn C" },
  ],
  "2025-06-25_2": [
    { doctorId: 2, name: "Trần Thị B" },
    { doctorId: 4, name: "Phạm Thị D" },
  ],
  "2025-06-26_1": [
    { doctorId: 3, name: "Lê Văn C" },
  ],
  "2025-06-26_2": [
    { doctorId: 1, name: "Nguyễn Văn A" },
  ],
};

// Mock data cho feedback
export const mockFeedbacks = [
  {
    feedbackId: 1,
    doctorId: 1,
    hus_Name: "Minh",
    wife_Name: "Lan",
    star: 5,
    content: "Bác sĩ rất tận tâm và chuyên nghiệp. Quá trình điều trị rất hiệu quả, chúng tôi rất hài lòng với dịch vụ.",
    createAt: "2024-12-15T10:30:00Z"
  },
  {
    feedbackId: 2,
    doctorId: 1,
    hus_Name: "Tuấn",
    wife_Name: "Hoa",
    star: 4,
    content: "Bác sĩ giải thích rất kỹ về quy trình. Nhân viên y tế hỗ trợ nhiệt tình. Cảm ơn đội ngũ bác sĩ.",
    createAt: "2024-12-10T14:20:00Z"
  },
  {
    feedbackId: 3,
    doctorId: 2,
    hus_Name: "Nam",
    wife_Name: "Thu",
    star: 5,
    content: "Dịch vụ tuyệt vời! Bác sĩ rất kinh nghiệm và chu đáo. Chúng tôi đã có kết quả tích cực sau điều trị.",
    createAt: "2024-12-08T09:15:00Z"
  },
  {
    feedbackId: 4,
    doctorId: 2,
    hus_Name: "Đức",
    wife_Name: "Mai",
    star: 4,
    content: "Quy trình điều trị được thực hiện chuyên nghiệp. Bác sĩ luôn sẵn sàng tư vấn và giải đáp thắc mắc.",
    createAt: "2024-12-05T16:45:00Z"
  },
  {
    feedbackId: 5,
    doctorId: 3,
    hus_Name: "Hùng",
    wife_Name: "Linh",
    star: 5,
    content: "Rất cảm ơn bác sĩ và đội ngũ y tế. Sự chăm sóc tận tình đã giúp chúng tôi vượt qua giai đoạn khó khăn.",
    createAt: "2024-12-01T11:30:00Z"
  },
  {
    feedbackId: 6,
    doctorId: 4,
    hus_Name: "Khang",
    wife_Name: "Ngọc",
    star: 4,
    content: "Bác sĩ có kinh nghiệm và kỹ thuật cao. Môi trường bệnh viện sạch sẽ, thoải mái.",
    createAt: "2024-11-28T13:20:00Z"
  }
];

// Hàm helper để lấy feedback theo doctorId
export const getFeedbacksByDoctorId = (doctorId) => {
  return mockFeedbacks.filter(feedback => feedback.doctorId === doctorId);
};
