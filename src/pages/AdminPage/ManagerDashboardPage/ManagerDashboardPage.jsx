// ... giữ nguyên import
import React, { useState, useMemo, useEffect } from "react";
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
  theme,
  Spin,
  message,
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
import { distrubteService } from "../../../apis/service";
import { getTreatmentList } from "../../../apis/treatmentService";
import { getAllFeedback } from "../../../apis/feedbackService";
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

export default function ManagerDashboardPage() {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const [serviceData, setServiceData] = useState([]);
  const [treatmentData, setTreatmentData] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [treatmentLoading, setTreatmentLoading] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  // Fetch service distribution data
  useEffect(() => {
    const fetchServiceData = async () => {
      setLoading(true);
      try {
        const response = await distrubteService();
        if (response.data.success) {
          setServiceData(response.data.data);
        } else {
          message.error("Không thể tải dữ liệu thống kê dịch vụ");
        }
      } catch (error) {
        console.error("Error fetching service data:", error);
        message.error("Có lỗi xảy ra khi tải dữ liệu thống kê");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, []);

  // Fetch treatment plans data
  useEffect(() => {
    const fetchTreatmentData = async () => {
      setTreatmentLoading(true);
      try {
        const response = await getTreatmentList();

        if (response.data.success) {
          setTreatmentData(response.data.data);
          console.log(treatmentData);
        } else {
          message.error("Không thể tải dữ liệu hồ sơ điều trị");
        }
      } catch (error) {
        console.error("Error fetching treatment data:", error);
        message.error("Có lỗi xảy ra khi tải dữ liệu hồ sơ điều trị");
      } finally {
        setTreatmentLoading(false);
      }
    };

    fetchTreatmentData();
  }, []);

  // Fetch feedback data
  useEffect(() => {
    const fetchFeedbackData = async () => {
      setFeedbackLoading(true);
      try {
        const response = await getAllFeedback();
        if (response.data.success) {
          setFeedbackData(response.data.data);
        } else {
          message.error("Không thể tải dữ liệu đánh giá");
        }
      } catch (error) {
        console.error("Error fetching feedback data:", error);
        message.error("Có lỗi xảy ra khi tải dữ liệu đánh giá");
      } finally {
        setFeedbackLoading(false);
      }
    };

    fetchFeedbackData();
  }, []);

  const filteredPlans = useMemo(() => treatmentData, [treatmentData]);

  const filteredFeedback = useMemo(() => {
    // Transform feedback data from API to match UI format
    return feedbackData
      .map((fb) => ({
        fbId: fb.treatmentPlanId, // Using treatmentPlanId as unique key
        star: fb.star,
        createAt: fb.createAt,
        content: fb.content,
        tpId: fb.treatmentPlanId,
        customerName: fb.cus?.accCus?.fullName,
        customerImg: fb.cus?.accCus?.img,
        doctorName: fb.doctorInfo?.accountInfo?.fullName,
        serviceName: "IVF", // Default service name, can be enhanced later
      }))
      .sort((a, b) => (b.star || 0) - (a.star || 0));
  }, [feedbackData]);

  const total = filteredPlans.length;
  const statusCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
  const serviceCounts = {};

  filteredPlans.forEach((plan) => {
    statusCounts[plan.status?.statusId] =
      (statusCounts[plan.status?.statusId] || 0) + 1;
    const name = plan.serviceInfo?.serName;
    if (name) {
      serviceCounts[name] = (serviceCounts[name] || 0) + 1;
    }
  });

  // Transform API data for pie chart with percentage
  const totalCount = serviceData.reduce((sum, item) => sum + item.count, 0);
  const pieData = serviceData.map((item) => ({
    name: item.serName,
    value: item.count,
    percentage:
      totalCount > 0 ? ((item.count / totalCount) * 100).toFixed(1) : 0,
  }));

  return (
    <Layout style={{ padding: 24, background: LIGHT_PINK, minHeight: "100vh" }}>
      <Title level={3} style={{ color: PINK }}>
        ❤️ Tổng quan dịch vụ
      </Title>

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
              value={statusCounts[1] || 0}
              prefix={<ClockCircleTwoTone twoToneColor={YELLOW} />}
            />
          </Card>
        </Col>
        <Col span={5} xs={24} sm={12} md={8} lg={5}>
          <Card>
            <Statistic
              title="Đã thành công"
              value={statusCounts[2] || 0}
              prefix={<CheckCircleTwoTone twoToneColor={GREEN} />}
            />
          </Card>
        </Col>
        <Col span={5} xs={24} sm={12} md={8} lg={5}>
          <Card>
            <Statistic
              title="Thất bại"
              value={statusCounts[3] || 0}
              prefix={<FrownTwoTone twoToneColor={GRAY} />}
            />
          </Card>
        </Col>
        <Col span={5} xs={24} sm={12} md={8} lg={5}>
          <Card>
            <Statistic
              title="Đã hủy"
              value={statusCounts[4] || 0}
              prefix={<CloseCircleTwoTone twoToneColor={RED} />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="📊 Phân bố dịch vụ" style={{ marginBottom: 32 }}>
        <Spin spinning={loading}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [
                  `${value} (${((value / totalCount) * 100).toFixed(1)}%)`,
                  name,
                ]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Spin>
      </Card>

      <Card title="📝 Đánh giá từ bệnh nhân">
        <Spin spinning={feedbackLoading}>
          {filteredFeedback.map((fb, index) => (
            <Card
              key={`${fb.fbId}-${index}`}
              style={{ marginBottom: 16 }}
              bodyStyle={{ padding: 16 }}
            >
              <Row align="middle" gutter={12}>
                <Col>
                  <img
                    src={fb.customerImg || "https://i.pravatar.cc/150?img=1"}
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
                  <div style={{ fontWeight: "bold" }}>{fb.customerName}</div>

                  {fb.tpId && (
                    <div style={{ color: "#888", fontSize: 13, marginTop: 2 }}>
                      Mã bệnh án: {fb.tpId}
                    </div>
                  )}

                  {fb.doctorName && (
                    <div style={{ color: "#888", fontSize: 13 }}>
                      Bác sĩ: {fb.doctorName}
                    </div>
                  )}

                  <div style={{ color: "#999", marginTop: 2 }}>
                    {dayjs(fb.createAt).format("DD/MM/YYYY")} | Dịch vụ điều
                    trị: {fb.serviceName}
                  </div>

                  <div style={{ marginTop: 4 }}>
                    {Array.from({ length: fb.star }, (_, i) => (
                      <StarFilled key={i} style={{ color: "#faad14" }} />
                    ))}
                  </div>
                </Col>
              </Row>
              <div style={{ marginTop: 12 }}>{fb.content}</div>
            </Card>
          ))}
        </Spin>
      </Card>
    </Layout>
  );
}
