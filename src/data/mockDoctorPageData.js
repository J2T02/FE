// Comprehensive Mock Data for Doctor Page
// This file contains all mock data needed for DoctorPage components

// ==================== BOOKING MANAGEMENT DATA ====================

// Booking statuses
export const bookingStatuses = {
  1: { label: "Chờ xác nhận", color: "#e4e4e7", textColor: "#333" },
  2: { label: "Đã xác nhận", color: "#dbeafe", textColor: "#0958d9" },
  3: { label: "Check-in", color: "#dcfce7", textColor: "#15803d" },
  4: { label: "Đang khám", color: "#fef3c7", textColor: "#92400e" },
  5: { label: "Đã khám", color: "#d1e7dd", textColor: "#0f5132" },
  6: { label: "Đã hủy", color: "#fee2e2", textColor: "#dc2626" },
  7: { label: "Không đến", color: "#f3f4f6", textColor: "#6b7280" }
};

// Service types for fertility clinic
export const serviceTypes = {
  IVF: "Thụ tinh trong ống nghiệm (IVF)",
  IUI: "Thụ tinh nhân tạo (IUI)",
  ICSI: "Tiêm tinh trùng vào tế bào trứng (ICSI)",
  EGG_FREEZING: "Đông lạnh trứng",
  SPERM_FREEZING: "Đông lạnh tinh trùng",
  EMBRYO_FREEZING: "Đông lạnh phôi",
  GENETIC_TESTING: "Xét nghiệm di truyền",
  HORMONE_THERAPY: "Điều trị hormone",
  SURGERY: "Phẫu thuật",
  CONSULTATION: "Tư vấn chuyên khoa"
};

// Mock bookings data
export const mockBookings = [
  {
    bookingId: "BK001",
    bookingCode: "FER2024001",
    customerInfo: {
      husName: "Nguyễn Văn An",
      wifeName: "Trần Thị Bình",
      husYob: 1985,
      wifeYob: 1987,
      phone: "0901234567",
      email: "anvanbinhtra@gmail.com",
      address: "123 Đường ABC, Quận 1, TP.HCM"
    },
    serviceInfo: {
      serviceName: serviceTypes.IVF,
      serviceCode: "IVF001",
      price: 85000000,
      description: "Gói IVF cơ bản bao gồm kích thích buồng trứng, thu nhận trứng, thụ tinh và chuyển phôi"
    },
    appointmentInfo: {
      appointmentDate: "2024-12-15",
      timeSlot: "08:00 - 09:00",
      slotId: 1,
      room: "Phòng khám 101"
    },
    doctorInfo: {
      doctorId: 1,
      fullName: "BS. Nguyễn Thị Hoa",
      mail: "dr.hoa@fertility.com",
      phone: "0912345678",
      specialization: "Sinh sản - Hiếm muộn",
      experience: 15
    },
    statusId: 2,
    createdAt: "2024-11-20T10:30:00Z",
    updatedAt: "2024-11-21T14:20:00Z",
    notes: "Bệnh nhân đã có tiền sử điều trị hiếm muộn 2 năm",
    priority: "high"
  },
  {
    bookingId: "BK002",
    bookingCode: "FER2024002",
    customerInfo: {
      husName: "Lê Minh Tuấn",
      wifeName: "Phạm Thu Hương",
      husYob: 1982,
      wifeYob: 1984,
      phone: "0907654321",
      email: "tuanhuong@gmail.com",
      address: "456 Đường XYZ, Quận 3, TP.HCM"
    },
    serviceInfo: {
      serviceName: serviceTypes.IUI,
      serviceCode: "IUI001",
      price: 15000000,
      description: "Thụ tinh nhân tạo với tinh trùng chồng"
    },
    appointmentInfo: {
      appointmentDate: "2024-12-16",
      timeSlot: "09:00 - 10:00",
      slotId: 2,
      room: "Phòng thủ thuật 201"
    },
    doctorInfo: {
      doctorId: 2,
      fullName: "BS. Trần Văn Nam",
      mail: "dr.nam@fertility.com",
      phone: "0923456789",
      specialization: "Nam khoa - Hiếm muộn",
      experience: 12
    },
    statusId: 3,
    createdAt: "2024-11-18T09:15:00Z",
    updatedAt: "2024-11-22T11:45:00Z",
    notes: "Chu kỳ thứ 3, theo dõi sát sao",
    priority: "medium"
  },
  {
    bookingId: "BK003",
    bookingCode: "FER2024003",
    customerInfo: {
      husName: "Hoàng Đức Thành",
      wifeName: "Vũ Thị Lan",
      husYob: 1988,
      wifeYob: 1990,
      phone: "0934567890",
      email: "thanhlan@gmail.com",
      address: "789 Đường DEF, Quận 7, TP.HCM"
    },
    serviceInfo: {
      serviceName: serviceTypes.GENETIC_TESTING,
      serviceCode: "GT001",
      price: 25000000,
      description: "Xét nghiệm di truyền tiền làm tổ (PGT-A)"
    },
    appointmentInfo: {
      appointmentDate: "2024-12-17",
      timeSlot: "10:00 - 11:00",
      slotId: 3,
      room: "Phòng tư vấn 301"
    },
    doctorInfo: {
      doctorId: 3,
      fullName: "BS. Lê Thị Mai",
      mail: "dr.mai@fertility.com",
      phone: "0945678901",
      specialization: "Di truyền y học",
      experience: 10
    },
    statusId: 1,
    createdAt: "2024-11-25T16:20:00Z",
    updatedAt: "2024-11-25T16:20:00Z",
    notes: "Cặp vợ chồng có tiền sử sảy thai liên tiếp",
    priority: "high"
  }
];

