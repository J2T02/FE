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
      <Content style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Button
            icon={<ArrowLeftOutlined />}
            style={{ backgroundColor: "#f78db3", color: "white", border: "none" }}
            onClick={() => navigate(-1)}
          >
            Quay lại
          </Button>
          <div style={{ textAlign: 'right' }}>
            <Title level={3} style={{ margin: 0 }}>Chi tiết hồ sơ bệnh án</Title>
            <Text style={{ color: "#f78db3", fontWeight: 500 }}>
              Mã hồ sơ: {treatmentPlan.TP_ID}
            </Text>
          </div>
        </div>

        <Space direction="vertical" size="middle" style={{ width: "100%" }}>

          <Card title={<Text strong>Tổng quan hồ sơ bệnh án</Text>} bodyStyle={{ backgroundColor: "#fff0f5", padding: 16 }} size="small">
            <Row gutter={[12, 8]}>
              <Col span={8}><Text strong>Ngày bắt đầu:</Text><br /><Text>{treatmentPlan.StartDate}</Text></Col>
              {treatmentPlan.EndDate && (
                <Col span={8}><Text strong>Ngày kết thúc:</Text><br /><Text>{treatmentPlan.EndDate}</Text></Col>
              )}
              <Col span={8}><Text strong>Trạng thái:</Text><br />{getStatusTag(treatmentPlan.Status)}</Col>
              <Col span={12}><Text strong>Dịch vụ điều trị:</Text><br /><Text>{treatmentPlan.service?.Ser_Name}</Text></Col>
              <Col span={12}><Text strong>Ghi chú:</Text><br /><Text>{treatmentPlan.Result}</Text></Col>
            </Row>
          </Card>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card 
                title={<Text strong style={{ fontSize: '14px' }}><UserOutlined /> Thông tin khách hàng</Text>} 
                bodyStyle={{ 
                  backgroundColor: "#fde7ef", 
                  padding: 12,
                  height: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }} 
                size="small"
              >
                <Row gutter={[8, 4]}>
                  <Col span={12}>
                    <Text type="secondary" style={{ fontSize: '12px' }}>Chồng:</Text>{' '}
                    <Text style={{ fontSize: '13px' }}>{treatmentPlan.customer?.Hus_Name}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '11px' }}>({treatmentPlan.customer?.Hus_YOB})</Text>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary" style={{ fontSize: '12px' }}>Vợ:</Text>{' '}
                    <Text style={{ fontSize: '13px' }}>{treatmentPlan.customer?.Wife_Name}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '11px' }}>({treatmentPlan.customer?.Wife_YOB})</Text>
                  </Col>
                </Row>
                <div style={{ fontSize: '12px', lineHeight: '1.5' }}>
                  <UserOutlined style={{ marginRight: 4 }} />{treatmentPlan.customer?.acc?.fullName}<br />
                  <MailOutlined style={{ marginRight: 4 }} />{treatmentPlan.customer?.acc?.mail}<br />
                  <PhoneOutlined style={{ marginRight: 4 }} />{treatmentPlan.customer?.acc?.phone}
                </div>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                title={<Text strong style={{ fontSize: '14px' }}>Bác sĩ phụ trách</Text>}
                extra={
                  <Button
                    shape="circle"
                    icon={<InfoCircleOutlined />}
                    size="small"
                    style={{ backgroundColor: "#f78db3", color: "white", border: "none" }}
                    onClick={() => navigate(`/doctordetail/${treatmentPlan.doctor?.docId}`)}
                  />
                }
                bodyStyle={{ 
                  backgroundColor: "#fce6ec", 
                  padding: 12,
                  height: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
                size="small"
              >
                <div style={{ fontSize: '12px', lineHeight: '1.5' }}>
                  <Text strong style={{ fontSize: '13px' }}>{treatmentPlan.doctor?.acc?.fullName}</Text><br />
                  <MailOutlined style={{ marginRight: 4 }} />{treatmentPlan.doctor?.acc?.mail}<br />
                  <PhoneOutlined style={{ marginRight: 4 }} />{treatmentPlan.doctor?.acc?.phone}
                </div>
              </Card>
            </Col>
          </Row>

          <Card
            title={
              <Space>
                <Text strong>Quá trình điều trị</Text>
                <Link style={{ color: "#f78db3" }} onClick={() => navigate(`/admin/treatmentstep/${tpId}`)}>Xem đầy đủ</Link>
              </Space>
            }
            bodyStyle={{ backgroundColor: "#fff7fa", padding: 16 }}
            size="small"
          >
            <div style={{ maxHeight: 200, overflowY: "auto" }}>
              <Space direction="vertical" size="small" style={{ width: "100%" }}>
                {treatmentPlan.stepDetails.map((step) => (
                  <Card key={step.SD_ID} type="inner" style={{ borderLeft: "3px solid #f78db3", padding: 8 }} size="small">
                    <Row justify="space-between" align="middle">
                      <Col flex="auto">
                        <Text strong style={{ fontSize: '14px' }}>{step.Step_Name}</Text><br />
                        <Text type="secondary" style={{ fontSize: '12px' }}>Ngày: {step.PlanDate} | BS: {step.doc?.fullName}</Text>
                      </Col>
                      <Col>
                        <Link onClick={() => navigate(`/admin/stepdetail/${step.SD_ID}`)} style={{ color: "#f78db3", fontSize: '12px' }}>Xem chi tiết</Link>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Space>
            </div>
          </Card>

          {/* ✅ KHUNG DANH SÁCH XÉT NGHIỆM */}
          {Array.isArray(tests) && tests.length > 0 && (
            <Card
              title={
                <Space>
                  <Text strong>Danh sách xét nghiệm</Text>
                  <Link style={{ color: "#f78db3" }} onClick={() => navigate(`/admin/testlist/${tpId}`)}>
                    Xem đầy đủ
                  </Link>
                </Space>
              }
              bodyStyle={{ backgroundColor: "#fef2f6", padding: 16 }}
              size="small"
            >
              <div style={{ maxHeight: 160, overflowY: "auto" }}>
                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                  {tests.map((test) => (
                    <Card key={test.Test_ID} type="inner" style={{ borderLeft: "3px solid #f78db3", padding: 8 }} size="small">
                      <Row justify="space-between" align="middle">
                        <Col flex="auto">
                          <Text strong style={{ fontSize: '14px' }}>{TEST_TYPE_MAP[test.TestType_ID] || "Không rõ"}</Text><br />
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {test.TestDate} | {test.Person} | {TEST_STATUS[test.Status]} | {TEST_QUALITY_RESULT_STATUS[test.TQS_ID]}
                          </Text>
                        </Col>
                        <Col>
                          <Link
                            style={{ color: "#f78db3", fontSize: '12px' }}
                            onClick={() => navigate(`/admin/testdetail/${test.Test_ID}`)}
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

          {Array.isArray(biosamples) && biosamples.length > 0 && (
            <Card
              title={
                <Space>
                  <Text strong>Danh sách mẫu sinh học</Text>
                  <Link style={{ color: "#f78db3" }} onClick={() => navigate(`/admin/biosamplelist/${tpId}`)}>
                    Xem đầy đủ
                  </Link>
                </Space>
              }
              bodyStyle={{ backgroundColor: "#fff0f5", padding: 16 }}
              size="small"
            >
              <div style={{ maxHeight: 160, overflowY: "auto" }}>
                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                  {biosamples.map((bs) => (
                    <Card key={bs.BS_ID} type="inner" style={{ borderLeft: "3px solid #f78db3", padding: 8 }} size="small">
                      <Row justify="space-between" align="middle">
                        <Col flex="auto">
                          <Text strong style={{ fontSize: '14px' }}>{bs.BS_Name}</Text><br />
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {bs.CollectionDate} | {BIO_SAMPLE_STATUS[bs.Status]} | {BIO_QUALITY_STATUS[bs.BQS_ID]}
                          </Text>
                        </Col>
                        <Col>
                          <Link
                            style={{ color: "#f78db3", fontSize: '12px' }}
                            onClick={() => navigate(`/admin/biosampledetail/${bs.BS_ID}`)}
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
