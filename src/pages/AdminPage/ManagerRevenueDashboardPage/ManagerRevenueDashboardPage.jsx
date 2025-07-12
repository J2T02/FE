import React, { useState } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Statistic,
  Typography,
  Select,
  DatePicker,
  Avatar,
  Space,
  theme,
} from "antd";
import {
  DollarCircleOutlined,
  CalendarOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const { Title, Text } = Typography;
const { Option } = Select;

const PINK = "#ED7BA5";
const LIGHT_PINK = "#FDE9EF";
const GREEN = "#52c41a";
const YELLOW = "#faad14";

const mockPayments = [
  { Payment_ID: 1, PaymentDate: "2025-07-01", Amount: 5000000, PaymentType_ID: 2, Status_ID: 2 },
  { Payment_ID: 2, PaymentDate: "2025-07-03", Amount: 4800000, PaymentType_ID: 2, Status_ID: 2 },
  { Payment_ID: 3, PaymentDate: "2025-07-04", Amount: 3000000, PaymentType_ID: 2, Status_ID: 2 },
  { Payment_ID: 4, PaymentDate: "2025-07-05", Amount: 4500000, PaymentType_ID: 2, Status_ID: 2 },
  { Payment_ID: 5, PaymentDate: "2025-07-06", Amount: 3200000, PaymentType_ID: 2, Status_ID: 2 },
  { Payment_ID: 6, PaymentDate: "2025-07-08", Amount: 3100000, PaymentType_ID: 2, Status_ID: 1 },
  { Payment_ID: 7, PaymentDate: "2025-07-09", Amount: 4600000, PaymentType_ID: 2, Status_ID: 2 },
];

const mockTreatmentPlans = [
  { TP_ID: 1, StartDate: "2025-07-01", Ser_ID: 2 },
  { TP_ID: 2, StartDate: "2025-07-03", Ser_ID: 2 },
  { TP_ID: 3, StartDate: "2025-07-04", Ser_ID: 3 },
  { TP_ID: 4, StartDate: "2025-07-05", Ser_ID: 2 },
  { TP_ID: 5, StartDate: "2025-07-06", Ser_ID: 3 },
  { TP_ID: 6, StartDate: "2025-07-08", Ser_ID: 3 },
  { TP_ID: 7, StartDate: "2025-07-09", Ser_ID: 2 },
];

const mockBookings = [
  { Booking_ID: 1, Date: "2025-07-01", Doc_ID: 1 },
  { Booking_ID: 2, Date: "2025-07-02", Doc_ID: 2 },
  { Booking_ID: 3, Date: "2025-07-03", Doc_ID: 1 },
  { Booking_ID: 4, Date: "2025-07-04", Doc_ID: 2 },
  { Booking_ID: 5, Date: "2025-07-05", Doc_ID: 1 },
  { Booking_ID: 6, Date: "2025-07-05", Doc_ID: 1 },
];

const mockAccounts = [
  { Acc_ID: 1, Full_Name: "Dr. A" },
  { Acc_ID: 2, Full_Name: "Dr. B" },
  { Acc_ID: 3, Full_Name: "Dr. C" },
];

const mockDoctors = [
  { Doc_ID: 1, Acc_ID: 1 },
  { Doc_ID: 2, Acc_ID: 2 },
  { Doc_ID: 3, Acc_ID: 3 },
];

const serviceMap = {
  1: "Khám tư vấn",
  2: "IVF",
  3: "IUI",
};

export default function ManagerRevenueDashboardPage() {
  const { token } = theme.useToken();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [filterOption, setFilterOption] = useState("month");

  const getStartEndDate = () => {
    const now = selectedDate;
    switch (filterOption) {
      case "week":
        return [now.startOf("week"), now.endOf("week")];
      case "3month":
        return [now.subtract(3, "month").startOf("month"), now.endOf("month")];
      case "6month":
        return [now.subtract(6, "month").startOf("month"), now.endOf("month")];
      case "9month":
        return [now.subtract(9, "month").startOf("month"), now.endOf("month")];
      case "year":
        return [now.subtract(1, "year").startOf("month"), now.endOf("month")];
      default:
        return [now.startOf("month"), now.endOf("month")];
    }
  };

  const [startDate, endDate] = getStartEndDate();

  const filteredPayments = mockPayments.filter(
    (p) =>
      p.Status_ID === 2 &&
      dayjs(p.PaymentDate).isBetween(startDate, endDate, "day", "[]")
  );

  const filteredPlans = mockTreatmentPlans.filter((plan) =>
    dayjs(plan.StartDate).isBetween(startDate, endDate, "day", "[]")
  );

  const filteredBookings = mockBookings.filter((b) =>
    dayjs(b.Date).isBetween(startDate, endDate, "day", "[]")
  );

  const totalRevenue = filteredPayments.reduce((sum, p) => sum + p.Amount, 0);
  const totalBookings = filteredBookings.length;
  const totalTreatmentPlans = filteredPlans.length;

  const chartData = [];
  const days = endDate.diff(startDate, "day");
  for (let i = 0; i <= days; i++) {
    const date = startDate.add(i, "day");
    const revenue = filteredPayments
      .filter((p) => dayjs(p.PaymentDate).isSame(date, "day"))
      .reduce((sum, p) => sum + p.Amount, 0);
    chartData.push({
      name: date.format("DD/MM"),
      DoanhThu: revenue,
    });
  }

  const serviceStats = {};
  filteredPlans.forEach((p) => {
    if (p.Ser_ID !== 1) {
      const name = serviceMap[p.Ser_ID];
      serviceStats[name] = (serviceStats[name] || 0) + 1;
    }
  });

  const topService = Object.entries(serviceStats).sort((a, b) => b[1] - a[1])[0];

  const doctorStats = {};
  filteredBookings.forEach((b) => {
    doctorStats[b.Doc_ID] = (doctorStats[b.Doc_ID] || 0) + 1;
  });

  const topDoctorEntry = Object.entries(doctorStats).sort((a, b) => b[1] - a[1])[0];
  const topDoctor = topDoctorEntry
    ? mockDoctors.find((d) => d.Doc_ID === parseInt(topDoctorEntry[0]))
    : null;
  const topDoctorName = topDoctor
    ? mockAccounts.find((a) => a.Acc_ID === topDoctor.Acc_ID)?.Full_Name
    : null;

  return (
    <Layout style={{ padding: 24, background: LIGHT_PINK, minHeight: "100vh" }}>
      <Title level={3} style={{ color: PINK }}>💰 Dashboard Doanh thu</Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="Tổng doanh thu" value={totalRevenue.toLocaleString("vi-VN") + " VNĐ"} prefix={<DollarCircleOutlined style={{ color: GREEN }} />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="Số lượng booking" value={totalBookings} prefix={<CalendarOutlined style={{ color: PINK }} />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic title="Số lượng hồ sơ đang điều trị" value={totalTreatmentPlans} prefix={<FileTextOutlined style={{ color: YELLOW }} />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Card
            title="📊 Doanh thu theo thời gian"
            extra={
              <Space>
                <Select value={filterOption} onChange={setFilterOption}>
                  <Option value="week">Tuần này</Option>
                  <Option value="month">Tháng này</Option>
                  <Option value="3month">3 tháng</Option>
                  <Option value="6month">6 tháng</Option>
                  <Option value="9month">9 tháng</Option>
                  <Option value="year">1 năm</Option>
                </Select>
                <DatePicker
                  picker="month"
                  value={selectedDate}
                  onChange={setSelectedDate}
                />
              </Space>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="DoanhThu"
                  stroke={PINK}
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="🔥 Dịch vụ phổ biến nhất">
            {topService ? (
              <Space direction="vertical">
                <Text strong>{topService[0]}</Text>
                <Text>{topService[1]} lượt sử dụng</Text>
              </Space>
            ) : (
              <Text>Không có dữ liệu</Text>
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="🏥 Bác sĩ có nhiều booking nhất">
            {topDoctorName ? (
              <Space>
                <Avatar icon={<UserOutlined />} />
                <Space direction="vertical">
                  <Text strong>{topDoctorName}</Text>
                  <Text>{topDoctorEntry[1]} lượt đặt khám</Text>
                </Space>
              </Space>
            ) : (
              <Text>Không có dữ liệu</Text>
            )}
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}