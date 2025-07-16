import React from "react";
import { Card, Typography, Space, Button } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const { Text } = Typography;

const ActionSection = ({ statusId, onConfirm, onCancel }) => {
  // Only show actions if status is 1 (Chờ xác nhận)
  if (statusId === 1) {
    return (
      <Card title="Thao tác" size="small">
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Text type="secondary">Quản lý trạng thái và thông tin lịch hẹn</Text>
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Button
              type="primary"
              icon={<CheckOutlined />}
              onClick={onConfirm}
              style={{ width: "100%" }}
            >
              Xác nhận lịch hẹn
            </Button>
            <Button
              danger
              icon={<CloseOutlined />}
              onClick={onCancel}
              style={{ width: "100%" }}
            >
              Hủy lịch hẹn
            </Button>
          </Space>
        </Space>
      </Card>
    );
  }
  // For other statuses, show info only
  return (
    <Card title="Thao tác" size="small">
      <Text type="secondary">Không có thao tác khả dụng</Text>
    </Card>
  );
};

export default ActionSection;
