import React, { useState, useContext } from "react";
import { Layout, Menu, Typography, Avatar } from "antd";
import {
  CalendarOutlined,
  TeamOutlined,
  FileTextOutlined,
  ScheduleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import DoctorHeader from "./components/DoctorHeader";
import DoctorStoreProvider, {
  DoctorStoreContext,
} from "./contexts/DoctorStoreProvider";

import ScheduleManagement from "./ScheduleManagement/ScheduleManagement";
import BookingManagement from "./BookingManagement/BookingManagement";
import PatientManagement from "./PatientManagement/PatientManagement";
import TreatmentplanManagement from "./TreatmentplanManagement/TreatmentplanManagement";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const SidebarLogo = () => {
  const context = useContext(DoctorStoreContext);
  const navigate = useNavigate();

  if (!context) return null;

  const { doctorInfo } = context;
  console.log(doctorInfo);
  console.log(doctorInfo);
  const avatarUrl = doctorInfo?.accountInfo?.img || null;
  const fullName = doctorInfo?.accountInfo?.fullName || "Bác sĩ";

  const handleAvatarClick = () => {
    navigate(`/doctorpage/doctordetail/${doctorInfo.docId}`); // 👉 Điều hướng khi click avatar
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
        src={doctorInfo?.acc?.img}
        icon={!doctorInfo?.acc?.img && <UserOutlined />}
        size={80}
        style={{ marginBottom: 8 }}
      />
      <Text strong style={{ display: "block", fontSize: 14 }}>
        {doctorInfo?.acc?.fullName}
      </Text>
    </div>
  );
};

const DoctorPanel = () => {
  const [selectedKey, setSelectedKey] = useState("1");

  const menuItems = [
    {
      key: "1",
      icon: <ScheduleOutlined style={{ fontSize: 20 }} />,
      label: "Lịch làm việc",
    },
    {
      key: "2",
      icon: <CalendarOutlined style={{ fontSize: 20 }} />,
      label: "Quản lý lịch hẹn",
    },
    {
      key: "3",
      icon: <TeamOutlined style={{ fontSize: 20 }} />,
      label: "Quản lý bệnh nhân",
    },
    {
      key: "4",
      icon: <FileTextOutlined style={{ fontSize: 20 }} />,
      label: "Hồ sơ điều trị",
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <ScheduleManagement />;
      case "2":
        return <BookingManagement />;
      case "3":
        return <PatientManagement />;
      case "4":
        return <TreatmentplanManagement />;
      default:
        return <Title level={3}>Chọn mục từ menu bên trái</Title>;
    }
  };

  return (
    <DoctorStoreProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider theme="light" width={220} style={{ paddingTop: 16 }}>
          <SidebarLogo sr />
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={({ key }) => setSelectedKey(key)}
            items={menuItems}
            style={{ fontSize: 16 }}
          />
        </Sider>
        <Layout style={{ background: "#f9f9f9" }}>
          <DoctorHeader />
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
    </DoctorStoreProvider>
  );
};

export default DoctorPanel;
