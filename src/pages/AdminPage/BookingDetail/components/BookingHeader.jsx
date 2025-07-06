import React from "react";
import { Typography, Tag, Space } from "antd";

const { Title, Text } = Typography;

const BookingHeader = ({ data }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Đã xác nhận":
        return "green";
      case "Chờ xác nhận":
        return "orange";
      case "Checkin":
        return "blue";
      case "Đang khám":
        return "purple";
      case "Đã khám":
        return "cyan";
      case "Hủy":
        return "red";
      default:
        return "default";
    }
  };

  return (
    <Space direction="vertical" size="small">
      <Title level={2} style={{ margin: 0 }}>
        Chi tiết lịch hẹn #{data?.bookingId}
      </Title>
      <Space>
        <Text type="secondary">Trạng thái:</Text>
        <Tag color={getStatusColor(data?.status?.statusName)}>
          {data?.status?.statusName}
        </Tag>
      </Space>
    </Space>
  );
};

export default BookingHeader;
