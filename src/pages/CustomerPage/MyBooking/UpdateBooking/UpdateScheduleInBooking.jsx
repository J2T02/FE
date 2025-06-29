import React, { useEffect, useState } from "react";
import { Calendar, Button, message, Segmented, Typography, Space } from "antd";
import dayjs from "dayjs";

const { Title } = Typography;

const SLOT_OPTIONS = {
  1: "08:00 - 12:00",
  2: "13:00 - 17:00",
};

// 🔧 Dữ liệu mẫu
const mockDoctorSchedules = [
  { dsId: 1, workDate: "2025-06-29", slotId: 1, isAvailable: true },
  { dsId: 2, workDate: "2025-06-29", slotId: 2, isAvailable: true },
  { dsId: 3, workDate: "2025-06-30", slotId: 1, isAvailable: false },
  { dsId: 4, workDate: "2025-07-01", slotId: 1, isAvailable: true },
  { dsId: 5, workDate: "2025-07-01", slotId: 2, isAvailable: false },
];

const UpdateScheduleInBooking = ({
  bookingId = 123,
  doctorId = 1,
  onBack,
  onUpdated,
}) => {
  const [availableDates, setAvailableDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      setTimeout(() => {
        const dateMap = {};

        mockDoctorSchedules.forEach((entry) => {
          if (entry.isAvailable) {
            const dateStr = dayjs(entry.workDate).format("YYYY-MM-DD");
            if (!dateMap[dateStr]) dateMap[dateStr] = [];
            dateMap[dateStr].push(entry);
          }
        });

        setAvailableDates(dateMap);
        setLoading(false);
      }, 300);
    };

    fetchSchedule();
  }, [doctorId]);

  const onDateSelect = (date) => {
    const dateStr = date.format("YYYY-MM-DD");

    if (!availableDates[dateStr]) {
      message.warning("Bác sĩ không có lịch trống ngày này.");
      return;
    }

    setSelectedDate(dateStr);
    setAvailableSlots(availableDates[dateStr].map((s) => s.slotId));
    setSelectedSlot(null);
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedSlot) {
      message.warning("Vui lòng chọn ngày và khung giờ.");
      return;
    }

    const schedule = availableDates[selectedDate].find(
      (s) => s.slotId === selectedSlot
    );

    if (!schedule) {
      message.error("Không tìm thấy lịch làm việc hợp lệ.");
      return;
    }

    console.log("Đã chọn DS_ID:", schedule.dsId);

    message.success("Cập nhật lịch thành công!");
    onUpdated?.();
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <Title level={4}>Chọn ngày khám</Title>

      <Calendar
        fullscreen={false}
        onSelect={onDateSelect}
        disabledDate={(date) => {
          const dateStr = date.format("YYYY-MM-DD");
          return !availableDates[dateStr];
        }}
      />

      {selectedDate && availableSlots.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ fontWeight: 500, marginBottom: 8 }}>Chọn khung giờ:</div>
          <Segmented
            options={availableSlots.map((slotId) => ({
              label: SLOT_OPTIONS[slotId],
              value: slotId,
            }))}
            value={selectedSlot}
            onChange={setSelectedSlot}
          />
        </div>
      )}

      <Space style={{ marginTop: 32 }}>
        <Button onClick={onBack}>Quay lại</Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={!selectedDate || !selectedSlot}
          loading={loading}
        >
          Tiếp theo
        </Button>
      </Space>
    </div>
  );
};

export default UpdateScheduleInBooking;
