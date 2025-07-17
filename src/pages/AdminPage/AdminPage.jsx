// src/pages/AdminPage/AdminPanel.jsx
import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, Typography, theme, message } from "antd";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  AppstoreOutlined,
  BarChartOutlined,
  UserSwitchOutlined,
  UserOutlined,
  CalendarOutlined,
  TeamOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { FaUserDoctor } from "react-icons/fa6";

import AdminHeader from "./components/AdminHeader";
import DoctorModule from "./features/doctor/DoctorModule";
import ServiceManagement from "./ServiceManagement/ServiceManagement";
import PatientManagement from "./PatientManagement/PatientManagement";
import BookingManagement from "./BookingManagement/BookingManagement";
import TreatmentplanManagement from "./TreatmentplanManagement/TreatmentplanManagement";
import ManagerDashboardPage from "./ManagerDashboardPage/ManagerDashboardPage";
import ManagerRevenueDashboardPage from "./ManagerRevenueDashboardPage/ManagerRevenueDashboardPage";
import ReceptionistManagement from "./ReceptionistManagement/ReceptionistManagement";
import ManagerList from "./ManagerList/ManagerList";

const { Sider, Content } = Layout;
const { Title } = Typography;

const AdminPanel = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const { token: themeToken } = theme.useToken();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded JWT:", decoded);

        // Chuyển role từ chuỗi sang số rõ ràng
        const roleNumber = decoded.role === "Admin" ? 1 : decoded.role === "Manager" ? 2 : null;

        setRole(roleNumber);
      } catch (error) {
        setRole(null);
        message.error("Token không hợp lệ, vui lòng đăng nhập lại.");
      }
    }
  }, []);

  const renderContent = () => {
    if (selectedKey === "3" && role !== 1) {
      return <Title level={3}>Bạn không có quyền truy cập mục này</Title>;
    }

    switch (selectedKey) {
      case "1":
        return <ManagerDashboardPage />;
      case "2":
        return <ManagerRevenueDashboardPage />;
      case "3":
        return <ManagerList />;
      case "4":
        return <DoctorModule />;
      case "5":
        return <ReceptionistManagement />;
      case "6":
        return <ServiceManagement />;
      case "7":
        return <PatientManagement />;
      case "8":
        return <TreatmentplanManagement />;
      case "9":
        return <BookingManagement />;
      default:
        return <Title level={3}>Chọn mục từ menu bên trái</Title>;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light">
        <div
          style={{
            height: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <Avatar size={64} icon={<UserOutlined />} />
          <div style={{ marginTop: 8, fontWeight: "bold" }}>Admin</div>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => setSelectedKey(key)}
        >
          <Menu.Item key="1" icon={<AppstoreOutlined style={{ fontSize: 20 }} />}>
            Tổng quan dịch vụ
          </Menu.Item>
          <Menu.Item key="2" icon={<BarChartOutlined style={{ fontSize: 20 }} />}>
            Doanh thu
          </Menu.Item>

          {role === 1 && (
            <Menu.Item key="3" icon={<UserSwitchOutlined style={{ fontSize: 20 }} />}>
              Danh sách quản lý
            </Menu.Item>
          )}

          <Menu.Item key="4" icon={<FaUserDoctor style={{ fontSize: 20 }} />}>
            Danh sách bác sĩ
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined style={{ fontSize: 20 }} />}>
            Danh sách lễ tân
          </Menu.Item>
          <Menu.Item key="6" icon={<AppstoreOutlined style={{ fontSize: 20 }} />}>
            Danh sách dịch vụ
          </Menu.Item>
          <Menu.Item key="7" icon={<TeamOutlined style={{ fontSize: 20 }} />}>
            Danh sách bệnh nhân
          </Menu.Item>
          <Menu.Item key="8" icon={<FileTextOutlined style={{ fontSize: 20 }} />}>
            Danh sách bệnh án
          </Menu.Item>
          <Menu.Item key="9" icon={<CalendarOutlined style={{ fontSize: 20 }} />}>
            Danh sách đặt lịch
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <AdminHeader />
        <Content style={{ margin: "24px 16px", padding: 24 }}>
          <div
            style={{
              backgroundColor: themeToken.colorBgPage,
              borderRadius: 12,
              minHeight: 600,
              padding: 24,
            }}
          >
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
