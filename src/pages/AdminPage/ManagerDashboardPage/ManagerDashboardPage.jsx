// ... giữ nguyên import
import React, { useState, useMemo } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Typography,
  Statistic,
  Tag,
  Select,
  DatePicker,
  theme
} from "antd";
import {
  CheckCircleTwoTone,
  ClockCircleTwoTone,
  CloseCircleTwoTone,
  FileDoneOutlined,
  FrownTwoTone,
  StarFilled,
} from "@ant-design/icons";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const PINK = "#ED7BA5";
const LIGHT_PINK = "#FDE9EF";
const GREEN = "#52c41a";
const YELLOW = "#faad14";
const RED = "#ff4d4f";
const GRAY = "#bfbfbf";

const serviceMap = {
  1: "IVF",
  2: "IUI",
};

const statusMap = {
  1: "Đang điều trị",
  2: "Đã thành công",
  3: "Thất bại",
  4: "Đã hủy",
};

const statusColor = {
  2: "green",
  3: "volcano",
  4: "red",
};

const COLORS = [PINK, "#FEC8D8", "#FFDFDF"];

// MOCK DATA
const treatmentPlans = [
  { TP_ID: 1, StartDate: "2025-07-01", Status: 1, Ser_ID: 1, Cus_ID: 1 },
  { TP_ID: 2, StartDate: "2025-06-15", Status: 2, Ser_ID: 2, Cus_ID: 2 },
  { TP_ID: 3, StartDate: "2025-07-05", Status: 1, Ser_ID: 1, Cus_ID: 3 },
  { TP_ID: 4, StartDate: "2025-07-08", Status: 3, Ser_ID: 2, Cus_ID: 2 },
  { TP_ID: 5, StartDate: "2025-05-12", Status: 4, Ser_ID: 2, Cus_ID: 1 },
  { TP_ID: 6, StartDate: "2025-07-10", Status: 2, Ser_ID: 1, Cus_ID: 1 },
  { TP_ID: 7, StartDate: "2025-07-03", Status: 3, Ser_ID: 1, Cus_ID: 2 },
];

const feedbackList = [
  {
    FB_ID: 1,
    TP_ID: 2,
    Doc_ID: 1,
    Star: 5,
    CreateAt: "2025-06-16",
    Content: "Cảm ơn bác sĩ rất tận tâm!",
  },
  {
    FB_ID: 2,
    TP_ID: 4,
    Doc_ID: 2,
    Star: 2,
    CreateAt: "2025-07-09",
    Content: "Không hiệu quả như mong đợi.",
  },
  {
    FB_ID: 3,
    TP_ID: 5,
    Doc_ID: 2,
    Star: 1,
    CreateAt: "2025-05-15",
    Content: "Phải hủy điều trị giữa chừng.",
  },
  {
    FB_ID: 4,
    TP_ID: 6,
    Doc_ID: 1,
    Star: 5,
    CreateAt: "2025-07-11",
    Content: "Dịch vụ rất tốt!",
  },
];

const customers = [
  { Cus_ID: 1, Acc_ID: 1 },
  { Cus_ID: 2, Acc_ID: 2 },
  { Cus_ID: 3, Acc_ID: 3 },
];

const accounts = [
  {
    Acc_ID: 1,
    Full_Name: "dangnguyen551",
    Img: "https://i.pravatar.cc/150?img=1",
  },
  {
    Acc_ID: 2,
    Full_Name: "lethanhhoa",
    Img: "https://i.pravatar.cc/150?img=2",
  },
  {
    Acc_ID: 3,
    Full_Name: "phamthutrang",
    Img: "https://i.pravatar.cc/150?img=3",
  },
  {
    Acc_ID: 4,
    Full_Name: "drnguyenvana",
    Img: "https://i.pravatar.cc/150?img=4",
  },
  {
    Acc_ID: 5,
    Full_Name: "drtranthib",
    Img: "https://i.pravatar.cc/150?img=5",
  },
];

const doctors = [
  { Doc_ID: 1, Acc_ID: 4 },
  { Doc_ID: 2, Acc_ID: 5 },
];

