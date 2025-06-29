// File: pages/CustomerPage/MyBooking/UpdateBooking/components/DoctorScheduleStep.jsx
import React, { useEffect, useState } from "react";
import { List, Button, Tag, Spin, message } from "antd";
import axios from "axios";

const SLOT_LABELS = {
  1: "08:00 - 12:00",
  2: "13:00 - 17:00",
};

const DoctorScheduleStep = ({ doctorId, onPrev, onSelectSchedule }) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await axios.get(`/api/DoctorSchedule/GetAvailableByDoctor/${doctorId}`);
        setSchedules(res.data.data || []);
      } catch (err) {
        message.error("Lỗi khi tải lịch bác sĩ");
      } finally {
        setLoading(false);
      }
    };
    if (doctorId) fetchSchedules();
  }, [doctorId]);

  return (
    <Spin spinning={loading}>
      <List
        bordered
        dataSource={schedules.filter((s) => s.isAvailable)}
        renderItem={(item) => (
          <List.Item
            style={{ cursor: "pointer" }}
            onClick={() => onSelectSchedule(item)}
          >
            <div>
              <b>Ngày:</b> {item.workDate} &nbsp;&nbsp;&nbsp;
              <b>Ca:</b> {SLOT_LABELS[item.slotId]} &nbsp;&nbsp;
              <Tag color="green">Còn chỗ</Tag>
            </div>
          </List.Item>
        )}
        locale={{ emptyText: "Không có lịch trống" }}
      />
      <div style={{ marginTop: 16 }}>
        <Button onClick={onPrev}>Quay lại</Button>
      </div>
    </Spin>
  );
};

export default DoctorScheduleStep;
