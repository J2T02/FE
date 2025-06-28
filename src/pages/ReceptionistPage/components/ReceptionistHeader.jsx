import { Layout, Typography, Badge, Avatar, theme, Dropdown } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const { Header } = Layout;
const { Title } = Typography;

const ReceptionistHeader = () => {
  const { token } = theme.useToken();

  const [notifications, setNotifications] = useState([]);

  const [unreadCount, setUnreadCount] = useState(notifications.length);

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
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications((prev) => [
        ...prev,
        { id: prev.length + 1, content: "Thông báo mới từ hệ thống!" },
      ]);
      setUnreadCount((count) => count + 1);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Header
      style={{
        paddingLeft: 24,
        paddingRight: 24,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: token.colorBgBase,
      }}
    >
      <Title level={2} style={{ margin: 0 }}>
        Trang lễ tân
      </Title>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
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
            <BellOutlined style={{ fontSize: 20, cursor: "pointer" }} />
          </Badge>
        </Dropdown>

        <div
          style={{
            width: 1,
            height: 24,
            backgroundColor: token.colorBorderSecondary,
          }}
        />

        <Dropdown
          menu={{ items: avatarItems }}
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
              icon={<UserOutlined />}
              style={{ backgroundColor: token.colorPrimary }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                lineHeight: 1.2,
              }}
            >
              <span style={{ fontWeight: "bold", fontSize: 12 }}>Receptionist</span>
              <span
                style={{
                  fontWeight: 500,
                  color: "rgb(107 114 128)",
                  fontSize: 12,
                }}
              >
                Trần Thị B
              </span>
            </div>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default ReceptionistHeader;
