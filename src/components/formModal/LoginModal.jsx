import { Modal, Form, Input, Button, message } from "antd";
import { signIn } from "../../apis/authService";
import Cookies from "js-cookie";
const LoginModal = ({ open, onClose, setAccId }) => {
  const handleFinish = async (values) => {
    const body = {
      mailOrPhone: values.email,
      password: values.password,
    };
    await signIn(body)
      .then((res) => {
        if (res.data.success) {
          const { token, accId } = res.data.data;
          Cookies.set("accId", accId);
          Cookies.set("token", token);
          setAccId(accId);
          onClose(); // Đóng modal sau khi đăng nhập
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
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
