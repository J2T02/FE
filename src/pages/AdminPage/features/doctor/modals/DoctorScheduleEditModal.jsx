import { Modal, Form, Select, InputNumber, Switch, Input } from "antd";
import { useEffect } from "react";
import { useDoctor } from "../context/DoctorContext";

const { TextArea } = Input;

const DoctorScheduleEditModal = ({ open, schedule, onCancel, onUpdate }) => {
  const [form] = Form.useForm();
  const { slots } = useDoctor();

  useEffect(() => {
    if (schedule) {
      form.setFieldsValue({
        slotId: schedule.slotId,
        note: schedule.note,
        isAvailable: schedule.isAvailable,
        maxBooking: schedule.maxBooking,
      });
    }
  }, [schedule, form]);

  const handleOk = () => {
    form.validateFields().then((values) => {
      onUpdate?.({
        ...schedule,
        ...values,
      });
      form.resetFields();
    });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel?.();
  };

  return (
    <Modal
      title="Chỉnh sửa ca làm việc"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Lưu"
      cancelText="Huỷ"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="slotId"
          label="Ca làm việc"
          rules={[{ required: true, message: "Chọn ca làm" }]}
        >
          <Select placeholder="Chọn ca">
            {slots.map((slot) => (
              <Select.Option key={slot.id} value={slot.id}>
                {slot.slotName} ({slot.start} - {slot.end})
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="note" label="Ghi chú">
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="isAvailable"
          label="Khả năng tiếp nhận cuộc hẹn"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="maxBooking"
          label="Số lượng cuộc hẹn tối đa"
          rules={[{ required: true, message: "Nhập số lượng" }]}
        >
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DoctorScheduleEditModal;
