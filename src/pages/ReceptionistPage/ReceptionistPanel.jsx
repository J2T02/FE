import React, { useState, useContext } from "react";
import { Layout, Menu, Typography, Avatar } from "antd";
import {
  CalendarOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ReceptionistHeader from "./components/ReceptionistHeader.jsx";
import BookingManagement from "./BookingManagement/BookingManagement";
import TreatmentplanManagement from "./TreatmentplanManagement/TreatmentplanManagement";
import ReceptionistStoreProvider, {
  ReceptionistStoreContext,
} from "./contexts/ReceptionistStoreProvider";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const SidebarLogo = () => {
  const context = useContext(ReceptionistStoreContext);
  const navigate = useNavigate();

  if (!context) return null;

  const { receptionistInfo } = context;
  const avatarUrl = receptionistInfo?.img || null;
  const fullName = receptionistInfo?.fullName || "Lễ tân";

  const handleAvatarClick = () => {
    navigate("/receptionistprofile"); // Điều hướng khi click avatar
  };

  return (
    <div
      style={{
        height: 100,
        margin: 16,
        textAlign: "center",
        cursor: "pointer",
      }}
      onClick={handleAvatarClick}
    >
      <Avatar
        src={avatarUrl}
        icon={!avatarUrl && <UserOutlined />}
        size={80}
        style={{ marginBottom: 8 }}
      />
      <Text strong style={{ display: "block", fontSize: 14 }}>
        {fullName}
      </Text>
    </div>
  );
};

const ReceptionistPanel = () => {
  const [selectedKey, setSelectedKey] = useState("1");

  const menuItems = [
    {
      key: "1",
      icon: <CalendarOutlined style={{ fontSize: 20 }} />,
      label: "Quản lý booking",
    },
    {
      key: "2",
      icon: <FileTextOutlined style={{ fontSize: 20 }} />,
      label: "Quản lý hồ sơ bệnh án",
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <BookingManagement />;
      case "2":
        return <TreatmentplanManagement />;
      default:
        return <Title level={3}>Vui lòng chọn mục từ menu bên trái</Title>;
    }
  };

  return (
    <ReceptionistStoreProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider theme="light" width={220} style={{ paddingTop: 16 }}>
          <SidebarLogo />
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={({ key }) => setSelectedKey(key)}
            items={menuItems}
            style={{ fontSize: 16 }}
          />
        </Sider>
        <Layout style={{ background: "#f9f9f9" }}>
          <ReceptionistHeader />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 360,
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </ReceptionistStoreProvider>
  );
};

export default ReceptionistPanel;
