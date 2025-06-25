import { Typography, Card, Button, Tag, Space, message } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { BookingHistory } from "../../../apis/bookingService";

const SLOT_LABELS = {
  1: "08:00 - 12:00",
  2: "13:00 - 17:00",
};

const STATUS_COLORS = {
  "đã xác nhận": "green",
  "chờ xác nhận": "gold",
  "hoàn thành": "blue",
  "đã hủy": "red",
  "đã khám": "blue",
};

function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const { Title } = Typography;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await BookingHistory();
        const data = res.data.data || [];

        // Map và sắp xếp theo bookingId giảm dần
        const mapped = data
          .map((item) => ({
            bookingId: item.bookingId,
            status: item.status.toLowerCase(),
            schedule: {
              date: formatDate(item.scheduleInfo),
              slotId: item.slotId,
              slotText: SLOT_LABELS[item.slotId] || "Không rõ",
            },
          }))
          .sort((a, b) => b.bookingId - a.bookingId);

        setBookings(mapped);
      } catch (err) {
        console.error("Lỗi khi tải lịch sử đặt lịch:", err);
        message.error("Không thể tải lịch sử đặt lịch.");
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (str) => {
    if (!str) return "";
    const [day, month, year] = str.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleView = (booking) => {
    message.info(`Xem chi tiết lịch hẹn: ${booking.bookingId}`);
  };

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Lịch hẹn của tôi</Title>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {bookings.length === 0 ? (
          <Card>Không có lịch hẹn nào.</Card>
        ) : (
          bookings.map((booking) => {
            const { bookingId, schedule, status } = booking;

            return (
              <Card
                key={bookingId}
                title={`Lịch hẹn #${bookingId}`}
                extra={
                  <Tag color={STATUS_COLORS[status] || "default"}>
                    {status}
                  </Tag>
                }
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div>
                    <strong>Ngày khám:</strong>{" "}
                    {dayjs(schedule.date).format("DD/MM/YYYY")}
                  </div>
                  <div>
                    <strong>Ca khám:</strong> {schedule.slotText}
                  </div>
                  <div>
                    <Space style={{ marginTop: 8 }}>
                      <Button onClick={() => handleView(booking)} type="primary">
                        Xem
                      </Button>
                    </Space>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

export default MyBooking;
