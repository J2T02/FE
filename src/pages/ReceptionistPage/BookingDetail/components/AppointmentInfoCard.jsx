// File: pages/ReceptionistPage/components/AppointmentInfoCard.jsx
import { Card, Typography, Space } from "antd";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";

export default function AppointmentInfoCard({ data, statusId }) {
  // Nếu statusId khác 1 hoặc 2 thì không cho thao tác
  console.log(data);
  const isDisabled = statusId !== 1 && statusId !== 2;
  return (
    <Card
      title={
        <>
          <CalendarOutlined /> Thông tin lịch hẹn
        </>
      }
      bodyStyle={{ backgroundColor: "#fff0f5" }} // ✅ Thêm màu nền nhẹ
    >
      <Space direction="vertical" size="large">
        <Space direction="vertical" size={0}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Ngày hẹn
          </Typography.Text>
          <Typography.Text>Thứ Ba, 15 tháng 7, 2025</Typography.Text>
        </Space>

        <Space direction="vertical" size={0}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Khung giờ
          </Typography.Text>
          <Typography.Text>
            {data?.slot?.slotStart + "-" + data?.slot?.slotEnd}
          </Typography.Text>
        </Space>
        {/* Nếu cho phép thao tác thì mới hiển thị nút thay đổi lịch */}
        {/* { !isDisabled && (
          <Button type="primary">Thay đổi lịch hẹn</Button>
        ) } */}
      </Space>
    </Card>
  );
}
