import { Typography, Card, message } from "antd";
import BookingTabs from "./components/BookingTabs ";
import { useState } from "react";
import BookingFilter from "./components/BookingFilter";
import BookingList from "./components/BookingList";
function MyBooking() {
  const bookings = [
    {
      id: "A123",
      status: "confirmed",
      doctorName: "Nguyễn Văn A",
      serviceName: "Khám hiếm muộn",
      appointmentTime: "15/06/2025 14:00",
      location: "Phòng 301, Cơ sở chính",
    },
    {
      id: "B456",
      status: "pending",
      doctorName: "Trần Thị B",
      serviceName: "IVF",
      appointmentTime: "18/06/2025 09:30",
      location: "Phòng 202, Cơ sở 2",
    },
    {
      id: "B678",
      status: "completed",
      doctorName: "Lê Văn V",
      serviceName: "IVF",
      appointmentTime: "18/06/2025 09:30",
      location: "Phòng 202, Cơ sở 2",
    },
    {
      id: "B003",
      status: "cancelled",
      doctorName: "Lê Văn V",
      serviceName: "IVF",
      appointmentTime: "18/06/2025 09:30",
      location: "Phòng 202, Cơ sở 2",
    },
  ];
  const [filters, setFilters] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const { Title } = Typography;
  const handleTabChange = (tabKey) => {
    console.log("Tab được chọn:", tabKey);
    // Sau này sẽ lọc booking theo trạng thái
  };
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log("Bộ lọc hiện tại:", newFilters);
  };
  const handleView = (booking) => {
    message.info(`Xem chi tiết lịch hẹn: ${booking.id}`);
  };

  const handleReschedule = (booking) => {
    message.info(`Đặt lại lịch: ${booking.id}`);
  };

  const handleCancel = (booking) => {
    message.warning(`Yêu cầu hủy lịch: ${booking.id}`);
  };
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Lịch hẹn của tôi</Title>

      {/* Sau này sẽ thêm component danh sách lịch hẹn ở đây */}
      <BookingTabs onChangeTab={handleTabChange} />
      <BookingFilter onFilterChange={handleFilterChange} />
      <BookingList
        bookings={bookings}
        onView={handleView}
        onReschedule={handleReschedule}
        onCancel={handleCancel}
      />
      <Card>Đang tải lịch hẹn...</Card>
    </div>
  );
}

export default MyBooking;
