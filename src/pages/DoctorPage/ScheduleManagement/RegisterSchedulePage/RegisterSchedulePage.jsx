import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  Typography,
  Button,
  Select,
  Row,
  Col,
  message,
  Spin,
  Calendar,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { DoctorStoreContext } from "../../contexts/DoctorStoreProvider";

const { Title } = Typography;
const { Option } = Select;

const RegisterSchedulePage = ({ onBack }) => {
  const { doctorInfo } = useContext(DoctorStoreContext) || {
    doctorInfo: { docId: 999 },
  };
  const [loading, setLoading] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [highlightedDates, setHighlightedDates] = useState([]);

  const nextMonthStart = dayjs().add(1, "month").startOf("month");
  const nextMonthEnd = dayjs().add(1, "month").endOf("month");

  const comboMap = {
    1: { days: [1, 3, 5], slots: [1, 2, 3, 4] }, // Thứ 2,4,6 sáng
    2: { days: [1, 3, 5], slots: [5, 6, 7, 8] }, // Thứ 2,4,6 chiều
    3: { days: [2, 4, 6], slots: [1, 2, 3, 4] }, // Thứ 3,5,7 sáng
    4: { days: [2, 4, 6], slots: [5, 6, 7, 8] }, // Thứ 3,5,7 chiều
  };

  const updateHighlightedDates = (comboKey) => {
    if (!comboKey) return;
    const { days } = comboMap[comboKey];
    let current = nextMonthStart;
    const dates = [];
    while (current.isSameOrBefore(nextMonthEnd, "day")) {
      if (days.includes(current.day())) {
        dates.push(current.format("YYYY-MM-DD"));
      }
      current = current.add(1, "day");
    }
    setHighlightedDates(dates);
  };

  const handleComboChange = (value) => {
    setSelectedCombo(value);
    updateHighlightedDates(value);
  };

  const handleSubmit = () => {
    if (!selectedCombo) {
      message.warning("Vui lòng chọn combo lịch làm việc.");
      return;
    }

    const { days, slots } = comboMap[selectedCombo];
    const payload = [];
    let current = nextMonthStart;

    while (current.isSameOrBefore(nextMonthEnd, "day")) {
      if (days.includes(current.day())) {
        slots.forEach((slotId) => {
          payload.push({
            docId: doctorInfo?.docId || 999,
            workDate: current.format("YYYY-MM-DD"),
            slotId,
            isAvailable: true,
            maxBooking: 1,
          });
        });
      }
      current = current.add(1, "day");
    }

    if (payload.length === 0) {
      message.warning("Không có ngày nào phù hợp với combo được chọn.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log("📦 Payload đăng ký:", payload);
      setLoading(false);
      message.success("Đăng ký lịch làm việc thành công!");
      onBack();
    }, 1000);
  };

  const dateFullCellRender = (date) => {
    const dateStr = date.format("YYYY-MM-DD");
    const isHighlighted = highlightedDates.includes(dateStr);
    return (
      <div
        style={{
          background: isHighlighted ? "#ffd6e7" : undefined,
          borderRadius: 6,
          padding: 4,
          textAlign: "center",
        }}
      >
        {date.date()}
      </div>
    );
  };

  return (
    <div style={{ padding: 24, background: "#fff0f4", minHeight: "100vh" }}>
      <Card
        bordered={false}
        style={{
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          background: "white",
        }}
      >
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={onBack}
            style={{ backgroundColor: "#f78db3", color: "white", border: "none" }}
          >
            Quay lại
          </Button>
          <Title level={3}>
            📅 Đăng ký lịch làm việc cho tháng {nextMonthStart.format("MM/YYYY")}
          </Title>
        </Row>

        <div style={{ marginBottom: 24 }}>
          <Title level={4}>🔧 Chọn combo lịch làm việc</Title>
          <Select
            placeholder="Chọn combo"
            onChange={handleComboChange}
            style={{ width: 400 }}
            value={selectedCombo}
          >
            <Option value={1}>Combo 1: Thứ 2,4,6 (8:00 - 12:00)</Option>
            <Option value={2}>Combo 2: Thứ 2,4,6 (13:00 - 17:00)</Option>
            <Option value={3}>Combo 3: Thứ 3,5,7 (8:00 - 12:00)</Option>
            <Option value={4}>Combo 4: Thứ 3,5,7 (13:00 - 17:00)</Option>
          </Select>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Title level={4}>📆 Ngày làm việc tương ứng</Title>
          <Calendar
            fullscreen={false}
            defaultValue={nextMonthStart}
            dateFullCellRender={dateFullCellRender}
            disabledDate={(current) =>
              current.month() !== nextMonthStart.month() ||
              current.year() !== nextMonthStart.year()
            }
          />
        </div>

        <div style={{ textAlign: "right", marginTop: 24 }}>
          <Spin spinning={loading}>
            <Button
              type="primary"
              size="large"
              style={{ backgroundColor: "#f78db3", border: "none", fontWeight: "bold" }}
              onClick={handleSubmit}
            >
              Xác nhận đăng ký lịch
            </Button>
          </Spin>
        </div>
      </Card>
    </div>
  );
};

export default RegisterSchedulePage;
