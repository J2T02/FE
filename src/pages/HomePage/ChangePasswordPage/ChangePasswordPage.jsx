// File: src/pages/Account/ChangePasswordPage.jsx
import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message, Row, Col } from "antd";
import {
  LockOutlined,
  KeyOutlined,
  SafetyCertificateOutlined,
  HeartTwoTone,
  CheckCircleTwoTone,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../apis/authService";
const { Title, Text } = Typography;

const ChangePasswordPage = () => {
  const [form] = Form.useForm();
  const [passwordChanged, setPasswordChanged] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (_, value) => {
    if (!value || value.length < 8) {
      return Promise.reject("Mật khẩu cần ít nhất 8 ký tự");
    }
    if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
      return Promise.reject("Mật khẩu cần bao gồm chữ và số");
    }
    return Promise.resolve();
  };

  const onFinish = async (values) => {
    const { oldPassword, newPassword, confirmPassword } = values;
    try {
      const payload = {
        currentPassword: oldPassword,
        newPassword,
        confirmPassword,
      };
      const response = await changePassword(payload);
      if (response && response.data.success) {
        message.success(response.message || "Đổi mật khẩu thành công!");
        form.resetFields();
        setPasswordChanged(true);
      } else {
        message.error(response.message || "Đổi mật khẩu thất bại!");
      }
    } catch (error) {
      message.error(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          "Có lỗi xảy ra khi đổi mật khẩu!"
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
        <Row gutter={0} style={{ height: "auto", minHeight: 500 }}>
          {/* LEFT SIDE - FORM */}
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
              key={passwordChanged ? "done" : "form"}
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
                  Đổi mật khẩu
                </Title>
                <Text style={{ color: "#ff6699" }}>
                  Bảo vệ tài khoản, bảo vệ hành trình làm mẹ 💗
                </Text>
              </div>

              {passwordChanged ? (
                <div style={{ textAlign: "center", paddingTop: 12 }}>
                  <CheckCircleTwoTone
                    twoToneColor="#52c41a"
                    style={{ fontSize: 60 }}
                  />
                  <Title level={4} style={{ color: "#52c41a", marginTop: 12 }}>
                    Đổi mật khẩu thành công!
                  </Title>
                  <Text
                    style={{ display: "block", marginTop: 8, color: "#888" }}
                  >
                    Bạn có thể tiếp tục hành trình tuyệt vời của mình 💕
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
                    Quay về trang chính
                  </Button>
                </div>
              ) : (
                <>
                  <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                      label="🔑 Mật khẩu hiện tại"
                      name="oldPassword"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu cũ",
                        },
                      ]}
                    >
                      <Input.Password
                        prefix={<KeyOutlined />}
                        placeholder="Nhập mật khẩu cũ"
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item
                      label="🔐 Mật khẩu mới"
                      name="newPassword"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu mới",
                        },
                        { validator: validatePassword },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Tối thiểu 8 ký tự, gồm chữ & số"
                        size="large"
                      />
                    </Form.Item>

                    <Form.Item
                      label="✅ Xác nhận mật khẩu"
                      name="confirmPassword"
                      dependencies={["newPassword"]}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng xác nhận lại mật khẩu",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              "Mật khẩu xác nhận không trùng!"
                            );
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
                        Lưu mật khẩu mới
                      </Button>
                    </Form.Item>
                  </Form>

                  <div style={{ textAlign: "center", marginTop: 12 }}>
                    <Text type="secondary" style={{ fontSize: 13 }}>
                      🌸 Mẹ vững niềm tin con sẽ được sinh...
                    </Text>
                  </div>
                </>
              )}
            </motion.div>
          </Col>

          {/* RIGHT SIDE - IMAGE */}
          <Col
            xs={0}
            md={12}
            style={{
              position: "relative",
              minHeight: 500,
              backgroundImage: 'url("/momy.png")',
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

export default ChangePasswordPage;
