import React from "react";
import { Card, Typography, Space, Button, message } from "antd";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const ActionSection = ({ bookingId }) => {
  const handleConfirm = () => {
    message.success("Đã xác nhận lịch hẹn");
    // TODO: Implement confirm booking API call
  };

  const handleCancel = () => {
    message.warning("Đã hủy lịch hẹn");
    // TODO: Implement cancel booking API call
  };

  const handleEdit = () => {
    message.info("Chức năng chỉnh sửa đang được phát triển");
    // TODO: Implement edit booking functionality
  };

  return (
    <Card title="Thao tác" size="small">
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Text type="secondary">Quản lý trạng thái và thông tin lịch hẹn</Text>

        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={handleConfirm}
            style={{ width: "100%" }}
          >
            Xác nhận lịch hẹn
          </Button>

          <Button
            icon={<EditOutlined />}
            onClick={handleEdit}
            style={{ width: "100%" }}
          >
            Chỉnh sửa thông tin
          </Button>

          <Button
            danger
            icon={<CloseOutlined />}
            onClick={handleCancel}
            style={{ width: "100%" }}
          >
            Hủy lịch hẹn
          </Button>
        </Space>
      </Space>
    </Card>
  );
};

export default ActionSection;
