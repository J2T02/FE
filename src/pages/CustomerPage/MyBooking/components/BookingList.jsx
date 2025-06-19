import { Card, Button, Tag, Space } from "antd";
import dayjs from "dayjs";

const SLOT_LABELS = {
  1: "Sáng",
  2: "Chiều",
  3: "Tối",
};

const STATUS_COLORS = {
  "đã xác nhận": "green",
  "chờ xác nhận": "gold",
  "hoàn thành": "blue",
  "đã hủy": "red",
};

const BookingList = ({ bookings, onView, onReschedule, onCancel }) => {
  const renderActions = (booking) => {
    const { status } = booking;

    if (status === "hoàn thành" || status === "đã hủy") {
      return (
        <Space>
          <Button onClick={() => onView(booking)} type="primary">
            Xem
          </Button>
          <Button onClick={() => onReschedule(booking)} type="primary">
            Đặt lại
          </Button>
        </Space>
      );
    }

    if (status === "đã xác nhận" || status === "chờ xác nhận") {
      return (
        <Space>
          <Button onClick={() => onView(booking)} type="primary">
            Xem
          </Button>
          <Button onClick={() => onCancel(booking)} danger>
            Hủy lịch
          </Button>
        </Space>
      );
    }

    return null;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {bookings.map((booking) => {
        const { bookingId, doctorName, schedule, note, status, createAt } =
          booking;

        return (
          <Card
            key={bookingId}
            title={`Lịch hẹn #${bookingId}`}
            extra={
              <Tag color={STATUS_COLORS[status] || "default"}>{status}</Tag>
            }
          >
            <p>
              <strong>Bác sĩ:</strong> {doctorName}
            </p>
            <p>
              <strong>Ngày khám:</strong>{" "}
              {dayjs(schedule.date).format("DD/MM/YYYY")} - <strong>Ca:</strong>{" "}
              {SLOT_LABELS[schedule.slotId] || "Không rõ"}
            </p>
            <p>
              <strong>Ghi chú:</strong> {note}
            </p>
            <p>
              <strong>Thời gian tạo:</strong>{" "}
              {dayjs(createAt).format("HH:mm DD/MM/YYYY")}
            </p>

            <div style={{ marginTop: 12 }}>{renderActions(booking)}</div>
          </Card>
        );
      })}
    </div>
  );
};

export default BookingList;
