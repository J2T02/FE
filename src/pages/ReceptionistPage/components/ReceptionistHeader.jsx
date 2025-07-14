import {
  Layout,
  Typography,
  Badge,
  Avatar,
  Dropdown,
  theme,
  Space,
  Divider,
  Tooltip,
} from "antd";
import {
  BellOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { ReceptionistStoreContext } from "../contexts/ReceptionistStoreProvider";

const { Header } = Layout;
const { Title, Text } = Typography;

const ReceptionistHeader = () => {
  const { token } = theme.useToken();
  const context = useContext(ReceptionistStoreContext);
  // console.log(context);
  // if (!context) return null;

  const { receptionistInfo, handleLogout } = context;
  console.log(receptionistInfo);
  // 👉 Link ảnh nền và logo
  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1588776814546-ec7a1f2c3441?auto=format&fit=crop&w=1600&q=80";
  const logoImageUrl = "/Logo.png";

  const [notifications, setNotifications] = useState([
    { id: 1, content: "🕙 Lịch khám mới lúc 10:00 sáng mai" },
    { id: 2, content: "🧑‍⚕️ Bệnh nhân Nguyễn Văn A vừa check-in" },
  ]);
  const [unreadCount, setUnreadCount] = useState(2);

  const notificationItems = notifications.length
    ? notifications.map((item) => ({
        key: item.id,
        label: <Text style={{ fontSize: 13 }}>{item.content}</Text>,
      }))
    : [
        {
          key: "no-noti",
          label: <Text type="secondary">Không có thông báo</Text>,
          disabled: true,
        },
      ];

  const avatarItems = [
    {
      key: "profile",
      icon: <ProfileOutlined />,
      label: "Hồ sơ cá nhân",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
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
        { id: prev.length + 1, content: "🔔 Thông báo mới đến!" },
      ]);
      setUnreadCount((count) => count + 1);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleMenuClick = ({ key }) => {
    const item = avatarItems.find((i) => i.key === key);
    if (item?.onClick) item.onClick();
  };

  return (
    <Header
      style={{
        position: "relative",
        padding: "16px 24px",
        minHeight: 120,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderBottom: "1px solid #f0f0f0",
        overflow: "hidden",
        zIndex: 99,
      }}
    >
      {/* 👉 Ảnh nền RÕ, không làm mờ */}
      <img
        src="/Header.png"
        alt="Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* 👉 Logo nằm giữa header */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
        <img
          src={logoImageUrl}
          alt="Logo"
          style={{
            width: 160,
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* 👉 Nội dung chính */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        {/* LEFT */}
        <div>
          <Title level={3} style={{ margin: 0, color: "#d6336c" }}>
            Trang Lễ Tân
          </Title>
          <Text type="secondary" style={{ fontSize: 13, color: "#444" }}>
            Quản lý lịch trình và bệnh án hiệu quả
          </Text>
        </div>

        {/* RIGHT */}
        <Space align="center" size="large">
          <Space size="middle">
            <Tooltip title="Hotline hỗ trợ">
              <PhoneOutlined style={{ color: token.colorPrimary }} />
            </Tooltip>
            <Text strong style={{ fontSize: 13 }}>
              1900 123 456
            </Text>
          </Space>

          <Space size="middle">
            <Tooltip title="Email hỗ trợ">
              <MailOutlined style={{ color: token.colorPrimary }} />
            </Tooltip>
            <Text strong style={{ fontSize: 13 }}>
              support@clinic.vn
            </Text>
          </Space>

          <Dropdown
            menu={{ items: notificationItems }}
            trigger={["click"]}
            placement="bottomRight"
            onOpenChange={(open) => open && setUnreadCount(0)}
          >
            <Badge count={unreadCount} size="small" offset={[-2, 2]}>
              <BellOutlined
                style={{
                  fontSize: 20,
                  cursor: "pointer",
                  color: unreadCount ? "#fa541c" : "#555",
                }}
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
                gap: 10,
                padding: "4px 8px",
                borderRadius: 6,
                background: "#f9fafb",
              }}
            >
              <Avatar
                size="small"
                src={receptionistInfo?.img || null}
                icon={!receptionistInfo?.img && <UserOutlined />}
                style={{ backgroundColor: token.colorPrimary }}
              />
              <div style={{ lineHeight: 1.2 }}>
                <span style={{ fontWeight: "bold", fontSize: 13 }}>Lễ tân</span>
                <br />
                <span
                  style={{
                    fontWeight: 500,
                    color: "rgb(107 114 128)",
                    fontSize: 12,
                  }}
                >
                  {receptionistInfo?.fullName || "Chưa rõ tên"}
                </span>
              </div>
            </div>
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
};

export default ReceptionistHeader;
