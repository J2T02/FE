
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Select,
  Modal,
  message,
  Rate
} from "antd";
import {
  ArrowLeftOutlined,
  InfoCircleOutlined,
  InfoCircleTwoTone,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text, Link } = Typography;
const { Option } = Select;

const EDUCATION_LEVEL = {
  1: "Cử nhân",
  2: "Thạc sĩ",
  3: "Tiến sĩ",
  4: "Giáo sư",
};
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
  const [doctorList, setDoctorList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isDoctorInactive, setIsDoctorInactive] = useState(false);

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
        acc: { fullName: "Nguyễn Văn A", mail: "nguyenvana@example.com", phone: "0912345678" },
      },
      doctor: {
        docId: 301,
        Status: 3,
        acc: { fullName: "BS. Lê Văn C", phone: "0901234567", mail: "levanc@example.com" },
      },
      stepDetails: [
        { SD_ID: 1, Step_Name: "Khám tổng quát", PlanDate: "2025-07-08", doc: { fullName: "BS. Nguyễn Văn X" } },
        { SD_ID: 2, Step_Name: "Siêu âm tử cung", PlanDate: "2025-07-10", doc: { fullName: "BS. Trần Thị Y" } },
        { SD_ID: 3, Step_Name: "Xét nghiệm nội tiết", PlanDate: "2025-07-12", doc: { fullName: "BS. Lê Văn C" } },
      ],
    };
    mockTP.stepDetails.sort((a, b) => new Date(b.PlanDate) - new Date(a.PlanDate));
    setTreatmentPlan(mockTP);

    if (mockTP.doctor?.Status === 3) setIsDoctorInactive(true);

    const mockDoctors = [
      { docId: 300, fullName: "BS. Lê Văn A", Edu_ID: 2, Experience: 13, avgStar: 4.7 },
      { docId: 301, fullName: "BS. Phạm Văn B", Edu_ID: 2, Experience: 4, avgStar: 3.8 },
      { docId: 302, fullName: "BS. Đỗ Văn C", Edu_ID: 4, Experience: 4, avgStar: 4.2 },
      { docId: 303, fullName: "BS. Lê Văn D", Edu_ID: 4, Experience: 14, avgStar: 4.9 },
      { docId: 304, fullName: "BS. Trần Văn E", Edu_ID: 3, Experience: 8, avgStar: 4.0 },
      { docId: 305, fullName: "BS. Trần Văn F", Edu_ID: 1, Experience: 6, avgStar: 3.5 },
      { docId: 306, fullName: "BS. Phạm Văn G", Edu_ID: 4, Experience: 3, avgStar: 3.9 },
      { docId: 307, fullName: "BS. Nguyễn Văn H", Edu_ID: 2, Experience: 10, avgStar: 4.5 },
      { docId: 308, fullName: "BS. Lê Văn I", Edu_ID: 1, Experience: 7, avgStar: 4.1 },
      { docId: 309, fullName: "BS. Phạm Văn J", Edu_ID: 3, Experience: 7, avgStar: 3.7 },
    ];
    setDoctorList(mockDoctors);

    const mockBiosamples = [
      { BS_ID: 101, BS_Name: "Mẫu máu", CollectionDate: "2025-07-08", Status: 1, BQS_ID: 1, Note: "Mẫu ổn định" },
      { BS_ID: 102, BS_Name: "Tinh trùng", CollectionDate: "2025-07-09", Status: 2, BQS_ID: 5, Note: "Cần kiểm tra thêm" },
    ];
    setBiosamples(mockBiosamples);

    const mockTests = [
      { Test_ID: 201, TestType_ID: 2, TestDate: "2025-07-12", Status: 3, Person: "Vợ", TQS_ID: 1 },
      { Test_ID: 202, TestType_ID: 3, TestDate: "2025-07-12", Status: 4, Person: "Chồng", TQS_ID: 3 },
    ];
    setTests(mockTests);
  }, [tpId]);

  const handleDoctorChange = () => {
    if (!selectedDoctor) {
      message.warning("Vui lòng chọn bác sĩ mới.");
      return;
    }
    message.success(`Đã chọn bác sĩ mới: ${selectedDoctor}`);
    setIsDoctorInactive(false);
  };

  const handleCancelPlan = () => {
    Modal.confirm({
      title: "Xác nhận hủy hồ sơ điều trị?",
      content: "Bạn sẽ được hoàn lại 50% số tiền.",
      okText: "Xác nhận hủy",
      okButtonProps: { danger: true },
      cancelText: "Không",
      onOk: () => {
        message.success("Hồ sơ điều trị đã được hủy. Sẽ hoàn lại 50% số tiền.");
        navigate("/");
      },
    });
  };

  const getStatusTag = (status) => {
    switch (status) {
      case 1: return <Tag color="blue">Đang điều trị</Tag>;
      case 2: return <Tag color="green">Thành công</Tag>;
      case 3: return <Tag color="red">Thất bại</Tag>;
      case 4: return <Tag color="red">Đã hủy</Tag>;
      default: return <Tag>Không xác định</Tag>;
    }
  };

  if (!treatmentPlan) return null;

  return (
    <Layout style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      <Content style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Button
            icon={<ArrowLeftOutlined />}
            style={{ backgroundColor: "#f78db3", color: "white", border: "none" }}
            onClick={() => navigate(-1)}
          >
            Quay lại
          </Button>
          <Title level={3} style={{ margin: 0 }}>Chi tiết hồ sơ bệnh án</Title>
        </div>

        {isDoctorInactive ? (
          <Card
            style={{
              padding: 32,
              borderRadius: 18,
              background: "linear-gradient(135deg, #fffdfc 0%, #fff0f5 100%)",
              border: "1px solid #fcd4de",
              boxShadow: "0 8px 30px rgba(255, 175, 189, 0.25)",
            }}
          >
            <Row gutter={[32, 32]} align="middle">
              <Col xs={24} md={12}>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img src="/doctor-leave.png" alt="doctor leave" width={48} />
                    <div>
                      <Title level={3} style={{ color: "#d4376e", margin: 0 }}>
                        Bác sĩ đã dừng công tác
                      </Title>
                      <Text type="secondary" style={{ fontSize: 13 }}>
                        Hãy chọn bác sĩ thay thế để tiếp tục điều trị
                      </Text>
                    </div>
                  </div>

                  <Text style={{ fontSize: 15.5, lineHeight: 1.9 }}>
                    Rất tiếc khi bác sĩ <Text strong>{treatmentPlan.doctor?.acc?.fullName}</Text> đã <Text strong>ngừng công tác</Text> tại trung tâm.
                    <br />
                    Đừng lo lắng! Hãy lựa chọn <Text strong>bác sĩ thay thế</Text> để tiếp tục hành trình điều trị cùng đội ngũ chuyên môn của chúng tôi 💕
                  </Text>

                  <Divider style={{ borderColor: "#f78db3", marginTop: 8 }} />

                  <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                    <Button
                      type="primary"
                      block
                      size="large"
                      disabled={!selectedDoctor}
                      icon={<CheckCircleTwoTone twoToneColor="#f78db3" />}
                      onClick={handleDoctorChange}
                      style={{
                        backgroundColor: "#f78db3",
                        border: "none",
                        fontWeight: "bold",
                        fontSize: "16px",
                        boxShadow: "0 4px 10px rgba(247, 141, 179, 0.4)",
                      }}
                    >
                      Xác nhận bác sĩ mới
                    </Button>

                    <Button
                      danger
                      block
                      size="large"
                      icon={<CloseCircleTwoTone twoToneColor="#f5222d" />}
                      onClick={handleCancelPlan}
                      style={{
                        fontWeight: 500,
                        fontSize: "15px",
                        background: "#fff0f5",
                        borderColor: "#f78db3",
                        color: "#c53030",
                      }}
                    >
                      Hủy hồ sơ điều trị
                    </Button>

                    <Text type="secondary" style={{ fontStyle: "italic", fontSize: 13 }}>
                      * Trung tâm sẽ hoàn lại <Text strong>50%</Text> chi phí nếu bạn quyết định hủy hồ sơ.
                    </Text>
                  </Space>

                  <Divider style={{ margin: "16px 0", borderColor: "#f78db3" }} />

                  <Text type="secondary" style={{ fontSize: 13 }}>
                    🌱 Đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ bạn vượt qua mọi giai đoạn của hành trình điều trị. Cảm ơn bạn đã tin tưởng 💖
                  </Text>
                </Space>
              </Col>

              <Col xs={24} md={12}>
                <Title level={4} style={{ color: "#f78db3", marginBottom: 16 }}>
                  📋 Danh sách bác sĩ thay thế
                </Title>
                <Row gutter={[16, 16]}>
                  {doctorList.map((doc) => (
                    <Col xs={24} sm={12} md={12} key={doc.docId}>
                      <Card
                        hoverable
                        onClick={() => setSelectedDoctor(doc.docId)}
                        style={{
                          border: selectedDoctor === doc.docId ? "2px solid #f78db3" : "1px solid #f0f0f0",
                          borderRadius: 16,
                          boxShadow:
                            selectedDoctor === doc.docId
                              ? "0 0 18px rgba(247, 141, 179, 0.4)"
                              : "0 2px 6px rgba(0,0,0,0.06)",
                          transition: "all 0.3s ease",
                        }}
                        bodyStyle={{ padding: 16 }}
                      >
                        <Row align="middle" gutter={12}>
                          <Col flex="64px">
                            <img
                              src={`https://api.dicebear.com/7.x/initials/svg?seed=${doc.fullName}`}
                              alt="avatar"
                              style={{
                                width: 64,
                                height: 64,
                                borderRadius: "50%",
                                border: "3px solid #f78db3",
                                objectFit: "cover",
                                background: "#fff0f5",
                              }}
                            />
                          </Col>
                          <Col flex="auto">
                            <Space direction="vertical" size={2}>
                              <Text strong style={{ fontSize: 15 }}>{doc.fullName}</Text>
                              <Text type="secondary" style={{ fontSize: 13 }}>
                                {EDUCATION_LEVEL[doc.Edu_ID] || "Chưa rõ"} – {doc.Experience} năm kinh nghiệm
                              </Text>
                              <Rate disabled allowHalf value={doc.avgStar || 0} style={{ fontSize: 14 }} />
                            </Space>
                          </Col>
                          <Col>
                            <Button
                              shape="circle"
                              icon={<InfoCircleTwoTone twoToneColor="#f78db3" />}
                              size="small"
                              style={{
                                backgroundColor: "#fff0f5",
                                border: "none",
                                boxShadow: "0 0 4px rgba(247, 141, 179, 0.4)",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/doctordetail/${doc.docId}`);
                              }}
                            />
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Card>
        ) : (

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
                <Link style={{ color: "#f78db3" }} onClick={() => navigate(`/treatmentstep/${tpId}`)}>Xem đầy đủ</Link>
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
                        <Link onClick={() => navigate(`/stepdetail/${step.SD_ID}`)} style={{ color: "#f78db3", fontSize: '12px' }}>Xem chi tiết</Link>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Space>
            </div>
          </Card>

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
        </Space>
        )}
      </Content>
    </Layout>
  );
}
