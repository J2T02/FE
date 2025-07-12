import React, { useEffect, useState } from "react";
import {
  Select,
  Typography,
  Tag,
  Space,
  Row,
  Col,
  Modal,
  message,
  Divider,
  Button,
  Checkbox,
} from "antd";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isoWeeksInYear from "dayjs/plugin/isoWeeksInYear";
import isLeapYear from "dayjs/plugin/isLeapYear";
import { GetAllDoctorSchedule } from "../../../apis/bookingService";

// Extend dayjs plugins
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);

const { Title } = Typography;

const WorkScheduleManagement = ({ doctorId }) => {
  const [scheduleData, setScheduleData] = useState([]);
  const [fixedSchedule, setFixedSchedule] = useState({});
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf("isoWeek"));
  const [yearOptions, setYearOptions] = useState([]);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  useEffect(() => {
    loadDoctorSchedule();
    // loadFixedSchedule(); // giữ nguyên nếu có API
    initYearOptions();
  }, [doctorId, selectedYear, currentWeek]);

  const initYearOptions = () => {
    const now = dayjs();
    const years = [now.year() - 1, now.year(), now.year() + 1];
    setYearOptions(years);
  };

  const loadDoctorSchedule = async () => {
    try {
      // Gọi API lấy lịch làm việc của bác sĩ
      const res = await GetAllDoctorSchedule(doctorId);
      if (res?.data?.success && Array.isArray(res.data.data)) {
        // Mapping về format cũ: { workDate, shift }
        const mapped = res.data.data.map((item) => ({
          workDate: item.workDate,
          shift: item.slot?.slotId || 1, // 1: sáng, 2: chiều
        }));
        setScheduleData(mapped);
      } else {
        setScheduleData([]);
      }
    } catch (err) {
      setScheduleData([]);
      console.error("Lỗi khi tải lịch làm việc:", err);
    }
  };

  const handleSaveFixedSchedule = async () => {
    try {
      await axios.post(
        `/api/doctors/${doctorId}/fixed-schedule`,
        fixedSchedule
      );
      message.success("Đã lưu lịch làm việc cố định.");
    } catch (err) {
      message.error("Không thể lưu lịch cố định.");
    }
  };

  const handleToggleFixedShift = (day, shift) => {
    setFixedSchedule((prev) => {
      const currentShifts = prev[day] || [];
      const updated = currentShifts.includes(shift)
        ? currentShifts.filter((s) => s !== shift)
        : [...currentShifts, shift];
      return { ...prev, [day]: updated };
    });
  };

  const handleAddSchedule = async (workDate, shift) => {
    try {
      await axios.post(`/api/doctors/${doctorId}/schedule`, {
        workDate,
        shift,
      });
      message.success("Đã thêm lịch làm việc.");
      loadDoctorSchedule();
    } catch (err) {
      message.error("Không thể thêm lịch.");
    }
  };

  const handleRemoveSchedule = async (workDate, shift) => {
    try {
      await axios.delete(`/api/doctors/${doctorId}/schedule`, {
        data: { workDate, shift },
      });
      message.success("Đã xóa lịch làm việc.");
      loadDoctorSchedule();
    } catch (err) {
      message.error("Không thể xóa lịch.");
    }
  };

  const renderShift = (date, shift) => {
    const exists = scheduleData.some(
      (s) => s.workDate === date && s.shift === shift
    );
    const tagColor = shift === 1 ? "blue" : "volcano";
    const label = shift === 1 ? "Sáng" : "Chiều";
    const style = {
      cursor: "pointer",
      opacity: exists ? 1 : 0.3,
      filter: exists ? "none" : "blur(0.5px)",
    };

    const handleClick = () => {
      if (!exists) {
        Modal.confirm({
          title: "Thêm lịch làm việc",
          content: `Thêm lịch làm việc ca ${label} vào ${dayjs(date).format(
            "DD/MM/YYYY"
          )}?`,
          onOk: () => handleAddSchedule(date, shift),
          okText: "Thêm",
          cancelText: "Hủy",
        });
      } else {
        Modal.confirm({
          title: "Xóa lịch làm việc",
          content: `Xóa lịch làm việc ca ${label} vào ${dayjs(date).format(
            "DD/MM/YYYY"
          )}?`,
          onOk: () => handleRemoveSchedule(date, shift),
          okText: "Xóa",
          cancelText: "Hủy",
        });
      }
    };

    return (
      <div onClick={handleClick} style={style}>
        <Tag color={tagColor}>{`Ca ${label}`}</Tag>
      </div>
    );
  };

  const weekOptions = [];
  const startOfYear = dayjs(`${selectedYear}-01-01`);
  const totalWeeks = startOfYear.isoWeeksInYear();
  for (let i = 1; i <= totalWeeks; i++) {
    const start = startOfYear.isoWeek(i).startOf("isoWeek");
    const end = startOfYear.isoWeek(i).endOf("isoWeek");
    weekOptions.push({
      label: `Tuần ${start.format("DD/MM")} - ${end.format("DD/MM")}`,
      value: start.format("YYYY-MM-DD"),
    });
  }

  return (
    <div style={{ display: "flex", gap: "24px" }}>
      <div style={{ flex: 1 }}>
        <Space style={{ marginBottom: 12 }}>
          <Select
            value={selectedYear}
            onChange={setSelectedYear}
            options={yearOptions.map((y) => ({ label: y, value: y }))}
            style={{ width: 100 }}
          />
          <Select
            value={currentWeek.format("YYYY-MM-DD")}
            onChange={(val) => setCurrentWeek(dayjs(val))}
            options={weekOptions}
            style={{ width: 220 }}
          />
        </Space>

        <Row gutter={16}>
          {Array.from({ length: 7 }).map((_, index) => {
            const day = currentWeek.startOf("isoWeek").add(index, "day");
            const dateStr = day.format("YYYY-MM-DD");
            return (
              <Col key={index} style={{ minWidth: 100, textAlign: "center" }}>
                <strong>T{index + 2 >= 8 ? "CN" : index + 2}</strong>
                <br />
                <span>{day.format("DD/MM")}</span>
                <div>{renderShift(dateStr, 1)}</div>
                <div>{renderShift(dateStr, 2)}</div>
              </Col>
            );
          })}
        </Row>
      </div>

      <div style={{ flex: 1 }}>
        <Divider orientation="left">Lịch làm việc cố định cho bác sĩ</Divider>
        <Row gutter={[8, 8]}>
          {Array.from({ length: 7 }).map((_, dayIndex) => {
            const day = dayIndex + 1;
            const dayLabel = day + 1 > 7 ? "CN" : `T${day + 1}`;
            return (
              <Col span={12} key={dayIndex}>
                <strong>{dayLabel}</strong>
                <Space direction="vertical">
                  <Checkbox
                    checked={fixedSchedule[day]?.includes(1)}
                    onChange={() => handleToggleFixedShift(day, 1)}
                  >
                    Ca Sáng
                  </Checkbox>
                  <Checkbox
                    checked={fixedSchedule[day]?.includes(2)}
                    onChange={() => handleToggleFixedShift(day, 2)}
                  >
                    Ca Chiều
                  </Checkbox>
                </Space>
              </Col>
            );
          })}
        </Row>
        <Button
          type="primary"
          onClick={handleSaveFixedSchedule}
          style={{ marginTop: 12 }}
        >
          Lưu lịch cố định
        </Button>
      </div>
    </div>
  );
};

export default WorkScheduleManagement;
