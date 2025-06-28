import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import { CalendarOutlined, FileTextOutlined } from "@ant-design/icons";
import ReceptionistHeader from "./components/ReceptionistHeader.jsx";
import BookingManagement from "./BookingManagement/BookingManagement";
import TreatmentplanManagement from "./TreatmentplanManagement/TreatmentplanManagement";

const { Sider, Content } = Layout;
const { Title } = Typography;

const ReceptionistPanel = () => {
  const [selectedKey, setSelectedKey] = useState("1");

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
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light">
        <div
          style={{
            height: 64,
            margin: 16,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
            color: "#1677ff",
          }}
        >
          <img
            style={{ width: "153px", height: "53px" }}
            src="/Logo.png"
            alt=""
          />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => setSelectedKey(key)}
        >
          <Menu.Item key="1" icon={<CalendarOutlined style={{ fontSize: 20 }} />}>
            Quản lý booking
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined style={{ fontSize: 20 }} />}>
            Quản lý hồ sơ bệnh án
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <ReceptionistHeader />
        <Content style={{ margin: "24px 16px", padding: 24 }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ReceptionistPanel;