// ==================== PATIENT MANAGEMENT DATA ====================

// Patient medical history types
export const medicalHistoryTypes = {
  SURGERY: "Phẫu thuật",
  MEDICATION: "Thuốc điều trị",
  ALLERGY: "Dị ứng",
  CHRONIC_DISEASE: "Bệnh mãn tính",
  FAMILY_HISTORY: "Tiền sử gia đình",
  REPRODUCTIVE_HISTORY: "Tiền sử sinh sản"
};

// Mock patients data
export const mockPatients = [
  {
    patientId: "PT001",
    personalInfo: {
      husName: "Nguyễn Văn An",
      wifeName: "Trần Thị Bình",
      husYob: 1985,
      wifeYob: 1987,
      husPhone: "0901234567",
      wifePhone: "0901234568",
      email: "anvanbinhtra@gmail.com",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      husOccupation: "Kỹ sư",
      wifeOccupation: "Giáo viên"
    },
    medicalHistory: {
      marriageYear: 2018,
      infertilityDuration: 3,
      previousTreatments: ["IUI (2 lần)", "Kích thích buồng trứng"],
      husConditions: ["Tinh trùng yếu"],
      wifeConditions: ["Buồng trứng đa nang (PCOS)"],
      allergies: ["Penicillin"],
      chronicDiseases: [],
      familyHistory: ["Tiểu đường type 2 (bên vợ)"]
    },
    treatmentHistory: [
      {
        date: "2024-01-15",
        treatment: "IUI lần 1",
        result: "Không thành công",
        notes: "Cần điều chỉnh liều thuốc kích thích"
      },
      {
        date: "2024-03-20",
        treatment: "IUI lần 2",
        result: "Không thành công",
        notes: "Chuyển sang phác đồ IVF"
      },
      {
        date: "2024-11-20",
        treatment: "IVF chu kỳ 1 - Bắt đầu",
        result: "Đang điều trị",
        notes: "Phản ứng tốt với thuốc kích thích"
      }
    ],
    currentStatus: "Đang điều trị IVF",
    nextAppointment: "2024-12-15",
    assignedDoctor: "BS. Nguyễn Thị Hoa",
    riskLevel: "medium",
    notes: "Bệnh nhân hợp tác tốt, tuân thủ điều trị"
  },
  {
    patientId: "PT002",
    personalInfo: {
      husName: "Lê Minh Tuấn",
      wifeName: "Phạm Thu Hương",
      husYob: 1982,
      wifeYob: 1984,
      husPhone: "0907654321",
      wifePhone: "0907654322",
      email: "tuanhuong@gmail.com",
      address: "456 Đường XYZ, Quận 3, TP.HCM",
      husOccupation: "Bác sĩ",
      wifeOccupation: "Dược sĩ"
    },
    medicalHistory: {
      marriageYear: 2015,
      infertilityDuration: 5,
      previousTreatments: ["IUI (3 lần)", "Phẫu thuật nội soi"],
      husConditions: ["Bình thường"],
      wifeConditions: ["Tắc vòi trứng một bên", "Lạc nội mạc tử cung"],
      allergies: [],
      chronicDiseases: ["Tăng huyết áp nhẹ (vợ)"],
      familyHistory: ["Ung thư vú (bên vợ)"]
    },
    treatmentHistory: [
      {
        date: "2023-06-10",
        treatment: "Phẫu thuật nội soi điều trị lạc nội mạc",
        result: "Thành công",
        notes: "Phục hồi tốt sau phẫu thuật"
      },
      {
        date: "2024-02-15",
        treatment: "IUI lần 3",
        result: "Không thành công",
        notes: "Chuyển sang IVF"
      },
      {
        date: "2024-11-18",
        treatment: "IUI lần 4 (sau phẫu thuật)",
        result: "Đang theo dõi",
        notes: "Kết quả xét nghiệm beta-hCG sau 2 tuần"
      }
    ],
    currentStatus: "Đang theo dõi kết quả IUI",
    nextAppointment: "2024-12-16",
    assignedDoctor: "BS. Trần Văn Nam",
    riskLevel: "low",
    notes: "Cặp vợ chồng có kiến thức y khoa tốt"
  }
];

