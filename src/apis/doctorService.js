import axiosClients from "./axiosClients";
// Import mock data
import { mockDoctors, mockDoctorAuth } from '../data/mockDoctorPageData';

// ==================== API CALLS (COMMENTED) ====================
// const getDoctorList = async () => {
//   return await axiosClients.get("/Doctor/all");
// };

// const loginDoctor = async (body) => {
//   return await axiosClients.post("/Account/loginDoctor", body);
// };

// const getDoctorInfo = async (id) => {
//   return await axiosClients.get(`/Doctor/${id}`);
// };

// ==================== MOCK DATA SERVICES ====================
const getDoctorList = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    data: mockDoctors,
    status: 200,
    message: "Success"
  };
};

const loginDoctor = async (body) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simple mock authentication
  const doctor = mockDoctorAuth.find(d => 
    d.email === body.email && d.password === body.password
  );
  
  if (doctor) {
    return {
      data: {
        token: "mock-jwt-token-" + Date.now(),
        doctorInfo: doctor,
        expiresIn: 3600
      },
      status: 200,
      message: "Login successful"
    };
  } else {
    throw new Error("Invalid credentials");
  }
};

const getDoctorInfo = async (id) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const doctor = mockDoctors.find(d => d.doctorId === parseInt(id));
  
  if (doctor) {
    return {
      data: doctor,
      status: 200,
      message: "Success"
    };
  } else {
    throw new Error("Doctor not found");
  }
};

export { loginDoctor, getDoctorInfo, getDoctorList };
