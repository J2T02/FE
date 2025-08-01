// File: WorkSchedule.jsx

import React, { useEffect, useState } from "react";
import { Select, Typography, Tag, Space, Row, Col } from "antd";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isoWeeksInYear from "dayjs/plugin/isoWeeksInYear";
import isLeapYear from "dayjs/plugin/isLeapYear";

// Extend dayjs with needed plugins
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);

const { Title } = Typography;

const WorkSchedule = ({ doctorId }) => {
  const [scheduleData, setScheduleData] = useState([
    { workDate: "2025-07-01", shift: 1 },
    { workDate: "2025-07-01", shift: 2 },
    { workDate: "2025-07-02", shift: 1 },
    { workDate: "2025-07-03", shift: 2 },
    { workDate: "2025-07-04", shift: 1 },
  ]);
  const [currentWeek, setCurrentWeek] = useState(dayjs().startOf("isoWeek"));
  const [yearOptions, setYearOptions] = useState([]);
  const [selectedYear, setSelectedYear] = useState(dayjs().year());

  useEffect(() => {
    initYearOptions();
  }, []);

  const initYearOptions = () => {
    const now = dayjs();
    const years = [now.year() - 1, now.year(), now.year() + 1];
    setYearOptions(years);
  };

  const renderShifts = (date) => {
    const morning = scheduleData.find((s) => s.workDate === date && s.shift === 1);
    const afternoon = scheduleData.find((s) => s.workDate === date && s.shift === 2);

    return (
      <div>
        <div>{morning && <Tag color="blue">Ca sáng</Tag>}</div>
        <div>{afternoon && <Tag color="volcano">Ca chiều</Tag>}</div>
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

  const handleWeekChange = (value) => {
    setCurrentWeek(dayjs(value));
  };

  return (
    <div>
      <Space style={{ marginBottom: 12 }}>
        <Select
          value={selectedYear}
          onChange={setSelectedYear}
          options={yearOptions.map((y) => ({ label: y, value: y }))}
          style={{ width: 100 }}
        />
        <Select
          value={currentWeek.format("YYYY-MM-DD")}
          onChange={handleWeekChange}
          options={weekOptions}
          style={{ width: 220 }}
        />
      </Space>

      <Row gutter={16}>
        {Array.from({ length: 7 }).map((_, index) => {
          const day = currentWeek.startOf("isoWeek").add(index, "day");
          const dateStr = day.format("YYYY-MM-DD");

          return (
            <Col key={index}>
              <div style={{ minWidth: 100, textAlign: "center" }}>
                <strong>T{index + 2 > 8 ? "CN" : index + 2}</strong>
                <br />
                <span>{day.format("DD/MM")}</span>
                <div>{renderShifts(dateStr)}</div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default WorkSchedule;
