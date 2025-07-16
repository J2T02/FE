// src/pages/AdminPage/components/AdminHeader.jsx
import { Layout, Typography, Badge, Avatar, theme, Dropdown } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Title, Text } = Typography;

const AdminHeader = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    { id: 1, content: "Có đơn hàng mới!" },
    { id: 2, content: "Người dùng A vừa đăng ký." },
  ]);
  const [unreadCount, setUnreadCount] = useState(2);

  const notificationItems = notifications.map((item) => ({
    key: item.id,
    label: item.content,
  }));

  const avatarItems = [
    {
      key: "profile",
      label: "Hồ sơ cá nhân",
    },
    {
      key: "logout",
      label: "Đăng xuất",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications((prev) => [
        ...prev,
        { id: prev.length + 1, content: "Thông báo mới đến!" },
      ]);
      setUnreadCount((count) => count + 1);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Header
      style={{
        height: 140,
        padding: "0 48px",
        backgroundImage: "url('/admin-header.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Lớp phủ làm mờ để thấy rõ nội dung */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255,255,255,0.75)",
          zIndex: 1,
        }}
      />

      {/* Nội dung header */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Trái: Tiêu đề */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            marginLeft: 32,
          }}
        >
          <Title
            level={4}
            style={{ margin: 0, fontWeight: 700, color: "#d6336c" }}
          >
            Trang quản lý bệnh viện
          </Title>
          <Text style={{ fontSize: 12, color: "#444" }}>
            Hệ thống hỗ trợ điều trị hiếm muộn Con Yêu
          </Text>
        </div>

        {/* Giữa: Logo */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            textAlign: "center",
          }}
        >
          <img src="/Logo.png" alt="Logo" style={{ height: 60 }} />
        </div>

        {/* Phải: Hỗ trợ, thông báo, avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {/* Hỗ trợ */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "right",
            }}
          >
            <Text strong style={{ fontSize: 13, color: "#000" }}>
              📞 Hỗ trợ: 1900 6750
            </Text>
            <Text style={{ fontSize: 13, color: "#000" }}>
              ✉️ Email: support@conyeu.vn
            </Text>
          </div>

          {/* Thông báo */}
          <Dropdown
            menu={{ items: notificationItems }}
            trigger={["click"]}
            placement="bottomRight"
            onOpenChange={(open) => {
              if (open) setUnreadCount(0);
            }}
          >
            <Badge count={unreadCount} size="small" offset={[0, 4]}>
              <BellOutlined
                style={{ fontSize: 20, color: "#000", cursor: "pointer" }}
              />
            </Badge>
          </Dropdown>

          {/* Avatar */}
          <Dropdown
            menu={{
              items: avatarItems,
              onClick: ({ key }) => {
                if (key === "logout") {
                  navigate("/");
                }
              },
            }}
            trigger={["click"]}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <Avatar
                icon={<UserOutlined />}
                style={{
                  backgroundColor: "#f78db3",
                  color: "#fff",
                }}
              />
              <div style={{ lineHeight: 1.2 }}>
                <div
                  style={{ fontWeight: "bold", fontSize: 13, color: "#000" }}
                >
                  Admin
                </div>
                <div style={{ fontSize: 12, color: "#000" }}>Nguyễn Văn A</div>
              </div>
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default AdminHeader;
