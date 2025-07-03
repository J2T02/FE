import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  CalendarOutlined,
  TeamOutlined,
  FileTextOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { FaUserDoctor } from "react-icons/fa6";
import DoctorHeader from "./components/DoctorHeader";
import DoctorStoreProvider from "./contexts/DoctorStoreProvider";

const { Sider, Content, Header } = Layout;
const { Title } = Typography;
function DoctorPage() {
  const [selectedKey, setSelectedKey] = useState("1");

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <Title>Dashboard</Title>;
      case "2":
        return <Title level={3}>Quản lý lịch làm việc</Title>;
      case "3":
        return <Title level={3}>Quản lý hồ sơ bệnh nhân</Title>;
      case "4":
        return <Title level={3}>Quản lý bệnh án</Title>;
      default:
        return <Title level={3}>Chọn mục từ menu bên trái</Title>;
    }
  };

  return (
    <DoctorStoreProvider>
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
            Doctor Panel
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={({ key }) => setSelectedKey(key)}
          >
            <Menu.Item key="1" icon={<FaUserDoctor style={{ fontSize: 20 }} />}>
              DashBoard
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<CalendarOutlined style={{ fontSize: 20 }} />}
            >
              Lịch làm việc
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined style={{ fontSize: 20 }} />}>
              Hồ sơ bệnh nhân
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<FileTextOutlined style={{ fontSize: 20 }} />}
            >
              Bệnh án
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
          <DoctorHeader />
          <Content style={{ margin: "24px 16px", padding: 24 }}>
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </DoctorStoreProvider>
  );
}

export default DoctorPage;
