import { useEffect, useState } from "react";
import { Form, Row, Col, Button, message, Card } from "antd";
import DoctorSelect from "./DoctorSelect";
import WorkDateRadioGroup from "./WorkDateRadioGroup";
import SlotRadioGroup from "./SlotRadioGroup";
import { GetAllDoctorSchedule } from "../../../../../apis/bookingService";
import { useNavigate } from "react-router-dom";

const NewBookingForm = ({ doctors, bookingId }) => {
  const navigate = useNavigate();
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [doctorSchedules, setDoctorSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const fetchDoctorSchedule = async () => {
    try {
      const res = await GetAllDoctorSchedule(selectedDoctorId);
      console.log("Doctorschedule list:", res);
      if (res.data.success) {
        setDoctorSchedules(res.data.data);
      }
    } catch (err) {
      console.error("Lỗi doctor:", err);
    }
  };

  useEffect(() => {
    if (selectedDoctorId) {
      fetchDoctorSchedule();
    }
  }, [selectedDoctorId]);

  const availableDates = [...new Set(doctorSchedules.map((s) => s.workDate))];
  const availableSlots = doctorSchedules.filter(
    (s) => s.workDate === selectedDate
  );

  const handleUpdate = () => {
    if (!selectedDoctorId || !selectedDate || !selectedSlot) {
      message.warning("Vui lòng chọn đầy đủ thông tin.");
      return;
    }

    const payload = {
      bookingId,
      doctorId: selectedDoctorId,
      workDate: selectedDate,
      slotId: selectedSlot,
    };

    console.log("Payload gửi cập nhật:", payload);
    message.success("Cập nhật thành công.");
  };

  return (
    <Form layout="vertical">
      <Card title="Thông tin mới" style={{ marginBottom: 24 }}>
        <Row gutter={24}>
          <Col span={12}>
            <DoctorSelect
              doctors={doctors}
              value={selectedDoctorId}
              onChange={setSelectedDoctorId}
            />
          </Col>
          <Col span={12}>
            <WorkDateRadioGroup
              dates={availableDates}
              selectedDate={selectedDate}
              onChange={setSelectedDate}
            />
            <SlotRadioGroup
              slots={availableSlots}
              selectedSlot={selectedSlot}
              onChange={setSelectedSlot}
            />
          </Col>
        </Row>
      </Card>

      <Form.Item
        style={{ display: "flex", justifyContent: "end", marginRight: 20 }}
      >
        <Button
          type="primary"
          onClick={() => navigate(-1)}
          style={{ marginRight: 8 }}
        >
          Hủy
        </Button>
        <Button type="primary" onClick={handleUpdate}>
          Cập nhật lịch hẹn
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewBookingForm;
