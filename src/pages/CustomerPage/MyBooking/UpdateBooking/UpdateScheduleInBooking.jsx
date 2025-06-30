import React, { useEffect, useState } from "react";
import {
  Calendar,
  Button,
  message,
  Segmented,
  Typography,
  Space,
  Layout,
} from "antd";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GetSchedule,
  updatebookingSchedule,
} from "../../../../apis/bookingService";

const { Title } = Typography;

const SLOT_LABELS = {
  1: "08:00 - 12:00",
  2: "13:00 - 17:00",
};

const UpdateScheduleInBooking = ({ bookingId = 123, doctorId = 1, onBack }) => {
  const location = useLocation();
  const bookingdata = location.state;
  const navigate = useNavigate();

  const [availableDates, setAvailableDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchDoctorSchedule = async () => {
      try {
        const res = await GetSchedule(2);
        const schedules = Array.isArray(res?.data?.data) ? res.data.data : [];

        const map = {};
        schedules.forEach((entry) => {
          if (entry.isAvailable) {
            const dateStr = dayjs(entry.workDate).format("YYYY-MM-DD");
            if (!map[dateStr]) map[dateStr] = [];
            map[dateStr].push(entry);
          }
        });

        setAvailableDates(map);
      } catch (err) {
        message.error("Lỗi khi tải lịch làm việc của bác sĩ.");
      }
    };

    fetchDoctorSchedule();
  }, [doctorId]);

  const disabledDate = (date) => {
    const dateStr = date.format("YYYY-MM-DD");
    return !availableDates[dateStr];
  };

  const handleDateSelect = (date) => {
    const dateStr = date.format("YYYY-MM-DD");

    if (!availableDates[dateStr]) {
      return;
    }

    setSelectedDate(dayjs(dateStr));
    setSelectedSlot(null);
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedSlot) {
      message.warning("Vui lòng chọn ngày và khung giờ.");
      return;
    }

    const dateStr = selectedDate.format("YYYY-MM-DD");
    const selectedEntry = availableDates[dateStr].find(
      (item) => item.slot.slotId === selectedSlot
    );

    if (!selectedEntry) {
      message.error("Không tìm thấy lịch hợp lệ.");
      return;
    }

    try {
      const res = await updatebookingSchedule(
        bookingdata.bookingData.bookingId,
        {
          workDate: dateStr,
          slotId: selectedSlot,
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        navigate(`/bookingDetail/${bookingdata.bookingData.bookingId}`);
      } else {
        message.error(res.data.message);
      }

      onBack?.();
    } catch (err) {
      console.log(err);
      message.error("Cập nhật lịch thất bại.");
    }
  };

  const renderSlotSelector = () => {
    if (!selectedDate) return null;
    const dateStr = selectedDate.format("YYYY-MM-DD");
    const slots = availableDates[dateStr] || [];

    return (
      <div style={{ marginTop: 24 }}>
        <div style={{ fontWeight: 500, marginBottom: 8 }}>Chọn khung giờ:</div>
        <Segmented
          block
          options={slots.map((entry) => ({
            label:
              SLOT_LABELS[entry.slot.slotId] ||
              `${entry.slot.slotStart} - ${entry.slot.slotEnd}`,
            value: entry.slot.slotId,
          }))}
          value={selectedSlot}
          onChange={setSelectedSlot}
        />
      </div>
    );
  };

  return (
    <Layout>
      <Header />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 0" }}>
        <Title level={4}>Cập nhật lịch khám</Title>

        <Calendar
          fullscreen={false}
          onSelect={handleDateSelect}
          disabledDate={disabledDate}
        />

        {renderSlotSelector()}

        <Space style={{ marginTop: 32 }}>
          <Button type="primary" onClick={() => navigate(-1)}>
            Quay lại
          </Button>
          <Button
            type="primary"
            disabled={!selectedDate || !selectedSlot}
            onClick={handleSubmit}
          >
            Đổi lịch
          </Button>
        </Space>
      </div>
      <Footer />
    </Layout>
  );
};

export default UpdateScheduleInBooking;
