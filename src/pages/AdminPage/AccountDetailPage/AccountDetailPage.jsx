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

const mockAccounts = [
  {
    accId: 1,
    roleId: 2,
    fullName: "Phạm Minh Đức",
    phone: "0901234567",
    mail: "duc.pham@example.com",
    isActive: true,
    createAt: "2023-01-10T08:00:00Z",
    img: "",
  },
  {
    accId: 2,
    roleId: 3,
    fullName: "Lê Thị Hương",
    phone: "0938765432",
    mail: "huong.le@example.com",
    isActive: false,
    createAt: "2022-07-01T08:00:00Z",
    img: "",
  },
];

const AccountDetailPage = ({ accId, onBack }) => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const found = mockAccounts.find((acc) => acc.accId === parseInt(accId));
    if (found) {
      setAccount(found);
    } else {
      message.error("Không tìm thấy tài khoản");
    }
  }, [accId]);

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

  const toggleActiveStatus = () => {
    if (!account) return;
    const newStatus = !account.isActive;
    setAccount({ ...account, isActive: newStatus });
    message.success(
      `Tài khoản đã được ${newStatus ? "kích hoạt" : "ngưng hoạt động"} thành công`
    );
  };

  const renderStatusTagWithButton = (isActive) => (
    <Space>
      {isActive ? <Tag color="green">Đang hoạt động</Tag> : <Tag color="red">Ngưng hoạt động</Tag>}
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

  if (!account) return null;

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
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
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
              src={account.img || null}
              icon={!account.img && <UserOutlined />}
              style={{
                backgroundColor: "#f0f0f0",
                border: "1px solid #d9d9d9",
              }}
            />
          </Col>

          <Col xs={24} sm={16}>
            <Title level={4} style={{ marginBottom: 4 }}>
              {account.fullName}
            </Title>
            <Space direction="vertical" size={4}>
              <Text>
                <MailOutlined style={{ marginRight: 8 }} />
                {account.mail}
              </Text>
              <Text>
                <PhoneOutlined style={{ marginRight: 8 }} />
                {account.phone}
              </Text>
              {renderStatusTagWithButton(account.isActive)}
            </Space>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Text strong>Chức vụ:</Text> {renderRole(account.roleId)}
          </Col>
          <Col span={24}>
            <Text strong>Ngày bắt đầu công tác:</Text>{" "}
            {dayjs(account.createAt).format("DD/MM/YYYY")}
          </Col>
          <Col span={24}>
            <Text type="secondary">Mã tài khoản: #{account.accId}</Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AccountDetailPage;
