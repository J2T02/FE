// ... giữ nguyên import ban đầu
import {
  Layout,
  Row,
  Col,
  Typography,
  Card,
  Button,
  Space,
  Tag,
  Divider,
} from "antd";
import {
  ArrowLeftOutlined,
  InfoCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const { Content } = Layout;
const { Title, Text, Link } = Typography;

// ✅ Mapping cho trạng thái và chất lượng mẫu sinh học
const BIO_SAMPLE_STATUS = {
  1: "Kiểm tra chất lượng",
  2: "Đang trữ",
  3: "Đã dùng",
  4: "Đã hủy",
};

const BIO_QUALITY_STATUS = {
  1: "Tốt",
  2: "Khá",
  3: "Trung bình",
  4: "Kém",
  5: "Có thể thụ tinh",
  6: "Không thể thụ tinh",
  7: "Cần xử lý thêm",
};

// ✅ Mapping loại xét nghiệm và trạng thái xét nghiệm
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

const TEST_STATUS = {
  1: "Chờ xét nghiệm",
  2: "Đang xét nghiệm",
  3: "Chờ kết quả",
  4: "Đã có kết quả",
  5: "Đã trả kết quả",
};
// ✅ Mapping tình trạng kết quả (TQS_ID)
const TEST_QUALITY_RESULT_STATUS = {
  1: "Bình thường",
  2: "Bất thường",
  3: "Dương tính",
  4: "Âm tính",
};


export default function TreatmentPlanDetailPage() {
  const { id } = useParams();
  const tpId = parseInt(id);
  const navigate = useNavigate();

  const [treatmentPlan, setTreatmentPlan] = useState(null);
  const [biosamples, setBiosamples] = useState([]);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const mockTP = {
      TP_ID: tpId,
      StartDate: "2025-07-07",
      EndDate: "2025-07-21",
      Status: 1,
      Result: "Đáp ứng tốt với phác đồ điều trị đầu tiên, theo dõi thêm trong các bước tiếp theo.",
      service: { Ser_ID: 1, Ser_Name: "Thụ tinh nhân tạo" },
      customer: {
        Hus_Name: "Nguyễn Văn A",
        Wife_Name: "Trần Thị B",
        Hus_YOB: "1990-01-01",
        Wife_YOB: "1992-03-03",
        acc: {
          fullName: "Nguyễn Văn A",
          mail: "nguyenvana@example.com",
          phone: "0912345678",
        },
      },
      doctor: {
        docId: 301,
        acc: {
          fullName: "BS. Lê Văn C",
          phone: "0901234567",
          mail: "levanc@example.com",
        },
      },
      stepDetails: [
        {
          SD_ID: 1,
          Step_Name: "Khám tổng quát",
          PlanDate: "2025-07-08",
          doc: { fullName: "BS. Nguyễn Văn X" },
        },
        {
          SD_ID: 2,
          Step_Name: "Siêu âm tử cung",
          PlanDate: "2025-07-10",
          doc: { fullName: "BS. Trần Thị Y" },
        },
        {
          SD_ID: 3,
          Step_Name: "Xét nghiệm nội tiết",
          PlanDate: "2025-07-12",
          doc: { fullName: "BS. Lê Văn C" },
        },
        {
          SD_ID: 4,
          Step_Name: "Tư vấn hướng điều trị",
          PlanDate: "2025-07-14",
          doc: { fullName: "BS. Nguyễn Văn X" },
        },
      ],
    };

    // ✅ Sắp xếp các bước điều trị theo ngày hẹn mới nhất ở trên
    mockTP.stepDetails.sort((a, b) => new Date(b.PlanDate) - new Date(a.PlanDate));
    setTreatmentPlan(mockTP);

    const mockBiosamples = tpId === 1
      ? [
          {
            BS_ID: 101,
            BS_Name: "Mẫu máu",
            CollectionDate: "2025-07-08",
            Status: 1,
            BQS_ID: 1,
            Note: "Mẫu ổn định",
          },
          {
            BS_ID: 102,
            BS_Name: "Tinh trùng",
            CollectionDate: "2025-07-09",
            Status: 2,
            BQS_ID: 5,
            Note: "Cần kiểm tra thêm",
          },
        ]
      : [];

    setBiosamples(mockBiosamples);

    // ✅ Thêm mock danh sách xét nghiệm
    const mockTests = tpId === 1
  ? [
      {
        Test_ID: 201,
        TestType_ID: 2,
        TestDate: "2025-07-12",
        Status: 3,
        Person: "Vợ",
        TQS_ID: 1,
      },
      {
        Test_ID: 202,
        TestType_ID: 3,
        TestDate: "2025-07-12",
        Status: 4,
        Person: "Chồng",
        TQS_ID: 3,
      },
    ]
  : [];


    setTests(mockTests);
  }, [tpId]);

  const getStatusTag = (status) => {
    switch (status) {
      case 1:
        return <Tag color="blue">Đang điều trị</Tag>;
      case 2:
        return <Tag color="green">Đã hoàn thành</Tag>;
      case 3:
        return <Tag color="red">Đã hủy</Tag>;
      default:
        return <Tag>Không xác định</Tag>;
    }
  };

  if (!treatmentPlan) return null;

  return (
    <Layout style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      <Content style={{ padding: 24 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          style={{ backgroundColor: "#f78db3", color: "white", border: "none", marginBottom: 24 }}
          onClick={() => navigate(-1)}
        >
          Quay lại
        </Button>

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Title level={3}>Chi tiết hồ sơ bệnh án</Title>
          <Text style={{ color: "#f78db3", fontWeight: 500 }}>
            Mã hồ sơ: {treatmentPlan.TP_ID}
          </Text>

          <Card title={<Text strong>Tổng quan hồ sơ bệnh án</Text>} bodyStyle={{ backgroundColor: "#fff0f5" }}>
            <Row gutter={[16, 16]}>
              <Col span={12}><Text strong>Ngày bắt đầu:</Text><br /><Text>{treatmentPlan.StartDate}</Text></Col>
              {treatmentPlan.EndDate && (
                <Col span={12}><Text strong>Ngày kết thúc:</Text><br /><Text>{treatmentPlan.EndDate}</Text></Col>
              )}
              <Col span={12}><Text strong>Trạng thái:</Text><br />{getStatusTag(treatmentPlan.Status)}</Col>
              <Col span={24}><Text strong>Ghi chú:</Text><br /><Text>{treatmentPlan.Result}</Text></Col>
              <Col span={24}><Text strong>Dịch vụ điều trị:</Text><br /><Text>{treatmentPlan.service?.Ser_Name}</Text></Col>
            </Row>
          </Card>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card title={<Text strong><UserOutlined /> Thông tin khách hàng</Text>} bodyStyle={{ backgroundColor: "#fde7ef" }}>
                <Row>
                  <Col span={12}><Text type="secondary">Tên chồng</Text><br /><Text>{treatmentPlan.customer?.Hus_Name}</Text><br /><Text type="secondary">Năm sinh chồng</Text><br /><Text>{treatmentPlan.customer?.Hus_YOB}</Text></Col>
                  <Col span={12}><Text type="secondary">Tên vợ</Text><br /><Text>{treatmentPlan.customer?.Wife_Name}</Text><br /><Text type="secondary">Năm sinh vợ</Text><br /><Text>{treatmentPlan.customer?.Wife_YOB}</Text></Col>
                </Row>
                <Divider />
                <Text strong>Thông tin liên hệ</Text><br />
                <UserOutlined style={{ marginRight: 8 }} />
                {treatmentPlan.customer?.acc?.fullName}<br />
                <MailOutlined style={{ marginRight: 8 }} />
                {treatmentPlan.customer?.acc?.mail}<br />
                <PhoneOutlined style={{ marginRight: 8 }} />
                {treatmentPlan.customer?.acc?.phone}
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                title={<Text strong>Bác sĩ chính phụ trách</Text>}
                extra={
                  <Button
                    shape="circle"
                    icon={<InfoCircleOutlined />}
                    style={{ backgroundColor: "#f78db3", color: "white", border: "none" }}
                    onClick={() => navigate(`/doctordetail/${treatmentPlan.doctor?.docId}`)}
                  />
                }
                bodyStyle={{ backgroundColor: "#fce6ec" }}
              >
                <Text strong>Họ tên:</Text><br /><Text>{treatmentPlan.doctor?.acc?.fullName}</Text><br />
                <Text strong>Email:</Text><br /><Text>{treatmentPlan.doctor?.acc?.mail}</Text><br />
                <Text strong>SĐT:</Text><br /><Text>{treatmentPlan.doctor?.acc?.phone}</Text>
              </Card>
            </Col>
          </Row>

          <Card
            title={
              <Space>
                <Text strong>Quá trình điều trị</Text>
                <Link style={{ color: "#f78db3" }} onClick={() => navigate(`/treatmentstep/${tpId}`)}>Xem đầy đủ</Link>
              </Space>
            }
            bodyStyle={{ backgroundColor: "#fff7fa" }}
          >
            <div style={{ maxHeight: 260, overflowY: "auto" }}>
              <Space direction="vertical" style={{ width: "100%" }}>
                {treatmentPlan.stepDetails.map((step) => (
                  <Card key={step.SD_ID} type="inner" style={{ borderLeft: "5px solid #f78db3" }}>
                    <Row justify="space-between">
                      <Col>
                        <Text strong>{step.Step_Name}</Text><br />
                        <Text type="secondary">Ngày hẹn: {step.PlanDate}</Text><br />
                        <Text>Bác sĩ: {step.doc?.fullName}</Text>
                      </Col>
                      <Col>
                        <Link onClick={() => navigate(`/stepdetail/${step.SD_ID}`)} style={{ color: "#f78db3" }}>Xem chi tiết</Link>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Space>
            </div>
          </Card>

          {Array.isArray(biosamples) && biosamples.length > 0 && (
            <Card
              title={
                <Space>
                  <Text strong>Danh sách mẫu sinh học</Text>
                  <Link style={{ color: "#f78db3" }} onClick={() => navigate(`/biosamplelist/${tpId}`)}>
                    Xem đầy đủ
                  </Link>
                </Space>
              }
              bodyStyle={{ backgroundColor: "#fff0f5" }}
            >
              <div style={{ maxHeight: 220, overflowY: "auto" }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  {biosamples.map((bs) => (
                    <Card key={bs.BS_ID} type="inner" style={{ borderLeft: "5px solid #f78db3" }}>
                      <Row justify="space-between">
                        <Col>
                          <Text strong>Tên mẫu: </Text>{bs.BS_Name}<br />
                          <Text strong>Ngày thu thập: </Text>{bs.CollectionDate}<br />
                          <Text strong>Trạng thái: </Text>{BIO_SAMPLE_STATUS[bs.Status] || "Không xác định"}<br />
                          <Text strong>Chất lượng: </Text>{BIO_QUALITY_STATUS[bs.BQS_ID] || "Chưa đánh giá"}<br />
                        </Col>
                        <Col>
                          <Link
                            style={{ color: "#f78db3" }}
                            onClick={() => navigate(`/biosampledetail/${bs.BS_ID}`)}
                          >
                            Xem chi tiết
                          </Link>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </Space>
              </div>
            </Card>
          )}

          {/* ✅ KHUNG DANH SÁCH XÉT NGHIỆM */}
          {Array.isArray(tests) && tests.length > 0 && (
            <Card
              title={
                <Space>
                  <Text strong>Danh sách xét nghiệm</Text>
                  <Link style={{ color: "#f78db3" }} onClick={() => navigate(`/testlist/${tpId}`)}>
                    Xem đầy đủ
                  </Link>
                </Space>
              }
              bodyStyle={{ backgroundColor: "#fef2f6" }}
            >
              <div style={{ maxHeight: 220, overflowY: "auto" }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  {tests.map((test) => (
                    <Card key={test.Test_ID} type="inner" style={{ borderLeft: "5px solid #f78db3" }}>
                      <Row justify="space-between">
                        <Col>
                          <Text strong>Loại xét nghiệm: </Text>{TEST_TYPE_MAP[test.TestType_ID] || "Không rõ"}<br />
                          <Text strong>Ngày xét nghiệm: </Text>{test.TestDate}<br />
                          <Text strong>Người xét nghiệm: </Text>{test.Person}<br />
                          <Text strong>Trạng thái: </Text>{TEST_STATUS[test.Status] || "Không xác định"}<br />
                          <Text strong>Tình trạng kết quả: </Text>{TEST_QUALITY_RESULT_STATUS[test.TQS_ID] || "Chưa có"}
                        </Col>
                        <Col>
                          <Link
                            style={{ color: "#f78db3" }}
                            onClick={() => navigate(`/testdetail/${test.Test_ID}`)}
                          >
                            Xem chi tiết
                          </Link>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </Space>
              </div>
            </Card>
          )}
        </Space>
      </Content>
    </Layout>
  );
}
