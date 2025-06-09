import { Layout, Menu, theme } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";
import { Button } from "antd";
import "./header.css";
function Header() {
  const { Header } = Layout;
  const { token } = theme.useToken();
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
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem) {
      console.log("Label:", selectedItem.label);
    }
  };
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 99,
        // width: "100%",
        // display: "flex",
        padding: 0,

        alignItems: "center",
        height: "83px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 50px",
        }}
      >
        <div
          className="demo-logo"
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => {
            console.log("về home");
          }}
        >
          <img
            style={{ width: "153px", height: "53px" }}
            src="/logo.png"
            alt=""
          />
        </div>
        <div>
          <Button
            style={{ backgroundColor: token.colorPrimary, color: "#fff" }}
          >
            Login
          </Button>
        </div>
      </div>
      <Menu
        // theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
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
        <Menu.Item className="custom-menu-item" style={{ borderRadius: "6px" }}>
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
    </Header>
  );
}

export default Header;
