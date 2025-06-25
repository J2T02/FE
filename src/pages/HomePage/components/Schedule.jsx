import React, { useState, useEffect } from "react";
import { Calendar, Radio, Typography, Card, message } from "antd";
import dayjs from "dayjs";
import { GetSchedule } from "../../../apis/bookingService";

const { Title, Text } = Typography;

const Schedule = ({ data, onUpdate }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableSchedules, setAvailableSchedules] = useState([]);

  // Load lại state từ props khi quay lại chỉnh sửa
  useEffect(() => {
    if (data?.date) {
      setSelectedDate(dayjs(data.date));
    }
    if (data?.slot) {
      if (data.doctorId) {
        setSelectedSlot(data.slot); // Nếu có bác sĩ thì là slotId
      } else {
        // Nếu không có bác sĩ thì slot là 1 (sáng) hoặc 2 (chiều)
        setSelectedSlot(data.slot === 1 ? "morning" : "afternoon");
      }
    }
  }, [data]);

  // Fetch schedule khi chọn bác sĩ
  useEffect(() => {
    const fetchSchedule = async () => {
      if (!data?.doctorId) {
        setAvailableSchedules([]);
        return;
      }

      try {
        const res = await GetSchedule(data.doctorId);
        const schedules = Array.isArray(res.data.data) ? res.data.data : [];
        setAvailableSchedules(schedules);
      } catch (error) {
        console.error("Lỗi khi tải lịch khám:", error);
        message.error("Không thể tải lịch khám.");
        setAvailableSchedules([]);
      }
    };

    fetchSchedule();
  }, [data?.doctorId]);

  // Gửi dữ liệu cập nhật khi người dùng chọn ngày và giờ
  useEffect(() => {
    if (selectedDate && selectedSlot) {
      const dateStr = selectedDate.format("YYYY-MM-DD");

      if (!data?.doctorId) {
        // Không có bác sĩ, dùng slot mặc định
        let slotStart = "", slotEnd = "", slotId = null;
        if (selectedSlot === "morning") {
          slotStart = "08:00:00";
          slotEnd = "12:00:00";
          slotId = 1;
        } else if (selectedSlot === "afternoon") {
          slotStart = "13:00:00";
          slotEnd = "17:00:00";
          slotId = 2;
        }

        onUpdate({
          date: dateStr,
          slot: slotId,
          slotStart,
          slotEnd,
        });
      } else {
        const selectedSlotInfo = getSlotsForSelectedDate().find(
          (item) => item.slot.slotId === selectedSlot
        );

        if (selectedSlotInfo) {
          onUpdate({
            date: dateStr,
            slot: selectedSlotInfo.slot.slotId,
            slotStart: selectedSlotInfo.slot.slotStart,
            slotEnd: selectedSlotInfo.slot.slotEnd,
          });
        }
      }
    }
  }, [selectedDate, selectedSlot]);

  // Trả về các lịch của ngày đang chọn
  const getSlotsForSelectedDate = () => {
    const dateStr = selectedDate?.format("YYYY-MM-DD");
    return availableSchedules.filter((s) => s.workDate === dateStr);
  };

  // Chặn chọn ngày nếu không có lịch (nếu có bác sĩ)
  const disabledDate = (current) => {
    if (!data?.doctorId) return false;
    const allDates = availableSchedules.map((s) => s.workDate);
    return !allDates.includes(current.format("YYYY-MM-DD"));
  };

  return (
    <Card>
      <Title level={4}>Chọn ngày khám</Title>
      <Calendar
        fullscreen={false}
        value={selectedDate || dayjs()}
        onSelect={(date) => {
          setSelectedDate(date);
          setSelectedSlot(null); // reset khi chọn ngày mới
        }}
        disabledDate={disabledDate}
      />

      {selectedDate && (
        <>
          <Text style={{ display: "block", marginTop: 12 }}>Chọn khung giờ:</Text>
          <Radio.Group
            onChange={(e) => setSelectedSlot(e.target.value)}
            value={selectedSlot}
            style={{ marginTop: 8 }}
          >
            {data?.doctorId
              ? getSlotsForSelectedDate().map((item) => (
                  <Radio.Button key={item.dsId} value={item.slot.slotId}>
                    {item.slot.slotStart} - {item.slot.slotEnd}
                  </Radio.Button>
                ))
              : [
                  <Radio.Button key="morning" value="morning">
                    08:00 - 12:00
                  </Radio.Button>,
                  <Radio.Button key="afternoon" value="afternoon">
                    13:00 - 17:00
                  </Radio.Button>,
                ]}
          </Radio.Group>
        </>
      )}
    </Card>
  );
};

export default Schedule;
