import axiosClients from "./axiosClients";
// Import mock data
import { mockPatients } from '../data/mockDoctorPageData';

// ==================== API CALLS (COMMENTED) ====================
// const updateCustomer = async (id, body) => {
//   return await axiosClients.put(`/Customer/update?AccountId=${id}`, body);
// };

// ==================== MOCK DATA SERVICES ====================

// Mock customers data (extended from patients)
const mockCustomers = mockPatients.map(patient => ({
  customerId: patient.patientId,
  accountId: parseInt(patient.patientId.replace('PT', '')),
  personalInfo: patient.personalInfo,
  medicalHistory: patient.medicalHistory,
  isActive: true,
  registrationDate: "2024-01-15",
  lastVisit: patient.nextAppointment || "2024-11-20"
}));

const updateCustomer = async (id, body) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const customerIndex = mockCustomers.findIndex(c => 
    c.accountId === parseInt(id) || c.customerId === id
  );
  
  if (customerIndex !== -1) {
    mockCustomers[customerIndex] = {
      ...mockCustomers[customerIndex],
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    return {
      data: mockCustomers[customerIndex],
      status: 200,
      message: "Customer updated successfully"
    };
  } else {
    throw new Error("Customer not found");
  }
};

// Additional mock customer services
const getAllCustomers = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return {
    data: mockCustomers,
    status: 200,
    message: "Success"
  };
};

const getCustomerById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const customer = mockCustomers.find(c => 
    c.accountId === parseInt(id) || c.customerId === id
  );
  
  if (customer) {
    return {
      data: customer,
      status: 200,
      message: "Success"
    };
  } else {
    throw new Error("Customer not found");
  }
};

const createCustomer = async (body) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const newCustomer = {
    customerId: `PT${String(mockCustomers.length + 1).padStart(3, '0')}`,
    accountId: mockCustomers.length + 1,
    ...body,
    isActive: true,
    registrationDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockCustomers.push(newCustomer);
  
  return {
    data: newCustomer,
    status: 201,
    message: "Customer created successfully"
  };
};

export { updateCustomer, getAllCustomers, getCustomerById, createCustomer };
