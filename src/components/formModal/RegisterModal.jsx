import { Modal, Form, Input, Button, message } from "antd";
import { register } from "../../apis/authService";
const RegisterModal = ({ open, onClose }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    console.log("Thông tin đăng ký:", values);
    const body = {
      fullName: values.fullName,
      password: values.password,
      phone: values.phone,
      mail: values.email,
    };
    console.log("body:", body);
    await register(body)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          message.success(res.data.message);
          onClose();
          form.resetFields();
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Đăng Ký Thất Bại");
      });
  };

  return (
    <Modal
      title="Đăng ký tài khoản"
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      centered
      maskClosable
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập Họ tên đầy đủ!" }]}
        >
          <Input placeholder="Nguyễn Văn An" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          hasFeedback
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            {
              pattern: /^[0-9]{9,11}$/,
              message: "Số điện thoại không hợp lệ!",
            },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

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

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegisterModal;
