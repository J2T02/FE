import axiosClients from "./axiosClients";
// Import mock data
import { mockDoctorAuth } from '../data/mockDoctorPageData';

// ==================== API CALLS (COMMENTED) ====================
// const register = async (body) => {
//   return await axiosClients.post("/Account/register", body);
// };

// const signIn = async (body) => {
//   return await axiosClients.post("/Account/login", body);
// };

// const getInfo = async () => {
//   return await axiosClients.get(`/Account`);
// };

// ==================== MOCK DATA SERVICES ====================

// Mock users for general authentication
const mockUsers = [
  {
    id: 1,
    email: "admin@fertility.com",
    password: "123456",
    fullName: "Quản trị viên",
    role: "admin"
  },
  {
    id: 2,
    email: "customer@gmail.com",
    password: "123456",
    fullName: "Nguyễn Văn An",
    role: "customer"
  },
  {
    id: 3,
    email: "receptionist@fertility.com",
    password: "123456",
    fullName: "Lễ tân",
    role: "receptionist"
  },
  ...mockDoctorAuth
];

const register = async (body) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Check if email already exists
  const existingUser = mockUsers.find(user => user.email === body.email);
  if (existingUser) {
    throw new Error("Email đã được sử dụng");
  }
  
  // Create new user
  const newUser = {
    id: mockUsers.length + 1,
    email: body.email,
    password: body.password,
    fullName: body.fullName || "Người dùng mới",
    role: body.role || "customer",
    createdAt: new Date().toISOString()
  };
  
  mockUsers.push(newUser);
  
  return {
    data: {
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role
      },
      token: "mock-jwt-token-" + Date.now()
    },
    status: 201,
    message: "Đăng ký thành công"
  };
};

const signIn = async (body) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Find user by email and password
  const user = mockUsers.find(u => 
    u.email === body.email && u.password === body.password
  );
  
  if (user) {
    return {
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          ...(user.specialization && { specialization: user.specialization }),
          ...(user.doctorId && { doctorId: user.doctorId })
        },
        token: "mock-jwt-token-" + Date.now(),
        expiresIn: 3600
      },
      status: 200,
      message: "Đăng nhập thành công"
    };
  } else {
    throw new Error("Email hoặc mật khẩu không đúng");
  }
};

const getInfo = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock getting current user info from token
  // In real app, this would decode JWT token
  const mockCurrentUser = {
    id: 1,
    email: "dr.hoa@fertility.com",
    fullName: "BS. Nguyễn Thị Hoa",
    role: "doctor",
    specialization: "Sinh sản - Hiếm muộn",
    doctorId: 1
  };
  
  return {
    data: mockCurrentUser,
    status: 200,
    message: "Success"
  };
};

export { register, signIn, getInfo };
