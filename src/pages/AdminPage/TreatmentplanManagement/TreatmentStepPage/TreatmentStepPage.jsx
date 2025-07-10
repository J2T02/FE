// File: pages/ReceptionistPage/TreatmentStepsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Layout,
  Typography,
  Card,
  Steps,
  Space,
  Row,
  Col,
  Button,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text, Link } = Typography;
const { Step } = Steps;

export default function TreatmentStepsPage() {
  const { id } = useParams();
  const tpId = parseInt(id);
  const navigate = useNavigate();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepGroups, setStepGroups] = useState([]);

  useEffect(() => {
    // ✅ Giả lập dữ liệu tương ứng với tpId
    const mockStepDetails = [
      {
        SD_ID: 1,
        Step_Name: "Khám tổng quát",
        PlanDate: "2025-07-08",
        doc: { fullName: "BS. Nguyễn Văn X" },
        TS_ID: 1,
        TS_Name: "Khám tổng quát",
      },
      {
        SD_ID: 2,
        Step_Name: "Siêu âm tử cung",
        PlanDate: "2025-07-10",
        doc: { fullName: "BS. Trần Thị Y" },
        TS_ID: 2,
        TS_Name: "Kích trứng",
      },
      {
        SD_ID: 3,
        Step_Name: "Xét nghiệm nội tiết",
        PlanDate: "2025-07-12",
        doc: { fullName: "BS. Lê Văn C" },
        TS_ID: 2,
        TS_Name: "Kích trứng",
      },
      {
        SD_ID: 4,
        Step_Name: "Lấy noãn",
        PlanDate: "2025-07-14",
        doc: { fullName: "BS. Nguyễn Văn X" },
        TS_ID: 3,
        TS_Name: "Lấy noãn",
      },
    ];

    // ✅ Gom theo từng giai đoạn (TS_ID)
    const grouped = mockStepDetails.reduce((acc, step) => {
      const existing = acc.find((g) => g.TS_ID === step.TS_ID);
      if (existing) {
        existing.details.push(step);
      } else {
        acc.push({
          TS_ID: step.TS_ID,
          TS_Name: step.TS_Name,
          details: [step],
        });
      }
      return acc;
    }, []);

    // ✅ Sắp xếp thứ tự giai đoạn từ cũ đến mới (trái → phải)
    grouped.sort((a, b) => {
      const earliestA = new Date(Math.min(...a.details.map((d) => new Date(d.PlanDate))));
      const earliestB = new Date(Math.min(...b.details.map((d) => new Date(d.PlanDate))));
      return earliestA - earliestB;
    });

    setStepGroups(grouped);

    // ✅ Mặc định focus vào giai đoạn mới nhất
    let latestGroupIndex = 0;
    let latestDate = new Date(0);

    grouped.forEach((group, index) => {
      const groupLatest = new Date(Math.max(...group.details.map((d) => new Date(d.PlanDate))));
      if (groupLatest > latestDate) {
        latestDate = groupLatest;
        latestGroupIndex = index;
      }
    });

    setCurrentStepIndex(latestGroupIndex);
  }, [tpId]);

  return (
    <Layout style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      <Content style={{ padding: 24 }}>
        <Space direction="vertical" style={{ width: "100%" }} size="middle">
          <Button
            icon={<ArrowLeftOutlined />}
            style={{
              backgroundColor: "#f78db3",
              color: "white",
              border: "none",
              marginBottom: 8,
            }}
            onClick={() => navigate(-1)}
          >
            Quay lại
          </Button>

          <Title level={3} style={{ marginBottom: 0 }}>Quá trình điều trị</Title>
          <Text style={{ color: "#f78db3", fontWeight: 500 }}>Mã hồ sơ: {tpId}</Text>

          <Steps
            current={currentStepIndex}
            onChange={setCurrentStepIndex}
            size="small"
            style={{ marginTop: 12, marginBottom: 32 }}
          >
            {stepGroups.map((group) => (
              <Step key={group.TS_ID} title={group.TS_Name} />
            ))}
          </Steps>

          {stepGroups[currentStepIndex] && (
            <Card
              title={<Text strong>Giai đoạn: {stepGroups[currentStepIndex].TS_Name}</Text>}
              bodyStyle={{ backgroundColor: "#fff0f5" }}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                {stepGroups[currentStepIndex].details.map((step) => (
                  <Card
                    key={step.SD_ID}
                    type="inner"
                    style={{ borderLeft: "5px solid #f78db3" }}
                  >
                    <Row justify="space-between">
                      <Col>
                        <Text strong>{step.Step_Name}</Text><br />
                        <Text type="secondary">Ngày hẹn: {step.PlanDate}</Text><br />
                        <Text>Bác sĩ: {step.doc?.fullName}</Text>
                      </Col>
                      <Col>
                        <Link
                          style={{ color: "#f78db3" }}
                          onClick={() => navigate(`/admin/stepdetail/${step.SD_ID}`)}
                        >
                          Xem chi tiết
                        </Link>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Space>
            </Card>
          )}
        </Space>
      </Content>
    </Layout>
  );
}
