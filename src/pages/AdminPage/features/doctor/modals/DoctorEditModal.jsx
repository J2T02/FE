// // modals/DoctorEditModal.jsx
// import { Modal, Form, Input, DatePicker, Select } from "antd";
// import dayjs from "dayjs";
// import { useEffect } from "react";

// const DoctorEditModal = ({ open, doctor, onCancel, onUpdate }) => {
//   const [form] = Form.useForm();

//   useEffect(() => {
//     if (doctor) {
//       form.setFieldsValue({
//         ...doctor,
//         startDate: dayjs(doctor.startDate),
//       });
//     }
//   }, [doctor, form]);

//   const handleOk = () => {
//     form.validateFields().then((values) => {
//       onUpdate({
//         ...doctor,
//         ...values,
//         startDate: values.startDate.format("YYYY-MM-DD"),
//       });
//       form.resetFields();
//     });
//   };

//   return (
//     <Modal
//       title="Chỉnh sửa bác sĩ"
//       open={open}
//       onCancel={() => {
//         form.resetFields();
//         onCancel();
//       }}
//       onOk={handleOk}
//       okText="Lưu"
//       cancelText="Huỷ"
//     >
//       <Form form={form} layout="vertical">
//         <Form.Item
//           name="fullName"
//           label="Họ và tên"
//           rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="email"
//           label="Email"
//           rules={[{ required: true, message: "Vui lòng nhập email" }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="phone"
//           label="Số điện thoại"
//           rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="specialty"
//           label="Chuyên khoa"
//           rules={[{ required: true, message: "Vui lòng chọn chuyên khoa" }]}
//         >
//           <Select placeholder="Chọn chuyên khoa">
//             <Select.Option value="IVF">IVF</Select.Option>
//             <Select.Option value="IUI">IUI</Select.Option>
//             <Select.Option value="Khác">Khác</Select.Option>
//           </Select>
//         </Form.Item>

//         <Form.Item
//           name="startDate"
//           label="Ngày bắt đầu làm việc"
//           rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
//         >
//           <DatePicker style={{ width: "100%" }} />
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default DoctorEditModal;

import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  message,
} from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useDoctor } from "../context/DoctorContext";
import CertificateSelector from "../components/CertificateSelector";

const DoctorEditModal = ({ open, onCancel, onUpdate, initialValues }) => {
  const [form] = Form.useForm();
  const { certificates } = useDoctor();

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue({
        ...initialValues,
        yob: dayjs(initialValues.yob),
        certificateIds: initialValues.certificateIds || [],
      });
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...initialValues,
        ...values,
        yob: values.yob.format("YYYY-MM-DD"),
        certificateIds: values.certificateIds || [],
      };
      onUpdate(payload);
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
              pattern: /^[0-9]{10,11}$/,
              message: "Số điện thoại phải có 10–11 chữ số",
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

        <CertificateSelector />
      </Form>
    </Modal>
  );
};

export default DoctorEditModal;
