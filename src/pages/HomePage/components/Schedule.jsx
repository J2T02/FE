import React, { useState, useEffect } from "react";
import { Calendar, Radio, Typography, Card, Button, message } from "antd";
import dayjs from "dayjs";
import { GetSchedule } from "../../../apis/bookingService";

const { Title, Text } = Typography;

const Schedule = ({ data, onUpdate, onNext, onPrev }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableSchedules, setAvailableSchedules] = useState([]);

  useEffect(() => {
    if (data?.date) {
      setSelectedDate(dayjs(data.date));
    }
    if (data?.slot) {
      if (data.doctorId) {
        setSelectedSlot(data.slot); // Nếu có bác sĩ thì là slotId
      } else {
        setSelectedSlot(data.slot === 1 ? "morning" : "afternoon");
      }
    }
  }, [data]);

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

  useEffect(() => {
    if (selectedDate && selectedSlot) {
      const dateStr = selectedDate.format("YYYY-MM-DD");

      if (!data?.doctorId) {
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

  const getSlotsForSelectedDate = () => {
    const dateStr = selectedDate?.format("YYYY-MM-DD");
    return availableSchedules.filter((s) => s.workDate === dateStr);
  };

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
          setSelectedSlot(null);
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

          <div style={{ marginTop: 24, textAlign: "right" }}>
            <Button type="primary" onClick={onPrev} style={{ marginRight: 8 }}>
              Quay lại
            </Button>
            <Button
              type="primary"
              onClick={() => {
                if (!selectedDate || !selectedSlot) {
                  return message.warning("Vui lòng chọn ngày và ca khám.");
                }
                onNext();
              }}
            >
              Tiếp theo
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default Schedule;
