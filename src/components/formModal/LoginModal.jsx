import { Modal, Form, Input, Button } from "antd";
import { signIn } from "../../apis/authService";
const LoginModal = ({ open, onClose, setUserId }) => {
  const handleFinish = async (values) => {
    console.log("Thông tin đăng nhập:", values);
    const body = {
      userName: values.email,
      password: values.password,
    };
    // await signIn(body).then((res) => {
    //   console.log(res.data);
    // });
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
          label="user name"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập username!" },
            { type: "text", message: "user name không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập tài khoản" />
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
