import axiosClients from "./axiosClients";

const booking = async (payload) => {
  return new Promise((resolve) => {
    console.log("📤 Tạo Booking:", payload);

    setTimeout(() => {
      resolve({
        data: {
          success: true,
          message: "Tạo booking thành công",
          data: {
            bookingId: "bk123",
            ...payload,
          },
        },
      });
    }, 1000);
  });
};
export { booking };

// api/bookingApi.js (hoặc api/bookingApi.jsx)

import { message } from "antd"; // Import message for notifications
import dayjs from "dayjs"; // Import dayjs if you use it for date formatting in mock data

// Dummy Data - Replace with actual API calls
// This data structure now reflects the database schema more closely
const dummyBookings = [
  {
    bookingId: 1,
    accId: 101,
    fullName: "Nguyễn Văn A",
    phone: "0912345678",
    docId: 1,
    doctorName: "BS. Trần Thị B",
    dsId: 1001,
    status: 1, // 1: Confirmed
    createAt: "2025-06-20T10:00:00Z",
    workDate: "2025-06-23", // Today
    slotTime: "09:00 - 09:30",
    note: "Khách hàng yêu cầu tư vấn kỹ về IVF.",
    amount: "2.400.000 VND",
  },
  {
    bookingId: 2,
    accId: 102,
    fullName: "Trần Thị C",
    phone: "0912345679",
    docId: 2,
    doctorName: "BS. Lê Văn D",
    dsId: 1002,
    status: 5, // 5: Đang khám
    createAt: "2025-06-19T11:30:00Z",
    workDate: "2025-06-23", // Today
    slotTime: "10:00 - 10:30",
    note: "Tái khám định kỳ.",
    amount: "800.000 VND",
  },
  {
    bookingId: 3,
    accId: 103,
    fullName: "Lê Văn E",
    phone: "0912345680",
    docId: 1,
    doctorName: "BS. Trần Thị B",
    dsId: 1003,
    status: 1,
    createAt: "2025-06-21T14:00:00Z",
    workDate: "2025-06-24", // Tomorrow
    slotTime: "14:00 - 14:30",
    note: "Khám sức khỏe tổng quát.",
    amount: "1.200.000 VND",
  },
  {
    bookingId: 4,
    accId: 104,
    fullName: "Phạm Thị G",
    phone: "0912345681",
    docId: 3,
    doctorName: "BS. Nguyễn Thị H",
    dsId: 1004,
    status: 3, // 3: Đã Check-out
    createAt: "2025-06-18T09:00:00Z",
    workDate: "2025-06-22",
    slotTime: "09:00 - 09:30",
    note: "Đã hoàn thành khám và tư vấn.",
    amount: "1.500.000 VND",
  },
  {
    bookingId: 5,
    accId: 105,
    fullName: "Hoàng Văn K",
    phone: "0912345682",
    docId: 2,
    doctorName: "BS. Lê Văn D",
    dsId: 1005,
    status: 4, // 4: Đã hủy
    createAt: "2025-06-17T16:00:00Z",
    workDate: "2025-06-24",
    slotTime: "16:00 - 16:30",
    note: "Khách hàng đã hủy vì lý do cá nhân.",
    amount: "1.000.000 VND",
  },
  {
    bookingId: 6,
    accId: 106,
    fullName: "Đặng Thị L",
    phone: "0987654321",
    docId: 1,
    doctorName: "BS. Trần Thị B",
    dsId: 1006,
    status: 1,
    createAt: "2025-06-22T08:00:00Z",
    workDate: "2025-06-23", // Today
    slotTime: "11:00 - 11:30",
    note: "Khám lần đầu.",
    amount: "900.000 VND",
  },
];

// A mutable copy for mock updates
const mockDatabase = [...dummyBookings];

// Mock API: Fetch all bookings (simulate GET request)
export const fetchAllBookingsApi = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDatabase);
    }, 500); // Simulate network delay
  });
};

// Mock API: Update booking status (simulate POST/PUT request)
export const updateBookingStatusApi = async (
  bookingId,
  newStatusId,
  note = null
) => {
  console.log(
    `Mock API Call: Updating booking ${bookingId} to status ${newStatusId} with note: ${note}`
  );
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockDatabase.findIndex((b) => b.bookingId === bookingId);
      if (index > -1) {
        mockDatabase[index] = {
          ...mockDatabase[index],
          status: newStatusId,
          note: note ? note : mockDatabase[index].note, // Update note if provided
        };
        // In a real app, you might not show a message here, but handle it in the component
        // message.success(`Cập nhật trạng thái lịch hẹn ${bookingId} thành công!`);
        resolve({ success: true, updatedBooking: mockDatabase[index] });
      } else {
        // message.error(`Không tìm thấy lịch hẹn ${bookingId}.`);
        reject({ success: false, message: `Booking ${bookingId} not found.` });
      }
    }, 1000); // Simulate network delay
  });
};

// Hàm có thể dùng cho API thật
/*
import axiosClients from '../path/to/your/axiosClients'; // Điều chỉnh đường dẫn

export const fetchAllBookingsApi = async () => {
  try {
    const response = await axiosClients.get('/Booking/All'); // Thay thế bằng endpoint của bạn
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error; // Hoặc xử lý lỗi theo cách bạn muốn
  }
};

export const updateBookingStatusApi = async (bookingId, newStatusId, note = null) => {
  try {
    const payload = { bookingId, newStatusId, note };
    const response = await axiosClients.post('/Booking/UpdateStatus', payload); // Thay thế bằng endpoint của bạn
    return response.data; // Server nên trả về thông tin lịch hẹn đã cập nhật
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};
*/
