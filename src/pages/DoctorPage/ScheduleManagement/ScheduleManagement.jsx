import React, { useState, useMemo } from "react";
import { Card, Select, Row, Col, Typography, Tag, Divider, Image } from "antd";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

const { Title, Text, Paragraph } = Typography;

const doctorWeeklySchedule = {
  // Tuần 30/06 - 06/07
  "2025-06-30": ["afternoon"],
  "2025-07-01": ["morning", "afternoon"],
  "2025-07-02": [],
  "2025-07-03": ["morning"],
  "2025-07-04": ["morning", "afternoon"],
  "2025-07-05": ["afternoon"],
  "2025-07-06": [],

  // Tuần 07/07 - 13/07
  "2025-07-07": ["morning"],
  "2025-07-08": ["afternoon"],
  "2025-07-09": ["morning", "afternoon"],
  "2025-07-10": [],
  "2025-07-11": ["morning", "afternoon"],
  "2025-07-12": [],
  "2025-07-13": ["afternoon"],

  // Tuần 14/07 - 20/07
  "2025-07-14": ["morning"],
  "2025-07-15": [],
  "2025-07-16": ["afternoon"],
  "2025-07-17": ["morning"],
  "2025-07-18": ["afternoon"],
  "2025-07-19": ["morning", "afternoon"],
  "2025-07-20": [],
};

const generateWeekStartDates = (year) => {
  const firstMonday = dayjs(`${year}-01-01`).startOf("isoWeek");
  const weeks = [];
  for (let i = 0; i < 52; i++) {
    const start = firstMonday.add(i, "week");
    const end = start.add(6, "day");
    if (start.year() === parseInt(year)) {
      weeks.push({
        label: `Tuần ${start.format("DD/MM")} - ${end.format("DD/MM")}`,
        value: start.format("YYYY-MM-DD"),
      });
    }
  }
  return weeks;
};

const getWeekDates = (startDateStr) => {
  const start = new Date(startDateStr);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
};

const formatDate = (date) => date.toISOString().split("T")[0];
const formatVNDate = (date) =>
  `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;

const ScheduleManagement = () => {
  const currentYear = dayjs().year().toString();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const weekOptions = useMemo(() => generateWeekStartDates(selectedYear), [selectedYear]);

  const currentWeekStart = dayjs().startOf("isoWeek").format("YYYY-MM-DD");
  const defaultWeek =
    weekOptions.find((w) => w.value === currentWeekStart)?.value || weekOptions[0].value;

  const [selectedWeekStart, setSelectedWeekStart] = useState(defaultWeek);

  const weekDates = getWeekDates(selectedWeekStart);

  return (
    <Card
      style={{
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
        <Col>
          <Title level={3} style={{ marginBottom: 0 }}>
            🗓️ Lịch làm việc trong tuần của bạn
          </Title>
        </Col>
        <Col>
          <div
            style={{
              padding: "12px 20px",
              border: "1px dashed #d9d9d9",
              borderRadius: 10,
              background: "#fafafa",
              lineHeight: 1.6,
            }}
          >
            <Text strong>Chú thích ca làm việc:</Text>
            <br />
            <Tag color="blue">Ca Sáng</Tag>: 08:00 – 12:00
            <br />
            <Tag color="orange">Ca Chiều</Tag>: 13:00 – 17:00
          </div>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 32 }}>
        <Col>
          <Select
            value={selectedYear}
            onChange={(value) => setSelectedYear(value)}
            style={{ width: 120 }}
          >
            {["2024", "2025", "2026"].map((y) => (
              <Select.Option key={y} value={y}>
                {y}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col>
          <Select
            value={selectedWeekStart}
            onChange={(value) => setSelectedWeekStart(value)}
            style={{ width: 240 }}
            showSearch
            optionFilterProp="label"
          >
            {weekOptions.map((w) => (
              <Select.Option key={w.value} value={w.value} label={w.label}>
                {w.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Row gutter={[16, 24]} justify="center" style={{ marginBottom: 48 }}>
        {weekDates.map((date, index) => {
          const isoDate = formatDate(date);
          const shiftList = doctorWeeklySchedule[isoDate] || [];
          const weekdayLabel = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"][index];
          const dateStr = formatVNDate(date);

          return (
            <Col key={isoDate} xs={12} sm={8} md={6} lg={4} xl={3} style={{ textAlign: "center" }}>
              <Text strong style={{ fontSize: 16, display: "block" }}>{weekdayLabel}</Text>
              <Text style={{ marginBottom: 8, display: "block" }}>{dateStr}</Text>
              <div>
                {shiftList.includes("morning") && (
                  <Tag bordered color="#e6f4ff" style={{ marginBottom: 4 }}>
                    <span style={{ color: "#1677ff" }}>Ca Sáng</span>
                  </Tag>
                )}
                <br />
                {shiftList.includes("afternoon") && (
                  <Tag bordered color="#fff2e8">
                    <span style={{ color: "#fa541c" }}>Ca Chiều</span>
                  </Tag>
                )}
              </div>
            </Col>
          );
        })}
      </Row>

      <Divider />

      <Typography style={{ textAlign: "center" }}>
        <Title level={4}>Ghi chú dành cho bác sĩ</Title>
        <Paragraph>
          • Vui lòng kiểm tra kỹ lịch làm việc mỗi tuần để đảm bảo không trùng lặp hoặc bỏ sót ca làm.
          <br />
          • Các bác sĩ cần có mặt đúng giờ theo ca đăng ký.
          <br />
          • Trong trường hợp thay đổi đột xuất, vui lòng báo cáo trước 24 giờ.
        </Paragraph>

        <Image src="/Logo.png" alt="Bệnh viện Con Yêu" preview={false} height={60} />

        <Paragraph italic style={{ marginTop: 8 }}>
          Bệnh viện Điều trị hiếm muộn hàng đầu Việt Nam
        </Paragraph>
      </Typography>
    </Card>
  );
};

export default ScheduleManagement;
