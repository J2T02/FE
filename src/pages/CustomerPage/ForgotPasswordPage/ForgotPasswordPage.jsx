// File: src/pages/Account/ForgotPasswordStepPage.jsx
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  message,
  Row,
  Col,
  Steps,
} from "antd";
import {
  MailTwoTone,
  LockOutlined,
  SafetyCertificateOutlined,
  CheckCircleTwoTone,
  HeartTwoTone,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  forgotPasswordRequest,
  otpVerify,
  resetPassword,
} from "../../../apis/authService";
const { Title, Text } = Typography;

const ForgotPasswordStepPage = () => {
  const [step, setStep] = useState(0);
  const [otpCode, setOtpCode] = useState("123456");
  const [email, setEmail] = useState("");
  const [form] = Form.useForm();
  const [resendTimer, setResendTimer] = useState(0);
  const [passwordResetDone, setPasswordResetDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const validatePassword = (_, value) => {
    if (!value || value.length < 8) {
      return Promise.reject("Mật khẩu phải có ít nhất 8 ký tự");
    }
    if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
      return Promise.reject("Mật khẩu phải bao gồm chữ và số");
    }
    return Promise.resolve();
  };

  const handleEmailSubmit = async (values) => {
    try {
      const res = await forgotPasswordRequest({ emailOrPhone: values.email });
      if (res && res.data && res.data.success) {
        setEmail(values.email);
        setResendTimer(30);
        message.success(res.data.message || "Đã gửi mã OTP tới email");
        setStep(1);
      } else {
        message.error(res?.data?.message || "Gửi mã OTP thất bại");
      }
    } catch (err) {
      message.error("Gửi mã OTP thất bại");
    }
  };

  const handleResendOTP = async () => {
    if (!email) return;
    try {
      const res = await forgotPasswordRequest({ emailOrPhone: email });
      if (res && res.data && res.data.success) {
        setResendTimer(30);
        message.info(res.data.message || "Đã gửi lại mã OTP");
      } else {
        message.error(res?.data?.message || "Gửi lại mã OTP thất bại");
      }
    } catch (err) {
      message.error("Gửi lại mã OTP thất bại");
    }
  };

  const handleOTPSubmit = async (values) => {
    try {
      const res = await otpVerify({ emailOrPhone: email, otpCode: values.otp });
      if (res && res.data && res.data.success) {
        message.success(res.data.message || "Xác nhận mã OTP thành công!");
        setStep(2);
      } else {
        message.error(res?.data?.message || "Mã OTP không đúng!");
      }
    } catch (err) {
      message.error("Mã OTP không đúng!");
    }
  };

  const handleResetPassword = async (values) => {
    try {
      const res = await resetPassword({
        emailOrPhone: email,
        newPassword: values.newPassword,
      });
      if (res && res.data && res.data.success) {
        message.success(
          res.data.message || "Mật khẩu đã được đặt lại thành công!"
        );
        form.resetFields();
        setPasswordResetDone(true);
      } else {
        message.error(res?.data?.message || "Đặt lại mật khẩu thất bại!");
      }
    } catch (err) {
      message.error("Đặt lại mật khẩu thất bại!");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Form layout="vertical" onFinish={handleEmailSubmit}>
            <Form.Item
              label="📧 Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input placeholder="example@domain.com" size="large" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                style={{
                  backgroundColor: "#ff85a2",
                  borderColor: "#ff85a2",
                  borderRadius: 10,
                  fontWeight: 600,
                }}
              >
                Gửi mã OTP
              </Button>
            </Form.Item>
          </Form>
        );
      case 1:
        return (
          <Form layout="vertical" onFinish={handleOTPSubmit}>
            <Form.Item
              label="🔑 Mã OTP"
              name="otp"
              rules={[{ required: true, message: "Nhập mã OTP bạn nhận được" }]}
            >
              <Input placeholder="Nhập mã OTP" size="large" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                style={{
                  backgroundColor: "#ff85a2",
                  borderColor: "#ff85a2",
                  borderRadius: 10,
                  fontWeight: 600,
                }}
              >
                Xác nhận mã OTP
              </Button>
            </Form.Item>
            <div style={{ textAlign: "center" }}>
              {resendTimer > 0 ? (
                <Text type="secondary">Gửi lại mã sau {resendTimer}s</Text>
              ) : (
                <Button
                  type="link"
                  onClick={handleResendOTP}
                  style={{ padding: 0 }}
                >
                  🔁 Gửi lại mã OTP
                </Button>
              )}
            </div>
          </Form>
        );
      case 2:
        if (passwordResetDone) {
          return (
            <div style={{ textAlign: "center", paddingTop: 20 }}>
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ fontSize: 60 }}
              />
              <Title level={4} style={{ color: "#52c41a", marginTop: 12 }}>
                Mật khẩu đã được đặt lại thành công!
              </Title>
              <Text style={{ display: "block", marginTop: 8, color: "#888" }}>
                Mẹ yêu có thể đăng nhập lại bằng mật khẩu mới rồi nhé 💖
              </Text>
              <Button
                type="primary"
                size="large"
                style={{
                  marginTop: 24,
                  backgroundColor: "#ff85a2",
                  borderColor: "#ff85a2",
                  borderRadius: 10,
                }}
                onClick={() => navigate("/")}
              >
                Quay về trang đăng nhập
              </Button>
            </div>
          );
        }

        return (
          <Form form={form} layout="vertical" onFinish={handleResetPassword}>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ fontSize: 40 }}
              />
            </div>
            <Form.Item
              label="🔐 Mật khẩu mới"
              name="newPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu" },
                { validator: validatePassword },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Tối thiểu 8 ký tự, gồm chữ và số"
                size="large"
              />
            </Form.Item>
            <Form.Item
              label="✅ Xác nhận mật khẩu"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Mật khẩu xác nhận không khớp!");
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<SafetyCertificateOutlined />}
                placeholder="Nhập lại mật khẩu mới"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                style={{
                  backgroundColor: "#ff85a2",
                  borderColor: "#ff85a2",
                  borderRadius: 10,
                  fontWeight: 600,
                }}
              >
                Đặt lại mật khẩu
              </Button>
            </Form.Item>
          </Form>
        );
      default:
        return null;
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
          maxWidth: 1000,
          width: "100%",
          borderRadius: 24,
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(255, 105, 135, 0.2)",
          border: "1px solid #ffe0ec",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Row
          gutter={0}
          style={{
            height: "auto",
            minHeight: 500,
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          <Col
            xs={24}
            md={12}
            style={{
              backgroundColor: "#fff5f9",
              padding: 40,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Nút quay lại */}
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
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <Row justify="center" style={{ marginBottom: 12 }}>
                  <HeartTwoTone
                    twoToneColor="#ff6699"
                    style={{ fontSize: 42 }}
                  />
                </Row>
                <Title level={3} style={{ color: "#d63384", marginBottom: 8 }}>
                  Quên mật khẩu
                </Title>
                <Text style={{ color: "#ff6699" }}>
                  Mẹ yêu đừng lo, chúng tôi luôn sẵn sàng hỗ trợ 💌
                </Text>
              </div>

              <Steps
                current={step}
                size="small"
                style={{ marginBottom: 24 }}
                items={[
                  {
                    title: "Email",
                    icon: <MailTwoTone twoToneColor="#eb2f96" />,
                  },
                  {
                    title: "Xác nhận OTP",
                    icon: <SafetyCertificateOutlined />,
                  },
                  { title: "Đặt lại mật khẩu", icon: <LockOutlined /> },
                ]}
              />
              <Text
                style={{
                  display: "block",
                  textAlign: "center",
                  color: "#ff6699",
                  fontSize: 15,
                  marginBottom: 16,
                }}
              >
                {step === 0 && "📩 Vui lòng nhập email để đặt lại mật khẩu"}
                {step === 1 && "📨 Mã xác thực đã được gửi đến email của bạn"}
                {step === 2 && "🔐 Vui lòng đặt lại mật khẩu mới"}
              </Text>

              {renderStep()}
            </motion.div>
          </Col>

          <Col
            xs={0}
            md={12}
            style={{
              position: "relative",
              minHeight: 500,
              backgroundImage: `url("/doctorgroup.png")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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

export default ForgotPasswordStepPage;
