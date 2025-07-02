import React, { useState, useEffect } from "react";
import { Calendar, Radio, Typography, Card, Button, message, Spin, Alert, Space, Row, Col } from "antd";
import dayjs from "dayjs";
import { GetSchedule } from "../../../apis/bookingService";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const Schedule = ({ data, doctors = [], onUpdate, onNext, onPrev, disablePrev, loading }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [scheduleError, setScheduleError] = useState(null);

  useEffect(() => {
    if (data?.date) {
      setSelectedDate(dayjs(data.date));
    }
    if (data?.slot) {
      setSelectedSlot(data.slot);
    }
  }, [data]);

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!data?.doctorId) {
        setAvailableSchedules([]);
        setScheduleError(null);
        return;
      }

      setScheduleLoading(true);
      setScheduleError(null);

      try {
        const res = await GetSchedule(data.doctorId);
        const schedules = Array.isArray(res.data.data) ? res.data.data : [];
        setAvailableSchedules(schedules);
        
        if (schedules.length === 0) {
          setScheduleError("Bác sĩ này chưa có lịch khám trong thời gian tới.");
        }
      } catch (error) {
        console.error("Lỗi khi tải lịch khám:", error);
        setScheduleError("Không thể tải lịch khám của bác sĩ.");
        setAvailableSchedules([]);
      } finally {
        setScheduleLoading(false);
      }
    };

    fetchSchedule();
  }, [data?.doctorId]);

  useEffect(() => {
    if (selectedDate && selectedSlot) {
      const dateStr = selectedDate.format("YYYY-MM-DD");

      if (!data?.doctorId) {
        // Không chọn bác sĩ - sử dụng slot cố định
        let slotStart = "", slotEnd = "", slotId = null;
        if (selectedSlot === "sang") {
        slotStart = "08:00:00";
        slotEnd = "12:00:00";
        slotId = 1;
      } else if (selectedSlot === "chieu") {
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
        // Có chọn bác sĩ - sử dụng lịch cụ thể
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
  }, [selectedDate, selectedSlot, data?.doctorId, onUpdate]);

  const getSlotsForSelectedDate = () => {
    const dateStr = selectedDate?.format("YYYY-MM-DD");
    return availableSchedules.filter((s) => s.workDate === dateStr);
  };

  const disabledDate = (current) => {
    // Không cho phép chọn ngày trong quá khứ
    if (current && current < dayjs().startOf('day')) {
      return true;
    }

    // Nếu có chọn bác sĩ, chỉ cho phép chọn ngày có lịch
    if (data?.doctorId) {
      const allDates = availableSchedules.map((s) => s.workDate);
      return !allDates.includes(current.format("YYYY-MM-DD"));
    }

    return false;
  };

  const getSelectedDoctorName = () => {
    if (!data?.doctorId) return null;
    const doctor = doctors.find(d => d.docId === data.doctorId);
    return doctor?.accountInfo?.fullName || `Bác sĩ #${data.doctorId}`;
  };

  const handleDateSelect = (date) => {
    // Kiểm tra xem ngày có hợp lệ không
    if (date && date < dayjs().startOf('day')) {
      message.warning("Không thể chọn ngày trong quá khứ.");
      return;
    }
    
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleNext = () => {
    if (!selectedDate || !selectedSlot) {
      return message.warning("Vui lòng chọn ngày và ca khám.");
    }

    // Kiểm tra lại ngày trước khi tiếp tục
    if (selectedDate && selectedDate < dayjs().startOf('day')) {
      return message.error("Không thể đặt lịch cho ngày trong quá khứ.");
    }

    onNext();
  };

  return (
    <Card>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <div>
          <Title level={4}>
            <CalendarOutlined style={{ marginRight: 8 }} />
            Chọn ngày khám
          </Title>
          {data?.doctorId && (
            <Text type="secondary">
              Đang xem lịch của: <Text strong>{getSelectedDoctorName()}</Text>
            </Text>
          )}
          <div style={{ marginTop: 8 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              ⚠️ Không thể đặt lịch cho ngày trong quá khứ
            </Text>
          </div>
        </div>

        <Row gutter={24}>
          <Col span={16}>
            <Calendar
              fullscreen={false}
              value={selectedDate || dayjs()}
              onSelect={handleDateSelect}
              disabledDate={disabledDate}
            />
          </Col>
          
          <Col span={8}>
            <Card title="Khung giờ khả dụng" size="small">
              {scheduleLoading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <Spin size="small" tip="Đang tải..." />
                </div>
              ) : scheduleError ? (
                <Alert
                  message="Lỗi"
                  description={scheduleError}
                  type="warning"
                  showIcon
                  size="small"
                />
              ) : selectedDate ? (
                <div>
                  <Text style={{ display: "block", marginBottom: 12 }}>
                    Ngày: <Text strong>{selectedDate.format("DD/MM/YYYY")}</Text>
                  </Text>
                  
                  <Radio.Group
                    onChange={(e) => handleSlotSelect(e.target.value)}
                    value={selectedSlot}
                    style={{ width: "100%" }}
                  >
                    <Space direction="vertical" style={{ width: "100%" }}>
                      {data?.doctorId
                        ? getSlotsForSelectedDate().map((item) => (
                            <Radio.Button 
                              key={item.dsId} 
                              value={item.slot.slotId}
                              style={{ width: "100%", textAlign: "center" }}
                            >
                              <ClockCircleOutlined style={{ marginRight: 4 }} />
                              {item.slot.slotStart} - {item.slot.slotEnd}
                            </Radio.Button>
                          ))
                        : [
                            <Radio.Button 
                              key="sang" 
                              value="sang"
                              style={{ width: "100%", textAlign: "center" }}
                            >
                              <ClockCircleOutlined style={{ marginRight: 4 }} />
                              08:00 - 12:00
                            </Radio.Button>,
                            <Radio.Button 
                              key="chieu" 
                              value="chieu"
                              style={{ width: "100%", textAlign: "center" }}
                            >
                              <ClockCircleOutlined style={{ marginRight: 4 }} />
                              13:00 - 17:00
                            </Radio.Button>,
                          ]}
                    </Space>
                  </Radio.Group>

                  {data?.doctorId && getSlotsForSelectedDate().length === 0 && (
                    <Alert
                      message="Không có lịch"
                      description="Bác sĩ không có lịch khám vào ngày này"
                      type="info"
                      showIcon
                      size="small"
                      style={{ marginTop: 12 }}
                    />
                  )}
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
                  <CalendarOutlined style={{ fontSize: 24, marginBottom: 8 }} />
                  <br />
                  <Text>Vui lòng chọn ngày</Text>
                </div>
              )}
            </Card>
          </Col>
        </Row>

        {selectedDate && selectedSlot && (
          <Card size="small" style={{ backgroundColor: '#f6ffed', borderColor: '#b7eb8f' }}>
            <Paragraph style={{ margin: 0 }}>
              <Text strong>Đã chọn:</Text> {selectedDate.format("DD/MM/YYYY")} - 
              {data?.doctorId 
                ? ` ${getSlotsForSelectedDate().find(s => s.slot.slotId === selectedSlot)?.slot.slotStart} - ${getSlotsForSelectedDate().find(s => s.slot.slotId === selectedSlot)?.slot.slotEnd}`
                : ` ${selectedSlot === 'sang' ? '08:00 - 12:00' : '13:00 - 17:00'}`
              }
            </Paragraph>
          </Card>
        )}

        <div style={{ textAlign: "right" }}>
          <Button type="primary" onClick={onPrev} style={{ marginRight: 8 }}>
            Quay lại
          </Button>
          <Button
            type="primary"
            onClick={handleNext}
            disabled={!selectedDate || !selectedSlot}
          >
            Tiếp theo
          </Button>
        </div>
      </Space>
    </Card>
  );
};

export default Schedule;
