// src/components/LoginModal.jsx

import { Modal, Form, Input, Button } from "antd";

const LoginModal = ({ open, onClose, setUserId }) => {
  const handleFinish = (values) => {
    console.log("Thông tin đăng nhập:", values);
    setUserId(1);
    onClose(); // Đóng modal sau khi đăng nhập
  };

  return (
    <Modal
      title="Đăng nhập hệ thống"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      maskClosable
    >
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;