export default function ManagerDashboardPage() {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const [filterType, setFilterType] = useState("month");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [statusFilter, setStatusFilter] = useState(null);

  const filteredPlans = useMemo(() => {
    return treatmentPlans.filter((plan) => {
      const planDate = dayjs(plan.StartDate);
      if (filterType === "month") {
        return (
          planDate.month() === selectedDate.month() &&
          planDate.year() === selectedDate.year()
        );
      } else if (filterType === "quarter") {
        return (
          Math.floor(planDate.month() / 3) ===
            Math.floor(selectedDate.month() / 3) &&
          planDate.year() === selectedDate.year()
        );
      } else if (filterType === "year") {
        return planDate.year() === selectedDate.year();
      }
      return true;
    });
  }, [filterType, selectedDate]);

  const filteredFeedback = useMemo(() => {
    return feedbackList
      .filter((fb) => {
        const date = dayjs(fb.CreateAt);
        const matchTime =
          (filterType === "month" &&
            date.month() === selectedDate.month() &&
            date.year() === selectedDate.year()) ||
          (filterType === "quarter" &&
            Math.floor(date.month() / 3) ===
              Math.floor(selectedDate.month() / 3) &&
            date.year() === selectedDate.year()) ||
          (filterType === "year" && date.year() === selectedDate.year());

        const matchStatus =
          statusFilter == null ||
          treatmentPlans.find((tp) => tp.TP_ID === fb.TP_ID)?.Status ===
            statusFilter;

        return matchTime && matchStatus;
      })
      .sort((a, b) => b.Star - a.Star);
  }, [filterType, selectedDate, statusFilter]);

  const total = filteredPlans.length;
  const statusCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
  const serviceCounts = {};

  filteredPlans.forEach((plan) => {
    statusCounts[plan.Status] = (statusCounts[plan.Status] || 0) + 1;
    const name = serviceMap[plan.Ser_ID];
    serviceCounts[name] = (serviceCounts[name] || 0) + 1;
  });

  const pieData = Object.entries(serviceCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <Layout style={{ padding: 24, background: LIGHT_PINK, minHeight: "100vh" }}>
      <Title level={3} style={{ color: PINK }}>
        ❤️ Manager Dashboard
      </Title>

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Select
            value={filterType}
            onChange={setFilterType}
            options={[
              { value: "month", label: "Theo tháng" },
              { value: "quarter", label: "Theo quý" },
              { value: "year", label: "Theo năm" },
            ]}
          />
        </Col>
        <Col>
          <DatePicker
            picker={filterType}
            value={selectedDate}
            onChange={setSelectedDate}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={4} xs={24} sm={12} md={8} lg={4}>
          <Card>
            <Statistic
              title="Tổng bệnh án"
              value={total}
              prefix={<FileDoneOutlined style={{ color: PINK }} />}
            />
          </Card>
        </Col>
        <Col span={5} xs={24} sm={12} md={8} lg={5}>
          <Card>
            <Statistic
              title="Đang điều trị"
              value={statusCounts[1]}
              prefix={<ClockCircleTwoTone twoToneColor={YELLOW} />}
            />
          </Card>
        </Col>
        <Col span={5} xs={24} sm={12} md={8} lg={5}>
          <Card>
            <Statistic
              title="Đã thành công"
              value={statusCounts[2]}
              prefix={<CheckCircleTwoTone twoToneColor={GREEN} />}
            />
          </Card>
        </Col>
        <Col span={5} xs={24} sm={12} md={8} lg={5}>
          <Card>
            <Statistic
              title="Thất bại"
              value={statusCounts[3]}
              prefix={<FrownTwoTone twoToneColor={GRAY} />}
            />
          </Card>
        </Col>
        <Col span={5} xs={24} sm={12} md={8} lg={5}>
          <Card>
            <Statistic
              title="Đã hủy"
              value={statusCounts[4]}
              prefix={<CloseCircleTwoTone twoToneColor={RED} />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="📊 Phân bố dịch vụ" style={{ marginBottom: 32 }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card
        title="📝 Đánh giá từ bệnh nhân"
        extra={
          <Select
            allowClear
            placeholder="Lọc theo trạng thái"
            style={{ width: 200 }}
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 2, label: "Thành công" },
              { value: 3, label: "Thất bại" },
              { value: 4, label: "Đã hủy" },
            ]}
          />
        }
      >
        {filteredFeedback.map((fb) => {
          const tp = treatmentPlans.find((tp) => tp.TP_ID === fb.TP_ID);
          const cus = customers.find((c) => c.Cus_ID === tp?.Cus_ID);
          const acc = accounts.find((a) => a.Acc_ID === cus?.Acc_ID);
          const doctor = doctors.find((d) => d.Doc_ID === fb.Doc_ID);
          const doctorAcc = accounts.find((a) => a.Acc_ID === doctor?.Acc_ID);
          const serviceName = serviceMap[tp?.Ser_ID];

          return (
            <Card
              key={fb.FB_ID}
              style={{ marginBottom: 16 }}
              bodyStyle={{ padding: 16 }}
            >
              <Row align="middle" gutter={12}>
                <Col>
                  <img
                    src={acc?.Img}
                    alt="avatar"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </Col>
                <Col flex="auto">
                  <div style={{ fontWeight: "bold" }}>{acc?.Full_Name}</div>

                  {tp?.TP_ID && (
                    <div style={{ color: "#888", fontSize: 13, marginTop: 2 }}>
                      Mã bệnh án: {tp.TP_ID}
                    </div>
                  )}

                  {doctorAcc?.Full_Name && (
                    <div style={{ color: "#888", fontSize: 13 }}>
                      Bác sĩ: {doctorAcc.Full_Name}
                    </div>
                  )}

                  <div style={{ color: "#999", marginTop: 2 }}>
                    {fb.CreateAt} | Dịch vụ điều trị: {serviceName}
                  </div>

                  <div style={{ marginTop: 4 }}>
                    {Array.from({ length: fb.Star }, (_, i) => (
                      <StarFilled key={i} style={{ color: "#faad14" }} />
                    ))}
                  </div>
                </Col>
              </Row>
              <div style={{ marginTop: 12 }}>{fb.Content}</div>
            </Card>
          );
        })}
      </Card>
    </Layout>
  );
}
