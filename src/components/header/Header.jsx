import { useEffect, useState, useContext } from "react";
import {
  Layout,
  Menu,
  theme,
  Button,
  Input,
  Avatar,
  Dropdown,
  Space,
  Typography,
  Divider,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { MdEditCalendar } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import "./header.css";
import ItemHeader from "~components/header/itemHeader/ItemHeader";
import LoginModal from "~components/formModal/LoginModal";
import RegisterModal from "../formModal/RegisterModal";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../contexts/StoreProvider";
import { UserOutlined } from "@ant-design/icons";
import { LuHistory } from "react-icons/lu";

// --- TopBar Component ---
const TopBar = () => (
  <div
    style={{
      width: "100%",
      background: "#d35b7b",
      color: "#fff",
      fontSize: 13,
      height: 32,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      zIndex: 100,
    }}
  ></div>
);

function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { Header } = Layout;
  const { Search } = Input;
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const { userInfo, setAccId, handleLogout, customerInfo } =
    useContext(StoreContext);
  const [isSticky, setIsSticky] = useState(false);

  // Scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 120); // 120px là chiều cao header trước khi co
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    { key: "0", label: "Bác sĩ", href: "#" },
    { key: "1", label: "Blog", href: "#" },
  ];
  const content = [
    {
      key: "1",
      label: "IVF",
    },
    {
      key: "2",
      label: "IUI",
    },
  ];
  const handleMenuClick = (e) => {
    switch (e.key) {
      case "0":
        navigate("/doctors");
        break;
      case "1":
        navigate("/blog");
        break;
      case "2":
        navigate("/services");
        break;
      default:
        navigate("/");
        break;
    }
  };
  const onSearch = (value) => {
    // Tùy chỉnh logic search nếu cần
  };

  return (
    <>
      <TopBar />
      <Header
        style={{
          position: isSticky ? "fixed" : "sticky",
          top: 0,
          zIndex: 999,
          width: "100%",
          background: "#fff",
          boxShadow: isSticky ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
          transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
          padding: 0,
          height: isSticky ? 70 : 120,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="header-inner"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0 auto",
            padding: isSticky ? "8px 0" : 20,
            minHeight: isSticky ? 60 : 120,
            width: "100%",
            maxWidth: 1200,
            transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
          }}
        >
          <div
            className="demo-logo"
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
              marginRight: isSticky ? 24 : 12,
              marginLeft: isSticky ? 0 : 12,
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              style={{
                width: isSticky ? "120px" : "150px",
                height: isSticky ? "48px" : "60px",
                transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
                marginLeft: isSticky ? 0 : 0,
                marginRight: isSticky ? 0 : 0,
              }}
              src="/Logo.png"
              alt="logo"
            />
          </div>

          <Menu
            mode="horizontal"
            className="custom-menu"
            style={{
              flex: 1,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              background: "transparent",
              border: "none",
              boxShadow: "none",
            }}
            onClick={handleMenuClick}
            selectedKeys={[]}
          >
            <Menu.Item
              key={2}
              className="custom-menu-item"
              style={{
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Dropdown
                menu={{
                  items: content,
                  selectable: true,
                  defaultSelectedKeys: ["1"],
                }}
              >
                <Typography.Link>
                  <Space>
                    Dịch vụ
                    <DownOutlined />
                  </Space>
                </Typography.Link>
              </Dropdown>
            </Menu.Item>
            {items.map((item, index) => (
              <Menu.Item
                key={index}
                className="custom-menu-item"
                style={{
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                {item.label}
              </Menu.Item>
            ))}
          </Menu>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flex: "none",
            }}
          >
            {customerInfo ? (
              <>
                <Button
                  type="primary"
                  shape="default"
                  icon={
                    <MdEditCalendar
                      size={20}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  }
                  style={{
                    width: 25,
                    height: 25,
                    background: "#d35b7b",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
                  }}
                  onClick={() => navigate("/booking")}
                />
                <Dropdown
                  placement="bottomRight"
                  menu={{
                    items: [
                      {
                        key: "profile",
                        icon: <IoSettingsOutline style={{ fontSize: 20 }} />,
                        label: "Hồ sơ",
                        onClick: () => navigate("/customerdetail"),
                      },
                      {
                        key: "historyBooking",
                        icon: <LuHistory style={{ fontSize: 20 }} />,
                        label: "Lịch sử đặt lịch",
                        onClick: () => navigate("/customer/booking"),
                      },
                      {
                        key: "Logout",
                        icon: (
                          <IoIosLogOut
                            style={{ fontSize: 20, color: token.colorError }}
                          />
                        ),
                        label: "Đăng xuất",
                        onClick: handleLogout,
                      },
                    ],
                  }}
                >
                  <div
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginLeft: 10,
                    }}
                  >
                    <Avatar
                      src={userInfo.img || null}
                      icon={!userInfo.img && <UserOutlined />}
                      style={{ backgroundColor: token.colorPrimary }}
                    />
                    <span
                      style={{ fontWeight: 600, color: token.colorPrimary }}
                    >
                      {userInfo.fullName || "Tài khoản"}
                    </span>
                  </div>
                </Dropdown>
              </>
            ) : (
              <>
                <Button
                  type="primary"
                  shape="default"
                  icon={
                    <MdEditCalendar
                      size={20}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  }
                  style={{
                    width: 25,
                    height: 25,
                    background: "#d35b7b",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
                  }}
                  onClick={() => navigate("/booking")}
                />
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Button
                    type="text"
                    style={{
                      borderRadius: 20,
                      fontWeight: 600,
                      fontSize: 14,
                      padding: isSticky ? "4px 14px" : "8px 20px",
                      color: token.colorPrimary,
                    }}
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    Đăng nhập
                  </Button>
                  <div
                    style={{
                      width: 1,
                      height: 20,
                      backgroundColor: "#d9d9d9",
                    }}
                  />
                  <Button
                    type="text"
                    style={{
                      borderRadius: 20,
                      fontWeight: 600,
                      fontSize: 14,
                      padding: isSticky ? "4px 14px" : "8px 20px",
                      color: token.colorPrimary,
                    }}
                    onClick={() => setIsRegisterModalOpen(true)}
                  >
                    Đăng ký
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </Header>
      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        setAccId={setAccId}
      />
      <RegisterModal
        open={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </>
  );
}

export default Header;
