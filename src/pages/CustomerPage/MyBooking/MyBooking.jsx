import {
  Typography,
  Card,
  Button,
  Tag,
  Space,
  message,
  Layout,
  theme,
} from "antd";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { BookingHistory } from "../../../apis/bookingService";

const SLOT_LABELS = { 1: "08:00 - 12:00", 2: "13:00 - 17:00" };
const STATUS_COLORS = {
  "đã xác nhận": "green",
  "chờ xác nhận": "gold",
  "hoàn thành": "blue",
  "đã hủy": "red",
  "đã khám": "blue",
};

export default function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const { Title } = Typography;
  const navigate = useNavigate(); // ← THÊM
  const { token } = theme.useToken();
  const formatDate = (str) => {
    if (!str) return "";
    const [day, month, year] = str.split("/");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    (async () => {
      try {
        const id = Cookies.get("accId");
        const res = await BookingHistory(id);
        const data = res.data.data || [];

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
    })();
  }, []);

  /* DI CHUYỂN */
  const handleView = (id) => navigate(`/bookingDetail/${id}`);

  return (
    <Layout>
      <Header />
      <div style={{ padding: 24, backgroundColor: token.colorBgPage }}>
        <Title level={2}>Lịch hẹn của tôi</Title>

        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          {bookings.length === 0 ? (
            <Card>Không có lịch hẹn nào.</Card>
          ) : (
            bookings.map(({ bookingId, schedule, status }) => (
              <Card
                key={bookingId}
                hoverable // ← hiển thị mouse pointer
                onClick={() => handleView(bookingId)} // ← CLICK CẢ CARD
                title={`Lịch hẹn #${bookingId}`}
                extra={
                  <Tag color={STATUS_COLORS[status] || "default"}>{status}</Tag>
                }
                bodyStyle={{ cursor: "pointer" }}
              >
                <Space direction="vertical" size={8}>
                  <div>
                    <strong>Ngày khám:</strong>{" "}
                    {dayjs(schedule.date).format("DD/MM/YYYY")}
                  </div>
                  <div>
                    <strong>Ca khám:</strong> {schedule.slotText}
                  </div>
                  {/* Nếu muốn thêm nút riêng */}
                  <Button
                    size="small"
                    type="primary"
                    onClick={(e) => {
                      e.stopPropagation(); // không kích hoạt onClick Card
                      handleView(bookingId);
                    }}
                  >
                    Xem
                  </Button>
                </Space>
              </Card>
            ))
          )}
        </Space>
      </div>
      <Footer />
    </Layout>
  );
}