// ==================== TREATMENT PLAN MANAGEMENT DATA ====================

// Treatment plan statuses
export const treatmentPlanStatuses = {
  PLANNING: { label: "Đang lập kế hoạch", color: "blue" },
  ACTIVE: { label: "Đang thực hiện", color: "green" },
  PAUSED: { label: "Tạm dừng", color: "orange" },
  COMPLETED: { label: "Hoàn thành", color: "purple" },
  CANCELLED: { label: "Đã hủy", color: "red" }
};

// Treatment types
export const treatmentTypes = {
  IVF: "IVF - Thụ tinh trong ống nghiệm",
  IUI: "IUI - Thụ tinh nhân tạo",
  ICSI: "ICSI - Tiêm tinh trùng",
  HORMONE: "Điều trị hormone",
  SURGERY: "Phẫu thuật",
  MEDICATION: "Điều trị thuốc",
  MONITORING: "Theo dõi và giám sát"
};

// Mock treatment plans
export const mockTreatmentPlans = [
  {
    planId: "TP001",
    patientInfo: {
      patientId: "PT001",
      husName: "Nguyễn Văn An",
      wifeName: "Trần Thị Bình",
      age: "39/37 tuổi"
    },
    treatmentInfo: {
      type: treatmentTypes.IVF,
      protocol: "Antagonist Protocol",
      startDate: "2024-11-20",
      estimatedEndDate: "2025-01-15",
      currentPhase: "Kích thích buồng trứng",
      cycleNumber: 1
    },
    medications: [
      {
        name: "Gonal-F",
        dosage: "225 IU",
        frequency: "Hàng ngày",
        startDate: "2024-11-20",
        endDate: "2024-12-05",
        notes: "Tiêm buổi tối"
      },
      {
        name: "Cetrotide",
        dosage: "0.25mg",
        frequency: "Hàng ngày",
        startDate: "2024-11-28",
        endDate: "2024-12-05",
        notes: "Tiêm buổi sáng"
      }
    ],
    schedule: [
      {
        date: "2024-12-02",
        activity: "Siêu âm theo dõi nang trứng",
        time: "08:00",
        status: "scheduled"
      },
      {
        date: "2024-12-05",
        activity: "Siêu âm và xét nghiệm hormone",
        time: "08:00",
        status: "scheduled"
      },
      {
        date: "2024-12-07",
        activity: "Thu nhận trứng (dự kiến)",
        time: "09:00",
        status: "tentative"
      }
    ],
    status: "ACTIVE",
    doctorId: 1,
    doctorName: "BS. Nguyễn Thị Hoa",
    createdDate: "2024-11-15",
    lastUpdated: "2024-11-28",
    notes: "Bệnh nhân phản ứng tốt với thuốc kích thích. Theo dõi sát sao nguy cơ OHSS.",
    expectedOutcome: "Thu nhận 8-12 trứng",
    riskFactors: ["PCOS", "Nguy cơ OHSS"]
  },
  {
    planId: "TP002",
    patientInfo: {
      patientId: "PT002",
      husName: "Lê Minh Tuấn",
      wifeName: "Phạm Thu Hương",
      age: "42/40 tuổi"
    },
    treatmentInfo: {
      type: treatmentTypes.IUI,
      protocol: "Natural Cycle IUI",
      startDate: "2024-11-18",
      estimatedEndDate: "2024-12-16",
      currentPhase: "Theo dõi kết quả",
      cycleNumber: 4
    },
    medications: [
      {
        name: "Clomid",
        dosage: "50mg",
        frequency: "Ngày 3-7 của chu kỳ",
        startDate: "2024-11-05",
        endDate: "2024-11-09",
        notes: "Uống buổi tối"
      },
      {
        name: "Ovitrelle",
        dosage: "250mcg",
        frequency: "Một lần",
        startDate: "2024-11-16",
        endDate: "2024-11-16",
        notes: "Tiêm kích thích rụng trứng"
      }
    ],
    schedule: [
      {
        date: "2024-11-18",
        activity: "Thực hiện IUI",
        time: "09:00",
        status: "completed"
      },
      {
        date: "2024-12-02",
        activity: "Xét nghiệm beta-hCG",
        time: "08:00",
        status: "scheduled"
      }
    ],
    status: "ACTIVE",
    doctorId: 2,
    doctorName: "BS. Trần Văn Nam",
    createdDate: "2024-11-01",
    lastUpdated: "2024-11-18",
    notes: "Chu kỳ thứ 4 sau phẫu thuật. Nang trứng phát triển tốt.",
    expectedOutcome: "Tỷ lệ thành công 15-20%",
    riskFactors: ["Tuổi cao", "Lạc nội mạc tử cung"]
  },
  {
    planId: "TP003",
    patientInfo: {
      patientId: "PT003",
      husName: "Hoàng Đức Thành",
      wifeName: "Vũ Thị Lan",
      age: "36/34 tuổi"
    },
    treatmentInfo: {
      type: treatmentTypes.HORMONE,
      protocol: "Ovulation Induction",
      startDate: "2024-12-01",
      estimatedEndDate: "2024-12-31",
      currentPhase: "Chuẩn bị điều trị",
      cycleNumber: 1
    },
    medications: [
      {
        name: "Metformin",
        dosage: "500mg",
        frequency: "2 lần/ngày",
        startDate: "2024-12-01",
        endDate: "2024-12-31",
        notes: "Uống cùng bữa ăn"
      }
    ],
    schedule: [
      {
        date: "2024-12-15",
        activity: "Tái khám và đánh giá",
        time: "10:00",
        status: "scheduled"
      }
    ],
    status: "PLANNING",
    doctorId: 3,
    doctorName: "BS. Lê Thị Mai",
    createdDate: "2024-11-25",
    lastUpdated: "2024-11-25",
    notes: "Điều trị PCOS trước khi bắt đầu IVF",
    expectedOutcome: "Cải thiện rụng trứng tự nhiên",
    riskFactors: ["PCOS", "Kháng insulin"]
  }
];

