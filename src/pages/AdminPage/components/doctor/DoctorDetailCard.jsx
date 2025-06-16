import { Card, Avatar, Typography, Space, Tag, Button } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const DoctorDetailCard = ({ doctor, onClose, onEdit }) => {
  if (!doctor) return null;

  return (
    <Card
      title="Thông tin bác sĩ"
      extra={
        onClose && (
          <CloseOutlined
            style={{ color: "#888", cursor: "pointer" }}
            onClick={onClose}
          />
        )
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Avatar
          size={80}
          icon={<UserOutlined />}
          style={{ marginBottom: 12 }}
        />

        <Title level={4} style={{ marginBottom: 0 }}>
          {doctor.fullName || doctor.name}
        </Title>
        <Text type="secondary">Chuyên khoa: {doctor.specialty}</Text>

        <Tag
          color={doctor.status === "Đang làm việc" ? "green" : "default"}
          style={{ marginTop: 8 }}
        >
          {doctor.status}
        </Tag>
        {onEdit && (
          <div
            onClick={onEdit}
            style={{
              position: "absolute",
              top: "-15px",
              right: "-5px",
              cursor: "pointer",
            }}
          >
            <EditOutlined /> Chỉnh sửa
          </div>
        )}
      </div>

      <div style={{ marginTop: 24 }}>
        <Space direction="vertical" size={12} style={{ width: "100%" }}>
          <Text>
            <MailOutlined style={{ marginRight: 8 }} />
            {doctor.email}
          </Text>
          <Text>
            <PhoneOutlined style={{ marginRight: 8 }} />
            {doctor.phone}
          </Text>
          <Text>
            <CalendarOutlined style={{ marginRight: 8 }} />
            Ngày vào làm: {doctor.startDate}
          </Text>
        </Space>
      </div>
    </Card>
  );
};

export default DoctorDetailCard;
