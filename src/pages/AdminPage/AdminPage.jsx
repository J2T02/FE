import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  TeamOutlined,
  FileTextOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import AdminHeader from "./components/AdminHeader";
import DoctorManagement from "./components/DoctorManagement";

const { Sider, Content, Header } = Layout;
const { Title } = Typography;

const AdminPanel = () => {
  const [selectedKey, setSelectedKey] = useState("1");

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <DoctorManagement />;
      case "2":
        return <Title level={3}>Quản lý booking</Title>;
      case "3":
        return <Title level={3}>Quản lý bệnh nhân</Title>;
      case "4":
        return <Title level={3}>Quản lý hồ sơ bệnh nhân</Title>;
      case "5":
        return <Title level={3}>Quản lý dịch vụ</Title>;
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
          <Menu.Item key="1" icon={<UserOutlined />}>
            Quản lý bác sĩ
          </Menu.Item>
          <Menu.Item key="2" icon={<CalendarOutlined />}>
            Quản lý booking
          </Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined />}>
            Quản lý bệnh nhân
          </Menu.Item>
          <Menu.Item key="4" icon={<FileTextOutlined />}>
            Quản lý hồ sơ bệnh nhân
          </Menu.Item>
          <Menu.Item key="5" icon={<AppstoreOutlined />}>
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
