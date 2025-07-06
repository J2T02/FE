import axiosClients from "./axiosClients";
// Import mock data
import { serviceTypes } from '../data/mockDoctorPageData';

// ==================== API CALLS (COMMENTED) ====================
// const GetAllService = async () => {
//   return await axiosClients.get("/Services/GetAllService");
// };
// const GetServiceById = async (id) => {
//   return await axiosClients.get(`/Services/GetServiceDetail/${id}`);
// };
// const CreateService = async (body) => {
//   return await axiosClients.post("/Services/CreateService", body);
// };
// const UpdateService = async (id, body) => {
//   return await axiosClients.put(`/Services/UpdateService/${id}`, body);
// };

// ==================== MOCK DATA SERVICES ====================

// Mock services data
const mockServices = [
  {
    serviceId: 1,
    serviceName: serviceTypes.IVF,
    serviceCode: "IVF001",
    description: "Thụ tinh trong ống nghiệm - Kỹ thuật hỗ trợ sinh sản hiện đại nhất",
    price: 85000000,
    duration: "2-3 tháng",
    successRate: 68.5,
    category: "Hỗ trợ sinh sản",
    isActive: true,
    requirements: ["Tuổi dưới 42", "Khám sức khỏe tổng quát", "Xét nghiệm hormone"],
    procedures: [
      "Kích thích buồng trứng",
      "Thu nhận trứng",
      "Thụ tinh trong phòng thí nghiệm",
      "Nuôi cấy phôi",
      "Chuyển phôi vào tử cung"
    ]
  },
  {
    serviceId: 2,
    serviceName: serviceTypes.IUI,
    serviceCode: "IUI001",
    description: "Thụ tinh nhân tạo - Phương pháp đơn giản và ít xâm lấn",
    price: 15000000,
    duration: "1 tháng",
    successRate: 53.8,
    category: "Hỗ trợ sinh sản",
    isActive: true,
    requirements: ["Vòi trứng thông", "Tinh trùng chất lượng tốt", "Rụng trứng bình thường"],
    procedures: [
      "Theo dõi chu kỳ rụng trứng",
      "Chuẩn bị tinh trùng",
      "Đưa tinh trùng vào tử cung",
      "Theo dõi kết quả"
    ]
  },
  {
    serviceId: 3,
    serviceName: serviceTypes.ICSI,
    serviceCode: "ICSI001",
    description: "Tiêm tinh trùng vào tế bào trứng - Dành cho trường hợp tinh trùng yếu",
    price: 95000000,
    duration: "2-3 tháng",
    successRate: 69.6,
    category: "Hỗ trợ sinh sản",
    isActive: true,
    requirements: ["Tinh trùng yếu hoặc ít", "Thất bại IVF trước đó", "Khám nam khoa"],
    procedures: [
      "Kích thích buồng trứng",
      "Thu nhận trứng",
      "Tiêm tinh trùng vào trứng",
      "Nuôi cấy phôi",
      "Chuyển phôi vào tử cung"
    ]
  },
  {
    serviceId: 4,
    serviceName: serviceTypes.GENETIC_TESTING,
    serviceCode: "GT001",
    description: "Xét nghiệm di truyền tiền làm tổ - Phát hiện bất thường di truyền",
    price: 25000000,
    duration: "2-4 tuần",
    successRate: 75.2,
    category: "Xét nghiệm",
    isActive: true,
    requirements: ["Có phôi để xét nghiệm", "Tư vấn di truyền", "Đồng ý của cặp vợ chồng"],
    procedures: [
      "Sinh thiết phôi",
      "Xét nghiệm di truyền",
      "Phân tích kết quả",
      "Tư vấn kết quả"
    ]
  },
  {
    serviceId: 5,
    serviceName: serviceTypes.HORMONE_THERAPY,
    serviceCode: "HT001",
    description: "Điều trị hormone - Cân bằng nội tiết tố sinh sản",
    price: 5000000,
    duration: "1-6 tháng",
    successRate: 80.0,
    category: "Điều trị",
    isActive: true,
    requirements: ["Xét nghiệm hormone", "Khám nội tiết", "Theo dõi định kỳ"],
    procedures: [
      "Đánh giá tình trạng hormone",
      "Lập phác đồ điều trị",
      "Theo dõi và điều chỉnh",
      "Đánh giá kết quả"
    ]
  }
];

const GetAllService = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return {
    data: mockServices,
    status: 200,
    message: "Success"
  };
};

const GetServiceById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const service = mockServices.find(s => s.serviceId === parseInt(id));
  
  if (service) {
    return {
      data: service,
      status: 200,
      message: "Success"
    };
  } else {
    throw new Error("Service not found");
  }
};

const CreateService = async (body) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const newService = {
    serviceId: mockServices.length + 1,
    serviceCode: body.serviceCode || `SV${String(mockServices.length + 1).padStart(3, '0')}`,
    ...body,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockServices.push(newService);
  
  return {
    data: newService,
    status: 201,
    message: "Service created successfully"
  };
};

const UpdateService = async (id, body) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const serviceIndex = mockServices.findIndex(s => s.serviceId === parseInt(id));
  
  if (serviceIndex !== -1) {
    mockServices[serviceIndex] = {
      ...mockServices[serviceIndex],
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    return {
      data: mockServices[serviceIndex],
      status: 200,
      message: "Service updated successfully"
    };
  } else {
    throw new Error("Service not found");
  }
};

export { GetAllService, GetServiceById, CreateService, UpdateService };
