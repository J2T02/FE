import { Modal, Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const DoctorEditModal = ({ open, onCancel, onUpdate, doctor }) => {
  const [form] = Form.useForm();

  // Cập nhật form mỗi khi doctor thay đổi
  if (doctor) {
    form.setFieldsValue({
      lastName: doctor.fullName?.split(" ")[0] || "",
      firstName: doctor.fullName?.split(" ").slice(1).join(" ") || "",
      email: doctor.email,
      phone: doctor.phone,
      specialty: doctor.specialty,
      startDate: dayjs(doctor.startDate),
    });
  }

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const updated = {
          ...doctor,
          fullName: `${values.lastName} ${values.firstName}`,
          name: `${values.lastName} ${values.firstName}`,
          email: values.email,
          phone: values.phone,
          specialty: values.specialty,
          startDate: values.startDate.format("YYYY-MM-DD"),
        };
        onUpdate(updated);
        form.resetFields();
      })
      .catch(() => {});
  };

  return (
    <Modal
      title="Chỉnh sửa bác sĩ"
      open={open}
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          name="lastName"
          label="Họ"
          rules={[{ required: true, message: "Vui lòng nhập họ" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="firstName"
          label="Tên"
          rules={[{ required: true, message: "Vui lòng nhập tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input />
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
          <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DoctorEditModal;