// ==================== DOCTOR DATA ====================

// Mock doctors list
export const mockDoctors = [
  {
    doctorId: 1,
    fullName: "BS. Nguyễn Thị Hoa",
    email: "dr.hoa@fertility.com",
    phone: "0912345678",
    specialization: "Sinh sản - Hiếm muộn",
    experience: 15,
    education: "Tiến sĩ Y khoa - Đại học Y Hà Nội",
    certifications: ["Chứng chỉ IVF quốc tế", "Chứng chỉ Siêu âm sản khoa"],
    avatar: "/public/anhhuynh.png",
    workingHours: "8:00 - 17:00",
    workingDays: ["T2", "T3", "T4", "T5", "T6"],
    bio: "Bác sĩ có 15 năm kinh nghiệm trong lĩnh vực điều trị hiếm muộn và hỗ trợ sinh sản.",
    successRate: 68.5,
    totalPatients: 156,
    isActive: true
  },
  {
    doctorId: 2,
    fullName: "BS. Trần Văn Nam",
    email: "dr.nam@fertility.com",
    phone: "0923456789",
    specialization: "Nam khoa - Hiếm muộn",
    experience: 12,
    education: "Thạc sĩ Y khoa - Đại học Y TP.HCM",
    certifications: ["Chứng chỉ Nam khoa", "Chứng chỉ IUI"],
    avatar: "/public/doctorhuy.jpg",
    workingHours: "8:00 - 17:00",
    workingDays: ["T2", "T3", "T4", "T5", "T6"],
    bio: "Chuyên gia nam khoa với kinh nghiệm điều trị vô sinh nam và các kỹ thuật hỗ trợ sinh sản.",
    successRate: 53.8,
    totalPatients: 98,
    isActive: true
  },
  {
    doctorId: 3,
    fullName: "BS. Lê Thị Mai",
    email: "dr.mai@fertility.com",
    phone: "0945678901",
    specialization: "Di truyền y học",
    experience: 10,
    education: "Tiến sĩ Y khoa - Đại học Y Dược TP.HCM",
    certifications: ["Chứng chỉ Di truyền y học", "Chứng chỉ PGT"],
    avatar: "/public/maihadoctor.jpg",
    workingHours: "8:00 - 17:00",
    workingDays: ["T2", "T3", "T4", "T5", "T6"],
    bio: "Chuyên gia di truyền y học, chuyên về xét nghiệm di truyền tiền làm tổ và tư vấn di truyền.",
    successRate: 75.2,
    totalPatients: 67,
    isActive: true
  }
];

