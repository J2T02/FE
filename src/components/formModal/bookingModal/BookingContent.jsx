import { Form, Select, DatePicker, Radio, Input } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const BookingContent = ({ form, services, doctors, schedules, doctor }) => {
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [filteredShifts, setFilteredShifts] = useState([]);

  const handleServiceChange = (serviceId) => {
    const relevantDoctors = doctors.filter((doc) =>
      doc.serviceIds.includes(serviceId)
    );
    setFilteredDoctors(relevantDoctors);
    form.setFieldsValue({
      doctorId: undefined,
      workDate: undefined,
      shift: undefined,
    });
  };

  const handleDoctorChange = (doctorId) => {
    const doctorSchedules = schedules.filter(
      (s) => s.Doc_ID === doctorId && s.isAvailable
    );
    const uniqueDates = [...new Set(doctorSchedules.map((s) => s.WorkDate))];
    setAvailableDates(uniqueDates);
    form.setFieldsValue({ workDate: undefined, shift: undefined });
  };

  const handleDateChange = (date) => {
    const workDate = date.format("YYYY-MM-DD");
    const doctorId = form.getFieldValue("doctorId");
    const dailySchedules = schedules.filter(
      (s) => s.Doc_ID === doctorId && s.WorkDate === workDate && s.isAvailable
    );

    const shifts = [
      {
        label: "Sáng",
        value: "morning",
        available:
          dailySchedules.filter((s) => s.Slot === "morning").length < 10,
      },
      {
        label: "Chiều",
        value: "afternoon",
        available:
          dailySchedules.filter((s) => s.Slot === "afternoon").length < 10,
      },
    ];

    setFilteredShifts(shifts);
    form.setFieldsValue({ shift: undefined });
  };

  const disabledDate = (current) => {
    const today = dayjs().startOf("day");
    return (
      current &&
      (current < today ||
        !availableDates.includes(current.format("YYYY-MM-DD")))
    );
  };
  useEffect(() => {
    if (doctor?.serviceId && doctor?.doctorId) {
      const relevantDoctors = doctors.filter((doc) =>
        doc.serviceIds.includes(doctor.serviceId)
      );
      setFilteredDoctors(relevantDoctors);

      form.setFieldsValue({
        serviceId: doctor.serviceId,
        doctorId: doctor.doctorId,
      });

      // Lấy available dates cho bác sĩ đã chọn
      const doctorSchedules = schedules.filter(
        (s) => s.Doc_ID === doctor.doctorId && s.isAvailable
      );
      const uniqueDates = [...new Set(doctorSchedules.map((s) => s.WorkDate))];
      setAvailableDates(uniqueDates);
    }
  }, [doctor, doctors, schedules]);

  return (
    <Form layout="vertical" form={form} name="step1">
      <Form.Item
        label="Chọn dịch vụ"
        name="serviceId"
        rules={[{ required: true, message: "Vui lòng chọn dịch vụ" }]}
      >
        <Select placeholder="Chọn dịch vụ" onChange={handleServiceChange}>
          {services?.map((s) => (
            <Select.Option key={s.Ser_ID} value={s.Ser_ID}>
              {s.Ser_Name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Chọn bác sĩ"
        name="doctorId"
        rules={[{ required: true, message: "Vui lòng chọn bác sĩ" }]}
      >
        <Select placeholder="Chọn bác sĩ" onChange={handleDoctorChange}>
          {filteredDoctors.map((doc) => (
            <Select.Option key={doc.Doc_ID} value={doc.Doc_ID}>
              {doc.Doc_Name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Chọn ngày khám"
        name="workDate"
        rules={[{ required: true, message: "Vui lòng chọn ngày khám" }]}
      >
        <DatePicker
          format="YYYY-MM-DD"
          disabledDate={disabledDate}
          onChange={handleDateChange}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label="Chọn ca khám"
        name="shift"
        rules={[{ required: true, message: "Vui lòng chọn ca khám" }]}
      >
        <Radio.Group optionType="button" buttonStyle="solid">
          {filteredShifts.map((s) => (
            <Radio.Button key={s.value} value={s.value} disabled={!s.available}>
              {s.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Ghi chú" name="note">
        <Input.TextArea placeholder="Ghi chú thêm (nếu có)" rows={3} />
      </Form.Item>
    </Form>
  );
};

export default BookingContent;
