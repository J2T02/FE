import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Layout,
  Typography,
  Card,
  Button,
  Row,
  Col,
  Space,
  Divider,
  Tag,
} from "antd";
import {
  ArrowLeftOutlined,
  MailOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text, Link } = Typography;

export default function StepDetailPage() {
  const { id } = useParams();
  const stepId = parseInt(id);
  const navigate = useNavigate();

  const [stepDetail, setStepDetail] = useState(null);
  const [tests, setTests] = useState([]);
  const [biosamples, setBiosamples] = useState([]);

  useEffect(() => {
    const mockStepDetail = {
      SD_ID: stepId,
      Step_Name: "Khám tổng quát",
      Note: "Bệnh nhân có dấu hiệu ổn định",
      Status: 1,
      PlanDate: "2025-07-08",
      DoneDate: "2025-07-09",
      Drug_Name: "Vitamin E",
      Dosage: "1 viên/ngày",
      treatmentStep: {
        Step_Name: "Giai đoạn đầu kiểm tra sức khỏe",
      },
      doctor: {
        docId: 301,
        acc: {
          fullName: "BS. Lê Văn C",
          phone: "0901234567",
          mail: "levanc@example.com",
        },
      },
    };

    const mockTests = [
      {
        Test_ID: 1,
        TestDate: "2025-07-08",
        Note: "Xét nghiệm máu tổng quát",
        File_Path: "",
        ResultDay: "2025-07-09",
      },
      {
        Test_ID: 2,
        TestDate: "2025-07-08",
        Note: "Xét nghiệm nội tiết tố",
        File_Path: "",
        ResultDay: "2025-07-10",
      },
    ];

    const mockBiosamples = [
      {
        BS_ID: 1,
        BS_Name: "Mẫu máu bệnh nhân",
        CollectionDate: "2025-07-08",
        StorageLocation: "Tủ A - Ngăn 2",
        Note: "Mẫu đạt tiêu chuẩn",
      },
      {
        BS_ID: 2,
        BS_Name: "Tinh dịch",
        CollectionDate: "2025-07-08",
        StorageLocation: "Tủ B - Ngăn 1",
        Note: "Mẫu hơi loãng",
      },
    ];

    setStepDetail(mockStepDetail);
    setTests(mockTests);
    setBiosamples(mockBiosamples);
  }, [stepId]);

  const getStatusTag = (status) => {
    switch (status) {
      case 1:
        return <Tag color="blue">Chưa thực hiện</Tag>;
      case 2:
        return <Tag color="green">Hoàn thành</Tag>;
      case 3:
        return <Tag color="red">Đã hủy</Tag>;
      default:
        return <Tag>Mới</Tag>;
    }
  };

  if (!stepDetail) return null;

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

        <Title level={3}>Chi tiết bước điều trị</Title>

        <Card title="Thông tin bước điều trị" bodyStyle={{ backgroundColor: "#fff0f5" }}>
          <Row gutter={[16, 16]}>
            <Col span={12}><Text strong>Tên bước:</Text><br /><Text>{stepDetail.Step_Name}</Text></Col>
            <Col span={12}><Text strong>Giai đoạn:</Text><br /><Text>{stepDetail.treatmentStep?.Step_Name}</Text></Col>
            <Col span={12}><Text strong>Ngày hẹn:</Text><br /><Text>{stepDetail.PlanDate}</Text></Col>
            <Col span={12}><Text strong>Ngày thực hiện:</Text><br /><Text>{stepDetail.DoneDate}</Text></Col>
            <Col span={24}><Text strong>Ghi chú:</Text><br /><Text>{stepDetail.Note}</Text></Col>
            <Col span={12}><Text strong>Thuốc:</Text><br /><Text>{stepDetail.Drug_Name}</Text></Col>
            <Col span={12}><Text strong>Liều lượng:</Text><br /><Text>{stepDetail.Dosage}</Text></Col>
            <Col span={12}><Text strong>Trạng thái:</Text><br />{getStatusTag(stepDetail.Status)}</Col>
          </Row>
        </Card>

        <Card
          title={
            <Space>
              <Text strong>Thông tin bác sĩ phụ trách</Text>
              <Button
                shape="circle"
                icon={<InfoCircleOutlined />}
                style={{ backgroundColor: "#f78db3", color: "white", border: "none" }}
                onClick={() => navigate(`/doctordetail/${stepDetail.doctor?.docId}`)}
              />
            </Space>
          }
          style={{ marginTop: 24 }}
          bodyStyle={{ backgroundColor: "#fdf2f8" }}
        >
          <Text strong>Họ tên:</Text><br />
          <Text>{stepDetail.doctor?.acc?.fullName}</Text><br />
          <MailOutlined style={{ marginRight: 8 }} />{stepDetail.doctor?.acc?.mail}<br />
          <PhoneOutlined style={{ marginRight: 8 }} />{stepDetail.doctor?.acc?.phone}
        </Card>

        {tests.length > 0 && (
          <Card title="Danh sách xét nghiệm liên quan" style={{ marginTop: 24 }} bodyStyle={{ backgroundColor: "#fff0f5" }}>
            <div style={{ maxHeight: 200, overflowY: "auto" }}>
              <Space direction="vertical" style={{ width: "100%" }}>
                {tests.map((test) => (
                  <Card key={test.Test_ID} type="inner" style={{ borderLeft: "5px solid #f78db3" }}>
                    <Row justify="space-between">
                      <Col>
                        <Text strong>Ngày xét nghiệm: </Text>{test.TestDate}<br />
                        <Text strong>Ngày trả kết quả: </Text>{test.ResultDay}<br />
                        <Text strong>Ghi chú: </Text>{test.Note}
                      </Col>
                      <Col>
                        <Link style={{ color: "#f78db3" }} onClick={() => navigate(`/testdetail/${test.Test_ID}`)}>
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

        {biosamples.length > 0 && (
          <Card
            title={
              <Space>
                <Text strong>Danh sách mẫu sinh học liên quan</Text>
              </Space>
            }
            style={{ marginTop: 24 }}
            bodyStyle={{ backgroundColor: "#fff0f5" }}
          >
            <div style={{ maxHeight: 200, overflowY: "auto" }}>
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
                        <Link style={{ color: "#f78db3" }} onClick={() => navigate(`/biosampledetail/${bs.BS_ID}`)}>
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
      </Content>
    </Layout>
  );
}
