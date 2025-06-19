import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  message,
} from "antd";
import { useDoctor } from "../context/DoctorContext";
import CertificateSelector from "../components/CertificateSelector";

const DoctorCreateModal = ({ open, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  const { certificates } = useDoctor();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        yob: values.yob.format("YYYY-MM-DD"),
        certificateIds: values.certificateIds || [],
      };
      onCreate(payload);
      form.resetFields();
    } catch (err) {
      message.error("Vui lòng điền đầy đủ thông tin");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Thêm bác sĩ mới"
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
      okText="Thêm"
      cancelText="Huỷ"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="doctorName"
          label="Họ và tên"
          rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
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
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            {
              pattern: /^[0-9]{9,15}$/,
              message: "Số điện thoại phải từ 9 đến 15 chữ số",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Giới tính"
          rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
        >
          <Select placeholder="Chọn giới tính">
            <Select.Option value={1}>Nam</Select.Option>
            <Select.Option value={2}>Nữ</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="yob"
          label="Ngày sinh"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="experience"
          label="Số năm kinh nghiệm"
          rules={[
            { required: true, message: "Vui lòng nhập số năm kinh nghiệm" },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <CertificateSelector />
      </Form>
    </Modal>
  );
};

export default DoctorCreateModal;
