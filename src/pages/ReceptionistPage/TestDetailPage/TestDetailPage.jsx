import React, { useEffect, useState } from "react";
import {
  Layout,
  Typography,
  Card,
  Space,
  Row,
  Col,
  Button,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text, Link } = Typography;

// Mapping dữ liệu
const TEST_TYPE_MAP = {
  1: "Siêu âm tử cung - buồng trứng",
  2: "Xét nghiệm nội tiết tố",
  3: "Xét nghiệm tinh dịch đồ",
  4: "Xét nghiệm bệnh truyền nhiễm",
  5: "Xét nghiệm sức khỏe tổng quát",
  6: "Chụp tử cung vòi trứng",
  7: "Siêu âm đánh giá ống dẫn trứng",
  8: "Xét nghiệm di truyền",
  9: "Xét nghiệm dịch âm đạo",
};

const TEST_QUALITY_RESULT_STATUS = {
  1: "Bình thường",
  2: "Bất thường",
  3: "Dương tính",
  4: "Âm tính",
};

const TEST_STATUS = {
  1: "Chờ xét nghiệm",
  2: "Đang xét nghiệm",
  3: "Chờ kết quả",
  4: "Đã có kết quả",
  5: "Đã trả kết quả",
};

export default function TestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const testId = parseInt(id);

  const [testDetail, setTestDetail] = useState(null);

  useEffect(() => {
    // 👇 Mock dữ liệu xét nghiệm
    const mockTest = {
      Test_ID: testId,
      TestType_ID: 2,
      TestDate: "2025-07-12",
      ResultDay: null, // hoặc "2025-07-13"
      Note: "Làm vào buổi sáng",
      File_Path: "/files/test-results/test2.pdf",
      Status: 4,
      TQS_ID: 1,
      SD_ID: 12,
      stepDetail: {
        Step_Name: "Xét nghiệm nội tiết",
        treatmentStep: {
          Step_Name: "Giai đoạn lấy mẫu",
        },
      },
    };

    setTestDetail(mockTest);
  }, [testId]);

  if (!testDetail) return null;

  return (
    <Layout style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      <Content style={{ padding: 24 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          style={{
            backgroundColor: "#f78db3",
            color: "white",
            border: "none",
            marginBottom: 24,
          }}
          onClick={() => navigate(-1)}
        >
          Quay lại
        </Button>

        <Title level={3}>Chi tiết xét nghiệm</Title>

        <Card title="Thông tin xét nghiệm" bodyStyle={{ backgroundColor: "#fff0f5" }}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Row>
              <Col span={8}><Text strong>Loại xét nghiệm:</Text></Col>
              <Col span={16}>{TEST_TYPE_MAP[testDetail.TestType_ID] || "Không xác định"}</Col>
            </Row>
            <Row>
              <Col span={8}><Text strong>Ngày xét nghiệm:</Text></Col>
              <Col span={16}>{testDetail.TestDate}</Col>
            </Row>

            {/* ✅ Chỉ hiển thị nếu ResultDay không null */}
            {testDetail.ResultDay && (
              <Row>
                <Col span={8}><Text strong>Ngày có kết quả:</Text></Col>
                <Col span={16}>{testDetail.ResultDay}</Col>
              </Row>
            )}

            <Row>
              <Col span={8}><Text strong>Trạng thái:</Text></Col>
              <Col span={16}>{TEST_STATUS[testDetail.Status] || "Không xác định"}</Col>
            </Row>
            <Row>
              <Col span={8}><Text strong>Tình trạng kết quả:</Text></Col>
              <Col span={16}>{TEST_QUALITY_RESULT_STATUS[testDetail.TQS_ID] || "Không rõ"}</Col>
            </Row>
            <Row>
              <Col span={8}><Text strong>Ghi chú:</Text></Col>
              <Col span={16}>{testDetail.Note || "Không có"}</Col>
            </Row>

            {/* ✅ Giai đoạn điều trị */}
            <Row>
              <Col span={8}><Text strong>Giai đoạn điều trị:</Text></Col>
              <Col span={16}>
                {testDetail.stepDetail?.treatmentStep?.Step_Name || "Không xác định"}
              </Col>
            </Row>

            {/* ✅ Bước điều trị */}
            <Row>
              <Col span={8}><Text strong>Bước điều trị:</Text></Col>
              <Col span={16}>
                {testDetail.stepDetail?.Step_Name || "Không xác định"}
              </Col>
            </Row>

            {/* ✅ File kết quả */}
            <Row>
              <Col span={8}><Text strong>Kết quả xét nghiệm:</Text></Col>
              <Col span={16}>
                <Link
                  style={{ color: "#f78db3" }}
                  href={testDetail.File_Path}
                  target="_blank"
                >
                  Xem file kết quả
                </Link>
              </Col>
            </Row>
          </Space>
        </Card>
      </Content>
    </Layout>
  );
}
