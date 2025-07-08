import React, { useState } from "react";
import { Button, Card, Form, Input, Typography, message, theme } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { signIn } from "../../../apis/authService";
const { Title, Text, Link } = Typography;

const ReceptionistLoginModel = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { token } = theme.useToken();
  const onFinish = async (values) => {
    setLoading(true);
    await signIn({ mailOrPhone: values.mailOrPhone, password: values.password })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          const { accId, token } = res.data.data;
          Cookies.set("accReceptionistId", accId);
          Cookies.set("token", token);
          message.success(res.data.message);
          navigate("/receptionist");
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        message.error("Đăng nhập thất bại");
      });
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
            Đăng nhập lễ tân
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
            name="mailOrPhone"
            rules={[
              { required: true, message: "Email hoặc số điện thoại" },
              { type: "text", message: "Sai tên đăng nhập" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="receptionist@example.com"
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
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

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Đăng nhập
            </Button>
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link href="#">Quên mật khẩu</Link>
            <Link href="#">Contact IT</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ReceptionistLoginModel;
