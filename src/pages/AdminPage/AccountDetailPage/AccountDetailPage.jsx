import React, { useEffect, useState } from "react";
import {
  Typography,
  Tag,
  Divider,
  Space,
  Button,
  Avatar,
  message,
  Card,
  Row,
  Col,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  ArrowLeftOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const AccountDetailPage = ({ account, onUpdateActiveStatus, onBack }) => {
  const [currentAccount, setCurrentAccount] = useState(account);

  useEffect(() => {
    if (account) {
      setCurrentAccount(account);
    } else {
      message.error("Không tìm thấy tài khoản");
    }
  }, [account]);

  const renderRole = (roleId) => {
    switch (roleId) {
      case 2:
        return "Quản lý trung tâm";
      case 3:
        return "Lễ tân";
      default:
        return "Không xác định";
    }
  };

  const toggleActiveStatus = async () => {
    if (!currentAccount) return;
    const newStatus = !currentAccount.isActive;

    // Gọi API để cập nhật backend
    if (onUpdateActiveStatus) {
      await onUpdateActiveStatus(currentAccount.accId, newStatus);
    }
  };

  const renderStatusTagWithButton = (isActive) => (
    <Space>
      {isActive ? (
        <Tag color="green">Đang hoạt động</Tag>
      ) : (
        <Tag color="red">Ngưng hoạt động</Tag>
      )}
      <Button
        icon={<PoweroffOutlined />}
        size="small"
        danger={!isActive}
        onClick={toggleActiveStatus}
        style={{
          borderRadius: 6,
          fontSize: 12,
          padding: "0 8px",
          height: 24,
          backgroundColor: "white",
          color: "#f78db3",
        }}
      >
        {isActive ? "Tắt" : "Bật"}
      </Button>
    </Space>
  );

  if (!currentAccount) return null;

  return (
    <div
      style={{
        background: "#fff0f4",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <Card
        bordered={false}
        bodyStyle={{ padding: 36 }}
        style={{
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}
      >
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 24 }}
        >
          <Col>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={onBack}
              style={{
                backgroundColor: "#f78db3",
                color: "white",
                border: "none",
              }}
            >
              Quay lại
            </Button>
          </Col>
          <Col>
            <Title level={3} style={{ marginBottom: 0 }}>
              👤 Thông tin tài khoản
            </Title>
          </Col>
        </Row>

        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} sm={8} style={{ textAlign: "center" }}>
            <Avatar
              size={120}
              src={currentAccount.img || null}
              icon={!currentAccount.img && <UserOutlined />}
              style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #d9d9d9",
              }}
            />
          </Col>

          <Col xs={24} sm={16}>
            <Title level={4} style={{ marginBottom: 4 }}>
              {currentAccount.fullName}
            </Title>
            <Space direction="vertical" size={4}>
              <Text>
                <MailOutlined style={{ marginRight: 8 }} />
                {currentAccount.mail}
              </Text>
              <Text>
                <PhoneOutlined style={{ marginRight: 8 }} />
                {currentAccount.phone}
              </Text>
              {renderStatusTagWithButton(currentAccount.isActive)}
            </Space>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Text strong>Chức vụ:</Text> {renderRole(currentAccount.roleId)}
          </Col>
          <Col span={24}>
            <Text strong>Ngày bắt đầu công tác:</Text>{" "}
            {dayjs(currentAccount.createAt).format("DD/MM/YYYY")}
          </Col>
          <Col span={24}>
            <Text type="secondary">Mã tài khoản: #{currentAccount.accId}</Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AccountDetailPage;
