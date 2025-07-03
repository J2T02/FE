import React, { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Typography,
  message,
  theme,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const { Title, Text, Link } = Typography;
import { loginDoctor } from "../../../apis/doctorService";
const LoginModel = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { token } = theme.useToken();
  const onFinish = async (values) => {
    setLoading(true);
    await loginDoctor(values)
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.data.success && res.data.data.isActive) {
          const { accId, token } = res.data.data;
          Cookies.set("accDocId", accId);
          Cookies.set("token", token);
          message.success(res.data.message);
          navigate("/Doctorpage");
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    console.log("Login attempt:", values);

    // Simulate redirect
    // setTimeout(() => {
    //   setLoading(false);
    //   // window.location.href = "#doctor-dashboard";
    //   // navigate("/doctorDashBoard");
    // }, 1500);
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
            name="mailOrPhone"
            rules={[
              { required: true, message: "Email hoặc số điện thoại" },
              { type: "text", message: "Sai tên đăng nhập" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="bs.A" />
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
              Sign in
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

export default LoginModel;
