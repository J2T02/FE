import React, { useState } from "react";
import { Button, Card, Checkbox, Form, Input, Typography, theme } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Title, Text, Link } = Typography;

const LoginModel = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { token } = theme.useToken();
  const onFinish = (values) => {
    setLoading(true);
    console.log("Login attempt:", values);

    // Simulate redirect
    setTimeout(() => {
      setLoading(false);
      // window.location.href = "#doctor-dashboard";
      navigate("/doctorDashBoard");
    }, 1500);
  };

  return (
    <div
      style={{
        backgroundColor: "#fffafc",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 48,
      }}
    >
      <Card
        title={
          <Title level={3} style={{ marginBottom: 0 }}>
            Sign in to your account
          </Title>
        }
        bordered={true}
        style={{
          width: 400,
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Form name="loginForm" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Tên đăng nhập"
            name="AccName"
            rules={[
              { required: true, message: "Nhập tên đăng nhập" },
              { type: "text", message: "Sai tên đăng nhập" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="bs.A" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="Password"
            rules={[{ required: true, message: "Nhập mật khẩu" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="••••••••"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Sign in
            </Button>
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link href="#">Quên mật khẩu</Link>
            <Link href="#">Contact IT</Link>
          </div>
        </Form>
      </Card>

      <div
        style={{
          position: "absolute",
          bottom: 16,
          textAlign: "center",
          width: "100%",
          color: "#888",
          fontSize: 12,
        }}
      >
        © 2025 Hệ thống Quản lý Điều trị Hiếm muộn. Bảo mật và quyền sở hữu bản
        quyền.
      </div>
    </div>
  );
};

export default LoginModel;
