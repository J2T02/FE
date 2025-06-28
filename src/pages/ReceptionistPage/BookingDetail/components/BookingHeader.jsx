import React from "react";
import { Row, Col, Typography, Tag, Space } from "antd";

// Hàm ánh xạ màu theo statusId
const getStatusColor = (statusId) => {
  switch (statusId) {
    case 1:
      return { backgroundColor: "#e4e4e7", color: "#333" }; // Chờ xác nhận
    case 2:
      return { backgroundColor: "#dbeafe", color: "#0958d9" }; // Đã xác nhận
    case 3:
      return { backgroundColor: "#dcfce7", color: "#15803d" }; // Check-in
    case 4:
      return { backgroundColor: "#fef3c7", color: "#92400e" }; // Đang khám
    case 5:
      return { backgroundColor: "#d1e7dd", color: "#0f5132" }; // Đã khám
    case 6:
      return { backgroundColor: "#f8d7da", color: "#842029" }; // Đã hủy
    default:
      return { backgroundColor: "#f5f5f5", color: "#666" }; // Unknown
  }
};

export default function BookingHeader({ data }) {
  const { bookingId, status } = data || {};
  const { backgroundColor, color } = getStatusColor(status?.statusId);

  return (
    <Row justify="space-between" align="middle">
      {/* Bên trái */}
      <Col>
        <Space direction="vertical" size={4}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Chi tiết đặt lịch
          </Typography.Title>
          <Typography.Text type="secondary">
            Mã đặt lịch: <strong>{bookingId}</strong>
          </Typography.Text>
        </Space>
      </Col>

      {/* Bên phải */}
      <Col>
        <Space>
          <Typography.Text type="secondary">Trạng thái:</Typography.Text>
          <Tag
            bordered={false}
            style={{
              backgroundColor,
              color,
              fontWeight: 500,
              padding: "2px 8px",
              borderRadius: 6,
            }}
          >
            {status?.statusName || "Không rõ"}
          </Tag>
        </Space>
      </Col>
    </Row>
  );
}
