import React, { useState, useMemo } from "react";
import {
  Card,
  Select,
  Row,
  Col,
  Typography,
  Tag,
  Calendar,
  Timeline,
  Button,
  Space,
  Badge,
  Avatar,
} from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import "dayjs/locale/vi";
dayjs.extend(isoWeek);
dayjs.locale("vi");

const { Title, Text } = Typography;
const { Option } = Select;

// Mock data for appointments
const appointmentData = {
  "2025-07-08": [
    {
      id: 1,
      time: "08:30",
      duration: "30 phút",
      patient: "Đỗ Thanh Hùng & Vũ Thị Thu",
      service: "Tư vấn hiếm muộn",
      status: "confirmed",
      avatar: "/anhcuong.jpg",
    },
    {
      id: 2,
      time: "10:00",
      duration: "30 phút",
      patient: "Phan Minh Long & Ngô Thị Linh",
      service: "Siêu âm 4D",
      status: "confirmed",
      avatar: "/anhhuynh.png",
    },
  ],
  "2025-07-09": [
    {
      id: 1,
      time: "08:00",
      duration: "30 phút",
      patient: "Lê Minh Tuấn & Phạm Thị Hoa",
      service: "Xét nghiệm nội tiết",
      status: "confirmed",
      avatar: "/anhcuong.jpg",
    },
    {
      id: 2,
      time: "10:30",
      duration: "30 phút",
      patient: "Hoàng Văn Đức & Bùi Thị Lan",
      service: "Chụp tử cung vòi trứng (HSG)",
      status: "completed",
      avatar: "/anhhuynh.png",
    },
    {
      id: 3,
      time: "16:00",
      duration: "30 phút",
      patient: "Trống",
      service: "Chưa có dịch vụ",
      status: "cancelled",
      avatar: null,
    },
  ],
};

const statsData = {
  today: 3,
  thisWeek: 8,
  pending: 2,
  completed: 1,
  availableSlots: 3,
};

