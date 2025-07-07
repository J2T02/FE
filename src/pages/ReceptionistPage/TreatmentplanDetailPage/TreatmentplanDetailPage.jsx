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

export default function TreatmentPlanDetailPage() {
  const { id } = useParams();
  const tpId = parseInt(id);
  const navigate = useNavigate();

  const [treatmentPlan, setTreatmentPlan] = useState(null);
  const [biosamples, setBiosamples] = useState([]);

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
            StorageLocation: "Tủ A - Ngăn 1",
            Note: "Mẫu ổn định",
          },
          {
            BS_ID: 102,
            BS_Name: "Tinh trùng",
            CollectionDate: "2025-07-09",
            StorageLocation: "Tủ B - Ngăn 3",
            Note: "Cần kiểm tra thêm",
          },
        ]
      : [];

    setBiosamples(mockBiosamples);
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
              <Card title={<Text strong><UserOutlined /> Thông tin khách hàng</Text>} bodyStyle={{ backgroundColor: "#fdf2f8" }}>
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
                bodyStyle={{ backgroundColor: "#fdf2f8" }}
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
                <Link style={{ color: "#f78db3" }} onClick={() => navigate(`/treatmentsteps/${tpId}`)}>Xem đầy đủ</Link>
              </Space>
            }
            bodyStyle={{ backgroundColor: "#fff0f5" }}
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
                  <Link style={{ color: "#f78db3" }} onClick={() => navigate(`/biosamples/${tpId}`)}>
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
                          <Text strong>Vị trí lưu trữ: </Text>{bs.StorageLocation}<br />
                          <Text strong>Ghi chú: </Text>{bs.Note}
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
        </Space>
      </Content>
    </Layout>
  );
}
