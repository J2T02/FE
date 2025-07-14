import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col,
  DatePicker,
  message,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  CheckCircleTwoTone,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const registerAccount = async (values) => {
  console.log("Register payload", values);
  return { success: true };
};
const verifyOtp = async (otp) => {
  return otp === "123456";
};

const { Title, Text } = Typography;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resendCount, setResendCount] = useState(0);
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    let interval;
    if (resendDisabled && step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [resendDisabled, timer, step]);

  const validatePassword = (_, value) => {
    if (!value || value.length < 8 || !/[A-Za-z]/.test(value) || !/\d/.test(value)) {
      return Promise.reject("Mật khẩu phải ≥ 8 ký tự và bao gồm chữ + số");
    }
    return Promise.resolve();
  };

  const validatePhone = (_, value) => {
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(value)) return Promise.reject("SĐT không hợp lệ (10 số)");
    return Promise.resolve();
  };

  const validateAge = (_, value) => {
    if (!value) return Promise.resolve();
    const age = dayjs().diff(value, "year");
    if (age < 18) {
      return Promise.reject("Người dùng phải từ 18 tuổi trở lên");
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    const payload = {
      ...values,
      Hus_YOB: values.Hus_YOB ? dayjs(values.Hus_YOB).format("YYYY-MM-DD") : null,
      Wife_YOB: values.Wife_YOB ? dayjs(values.Wife_YOB).format("YYYY-MM-DD") : null,
    };
    const res = await registerAccount(payload);
    if (res.success) {
      setEmail(values.Mail);
      setStep(2);
      form.resetFields();
      message.success("Chúng tôi đã gửi mã xác nhận đến email của bạn");
      setTimer(30);
      setResendDisabled(true);
      setResendCount(0);
    } else {
      message.error("Đăng ký thất bại, vui lòng thử lại");
    }
  };

  const handleVerifyOtp = async () => {
    const isValid = await verifyOtp(otp);
    if (isValid) {
      message.success("Xác nhận OTP thành công!");
      setStep(3);
    } else {
      message.error("Mã OTP không chính xác. Vui lòng thử lại.");
    }
  };

  const handleResendOtp = async () => {
    if (resendCount >= 10) {
      message.error("Bạn đã gửi lại mã quá 10 lần. Vui lòng thử lại sau.");
      return;
    }
    const res = await registerAccount({ Mail: email });
    if (res.success) {
      message.success("Đã gửi lại mã xác nhận đến email");
      setResendCount((prev) => prev + 1);
      setTimer(30);
      setResendDisabled(true);
    } else {
      message.error("Không thể gửi lại mã. Hãy thử lại sau.");
    }
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item label="👤 Tên tài khoản" name="Full_Name" rules={[{ required: true, message: "Nhập tên tài khoản" }]}>
            <Input prefix={<UserOutlined />} size="large" placeholder="Nhập tên tài khoản của bạn" />
          </Form.Item>

          <Form.Item label="📞 Số điện thoại" name="Phone" rules={[{ required: true, validator: validatePhone }]}>
            <Input prefix={<PhoneOutlined />} size="large" placeholder="Nhập số điện thoại của bạn" />
          </Form.Item>

          <Form.Item label="📧 Email" name="Mail" rules={[{ required: true, type: "email", message: "Email không hợp lệ" }]}>
            <Input prefix={<MailOutlined />} size="large" placeholder="Nhập Email của bạn" />
          </Form.Item>

          <Form.Item label="🔒 Mật khẩu" name="Password" rules={[{ required: true }, { validator: validatePassword }]}>
            <Input.Password prefix={<LockOutlined />} size="large" placeholder="Mật khẩu ít nhất 8 ký tự và bao gồm cả chữ và số" />
          </Form.Item>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label="👨 Họ tên chồng" name="Hus_Name">
                <Input placeholder="Nhập tên của chồng" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="📅 Ngày sinh chồng" name="Hus_YOB" rules={[{ validator: validateAge }]}>
                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" placeholder="Chọn ngày sinh của chồng" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label="👩 Họ tên vợ" name="Wife_Name">
                <Input placeholder="Nhập tên của vợ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="📅 Ngày sinh vợ" name="Wife_YOB" rules={[{ validator: validateAge }]}>
                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" placeholder="Chọn ngày sinh của vợ"/>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" style={{ backgroundColor: "#ff85a2", borderColor: "#ff85a2", borderRadius: 10 }}>
              Đăng ký ngay
            </Button>
          </Form.Item>
        </Form>
      );
    }

    if (step === 2) {
      return (
        <>
          <Title level={4} style={{ color: "#d63384" }}>
            Vui lòng nhập mã xác nhận đã gửi đến <Text strong>{email}</Text>
          </Title>
          <Text type="secondary" style={{ display: "block", marginBottom: 12 }}>
            Nếu không thấy email, hãy kiểm tra hộp thư rác hoặc thử lại sau vài phút.
          </Text>
          <Input
            placeholder="Nhập mã OTP gồm 6 chữ số"
            prefix={<SafetyCertificateOutlined />}
            size="large"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            style={{ marginBottom: 16 }}
          />
          <Button
            type="primary"
            size="large"
            block
            onClick={handleVerifyOtp}
            style={{ borderRadius: 10, backgroundColor: "#ff85a2", borderColor: "#ff85a2" }}
          >
            ✅ Xác nhận mã OTP
          </Button>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Button
              type="link"
              disabled={resendDisabled}
              onClick={handleResendOtp}
              style={{ padding: 0 }}
            >
              {resendDisabled ? `Gửi lại mã sau ${timer}s` : `📨 Gửi lại mã xác nhận`}
            </Button>
          </div>
        </>
      );
    }

    if (step === 3) {
      return (
        <div style={{ textAlign: "center", paddingTop: 20 }}>
          <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 60 }} />
          <Title level={3} style={{ marginTop: 16, color: "#52c41a" }}>
            Đăng ký thành công!
          </Title>
          <Text type="secondary">Bạn đã sẵn sàng bắt đầu hành trình điều trị, Con Yêu luôn sẵn sàng bên cạnh bạn, nâng niu mọi giấc mơ làm cha mẹ. 💕</Text>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/login")}
            style={{ marginTop: 24, borderRadius: 10, backgroundColor: "#ff85a2", borderColor: "#ff85a2" }}
          >
            Đến trang đăng nhập
          </Button>
        </div>
      );
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
        <Row gutter={0}>
          <Col
            xs={24}
            md={12}
            style={{
              backgroundColor: "#fff5f9",
              padding: 40,
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
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <Row justify="center" style={{ marginBottom: 12 }}>
                  <UserOutlined style={{ fontSize: 42, color: "#d63384" }} />
                </Row>
                <Title level={3} style={{ color: "#d63384" }}>
                  Đăng ký tài khoản
                </Title>
                <Text style={{ color: "#ff6699" }}>
                  Chào mừng bạn đến Con Yêu, ngôi nhà của những phép màu. 💗
                </Text>
              </div>
              {renderStepContent()}
            </motion.div>
          </Col>

          <Col
            xs={0}
            md={12}
            style={{
              position: "relative",
              minHeight: 500,
              backgroundImage: 'url("/Register.jpg")',
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

export default RegisterPage;
