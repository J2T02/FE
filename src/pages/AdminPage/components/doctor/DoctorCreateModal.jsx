import { Modal, Form, Input, Select, DatePicker } from "antd";

const { Option } = Select;

const DoctorCreateModal = ({ open, onCancel, onCreate }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const fullName = `${values.lastName} ${values.firstName}`;
        const doctor = {
          ...values,
          fullName,
          name: fullName,
          startDate: values.startDate.format("YYYY-MM-DD"),
        };
        onCreate(doctor);
        form.resetFields();
      })
      .catch(() => {});
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Thêm bác sĩ mới"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Thêm"
      cancelText="Hủy"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="lastName"
          label="Họ"
          rules={[{ required: true, message: "Vui lòng nhập họ" }]}
        >
          <Input placeholder="Nguyễn" />
        </Form.Item>

        <Form.Item
          name="firstName"
          label="Tên"
          rules={[{ required: true, message: "Vui lòng nhập tên" }]}
        >
          <Input placeholder="Văn A" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input placeholder="abc@example.com" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input placeholder="0912345678" />
        </Form.Item>

        <Form.Item
          name="specialty"
          label="Chuyên khoa"
          rules={[{ required: true, message: "Vui lòng chọn chuyên khoa" }]}
        >
          <Select placeholder="Chọn chuyên khoa">
            <Option value="Nhi khoa">Nhi khoa</Option>
            <Option value="Tim mạch">Tim mạch</Option>
            <Option value="Ngoại khoa">Ngoại khoa</Option>
            <Option value="Nội tiết">Nội tiết</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="startDate"
          label="Ngày vào làm"
          rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DoctorCreateModal;
