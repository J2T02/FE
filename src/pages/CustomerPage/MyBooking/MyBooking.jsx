import { Typography, Card, message } from "antd";
import { useState } from "react";
import BookingTabs from "./components/BookingTabs ";
import BookingList from "./components/BookingList";

function MyBooking() {
  const bookings = [
    {
      bookingId: "A123",
      status: "đã xác nhận",
      doctorName: "Nguyễn Văn A",
      createAt: "2025-06-10T09:00:00Z",
      note: "Khám hiếm muộn",
      schedule: {
        scheduleId: 1,
        doctorId: 1,
        date: "2025-06-20",
        slotId: 2,
        isAvailable: true,
        maxBooking: 5,
      },
    },
    {
      bookingId: "B456",
      status: "chờ xác nhận",
      doctorName: "Trần Thị B",
      createAt: "2025-06-12T10:30:00Z",
      note: "IVF",
      schedule: {
        scheduleId: 2,
        doctorId: 2,
        date: "2025-06-22",
        slotId: 1,
        isAvailable: true,
        maxBooking: 4,
      },
    },
    {
      bookingId: "B678",
      status: "hoàn thành",
      doctorName: "Lê Văn V",
      createAt: "2025-05-30T14:00:00Z",
      note: "Tái khám IVF",
      schedule: {
        scheduleId: 3,
        doctorId: 3,
        date: "2025-06-10",
        slotId: 2,
        isAvailable: false,
        maxBooking: 0,
      },
    },
    {
      bookingId: "B003",
      status: "đã hủy",
      doctorName: "Lê Văn V",
      createAt: "2025-06-01T08:00:00Z",
      note: "Khám tổng quát",
      schedule: {
        scheduleId: 4,
        doctorId: 3,
        date: "2025-06-18",
        slotId: 1,
        isAvailable: false,
        maxBooking: 0,
      },
    },
  ];

  const [activeTab, setActiveTab] = useState("all");
  const { Title } = Typography;

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  const handleView = (booking) => {
    message.info(`Xem chi tiết lịch hẹn: ${booking.bookingId}`);
  };

  const handleReschedule = (booking) => {
    message.info(`Đặt lại lịch: ${booking.bookingId}`);
  };

  const handleCancel = (booking) => {
    message.warning(`Yêu cầu hủy lịch: ${booking.bookingId}`);
  };

  // Lọc booking theo tab
  const filteredBookings =
    activeTab === "all"
      ? bookings
      : bookings.filter((b) => b.status === activeTab);

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Lịch hẹn của tôi</Title>
      <BookingTabs onChangeTab={handleTabChange} />
      <BookingList
        bookings={filteredBookings}
        onView={handleView}
        onReschedule={handleReschedule}
        onCancel={handleCancel}
      />
      {filteredBookings.length === 0 && (
        <Card style={{ marginTop: 16 }}>Không có lịch hẹn nào.</Card>
      )}
    </div>
  );
}

export default MyBooking;
