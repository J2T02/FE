// DoctorCalendar.jsx
import { Card, Select, Typography, Space, Tooltip } from "antd";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { useDoctor } from "../context/DoctorContext";
import { CloseOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const DoctorCalendar = ({ onRemove }) => {
  const {
    schedules,
    doctors,
    selectedWeekStart,
    setSelectedWeekStart,
    setSelectedDoctor,
  } = useDoctor();

  const currentYear = dayjs().year();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const yearOptions = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const year = currentYear - 2 + i;
      return { label: `${year}`, value: year };
    });
  }, [currentYear]);

  const weekOptions = useMemo(() => {
    const startOfYear = dayjs(`${selectedYear}-01-01`)
      .startOf("week")
      .add(1, "day");
    return Array.from({ length: 52 }, (_, i) => {
      const start = startOfYear.add(i * 7, "day");
      const end = start.add(6, "day");
      return {
        label: `Tuần ${start.format("DD/MM")} - ${end.format("DD/MM")}`,
        value: start.format("YYYY-MM-DD"),
      };
    });
  }, [selectedYear]);

  const currentWeekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) =>
      dayjs(selectedWeekStart).add(i, "day")
    );
  }, [selectedWeekStart]);

  const getDoctorInSlot = (date, slotId) => {
    return schedules.filter(
      (s) =>
        s.date === date.format("YYYY-MM-DD") &&
        (s.slotId === slotId || s.slotId === 3) // 3 = full day
    );
  };

  const renderDoctorBlock = (item) => {
    const doctor = doctors.find((d) => d.doctorId === item.doctorId);
    return (
      <div
        key={`${item.doctorId}-${item.date}-${item.slotId}`}
        style={{
          background: "#f5f5f5",
          padding: "4px 8px",
          marginBottom: 4,
          borderRadius: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => setSelectedDoctor(doctor)}
      >
        <Tooltip title={item.note || ""}>
          <Text style={{ fontSize: 13 }}>{doctor?.doctorName}</Text>
        </Tooltip>
        <Tooltip title="Xóa lịch">
          <CloseOutlined
            style={{ fontSize: 12, color: "#999" }}
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.(item.doctorId, item.date, item.slotId);
            }}
          />
        </Tooltip>
      </div>
    );
  };

  return (
    <Card
      style={{ marginTop: 24 }}
      title={<Title level={5}>Lịch làm việc trong tuần</Title>}
      extra={
        <Space>
          <Select
            value={selectedYear}
            options={yearOptions}
            onChange={(year) => {
              setSelectedYear(year);
              const newStart = dayjs(`${year}-01-01`)
                .startOf("week")
                .add(1, "day");
              setSelectedWeekStart(newStart); // cập nhật tuần theo năm
            }}
            style={{ width: 100 }}
          />
          <Select
            value={selectedWeekStart.format("YYYY-MM-DD")}
            options={weekOptions}
            onChange={(val) => setSelectedWeekStart(dayjs(val))}
            style={{ width: 250 }}
          />
        </Space>
      }
    >
      {/* Header */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)" }}>
        <div></div>
        {currentWeekDays.map((date, idx) => (
          <div key={idx} style={{ textAlign: "center" }}>
            <Text strong>
              {weekdays[date.day() === 0 ? 6 : date.day() - 1]}
            </Text>
            <br />
            <Text type="secondary">{date.format("DD/MM")}</Text>
          </div>
        ))}
      </div>

      {/* Ca sáng */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          marginTop: 12,
        }}
      >
        <Text strong>🌤 Ca sáng</Text>
        {currentWeekDays.map((date, idx) => {
          const items = getDoctorInSlot(date, 1);
          return <div key={idx}>{items.map(renderDoctorBlock)}</div>;
        })}
      </div>

      {/* Ca chiều */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          marginTop: 12,
        }}
      >
        <Text strong>🌙 Ca chiều</Text>
        {currentWeekDays.map((date, idx) => {
          const items = getDoctorInSlot(date, 2);
          return <div key={idx}>{items.map(renderDoctorBlock)}</div>;
        })}
      </div>
    </Card>
  );
};

export default DoctorCalendar;
