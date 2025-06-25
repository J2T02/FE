import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  message,
  Upload, // Import Upload
  Button, // Import Button for Upload
} from "antd";
import { UploadOutlined } from "@ant-design/icons"; // Import icon for Upload button
import { useState } from "react";
// Import từ tệp tiện ích mới
import { uploadFileToCloudinary } from "../../../../../utils/cloudinaryUtils";
import EducationSelector from "../components/EducationSelector";

const DoctorCreateModal = ({ open, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  const [uploadedEducationFile, setUploadedEducationFile] = useState(null); // State mới cho tệp học vấn

  const handleEducationFileChange = (file) => {
    setUploadedEducationFile(file);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const { yob, eduId, ...restValues } = values; // Lấy eduId từ form, bỏ certificateIds

      let filePathEdu = "";
      if (uploadedEducationFile) {
        // Chỉ upload nếu có tệp được chọn
        filePathEdu = await uploadFileToCloudinary(uploadedEducationFile);
      }

      const payload = {
        ...restValues,
        yob: yob.format("YYYY-MM-DD"),
        eduId: eduId, // Thêm eduId vào payload
        filePathEdu: filePathEdu, // Thêm filePathEdu vào payload
      };

      onCreate(payload);
      console.log("Payload gửi đi:", payload);
      form.resetFields();
      setUploadedEducationFile(null); // Reset tệp đã tải lên
    } catch (err) {
      console.error("Lỗi khi tạo bác sĩ:", err);
      if (err.errorFields) {
        message.error(
          "Vui lòng điền đầy đủ và chính xác các thông tin bắt buộc."
        );
      } else {
        message.error(
          "Đã xảy ra lỗi trong quá trình tạo bác sĩ hoặc tải tệp học vấn."
        );
      }
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setUploadedEducationFile(null); // Reset tệp khi hủy
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

        {/* Component chọn trình độ học vấn và upload file */}
        <EducationSelector
          form={form}
          onFileChange={handleEducationFileChange}
        />
      </Form>
    </Modal>
  );
};

export default DoctorCreateModal;