const doctorWeeklySchedule = {
  "2025-06-30": ["afternoon"],
  "2025-07-01": ["morning", "afternoon"],
  "2025-07-02": [],
  "2025-07-03": ["morning"],
  "2025-07-04": ["morning", "afternoon"],
  "2025-07-05": ["afternoon"],
  "2025-07-06": [],
  "2025-07-07": ["morning"],
  "2025-07-08": ["afternoon"],
  "2025-07-09": ["morning", "afternoon"],
  "2025-07-10": [],
  "2025-07-11": ["morning", "afternoon"],
  "2025-07-12": [],
  "2025-07-13": ["afternoon"],
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
  const [viewMode, setViewMode] = useState("timeline");

  const weekOptions = useMemo(
    () => generateWeekStartDates(selectedYear),
    [selectedYear]
  );

  const currentWeekStart = dayjs().startOf("isoWeek").format("YYYY-MM-DD");
  const defaultWeek =
    weekOptions.find((w) => w.value === currentWeekStart)?.value ||
    weekOptions[0].value;

  const [selectedWeekStart, setSelectedWeekStart] = useState(defaultWeek);
  const [selectedDate, setSelectedDate] = useState(dayjs("2025-07-08"));

  const weekDates = getWeekDates(selectedWeekStart);
  const selectedDateStr = selectedDate.format("YYYY-MM-DD");
  const todayAppointments = appointmentData[selectedDateStr] || [];

  // Calendar cell render function
  const dateCellRender = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const appointments = appointmentData[dateStr] || [];

    if (appointments.length > 0) {
      return (
        <div style={{ textAlign: "center" }}>
          <Badge count={appointments.length} size="small" />
        </div>
      );
    }
    return null;
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card
      size="small"
      style={{
        textAlign: "center",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ color: color, fontSize: 24, marginBottom: 8 }}>{icon}</div>
      <Title level={2} style={{ margin: 0, color: color }}>
        {value}
      </Title>
      <Text type="secondary">{title}</Text>
    </Card>
  );

  const AppointmentCard = ({ appointment }) => (
    <Card
      size="small"
      style={{
        marginBottom: 16,
        borderRadius: 8,
        border:
          appointment.status === "confirmed"
            ? "1px solid #52c41a"
            : appointment.status === "completed"
            ? "1px solid #1890ff"
            : "1px solid #d9d9d9",
      }}
    >
      <Row align="middle" gutter={16}>
        <Col>
          <Avatar
            size={48}
            src={appointment.avatar}
            icon={<UserOutlined />}
            style={{
              backgroundColor:
                appointment.status === "cancelled" ? "#f5f5f5" : undefined,
            }}
          />
        </Col>
        <Col flex={1}>
          <div>
            <Text strong style={{ fontSize: 16 }}>
              {appointment.patient}
            </Text>
            <br />
            <Text type="secondary">{appointment.service}</Text>
          </div>
        </Col>
        <Col>
          <div style={{ textAlign: "right" }}>
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
            >
              <ClockCircleOutlined
                style={{ marginRight: 4, color: "#ff4d4f" }}
              />
              <Text strong>{appointment.time}</Text>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
            >
              <ClockCircleOutlined
                style={{ marginRight: 4, color: "#1890ff" }}
              />
              <Text>{appointment.duration}</Text>
            </div>
            <Tag
              color={
                appointment.status === "confirmed"
                  ? "green"
                  : appointment.status === "completed"
                  ? "blue"
                  : "default"
              }
              style={{ margin: 0 }}
            >
              {appointment.status === "confirmed"
                ? "Đã xác nhận"
                : appointment.status === "completed"
                ? "Hoàn thành"
                : "Đã hủy"}
            </Tag>
          </div>
        </Col>
      </Row>
    </Card>
  );

  // Timeline data for selected date - Custom layout with time on left, content on right
  const getTimelineSlots = () => {
    const selectedDateStr = selectedDate.format("YYYY-MM-DD");
    const appointments = appointmentData[selectedDateStr] || [];
    const timeSlots = [
      "08:00",
      "08:30",
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
    ];

    return timeSlots.map((timeSlot) => {
      const appointment = appointments.find((apt) => apt.time === timeSlot);
      return {
        time: timeSlot,
        appointment: appointment || null,
      };
    });
  };

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0, color: "black" }}>
          Lịch làm việc bác sĩ
        </Title>
        <Text type="secondary">
          Quản lý và theo dõi lịch hẹn bệnh nhân • Hệ thống đặt lịch hiện đại
        </Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8} lg={4} xl={4}>
          <StatCard
            title="Hôm nay"
            value={statsData.today}
            icon={<CalendarOutlined />}
            color="#1890ff"
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={4} xl={4}>
          <StatCard
            title="Tuần này"
            value={statsData.thisWeek}
            icon={<ClockCircleOutlined />}
            color="#52c41a"
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={5} xl={5}>
          <StatCard
            title="Chờ xác nhận"
            value={statsData.pending}
            icon={<UserOutlined />}
            color="#fa8c16"
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={5} xl={5}>
          <StatCard
            title="Hoàn thành"
            value={statsData.completed}
            icon={<ScheduleOutlined />}
            color="#722ed1"
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          <StatCard
            title="Slot trống"
            value={statsData.availableSlots}
            icon={<ScheduleOutlined />}
            color="#13c2c2"
          />
        </Col>
      </Row>

      {/* Main Content */}
      <Card
        style={{
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          minHeight: "800px",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <Title level={3} style={{ margin: 0, marginBottom: 8 }}>
            Lịch hẹn bệnh nhân
          </Title>
          <Text type="secondary">
            Xem lịch làm việc, theo dõi lịch hẹn timeline • Tổng số: 11 lịch hẹn
          </Text>
        </div>

        {/* View Mode Buttons */}
        <div style={{ marginBottom: 24, display: "flex", gap: "16px" }}>
          <Button
            type={viewMode === "calendar" ? "primary" : "default"}
            onClick={() => setViewMode("calendar")}
            size="large"
            icon={<CalendarOutlined />}
            style={{
              borderRadius: 8,
              fontWeight: 600,
              height: 40,
              flex: 1,
              color: viewMode === "timeline" ? "black" : "white",
            }}
          >
            Calendar View
          </Button>
          <Button
            type={viewMode === "timeline" ? "primary" : "default"}
            onClick={() => setViewMode("timeline")}
            size="large"
            icon={<ClockCircleOutlined />}
            style={{
              borderRadius: 8,
              fontWeight: 600,
              height: 40,
              flex: 1,
              color: viewMode === "timeline" ? "white" : "black",
            }}
          >
            Timeline View
          </Button>
        </div>

        {/* Content Layout */}
        {viewMode === "calendar" ? (
          <Row gutter={24} style={{ minHeight: 700 }}>
            <Col span={24}>
              <Row gutter={24}>
                {/* Left Column - Calendar */}
                <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                  <div style={{ marginBottom: 16 }}>
                    <Title level={4}>Chọn ngày</Title>
                    <Text type="secondary">
                      Chọn ngày để xem lịch hẹn timeline
                    </Text>
                  </div>

                  <Calendar
                    dateCellRender={dateCellRender}
                    onSelect={setSelectedDate}
                    value={selectedDate}
                    style={{
                      borderRadius: 8,
                      border: "1px solid #f0f0f0",
                      width: "100%",
                    }}
                  />
                </Col>

                {/* Right Column - Appointments */}
                <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                  <div style={{ marginBottom: 16 }}>
                    <Title level={4}>
                      Lịch hẹn ngày {selectedDate.format("DD/MM/YYYY")}
                    </Title>
                    <Text type="secondary">
                      {todayAppointments.length} cuộc hẹn
                    </Text>
                  </div>

                  <div
                    style={{ maxHeight: 700, overflowY: "auto", width: "100%" }}
                  >
                    {todayAppointments.length > 0 ? (
                      todayAppointments.map((appointment) => (
                        <AppointmentCard
                          key={appointment.id}
                          appointment={appointment}
                        />
                      ))
                    ) : (
                      <Card
                        size="small"
                        style={{
                          textAlign: "center",
                          borderStyle: "dashed",
                          borderColor: "#d9d9d9",
                        }}
                      >
                        <div style={{ padding: "40px 20px" }}>
                          <CalendarOutlined
                            style={{
                              fontSize: 48,
                              color: "#d9d9d9",
                              marginBottom: 16,
                            }}
                          />
                          <br />
                          <Text type="secondary">
                            Không có lịch hẹn nào trong ngày này
                          </Text>
                        </div>
                      </Card>
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        ) : (
          /* Timeline View - Single Large Card */
          <div style={{ width: "100%" }}>
            <div style={{ marginBottom: 16, textAlign: "center" }}>
              <Title level={4} style={{ margin: 0, marginBottom: 4 }}>
                Timeline - {selectedDate.format("DD/MM/YYYY")}
              </Title>
              <Text type="secondary">
                Lịch hẹn làm việc theo giờ đã cuộc hẹn
              </Text>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Button
                type="default"
                onClick={() => setSelectedDate(selectedDate.subtract(1, "day"))}
                icon={<span>←</span>}
                size="small"
                style={{ color: "black" }}
              >
                Ngày trước
              </Button>
              <Text strong>{selectedDate.format("dddd, DD/MM/YYYY")}</Text>
              <Button
                type="default"
                onClick={() => setSelectedDate(selectedDate.add(1, "day"))}
                icon={<span>→</span>}
                size="small"
                style={{ color: "black" }}
              >
                Ngày sau
              </Button>
            </div>
            <div
              style={{
                padding: "24px",
                backgroundColor: "#fafafa",
                borderRadius: 8,
                minHeight: 700,
                maxHeight: 800,
                overflowY: "auto",
                width: "100%",
              }}
            >
              {getTimelineSlots().map((slot, index) => (
                <div
                  key={slot.time}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom:
                      index === getTimelineSlots().length - 1 ? 0 : 24,
                    paddingBottom:
                      index === getTimelineSlots().length - 1 ? 0 : 24,
                    borderBottom:
                      index === getTimelineSlots().length - 1
                        ? "none"
                        : "1px solid #f0f0f0",
                  }}
                >
                  {/* Time Column - Left */}
                  <div
                    style={{
                      width: "80px",
                      flexShrink: 0,
                      paddingRight: "16px",
                      textAlign: "right",
                    }}
                  >
                    <Text strong style={{ fontSize: "16px", color: "black" }}>
                      {slot.time}
                    </Text>
                  </div>

                  {/* Content Column - Right */}
                  <div
                    style={{
                      flex: 1,
                      paddingLeft: "16px",
                      borderLeft: `3px solid ${
                        slot.appointment
                          ? slot.appointment.status === "confirmed"
                            ? "#52c41a"
                            : slot.appointment.status === "completed"
                            ? "#1890ff"
                            : "#d9d9d9"
                          : "#f0f0f0"
                      }`,
                    }}
                  >
                    {slot.appointment ? (
                      <div style={{ paddingLeft: "16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: 8,
                          }}
                        >
                          <Avatar
                            size={40}
                            src={slot.appointment.avatar}
                            icon={<UserOutlined />}
                            style={{ marginRight: 12 }}
                          />
                          <div>
                            <Text strong style={{ fontSize: 16 }}>
                              {slot.appointment.patient}
                            </Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: 14 }}>
                              {slot.appointment.service}
                            </Text>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            paddingLeft: "52px",
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <ClockCircleOutlined
                              style={{ color: "#1890ff", marginRight: 4 }}
                            />
                            <Text>{slot.appointment.duration}</Text>
                          </div>
                          <Tag
                            color={
                              slot.appointment.status === "confirmed"
                                ? "green"
                                : slot.appointment.status === "completed"
                                ? "blue"
                                : "default"
                            }
                            size="small"
                          >
                            {slot.appointment.status === "confirmed"
                              ? "Đã xác nhận"
                              : slot.appointment.status === "completed"
                              ? "Hoàn thành"
                              : "Đã hủy"}
                          </Tag>
                        </div>
                      </div>
                    ) : (
                      <div style={{ paddingLeft: "16px", paddingTop: "8px" }}>
                        <Text type="secondary" style={{ fontStyle: "italic" }}>
                          Trống
                        </Text>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ScheduleManagement;
