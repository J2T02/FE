import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  CalendarOutlined,
  TeamOutlined,
  FileTextOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { FaUserDoctor } from "react-icons/fa6";
import AdminHeader from "./components/AdminHeader";
import DoctorModule from "./features/doctor/DoctorModule";
import ServiceManagement from "./ServiceManagement/ServiceManagement";
import PatientManagement from "./PatientManagement/PatientManagement";
import BookingManagement from "./BookingManagement/BookingManagement";
import TreatmentplanManagement from "./TreatmentplanManagement/TreatmentplanManagement";
const { Sider, Content, Header } = Layout;
const { Title } = Typography;

const AdminPanel = () => {
  const [selectedKey, setSelectedKey] = useState("1");

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <DoctorModule />;
      case "2":
        return <BookingManagement/>;
      case "3":
        return <PatientManagement/>;
      case "4":
        return <TreatmentplanManagement/>;
      case "5":
        return <ServiceManagement/>;
      default:
        return <Title level={3}>Chọn mục từ menu bên trái</Title>;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light">
        <div
          style={{
            height: 64,
            margin: 16,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Admin Panel
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => setSelectedKey(key)}
        >
          <Menu.Item key="1" icon={<FaUserDoctor style={{ fontSize: 20 }} />}>
            Quản lý bác sĩ
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<CalendarOutlined style={{ fontSize: 20 }} />}
          >
            Quản lý booking
          </Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined style={{ fontSize: 20 }} />}>
            Quản lý bệnh nhân
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<FileTextOutlined style={{ fontSize: 20 }} />}
          >
            Quản lý hồ sơ bệnh nhân
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<AppstoreOutlined style={{ fontSize: 20 }} />}
          >
            Quản lý dịch vụ
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <AdminHeader />
        <Content style={{ margin: "24px 16px", padding: 24 }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
