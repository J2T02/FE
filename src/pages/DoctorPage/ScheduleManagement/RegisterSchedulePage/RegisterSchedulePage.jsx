import React, { useEffect, useState, useContext } from "react";
import {
  Card, Typography, Button, Calendar, Checkbox, Row, Col, message, Spin
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { DoctorStoreContext } from "../../contexts/DoctorStoreProvider";

const { Title, Text } = Typography;

// Dữ liệu mẫu các khung giờ
const mockSlots = [
  { slotId: 1, slotStart: "08:00:00", slotEnd: "09:00:00" },
  { slotId: 2, slotStart: "09:00:00", slotEnd: "10:00:00" },
  { slotId: 3, slotStart: "10:00:00", slotEnd: "11:00:00" },
  { slotId: 4, slotStart: "14:00:00", slotEnd: "15:00:00" },
  { slotId: 5, slotStart: "15:00:00", slotEnd: "16:00:00" },
];

const RegisterSchedulePage = ({ onBack }) => {
  const { doctorInfo } = useContext(DoctorStoreContext) || { doctorInfo: { docId: 999 } };
  const [slots, setSlots] = useState([]);
  const [selectedDates, setSelectedDates] = useState({}); // { "2025-08-02": [1, 2] }
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSlots(mockSlots);
  }, []);

  // Tính tháng kế tiếp
  const nextMonth = dayjs().add(1, "month").month();
  const nextYear = dayjs().add(1, "month").year();

  const disabledDate = (current) => {
    return (
      current.month() !== nextMonth || current.year() !== nextYear
    );
  };

  const onSelectDate = (date) => {
    const dateStr = date.format("YYYY-MM-DD");
    if (!selectedDates[dateStr]) {
      setSelectedDates((prev) => ({
        ...prev,
        [dateStr]: [],
      }));
    }
  };

  const toggleSlot = (dateStr, slotId) => {
    setSelectedDates((prev) => {
      const current = prev[dateStr] || [];
      const updated = current.includes(slotId)
        ? current.filter((id) => id !== slotId)
        : [...current, slotId];
      return {
        ...prev,
        [dateStr]: updated,
      };
    });
  };

  const toggleSelectAll = (dateStr) => {
    setSelectedDates((prev) => {
      const allIds = slots.map((s) => s.slotId);
      const alreadySelected = (prev[dateStr] || []).length === allIds.length;
      return {
        ...prev,
        [dateStr]: alreadySelected ? [] : allIds,
      };
    });
  };

  const handleRemoveDate = (dateStr) => {
    setSelectedDates((prev) => {
      const updated = { ...prev };
      delete updated[dateStr];
      return updated;
    });
  };

  const handleSubmit = () => {
    if (Object.keys(selectedDates).length < 25) {
      message.warning("Bác sĩ cần đăng ký ít nhất 25 ngày làm việc trong tháng.");
      return;
    }
    const payload = [];
    for (const [date, slotIds] of Object.entries(selectedDates)) {
      slotIds.forEach((slotId) => {
        payload.push({
          docId: doctorInfo?.docId || 999,
          workDate: date,
          slotId,
          isAvailable: true,
          maxBooking: 1,
        });
      });
    }

    if (payload.length === 0) {
      message.warning("Vui lòng chọn ít nhất một ngày và khung giờ.");
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
            style={{
              backgroundColor: "#f78db3",
              color: "white",
              border: "none",
            }}
          >
            Quay lại
          </Button>
          <Title level={3}>📅 Đăng ký lịch làm việc cho tháng {dayjs().add(1, "month").format("MM/YYYY")}</Title>
        </Row>

        {/* Chọn ngày */}
        <div style={{ marginBottom: 24 }}>
          <Title level={4}>🗓 Chọn ngày muốn đăng ký</Title>
          <Calendar
            fullscreen={false}
            defaultValue={dayjs().add(1, "month").startOf("month")}
            disabledDate={disabledDate}
            onSelect={onSelectDate}
            dateFullCellRender={(date) => {
              const dateStr = date.format("YYYY-MM-DD");
              const isSelected = !!selectedDates[dateStr];
              return (
                <div
                  style={{
                    background: isSelected ? "#ffd6e7" : undefined,
                    borderRadius: 6,
                    padding: 4,
                    textAlign: "center",
                  }}
                >
                  {date.date()}
                </div>
              );
            }}
          />
        </div>

        {/* Danh sách các ngày đã chọn */}
        {Object.entries(selectedDates).length === 0 ? (
          <Text type="secondary">Chưa có ngày nào được chọn.</Text>
        ) : (
          Object.entries(selectedDates).map(([dateStr, slotIds]) => {
            const allSelected = slotIds.length === slots.length;
            return (
              <Card
                key={dateStr}
                size="small"
                title={
                  <Row justify="space-between" align="middle">
                    <Col>
                      📍 {dayjs(dateStr).format("dddd, DD/MM/YYYY")}
                    </Col>
                    <Col>
                      <Button
                        size="small"
                        danger
                        type="text"
                        onClick={() => handleRemoveDate(dateStr)}
                      >
                        🗑 Xoá ngày
                      </Button>
                    </Col>
                  </Row>
                }
                style={{ marginBottom: 16, background: "#fafafa" }}
              >
                <Row justify="space-between" align="middle" style={{ marginBottom: 8 }}>
                  <Col>
                    <Text strong>Khung giờ:</Text>
                  </Col>
                  <Col>
                    <Checkbox
                      checked={allSelected}
                      onChange={() => toggleSelectAll(dateStr)}
                    >
                      Chọn tất cả
                    </Checkbox>
                  </Col>
                </Row>

                <Row gutter={[16, 16]}>
                  {slots.map((slot) => (
                    <Col key={slot.slotId} xs={12} sm={8} md={6} lg={4}>
                      <Checkbox
                        checked={slotIds.includes(slot.slotId)}
                        onChange={() => toggleSlot(dateStr, slot.slotId)}
                      >
                        {slot.slotStart.slice(0, 5)} - {slot.slotEnd.slice(0, 5)}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Card>
            );
          })
        )}

        <div style={{ textAlign: "right", marginTop: 24 }}>
          <Spin spinning={loading}>
            <Button
              type="primary"
              size="large"
              style={{
                backgroundColor: "#f78db3",
                border: "none",
                fontWeight: "bold",
              }}
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
