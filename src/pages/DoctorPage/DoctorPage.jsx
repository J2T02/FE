import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  CalendarOutlined,
  TeamOutlined,
  FileTextOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import DoctorHeader from "./components/DoctorHeader";
import DoctorStoreProvider from "./contexts/DoctorStoreProvider";
import ScheduleManagement from "./ScheduleManagement/ScheduleManagement";
import BookingManagement from "./BookingManagement/BookingManagement";
import PatientManagement from "./PatientManagement/PatientManagement";
import TreatmentplanManagement from "./TreatmentplanManagement/TreatmentplanManagement";

const { Sider, Content } = Layout;
const { Title } = Typography;

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
      label: "Quản lý booking",
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
          <div
            style={{
              height: 64,
              margin: 16,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            <img
              style={{ width: "153px", height: "53px" }}
              src="/Logo.png"
              alt="Logo"
            />
          </div>
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
