import React, { useContext, useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  Row,
  Col,
  message,
  Space,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../contexts/StoreProvider";
import { motion } from "framer-motion";
import {
  signIn,
  loginByGoogle,
  loginByGoogleCallback,
} from "../../../apis/authService";
import Cookies from "js-cookie";
import { FcGoogle } from "react-icons/fc";

const { Title, Text } = Typography;

const LoginPage = () => {
  const { setAccCusId } = useContext(StoreContext);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleRedirectByRole = (role) => {
    console.log("Redirecting with role:", role, "type:", typeof role);
    const numericRole = parseInt(role, 10);

    switch (numericRole) {
      case 1:
      case 2:
        console.log("Redirecting to admin");
        navigate("/admin");
        break;
      case 3:
        console.log("Redirecting to receptionist");
        navigate("/receptionist");
        break;
      case 4:
        console.log("Redirecting to home");
        navigate("/");
        break;
      case 5:
        console.log("Redirecting to doctor page");
        navigate("/doctorpage");
        break;
      default:
        console.log("Unknown role for redirect:", numericRole);
        message.warning("Vai trò không xác định!");
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    const { identifier, password } = values;

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const isPhone = /^\d{9,11}$/.test(identifier);

    if (!isEmail && !isPhone) {
      message.error("Vui lòng đăng nhập bằng email hoặc số điện thoại hợp lệ!");
      setLoading(false);
      return;
    }

    const body = {
      mailOrPhone: identifier,
      password: password,
    };

    await signIn(body)
      .then((res) => {
        if (res.data.success) {
          const { token, accId, roleId } = res.data.data;

          switch (roleId) {
            case 1:
              Cookies.set("accAdId", accId);
              Cookies.set("token", token);
              break;
            case 2:
              Cookies.set("accManaId", accId);
              Cookies.set("token", token);
              break;
            case 3:
              Cookies.set("accRecepId", accId);
              Cookies.set("token", token);
              break;
            case 4:
              Cookies.set("accCusId", accId);
              Cookies.set("token", token);
              setAccCusId(accId);
              break;
            case 5:
              Cookies.set("accDocId", accId);
              Cookies.set("token", token);
              break;
            default:
              break;
          }

          message.success("Đăng nhập thành công!");

          if (roleId) {
            handleRedirectByRole(roleId);
          } else {
            navigate("/");
          }
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err.message || "Đăng nhập thất bại");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await loginByGoogle();
      const url = res?.data?.url;
      if (!url) {
        message.error("Không lấy được link đăng nhập Google");
        return;
      }

      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        url,
        "GoogleLogin",
        `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars=yes,status=1`
      );

      if (!popup) {
        message.error("Không thể mở cửa sổ đăng nhập Google");
        return;
      }

      // ✅ Lắng nghe phản hồi từ popup
      const handleMessage = (event) => {
        if (!event.origin.includes("localhost")) return;

        const { token, accId, roleId } = event.data || {};

        if (token && accId && roleId !== undefined) {
          // 👉 Lưu cookie
          Cookies.set("token", token);

          // Convert roleId to number if it's a string
          const numericRoleId = parseInt(roleId, 10);
          console.log("Numeric roleId:", numericRoleId);

          switch (numericRoleId) {
            case 1:
              Cookies.set("accAdId", accId);
              break;
            case 2:
              Cookies.set("accManaId", accId);
              break;
            case 3:
              Cookies.set("accRecepId", accId);
              break;
            case 4:
              Cookies.set("accCusId", accId);
              setAccCusId(accId);
              break;
            case 5:
              Cookies.set("accDocId", accId);
              break;
            default:
              break;
          }

          // 👉 Xoá sự kiện và đóng popup
          window.removeEventListener("message", handleMessage);

          // Fix Cross-Origin-Opener-Policy error by checking if popup is still accessible
          try {
            if (popup && !popup.closed) {
              popup.close();
            }
          } catch (error) {
            console.log("Could not close popup:", error.message);
          }

          // ✅ Redirect based on role
          handleRedirectByRole(numericRoleId);
        }
      };

      window.addEventListener("message", handleMessage);
    } catch (err) {
      message.error("Không thể đăng nhập bằng Google");
    }
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
              onClick={() => navigate("/")}
            >
              Quay lại
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <Row justify="center" style={{ marginBottom: 24 }}>
                  <img
                    src="/Logo.png"
                    alt="Logo bệnh viện"
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "contain",
                    }}
                  />
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
                  label="👤 Email / Số điện thoại"
                  name="identifier"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email hoặc số điện thoại",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    size="large"
                    placeholder="Nhập email hoặc số điện thoại"
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
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Button
                    block
                    icon={<FcGoogle size={22} style={{ marginRight: 8 }} />}
                    style={{
                      borderRadius: 10,
                      border: "1px solid #d63384",
                      color: "#d63384",
                    }}
                    onClick={handleGoogleLogin}
                  >
                    Đăng nhập bằng Google
                  </Button>
                </Space>

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
