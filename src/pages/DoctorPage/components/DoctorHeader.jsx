import {
  Layout,
  Typography,
  Badge,
  Avatar,
  Dropdown,
  theme,
  Space,
  Divider,
} from "antd";
import {
  BellOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { DoctorStoreContext } from "../contexts/DoctorStoreProvider";

const { Header } = Layout;
const { Title, Text } = Typography;

const DoctorHeader = () => {
  const { token } = theme.useToken();
  const context = useContext(DoctorStoreContext);

  if (!context) return null;

  const { doctorInfo, handleLogout } = context;

  const [notifications, setNotifications] = useState([
    { id: 1, content: "Có lịch khám mới lúc 10:00 sáng mai" },
    { id: 2, content: "Một bệnh nhân vừa check-in" },
  ]);
  const [unreadCount, setUnreadCount] = useState(2);

  const notificationItems = notifications.length
    ? notifications.map((item) => ({
        key: item.id,
        label: item.content,
      }))
    : [
        {
          key: "no-noti",
          label: "Không có thông báo",
          disabled: true,
        },
      ];

  const avatarItems = [
    {
      key: "profile",
      label: "Hồ sơ cá nhân",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      onClick: () => {
        if (handleLogout) handleLogout();
      },
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications((prev) => [
        ...prev,
        { id: prev.length + 1, content: "Thông báo mới đến!" },
      ]);
      setUnreadCount((count) => count + 1);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  const handleMenuClick = ({ key }) => {
    const item = avatarItems.find((i) => i.key === key);
    if (item?.onClick) item.onClick();
  };

  return (
    <Header
      style={{
        padding: "16px 24px",
        minHeight: 80,
        lineHeight: "normal",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: token.colorBgBase,
        borderBottom: "1px solid #f0f0f0",
        zIndex: 99,
      }}
    >
      {/* LEFT SIDE */}
      <div>
        <Title level={3} style={{ margin: 0, color: "#d6336c" }}>
          Trang Bác Sĩ
        </Title>
        <Text type="secondary" style={{ fontSize: 13 }}>
          Quản lý lịch trình, bệnh nhân và điều trị
        </Text>
      </div>

      {/* RIGHT SIDE */}
      <Space align="center" size="large">
        <Space size="middle">
          <PhoneOutlined style={{ color: token.colorPrimary }} />
          <Text strong>1900 123 456</Text>
        </Space>

        <Space size="middle">
          <MailOutlined style={{ color: token.colorPrimary }} />
          <Text strong>support@clinic.vn</Text>
        </Space>

        <Dropdown
          menu={{ items: notificationItems }}
          trigger={["click"]}
          placement="bottomRight"
          onOpenChange={(open) => {
            if (open) {
              setUnreadCount(0);
            }
          }}
        >
          <Badge count={unreadCount} size="small">
            <BellOutlined
              style={{ fontSize: 20, cursor: "pointer", color: "#555" }}
            />
          </Badge>
        </Dropdown>

        <Divider type="vertical" />

        <Dropdown
          menu={{ items: avatarItems, onClick: handleMenuClick }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: 8,
            }}
          >
            <Avatar
              size="small"
              src={doctorInfo?.accountInfo?.img || null}
              icon={!doctorInfo?.accountInfo?.img && <UserOutlined />}
              style={{ backgroundColor: token.colorPrimary }}
            />
            <div style={{ lineHeight: 1.2 }}>
              <span style={{ fontWeight: "bold", fontSize: 12 }}>Bác sĩ</span>
              <br />
              <span
                style={{
                  fontWeight: 500,
                  color: "rgb(107 114 128)",
                  fontSize: 12,
                }}
              >
                {doctorInfo?.accountInfo?.fullName || "unknown"}
              </span>
            </div>
          </div>
        </Dropdown>
      </Space>
    </Header>
  );
};

export default DoctorHeader;
