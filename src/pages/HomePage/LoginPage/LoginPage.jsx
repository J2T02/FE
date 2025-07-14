import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Row,
  Col,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { FaHeartPulse } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

// ✅ Giả lập API login trả về Role_ID
const fakeLogin = async ({ identifier, password }) => {
  const mockAccounts = [
    { identifier: "admin", password: "12345678", role: 1 },
    { identifier: "manager", password: "12345678", role: 2 },
    { identifier: "reception", password: "12345678", role: 3 },
    { identifier: "customer", password: "12345678", role: 4 },
    { identifier: "doctor", password: "12345678", role: 5 },
  ];

  const matched = mockAccounts.find(
    (acc) =>
      acc.identifier.toLowerCase() === identifier.toLowerCase() &&
      acc.password === password
  );

  if (matched) {
    return {
      success: true,
      token: "fake-token",
      name: matched.identifier,
      role: matched.role,
    };
  } else {
    return { success: false, message: "Tài khoản hoặc mật khẩu không đúng" };
  }
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // ✅ Điều hướng theo vai trò
  const handleRedirectByRole = (role) => {
    switch (role) {
      case 1:
      case 2:
        navigate("/admin");
        break;
      case 3:
        navigate("/receptionist");
        break;
      case 4:
        navigate("/customerpage");
        break;
      case 5:
        navigate("/doctorpage");
        break;
      default:
        message.warning("Vai trò không xác định!");
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    const { identifier, password } = values;
    const res = await fakeLogin({ identifier, password });

    if (res.success) {
      message.success("Đăng nhập thành công!");
      // Có thể lưu token vào localStorage nếu dùng thật
      // localStorage.setItem("token", res.token);
      handleRedirectByRole(res.role);
    } else {
      message.error(res.message || "Đăng nhập thất bại");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fff0f5, #fff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 32,
      }}
    >
      <Card
        style={{
          maxWidth: 900,
          width: "100%",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(255, 105, 135, 0.2)",
          border: "1px solid #ffe0ec",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Row gutter={0}>
          <Col
            xs={24}
            md={12}
            style={{
              backgroundColor: "#fff5f9",
              padding: 48,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                fontWeight: "bold",
                color: "#d63384",
              }}
              onClick={() => navigate(-1)}
            >
              Quay lại
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <Row justify="center" style={{ marginBottom: 12 }}>
                  <FaHeartPulse size={42} color="#d63384" />
                </Row>
                <Title level={3} style={{ color: "#d63384" }}>
                  Chào mừng quay trở lại
                </Title>
                <Text style={{ color: "#ff6699" }}>
                  Vui lòng đăng nhập để tiếp tục hành trình 💕
                </Text>
              </div>

              <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item
                  label="👤 Tên tài khoản / Email / Số điện thoại"
                  name="identifier"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thông tin đăng nhập",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    size="large"
                    placeholder="Nhập tên tài khoản, email hoặc số điện thoại"
                  />
                </Form.Item>

                <Form.Item
                  label="🔒 Mật khẩu"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    size="large"
                    placeholder="Nhập mật khẩu"
                  />
                </Form.Item>

                <Form.Item style={{ marginBottom: 8 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    loading={loading}
                    style={{
                      backgroundColor: "#ff85a2",
                      borderColor: "#ff85a2",
                      borderRadius: 10,
                    }}
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>

                <div style={{ textAlign: "center" }}>
                  <Text type="secondary">
                    Quên mật khẩu?{" "}
                    <Text
                      underline
                      strong
                      style={{ cursor: "pointer", color: "#d63384" }}
                      onClick={() => navigate("/forgotpassword")}
                    >
                      Khôi phục tại đây
                    </Text>
                  </Text>
                </div>
              </Form>
            </motion.div>
          </Col>

          <Col
            xs={0}
            md={12}
            style={{
              position: "relative",
              minHeight: 500,
              backgroundImage: 'url("/Login.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(255, 192, 203, 0.3)",
                zIndex: 1,
              }}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default LoginPage;
