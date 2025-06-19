import { Card, Form, Select, DatePicker, Input, Button, message } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useDoctor } from "../context/DoctorContext";
import dayjs from "dayjs";

const { TextArea } = Input;

const DoctorScheduleForm = ({ defaultDoctorId, onAdd }) => {
  const [form] = Form.useForm();
  const { doctors, slots, schedules } = useDoctor();

  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  // Lọc ra bác sĩ có status === 1
  const activeDoctors = useMemo(
    () => doctors.filter((doc) => doc.status === 1),
    [doctors]
  );

  // Đặt bác sĩ mặc định nếu hợp lệ (đang làm việc)
  useEffect(() => {
    if (
      defaultDoctorId &&
      activeDoctors.some((doc) => doc.doctorId === defaultDoctorId)
    ) {
      setSelectedDoctorId(defaultDoctorId);
      form.setFieldsValue({ doctorId: defaultDoctorId });
    }
  }, [defaultDoctorId, activeDoctors, form]);

  const availableSlots = useMemo(() => {
    if (!selectedDoctorId || !selectedDate) return slots;

    const dateStr = selectedDate.format("YYYY-MM-DD");
    const existing = schedules.filter(
      (s) => s.doctorId === selectedDoctorId && s.date === dateStr
    );

    if (existing.some((s) => s.slotId === 3)) return [];

    const takenSlotIds = new Set(existing.map((s) => s.slotId));
    return slots.filter((slot) => !takenSlotIds.has(slot.id));
  }, [selectedDoctorId, selectedDate, schedules, slots]);

  const handleFinish = (values) => {
    const dateStr = values.date.format("YYYY-MM-DD");

    const isConflict = schedules.some(
      (s) =>
        s.doctorId === values.doctorId &&
        s.date === dateStr &&
        (s.slotId === values.slotId || s.slotId === 3)
    );

    if (isConflict) {
      message.error("Bác sĩ đã có lịch trong ca này. Vui lòng chọn ca khác.");
      return;
    }

    const schedule = {
      doctorId: values.doctorId,
      date: dateStr,
      slotId: values.slotId,
      note: values.note || "",
      isAvailable: true,
      maxBooking: 5,
    };

    onAdd?.(schedule);
    form.resetFields();
    form.setFieldsValue({ doctorId: defaultDoctorId });
    setSelectedDate(null);
  };

  return (
    <Card title="Thêm lịch làm việc">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ maxBooking: 5, isAvailable: true }}
      >
        <Form.Item
          name="doctorId"
          label="Bác sĩ"
          rules={[{ required: true, message: "Chọn bác sĩ" }]}
        >
          <Select
            placeholder="Chọn bác sĩ đang làm việc"
            onChange={(val) => {
              setSelectedDoctorId(val);
              setSelectedDate(null);
              form.setFieldsValue({ slotId: undefined, date: undefined });
            }}
          >
            {activeDoctors.map((doc) => (
              <Select.Option key={doc.doctorId} value={doc.doctorId}>
                {doc.doctorName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="date"
          label="Ngày"
          rules={[{ required: true, message: "Chọn ngày" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            onChange={(val) => {
              setSelectedDate(val);
              form.setFieldsValue({ slotId: undefined });
            }}
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />
        </Form.Item>

        <Form.Item
          name="slotId"
          label="Ca làm việc"
          rules={[{ required: true, message: "Chọn ca làm việc" }]}
        >
          <Select placeholder="Chọn ca" disabled={!selectedDate}>
            {availableSlots.length === 0 ? (
              <Select.Option disabled key="no-slot">
                Không còn ca nào khả dụng
              </Select.Option>
            ) : (
              availableSlots.map((slot) => (
                <Select.Option key={slot.id} value={slot.id}>
                  {slot.slotName} ({slot.start} - {slot.end})
                </Select.Option>
              ))
            )}
          </Select>
        </Form.Item>

        <Form.Item name="note" label="Ghi chú">
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={availableSlots.length === 0 || !activeDoctors.length}
          >
            Thêm lịch
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default DoctorScheduleForm;
