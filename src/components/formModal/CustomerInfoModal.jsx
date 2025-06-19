import { Modal, Form, Input, DatePicker, message } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
import { createCustomer } from "../../apis/authService";

const CustomerInfoModal = ({ open, onClose, onCreated, accId }) => {
  const [form] = Form.useForm();

  const validateOver18 = (_, value) => {
    if (!value) return Promise.reject("Vui lòng chọn ngày sinh");
    const age = dayjs().diff(value, "year");
    return age >= 18
      ? Promise.resolve()
      : Promise.reject("Người này phải đủ 18 tuổi");
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        accId,
        husName: values.husName,
        wifeName: values.wifeName,
        husYOB: values.husYOB.format("YYYY-MM-DD"),
        wifeYOB: values.wifeYOB.format("YYYY-MM-DD"),
      };

      const res = await createCustomer(payload);
      if (res.data.success) {
        message.success("Cập nhật thông tin thành công!");
        onCreated?.(res.data.data);
        onClose(); // ✅ Đóng modal khi thành công
      } else {
        message.error("Đã xảy ra lỗi khi lưu thông tin.");
      }
    } catch (err) {
      console.log("❌ Form validation error:", err);
    }
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      title="Cập nhật thông tin khách hàng"
      okText="Lưu thông tin"
      cancelText="Bỏ qua"
      destroyOnClose
    >
      <p style={{ marginBottom: 16, color: "#888" }}>
        Vui lòng điền thông tin để thuận tiện cho việc thăm khám và theo dõi hồ
        sơ.
      </p>
      <Form layout="vertical" form={form}>
        <Form.Item
          name="husName"
          label="Họ tên chồng"
          rules={[{ required: true, message: "Vui lòng nhập tên chồng" }]}
        >
          <Input placeholder="Ví dụ: Nguyễn Văn A" />
        </Form.Item>

        <Form.Item
          name="husYOB"
          label="Ngày sinh chồng"
          rules={[
            { required: true, message: "Vui lòng chọn ngày sinh chồng" },
            { validator: validateOver18 },
          ]}
        >
          <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày sinh" />
        </Form.Item>

        <Form.Item
          name="wifeName"
          label="Họ tên vợ"
          rules={[{ required: true, message: "Vui lòng nhập tên vợ" }]}
        >
          <Input placeholder="Ví dụ: Trần Thị B" />
        </Form.Item>

        <Form.Item
          name="wifeYOB"
          label="Ngày sinh vợ"
          rules={[
            { required: true, message: "Vui lòng chọn ngày sinh vợ" },
            { validator: validateOver18 },
          ]}
        >
          <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày sinh" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CustomerInfoModal;
