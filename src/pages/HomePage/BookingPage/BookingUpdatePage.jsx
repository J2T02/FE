import { useState } from "react";
import { Steps, Card } from "antd";
import { useParams, useSearchParams } from "react-router-dom"; // sử dụng cả params và query
import DoctorSelectionStep from "../components/DoctorSelectionStep";
import DoctorScheduleStep from "../components/DoctorScheduleStep";
import DateSlotSelectionStep from "../components/DateSlotSelectionStep";
import AvailableDoctorsStep from "../components/AvailableDoctorsStep";
import ConfirmUpdateStep from "../components/ConfirmUpdateStep";

import {
  mockDoctors,
  mockDoctorSchedules,
  mockAvailableDoctorsByDateSlot,
} from "../../../apis/mockData";

const { Step } = Steps;

const BookingUpdatePage = () => {
  const { id: bookingId } = useParams(); // lấy bookingId từ URL
  const [searchParams] = useSearchParams();
  const option = searchParams.get("option"); // lấy query ?option=doctor hoặc schedule

  const [current, setCurrent] = useState(0);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedDateSlot, setSelectedDateSlot] = useState(null);

  const doctorSchedules = selectedDoctorId
    ? mockDoctorSchedules[selectedDoctorId] || []
    : [];

  const availableDoctors =
    selectedDateSlot?.date && selectedDateSlot?.slot
      ? mockAvailableDoctorsByDateSlot[
          `${selectedDateSlot.date}_${selectedDateSlot.slot}`
        ] || []
      : [];

  const steps = [
    {
      title: "Cập nhật lựa chọn",
      content:
        option === "doctor" ? (
          <DoctorSelectionStep
            selectedDoctor={selectedDoctorId}
            setSelectedDoctor={setSelectedDoctorId}
            onNext={() => setCurrent(1)}
            onPrev={() => setCurrent(0)}
            doctors={mockDoctors}
          />
        ) : (
          <DateSlotSelectionStep
            selectedDateSlot={selectedDateSlot}
            setSelectedDateSlot={setSelectedDateSlot}
            onNext={() => setCurrent(1)}
            onPrev={() => setCurrent(0)}
          />
        ),
    },
    {
      title: "Chọn lịch mới",
      content:
        option === "doctor" ? (
          <DoctorScheduleStep
            doctorSchedules={doctorSchedules}
            onSelectSchedule={(s) => {
              setSelectedSchedule(s);
              setCurrent(2);
            }}
            onPrev={() => setCurrent(0)}
          />
        ) : (
          <AvailableDoctorsStep
            doctors={availableDoctors}
            onSelectDoctor={(doc) => {
              setSelectedDoctorId(doc.doctorId);
              setSelectedSchedule({
                date: selectedDateSlot.date,
                slotId: selectedDateSlot.slot,
              });
              setCurrent(2);
            }}
            onPrev={() => setCurrent(0)}
          />
        ),
    },
    {
      title: "Xác nhận",
      content: (
        <ConfirmUpdateStep
          selectedDoctorId={selectedDoctorId}
          selectedSchedule={selectedSchedule}
          bookingId={bookingId}
          onPrev={() => setCurrent(1)}
          doctors={mockDoctors}
        />
      ),
    },
  ];

  return (
    <Card title="Cập nhật lịch hẹn">
      <Steps current={current} style={{ marginBottom: 24 }}>
        {steps.map((s) => (
          <Step key={s.title} title={s.title} />
        ))}
      </Steps>
      <div>{steps[current].content}</div>
    </Card>
  );
};

export default BookingUpdatePage;
