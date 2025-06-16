import { Card, Tag, Space, Typography, Button, Divider } from "antd";
import {
  EyeOutlined,
  CalendarOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

const statusColorMap = {
  confirmed: "green",
  pending: "gold",
  completed: "blue",
  cancelled: "red",
};

const BookingCard = ({ booking, onView, onReschedule, onCancel }) => {
  const { id, status, doctorName, serviceName, location, appointmentTime } =
    booking;

  const isActionable = !["completed", "cancelled"].includes(status);

  return (
    <Card
      title={
        <Space direction="vertical" size={0}>
          <Title level={5} style={{ margin: 0 }}>
            Cuộc hẹn với bác sĩ {doctorName}
          </Title>
          <Text type="secondary">Mã lịch hẹn: #{id}</Text>
        </Space>
      }
      extra={<Tag color={statusColorMap[status]}>{status.toUpperCase()}</Tag>}
      style={{ marginBottom: 16 }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Text>
          <strong>Dịch vụ:</strong> {serviceName}
        </Text>
        <Text>
          <strong>Thời gian:</strong> {appointmentTime}
        </Text>
        <Text>
          <strong>Địa điểm:</strong> {location}
        </Text>
        <Divider style={{ margin: "12px 0" }} />
        <Space wrap>
          <Button icon={<EyeOutlined />} onClick={() => onView?.(booking)}>
            Xem chi tiết
          </Button>
          {isActionable && (
            <>
              <Button
                icon={<CalendarOutlined />}
                onClick={() => onReschedule?.(booking)}
              >
                Đặt lại
              </Button>
              <Button
                icon={<CloseCircleOutlined />}
                danger
                onClick={() => onCancel?.(booking)}
              >
                Hủy lịch
              </Button>
            </>
          )}
        </Space>
      </Space>
    </Card>
  );
};

export default BookingCard;
