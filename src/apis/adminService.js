
import axiosClients from "./axiosClients";
// Import mock data
import { mockDoctors, mockDoctorAuth } from '../data/mockDoctorPageData';

// ==================== API CALLS (COMMENTED) ====================
// const GetAllAccount = async () => {
//     return await axiosClients.get("/Account/getAllAccounts");
// }

// ==================== MOCK DATA SERVICES ====================

// Mock accounts data (combining all user types)
const mockAccounts = [
  {
    accountId: 1,
    email: "admin@fertility.com",
    fullName: "Quản trị viên hệ thống",
    role: "admin",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-11-28T08:00:00Z",
    permissions: ["manage_users", "manage_services", "view_reports", "manage_system"]
  },
  {
    accountId: 2,
    email: "receptionist@fertility.com",
    fullName: "Nguyễn Thị Lan - Lễ tân",
    role: "receptionist",
    isActive: true,
    createdAt: "2024-01-15T00:00:00Z",
    lastLogin: "2024-11-28T07:30:00Z",
    permissions: ["manage_bookings", "view_schedules", "manage_customers"]
  },
  {
    accountId: 3,
    email: "customer@gmail.com",
    fullName: "Nguyễn Văn An",
    role: "customer",
    isActive: true,
    createdAt: "2024-02-01T00:00:00Z",
    lastLogin: "2024-11-27T19:45:00Z",
    permissions: ["view_profile", "book_appointments", "view_history"]
  },
  {
    accountId: 4,
    email: "customer2@gmail.com",
    fullName: "Lê Minh Tuấn",
    role: "customer",
    isActive: true,
    createdAt: "2024-02-15T00:00:00Z",
    lastLogin: "2024-11-26T20:15:00Z",
    permissions: ["view_profile", "book_appointments", "view_history"]
  },
  // Add doctor accounts
  ...mockDoctorAuth.map((doctor, index) => ({
    accountId: 10 + index,
    email: doctor.email,
    fullName: doctor.fullName,
    role: doctor.role,
    isActive: true,
    createdAt: "2024-01-10T00:00:00Z",
    lastLogin: "2024-11-28T08:30:00Z",
    permissions: ["manage_patients", "view_schedules", "manage_treatments", "view_reports"],
    doctorId: doctor.doctorId,
    specialization: doctor.specialization
  }))
];

const GetAllAccount = async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return {
    data: mockAccounts,
    status: 200,
    message: "Success",
    totalCount: mockAccounts.length,
    summary: {
      totalAccounts: mockAccounts.length,
      activeAccounts: mockAccounts.filter(a => a.isActive).length,
      roleDistribution: {
        admin: mockAccounts.filter(a => a.role === 'admin').length,
        doctor: mockAccounts.filter(a => a.role === 'doctor').length,
        receptionist: mockAccounts.filter(a => a.role === 'receptionist').length,
        customer: mockAccounts.filter(a => a.role === 'customer').length
      }
    }
  };
};

// Additional admin services
const createAccount = async (body) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Check if email already exists
  const existingAccount = mockAccounts.find(a => a.email === body.email);
  if (existingAccount) {
    throw new Error("Email đã được sử dụng");
  }
  
  const newAccount = {
    accountId: Math.max(...mockAccounts.map(a => a.accountId)) + 1,
    ...body,
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: null,
    permissions: getDefaultPermissions(body.role)
  };
  
  mockAccounts.push(newAccount);
  
  return {
    data: newAccount,
    status: 201,
    message: "Account created successfully"
  };
};

const updateAccount = async (id, body) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const accountIndex = mockAccounts.findIndex(a => a.accountId === parseInt(id));
  
  if (accountIndex !== -1) {
    mockAccounts[accountIndex] = {
      ...mockAccounts[accountIndex],
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    return {
      data: mockAccounts[accountIndex],
      status: 200,
      message: "Account updated successfully"
    };
  } else {
    throw new Error("Account not found");
  }
};

const deleteAccount = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const accountIndex = mockAccounts.findIndex(a => a.accountId === parseInt(id));
  
  if (accountIndex !== -1) {
    // Soft delete - just deactivate
    mockAccounts[accountIndex].isActive = false;
    mockAccounts[accountIndex].deletedAt = new Date().toISOString();
    
    return {
      data: mockAccounts[accountIndex],
      status: 200,
      message: "Account deactivated successfully"
    };
  } else {
    throw new Error("Account not found");
  }
};

const getAccountById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const account = mockAccounts.find(a => a.accountId === parseInt(id));
  
  if (account) {
    return {
      data: account,
      status: 200,
      message: "Success"
    };
  } else {
    throw new Error("Account not found");
  }
};

// Helper function to get default permissions by role
const getDefaultPermissions = (role) => {
  switch (role) {
    case 'admin':
      return ["manage_users", "manage_services", "view_reports", "manage_system"];
    case 'doctor':
      return ["manage_patients", "view_schedules", "manage_treatments", "view_reports"];
    case 'receptionist':
      return ["manage_bookings", "view_schedules", "manage_customers"];
    case 'customer':
      return ["view_profile", "book_appointments", "view_history"];
    default:
      return ["view_profile"];
  }
};

export { 
  GetAllAccount, 
  createAccount, 
  updateAccount, 
  deleteAccount, 
  getAccountById 
};