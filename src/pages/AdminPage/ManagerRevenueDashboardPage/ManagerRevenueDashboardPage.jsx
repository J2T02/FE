import React, { useState, useEffect } from "react";
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
  message,
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
import { dashboardRevenue } from "../../../apis/adminService";

const { Title, Text } = Typography;
const { Option } = Select;

const PINK = "#ED7BA5";
const LIGHT_PINK = "#FDE9EF";
const GREEN = "#52c41a";
const YELLOW = "#faad14";

// Mapping filter options to API period values
const periodMapping = {
  week: 1,
  month: 2,
  "3month": 3,
  "6month": 4,
  "9month": 5,
  year: 6,
};

export default function ManagerRevenueDashboardPage() {
  const { token } = theme.useToken();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [filterOption, setFilterOption] = useState("month");
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    totalTreatmentPlans: 0,
    revenueChart: [],
    topService: null,
    topDoctor: null,
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const period = periodMapping[filterOption];
      const response = await dashboardRevenue(period);

      console.log("Dashboard API Response:", response);
      console.log("Dashboard Response data:", response.data);

      if (response.data.success) {
        setDashboardData(response.data.data);
        console.log("Set dashboard data:", response.data.data);
      } else {
        message.error("Không thể tải dữ liệu dashboard");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      message.error("Có lỗi xảy ra khi tải dữ liệu dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [filterOption, selectedDate]);

  // Debug: Log when dashboardData changes
  useEffect(() => {
    console.log("Dashboard data updated:", dashboardData);
    console.log("Total Revenue:", dashboardData.totalRevenue);
    console.log("Total Bookings:", dashboardData.totalBookings);
    console.log("Total Treatment Plans:", dashboardData.totalTreatmentPlans);
  }, [dashboardData]);

  // Transform API chart data to match recharts format
  const chartData = dashboardData.revenueChart.map((item) => ({
    name: item.label,
    DoanhThu: item.revenue,
    Bookings: item.bookingCount,
    TreatmentPlans: item.treatmentPlanCount,
  }));

  return (
    <Layout style={{ padding: 24, background: LIGHT_PINK, minHeight: "100vh" }}>
      <Title level={3} style={{ color: PINK }}>
        💰 Tổng quan doanh thu
      </Title>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12} xs={24} sm={12}>
          <Card bordered={false} loading={loading}>
            <Statistic
              title="Tổng doanh thu"
              value={
                (dashboardData.totalRevenue || 0).toLocaleString("vi-VN") +
                " VNĐ"
              }
              prefix={<DollarCircleOutlined style={{ color: GREEN }} />}
            />
          </Card>
        </Col>
        <Col span={12} xs={24} sm={12}>
          <Card bordered={false} loading={loading}>
            <Statistic
              title="Số lượng đặt lịch"
              value={dashboardData.totalBookings || 0}
              prefix={<CalendarOutlined style={{ color: PINK }} />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Card
            title="📊 Doanh thu theo thời gian"
            loading={loading}
            extra={
              <Space>
                <Select
                  value={filterOption}
                  onChange={setFilterOption}
                  style={{ width: 120 }}
                >
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
                <Tooltip
                  formatter={(value, name) => [
                    value.toLocaleString("vi-VN") +
                      (name === "DoanhThu" ? " VNĐ" : ""),
                    name === "DoanhThu"
                      ? "Doanh thu"
                      : name === "Bookings"
                      ? "Booking"
                      : "Hồ sơ điều trị",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="DoanhThu"
                  stroke={PINK}
                  strokeWidth={3}
                  name="Doanh thu"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="🏥 Bác sĩ có nhiều booking nhất" loading={loading}>
            {dashboardData.topDoctor ? (
              <Space>
                <Avatar icon={<UserOutlined />} />
                <Space direction="vertical">
                  <Text strong>{dashboardData.topDoctor.doctorName}</Text>
                  <Text>
                    {dashboardData.topDoctor.bookingCount} lượt đặt khám
                  </Text>
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
