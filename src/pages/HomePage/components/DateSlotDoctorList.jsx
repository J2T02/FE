import React, { useEffect, useState } from "react";
import { DatePicker, Select, List, Button, message } from "antd";
import dayjs from "dayjs";
// import { GetAvailableDoctorsByDateSlot } from "../../../apis/bookingService";

const { Option } = Select;

const SLOT_LABELS = {
  1: "Sáng (08:00 - 12:00)",
  2: "Chiều (13:00 - 17:00)",
};

const DateSlotDoctorList = ({ selectedDateSlot, onChange, onSelectDoctor }) => {
  const [date, setDate] = useState(selectedDateSlot?.date || null);
  const [slot, setSlot] = useState(selectedDateSlot?.slot || null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDoctors = async () => {
    if (!date || !slot) return;

    try {
      setLoading(true);
    //   const res = await GetAvailableDoctorsByDateSlot({
    //     date: dayjs(date).format("YYYY-MM-DD"),
    //     slotId: slot,
    //   });
    //   setDoctors(res.data || []);
    } catch (err) {
      message.error("Không thể tải danh sách bác sĩ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
    onChange && onChange({ date, slot }); // báo ngược về parent
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, slot]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 16 }}>
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Chọn ngày"
          style={{ flex: 1 }}
        />
        <Select
          placeholder="Chọn ca"
          value={slot}
          onChange={setSlot}
          style={{ width: 200 }}
        >
          <Option value={1}>Sáng</Option>
          <Option value={2}>Chiều</Option>
        </Select>
      </div>

      {date && slot && (
        <List
          loading={loading}
          dataSource={doctors}
          bordered
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button type="primary" onClick={() => onSelectDoctor(item)}>
                  Chọn
                </Button>,
              ]}
            >
              {item.name} ({item.specialty})
            </List.Item>
          )}
          locale={{ emptyText: "Không có bác sĩ nào trống." }}
        />
      )}
    </div>
  );
};

export default DateSlotDoctorList;
