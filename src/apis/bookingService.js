import axiosClients from "./axiosClients";
// Import mock data
import { mockBookings, mockDoctors, bookingStatuses } from '../data/mockDoctorPageData';
import { doctorWeeklySchedule } from '../data/mockScheduleData';

// ==================== API CALLS (COMMENTED) ====================
// const GetAllBooking = async () => {
//   return await axiosClients.get("/Booking/GetAllBooking");
// };
// const checkBooking = async (bookingId, statusId) => {
//   return await axiosClients.put(`/Booking/${bookingId}/status`, {
//     status: statusId,
//   });
// };
// const GetAllDoctor = async () => {
//   return await axiosClients.get("/Doctor/all");
// };
// const filterDoctor = async (slotId, fromDate, toDate) => {
//   return await axiosClients.get(
//     `/Booking/Check-Slot?slotId=${slotId}&fromDate=${fromDate}&toDate=${toDate}`
//   );
// };
// const GetSchedule = async (id) => {
//   return await axiosClients.get(`/Doctor/GetAllDoctorScheduleIsTrue/${id}`);
// };
// const GetAllDoctorSchedule = async (id) => {
//   return await axiosClients.get(`/Doctor/GetAllDoctorSchedule/${id}`);
// };
// const Booking = async (body) => {
//   return await axiosClients.post(`/Booking/Booking`, body);
// };
// const updatebookingDoctor = async (bookingId, doctorId) => {
//   return await axiosClients.put(`/BookingUpdate/update-doctor/${bookingId}`, {
//     doctorId: doctorId,
//   });
// };
// const updatebookingSchedule = async (bookingId, schedule) => {
//   return await axiosClients.put(`/BookingUpdate/update-schedule/${bookingId}`, {
//     workDate: schedule.workDate,
//     slotId: schedule.slotId,
//   });
// };
// const BookingHistory = async (id) => {
//   return await axiosClients.get(`/Booking/History/${id}`);
// };
// const BookingDetail = async (id) => {
//   return await axiosClients.get(`/BookingDetail/${id}`);
// };
// const GetCustomerInfo = async (id) => {
//   return await axiosClients.get(`/Customer/${id}`);
// };

// ==================== MOCK DATA SERVICES ====================
const GetAllBooking = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    data: mockBookings,
    status: 200,
    message: "Success"
  };
};

const checkBooking = async (bookingId, statusId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find and update booking status in mock data
  const booking = mockBookings.find(b => b.bookingId === bookingId);
  if (booking) {
    booking.statusId = statusId;
    booking.updatedAt = new Date().toISOString();
    return {
      data: booking,
      status: 200,
      message: "Booking status updated successfully"
    };
  } else {
    throw new Error("Booking not found");
  }
};

const GetAllDoctor = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return {
    data: mockDoctors,
    status: 200,
    message: "Success"
  };
};

const filterDoctor = async (slotId, fromDate, toDate) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Filter available doctors based on schedule
  const availableDoctors = mockDoctors.filter(doctor => {
    // Simple mock logic - assume all doctors are available
    return doctor.isActive;
  });
  
  return {
    data: availableDoctors,
    status: 200,
    message: "Success"
  };
};

const GetSchedule = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Return schedule for specific doctor
  const schedule = doctorWeeklySchedule.filter(s => s.doctorId === parseInt(id));
  
  return {
    data: schedule,
    status: 200,
    message: "Success"
  };
};

const GetAllDoctorSchedule = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Return all schedules for specific doctor
  const allSchedules = doctorWeeklySchedule.filter(s => s.doctorId === parseInt(id));
  
  return {
    data: allSchedules,
    status: 200,
    message: "Success"
  };
};

const Booking = async (body) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Create new booking with mock data
  const newBooking = {
    bookingId: "BK" + String(mockBookings.length + 1).padStart(3, '0'),
    bookingCode: "FER2024" + String(mockBookings.length + 1).padStart(3, '0'),
    ...body,
    statusId: 1, // Pending
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockBookings.push(newBooking);
  
  return {
    data: newBooking,
    status: 201,
    message: "Booking created successfully"
  };
};

const updatebookingDoctor = async (bookingId, doctorId) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const booking = mockBookings.find(b => b.bookingId === bookingId);
  const doctor = mockDoctors.find(d => d.doctorId === doctorId);
  
  if (booking && doctor) {
    booking.doctorInfo = {
      doctorId: doctor.doctorId,
      fullName: doctor.fullName,
      mail: doctor.email,
      phone: doctor.phone,
      specialization: doctor.specialization,
      experience: doctor.experience
    };
    booking.updatedAt = new Date().toISOString();
    
    return {
      data: booking,
      status: 200,
      message: "Doctor updated successfully"
    };
  } else {
    throw new Error("Booking or Doctor not found");
  }
};

const updatebookingSchedule = async (bookingId, schedule) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const booking = mockBookings.find(b => b.bookingId === bookingId);
  
  if (booking) {
    booking.appointmentInfo.appointmentDate = schedule.workDate;
    booking.appointmentInfo.slotId = schedule.slotId;
    booking.updatedAt = new Date().toISOString();
    
    return {
      data: booking,
      status: 200,
      message: "Schedule updated successfully"
    };
  } else {
    throw new Error("Booking not found");
  }
};

const BookingHistory = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Filter bookings by customer/doctor ID
  const history = mockBookings.filter(booking => 
    booking.customerInfo.phone.includes(id) || 
    booking.doctorInfo.doctorId === parseInt(id)
  );
  
  return {
    data: history,
    status: 200,
    message: "Success"
  };
};

const BookingDetail = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const booking = mockBookings.find(b => b.bookingId === id);
  
  if (booking) {
    return {
      data: booking,
      status: 200,
      message: "Success"
    };
  } else {
    throw new Error("Booking not found");
  }
};

const GetCustomerInfo = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Find customer info from bookings
  const booking = mockBookings.find(b => 
    b.customerInfo.phone === id || 
    b.customerInfo.email === id
  );
  
  if (booking) {
    return {
      data: booking.customerInfo,
      status: 200,
      message: "Success"
    };
  } else {
    throw new Error("Customer not found");
  }
};

export {
  GetAllDoctor,
  GetSchedule,
  Booking,
  BookingHistory,
  BookingDetail,
  GetCustomerInfo,
  filterDoctor,
  updatebookingDoctor,
  updatebookingSchedule,
  GetAllDoctorSchedule,
  GetAllBooking,
  checkBooking,
};
