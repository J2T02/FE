// File: pages/CustomerPage/MyBooking/UpdateBooking/UpdateBooking.jsx
import React, { useState } from "react";
import { Steps, message, Card } from "antd";
import DoctorSelection from "./components/DoctorSelection";
import DoctorScheduleStep from "./components/DoctorScheduleStep";
import axios from "axios";

const steps = [
  { title: "Chọn bác sĩ mới" },
  { title: "Chọn lịch làm việc" },
];

const UpdateBooking = ({ bookingId, onComplete }) => {
  const [current, setCurrent] = useState(0);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const next = () => setCurrent((prev) => prev + 1);
  const prev = () => setCurrent((prev) => prev - 1);

  const handleConfirmUpdate = async () => {
    try {
      await axios.put(`/api/Booking/UpdateDoctorSchedule/${bookingId}`, {
        doctorId: selectedDoctor.doctorId,
        doctorScheduleId: selectedSchedule.scheduleId,
      });
      message.success("Cập nhật lịch hẹn thành công");
      onComplete && onComplete();
    } catch (err) {
      message.error("Lỗi khi cập nhật lịch hẹn");
      console.error(err);
    }
  };

  return (
    <Card title="Chỉnh sửa lịch hẹn">
      <Steps current={current} items={steps} style={{ marginBottom: 32 }} />

      {current === 0 && (
        <DoctorSelection
          selectedDoctor={selectedDoctor}
          setSelectedDoctor={setSelectedDoctor}
          onNext={next}
        />
      )}

      {current === 1 && (
        <DoctorScheduleStep
          doctorId={selectedDoctor?.doctorId}
          onPrev={prev}
          onSelectSchedule={(schedule) => {
            setSelectedSchedule(schedule);
            handleConfirmUpdate();
          }}
        />
      )}
    </Card>
  );
};

export default UpdateBooking;