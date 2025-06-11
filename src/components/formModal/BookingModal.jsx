import { Modal, Form, Select, Button, Input, DatePicker, message } from "antd";
import { useEffect, useState } from "react";

const BookingModal = ({
  open,
  onClose,
  doctors = [],
  schedules = [],
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [filteredSchedules, setFilteredSchedules] = useState([]);

  const handleDoctorChange = (doctorId) => {
    const filtered = schedules.filter(
      (s) => s.Doc_ID === doctorId && s.isAvailable
    );
    setFilteredSchedules(filtered);
    form.setFieldsValue({ DS_ID: undefined }); // reset DS_ID khi đổi bác sĩ
  };

  const handleFinish = (values) => {
    onSubmit?.(values);
    form.resetFields();
    onClose();
    message.success("Đặt lịch thành công");
  };

  return (
    <Modal
      title="Đặt lịch khám"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      maskClosable
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          label="Chọn bác sĩ"
          name="Doc_ID"
          rules={[{ required: true, message: "Vui lòng chọn bác sĩ!" }]}
        >
          <Select placeholder="Chọn bác sĩ" onChange={handleDoctorChange}>
            {doctors.map((doc) => (
              <Select.Option key={doc.Doc_ID} value={doc.Doc_ID}>
                {doc.Doc_Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Chọn thời gian khám"
          name="DS_ID"
          rules={[{ required: true, message: "Vui lòng chọn lịch khám!" }]}
        >
          <Select placeholder="Chọn thời gian">
            {filteredSchedules.map((sch) => (
              <Select.Option key={sch.DS_ID} value={sch.DS_ID}>
                {`${sch.WorkDate} (${sch.Slot_Start} - ${sch.Slot_End}) - Phòng ${sch.Room_Number}`}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Ghi chú" name="Note">
          <Input.TextArea placeholder="Ghi chú thêm (nếu có)" rows={3} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Xác nhận đặt lịch
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookingModal;
