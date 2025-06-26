
import { Card, Typography, Space } from "antd";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";

export default function AppointmentInfoCard({data}) {
  return (
    <Card title={<><CalendarOutlined /> Thông tin lịch hẹn</>}>
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
          <Typography.Text>{data?.slotId == 1 ? "8:00-12:00" : "13:00-17:00"}</Typography.Text>
        </Space>
      </Space>
    </Card>
  );
}
