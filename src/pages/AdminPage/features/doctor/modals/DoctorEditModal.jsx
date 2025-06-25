import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  message,
} from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
// import { useDoctor } from "../context/DoctorContext"; // Không cần thiết nếu bạn chỉ dùng educationLevels tĩnh
import EducationSelector from "../components/EducationSelector"; // Đổi tên import
// Import từ tệp tiện ích mới
import { uploadFileToCloudinary } from "../../../../../utils/cloudinaryUtils";

const DoctorEditModal = ({ open, onCancel, onUpdate, initialValues }) => {
  const [form] = Form.useForm();
  // State mới cho tệp học vấn đã chọn (dùng cho upload mới)
  const [uploadedEducationFile, setUploadedEducationFile] = useState(null);
  // State để lưu thông tin tệp học vấn hiện có (nếu có)
  const [initialEducationFile, setInitialEducationFile] = useState(null);

  const handleEducationFileChange = (file) => {
    setUploadedEducationFile(file);
  };

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue({
        ...initialValues,
        yob: dayjs(initialValues.yob),
        eduId: initialValues.eduId, // Đặt giá trị eduId ban đầu
      });

      // Thiết lập tệp học vấn ban đầu nếu có filePathEdu
      if (initialValues.filePathEdu) {
        setInitialEducationFile({
          uid: "-1", // uid ảo
          name: "current_education_file.pdf", // Bạn có thể đặt tên file mặc định hoặc cố gắng lấy tên từ url nếu có
          status: "done",
          url: initialValues.filePathEdu,
        });
      } else {
        setInitialEducationFile(null);
      }
      setUploadedEducationFile(null); // Reset file đã chọn cho lần upload mới
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const { yob, eduId, ...restValues } = values; // Lấy eduId từ form, bỏ certificateIds

      let filePathEduToSave = initialValues.filePathEdu || ""; // Giữ lại filePathEdu cũ nếu không có tệp mới

      if (uploadedEducationFile) {
        // Nếu có tệp mới được chọn, upload tệp đó
        filePathEduToSave = await uploadFileToCloudinary(uploadedEducationFile);
      } else if (
        !initialValues.filePathEdu &&
        form.getFieldValue("eduId") && // Nếu trình độ học vấn được chọn
        initialEducationFile === null // Và không có file cũ nào được truyền vào (trường hợp xóa file cũ)
      ) {
        // Trường hợp trình độ học vấn được chọn nhưng người dùng xóa file hoặc không upload file nào
        // Bạn có thể xử lý tùy theo business logic: cho phép không có file, hoặc báo lỗi.
        // Ở đây, tôi sẽ đặt nó là rỗng nếu không có file mới và không có file cũ.
        filePathEduToSave = "";
      }

      const payload = {
        ...initialValues, // Giữ lại các trường không thay đổi như doctorId
        ...restValues,
        yob: yob.format("YYYY-MM-DD"),
        eduId: eduId,
        filePathEdu: filePathEduToSave,
      };

      await onUpdate(payload);
      message.success("Cập nhật thông tin bác sĩ thành công!");
      console.log("Payload gửi đi:", payload);
      form.resetFields();
      setUploadedEducationFile(null);
      setInitialEducationFile(null);
    } catch (err) {
      console.error("Lỗi khi cập nhật bác sĩ:", err);
      if (err.errorFields) {
        message.error(
          "Vui lòng điền đầy đủ và chính xác các thông tin bắt buộc."
        );
      } else {
        message.error(
          "Đã xảy ra lỗi trong quá trình cập nhật bác sĩ hoặc tải tệp."
        );
      }
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setUploadedEducationFile(null);
    setInitialEducationFile(null);
    onCancel();
  };

  return (
    <Modal
      title="Chỉnh sửa bác sĩ"
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
      okText="Cập nhật"
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

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          <Select placeholder="Chọn trạng thái">
            <Select.Option value={1}>Đang làm việc</Select.Option>
            <Select.Option value={2}>Nghỉ việc</Select.Option>
            <Select.Option value={3}>Nghỉ phép</Select.Option>
          </Select>
        </Form.Item>

        {/* Component chọn trình độ học vấn và upload file */}
        <EducationSelector
          form={form}
          onFileChange={handleEducationFileChange}
          initialEduId={initialValues?.eduId} // Truyền eduId ban đầu
          initialFilePathEdu={initialValues?.filePathEdu} // Truyền filePathEdu ban đầu
        />
      </Form>
    </Modal>
  );
};

export default DoctorEditModal;
