import { Layout, Menu, theme, Button, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FaPhone } from "react-icons/fa6";
import { LuMessageCircleMore } from "react-icons/lu";
import { Dropdown, Space, Typography } from "antd";
import "./header.css";
import { useState } from "react";
import ItemHeader from "~components/header/itemHeader/ItemHeader";
import LoginModal from "~components/formModal/LoginModal";
import RegisterModal from "../formModal/RegisterModal";
import { useNavigate } from "react-router-dom";
function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { Header } = Layout;
  const { Search } = Input;
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const items = [
    { key: "0", label: "Bác sĩ", href: "#" },
    { key: "1", label: "Blog", href: "#" },
  ];
  const content = [
    {
      key: "1",
      label: "Item 1",
    },
    {
      key: "2",
      label: "Item 2",
    },
    {
      key: "3",
      label: "Item 3",
    },
  ];
  const handleMenuClick = (e) => {
    console.log(e.key);
    switch (e.key) {
      case "2":
        navigate("/service");
        break;

      default:
        break;
    }
  };
  const onSearch = (value) => {
    console.log(value);
  };
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 99,
        padding: 0,
        alignItems: "center",
        height: 170,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0 200px",
          padding: 20,
          borderBottom: `1px solid ${token.colorPrimary}`,
        }}
      >
        <div
          className="demo-logo"
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            style={{ width: "153px", height: "53px" }}
            src="/logo.jpg"
            alt=""
          />
        </div>
        <Search
          placeholder="Nhập từ khóa"
          allowClear
          enterButton
          onSearch={onSearch}
          style={{ width: 300 }}
        />
        <ItemHeader
          icon={
            <FaPhone style={{ fontSize: "23px", color: token.colorPrimary }} />
          }
          title="Đường dây nóng"
          content="1900565656"
        />
        <ItemHeader
          icon={
            <LuMessageCircleMore
              style={{ fontSize: "28px", color: token.colorPrimary }}
            />
          }
          title="Liên hệ"
          content="Hỗ trợ khách hàng"
        />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              fontWeight: 600,
              fontSize: 16,
              color: token.colorPrimary,
              cursor: "pointer",
            }}
            onClick={() => setIsRegisterModalOpen(true)}
          >
            Đăng Ký
          </div>
          <div
            style={{
              width: 2,
              backgroundColor: "#eee",
              height: 17,
            }}
          />
          <div
            style={{
              fontWeight: 600,
              fontSize: 16,
              color: token.colorPrimary,
              cursor: "pointer",
            }}
            onClick={() => setIsLoginModalOpen(true)}
          >
            Đăng nhập
          </div>
        </div>
      </div>
      <div style={{ paddingTop: 20 }}>
        <Menu
          // theme="dark"
          mode="horizontal"
          className="custom-menu"
          style={{
            flex: 1,
            minWidth: 0,
            justifyContent: "center",
            gap: "10px",
            paddingBottom: 15,
          }}
          onClick={handleMenuClick}
        >
          <Menu.Item
            key={2}
            className="custom-menu-item"
            style={{ borderRadius: "6px" }}
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

          <span className="underline" />
          {items.map((item, index) => (
            <Menu.Item
              key={index}
              className="custom-menu-item"
              style={{ borderRadius: "6px" }}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </div>
      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <RegisterModal
        open={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </Header>
  );
}

export default Header;