// Mock doctor authentication data
export const mockDoctorAuth = [
  {
    doctorId: 1,
    email: "dr.hoa@fertility.com",
    password: "123456",
    fullName: "BS. Nguyễn Thị Hoa",
    role: "doctor",
    specialization: "Sinh sản - Hiếm muộn"
  },
  {
    doctorId: 2,
    email: "dr.nam@fertility.com",
    password: "123456",
    fullName: "BS. Trần Văn Nam",
    role: "doctor",
    specialization: "Nam khoa - Hiếm muộn"
  },
  {
    doctorId: 3,
    email: "dr.mai@fertility.com",
    password: "123456",
    fullName: "BS. Lê Thị Mai",
    role: "doctor",
    specialization: "Di truyền y học"
  }
];

// ==================== DOCTOR STATISTICS DATA ====================

export const doctorStatistics = {
  overview: {
    totalPatients: 156,
    activePatients: 89,
    completedTreatments: 67,
    successRate: 68.5,
    monthlyGrowth: 12.3
  },
  treatmentStats: {
    IVF: { total: 45, success: 31, rate: 68.9 },
    IUI: { total: 78, success: 42, rate: 53.8 },
    ICSI: { total: 23, success: 16, rate: 69.6 },
    SURGERY: { total: 12, success: 11, rate: 91.7 }
  },
  monthlyData: [
    { month: "Jan", patients: 12, success: 8 },
    { month: "Feb", patients: 15, success: 10 },
    { month: "Mar", patients: 18, success: 12 },
    { month: "Apr", patients: 14, success: 9 },
    { month: "May", patients: 20, success: 14 },
    { month: "Jun", patients: 16, success: 11 },
    { month: "Jul", patients: 22, success: 15 },
    { month: "Aug", patients: 19, success: 13 },
    { month: "Sep", patients: 17, success: 12 },
    { month: "Oct", patients: 21, success: 14 },
    { month: "Nov", patients: 18, success: 12 }
  ]
};

// ==================== EXPORT ALL DATA ====================

export default {
  // Booking Management
  bookingStatuses,
  serviceTypes,
  mockBookings,
  
  // Patient Management
  medicalHistoryTypes,
  mockPatients,
  
  // Treatment Plan Management
  treatmentPlanStatuses,
  treatmentTypes,
  mockTreatmentPlans,
  
  // Statistics
  doctorStatistics
};