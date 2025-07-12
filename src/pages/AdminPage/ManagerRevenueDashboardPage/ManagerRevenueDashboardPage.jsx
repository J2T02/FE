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

const mockTreatmentPlans = [
  { TP_ID: 1, StartDate: "2025-07-01", Status: 1, Ser_ID: 2, Price: 5000000 },
  { TP_ID: 2, StartDate: "2025-07-03", Status: 1, Ser_ID: 2, Price: 4800000 },
  { TP_ID: 3, StartDate: "2025-07-04", Status: 1, Ser_ID: 3, Price: 3000000 },
  { TP_ID: 4, StartDate: "2025-07-05", Status: 1, Ser_ID: 2, Price: 4500000 },
  { TP_ID: 5, StartDate: "2025-07-06", Status: 1, Ser_ID: 3, Price: 3200000 },
  { TP_ID: 6, StartDate: "2025-07-08", Status: 1, Ser_ID: 3, Price: 3100000 },
  { TP_ID: 7, StartDate: "2025-07-09", Status: 1, Ser_ID: 2, Price: 4600000 },
];

const mockBookings = [
  { Booking_ID: 1, Date: "2025-07-01" },
  { Booking_ID: 2, Date: "2025-07-02" },
  { Booking_ID: 3, Date: "2025-07-03" },
  { Booking_ID: 4, Date: "2025-07-04" },
];

const mockDoctors = [
  { Doc_ID: 1, Name: "Dr. A", BookingCount: 6 },
  { Doc_ID: 2, Name: "Dr. B", BookingCount: 4 },
  { Doc_ID: 3, Name: "Dr. C", BookingCount: 2 },
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

  const filteredPlans = mockTreatmentPlans.filter((plan) =>
    dayjs(plan.StartDate).isBetween(startDate, endDate, "day", "[]")
  );

  const filteredBookings = mockBookings.filter((b) =>
    dayjs(b.Date).isBetween(startDate, endDate, "day", "[]")
  );

  const totalRevenue = filteredPlans.reduce((sum, p) => sum + p.Price, 0);
  const totalBookings = filteredBookings.length;
  const totalTreatmentPlans = filteredPlans.length;

  const chartData = [];
  const days = endDate.diff(startDate, "day");
  for (let i = 0; i <= days; i++) {
    const date = startDate.add(i, "day");
    const revenue = filteredPlans
      .filter((p) => dayjs(p.StartDate).isSame(date, "day"))
      .reduce((sum, p) => sum + p.Price, 0);
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
  const topDoctor = mockDoctors.sort((a, b) => b.BookingCount - a.BookingCount)[0];

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
            {topDoctor ? (
              <Space>
                <Avatar icon={<UserOutlined />} />
                <Space direction="vertical">
                  <Text strong>{topDoctor.Name}</Text>
                  <Text>{topDoctor.BookingCount} lượt đặt khám</Text>
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
