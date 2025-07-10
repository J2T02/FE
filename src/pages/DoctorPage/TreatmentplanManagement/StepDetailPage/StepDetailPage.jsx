// giữ nguyên import ban đầu
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
  Tag,
  Select,
  Modal,
  DatePicker,
  Input,
  Form,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  MailOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Content } = Layout;
const { Title, Text, Link } = Typography;
const { Option } = Select;

export default function StepDetailPage() {
  const { id } = useParams();
  const stepId = parseInt(id);
  const navigate = useNavigate();

  const [stepDetail, setStepDetail] = useState(null);
  const [tests, setTests] = useState([]);
  const [biosamples, setBiosamples] = useState([]);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [testModalVisible, setTestModalVisible] = useState(false);
  const [biosampleModalVisible, setBiosampleModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const mockStepDetail = {
      SD_ID: stepId,
      TP_ID: 999,
      Step_Name: "Khám tổng quát",
      Note: "Bệnh nhân có dấu hiệu ổn định",
      Status: 1,
      PlanDate: "2025-07-08",
      DoneDate: "2025-07-09",
      Drug_Name: "Vitamin E",
      Dosage: "1 viên/ngày",
      treatmentStep: { Step_Name: "Giai đoạn đầu kiểm tra sức khỏe" },
      doctor: {
        docId: 301,
        acc: {
          fullName: "BS. Lê Văn C",
          phone: "0901234567",
          mail: "levanc@example.com",
        },
      },
    };

    const mockTests = [];
    const mockBiosamples = [];

    setStepDetail(mockStepDetail);
    setTests(mockTests);
    setBiosamples(mockBiosamples);
  }, [stepId]);

  const handleStatusChange = async (val) => {
    setStatusUpdating(true);
    try {
      // Giả lập gọi API - thay thế bằng API thật nếu cần
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Giả lập thành công
      setStepDetail((prev) => ({ ...prev, Status: val }));
      message.success("Cập nhật trạng thái thành công!");
    } catch (error) {
      message.error("Cập nhật trạng thái thất bại!");
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleTestCreate = (values) => {
    const newTest = {
      Test_ID: Date.now(),
      TestDate: values.TestDate.format("YYYY-MM-DD"),
      ResultDay: null,
      Note: values.Note,
    };
    setTests((prev) => [...prev, newTest]);
    setTestModalVisible(false);
  };

  const handleBiosampleCreate = (values) => {
    const newBS = {
      BS_ID: Date.now(),
      BS_Name: values.BS_Name,
      CollectionDate: values.CollectionDate.format("YYYY-MM-DD"),
      StorageLocation: values.StorageLocation || "Chưa xác định",
      Note: values.Note || "",
    };
    setBiosamples((prev) => [...prev, newBS]);
    setBiosampleModalVisible(false);
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
            <Col span={12}>
              <Text strong>Trạng thái:</Text><br />
              <Select
                value={stepDetail.Status}
                onChange={handleStatusChange}
                loading={statusUpdating}
                style={{ width: 180 }}
              >
                <Option value={1}>Chưa thực hiện</Option>
                <Option value={2}>Hoàn thành</Option>
                <Option value={3}>Đã hủy</Option>
              </Select>
            </Col>
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

        {/* Danh sách xét nghiệm */}
        {tests.length > 0 ? (
          <Card
            title={
              <Row justify="space-between" align="middle">
                <Col><Text strong>Danh sách xét nghiệm liên quan</Text></Col>
                <Col>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setTestModalVisible(true)}
                    style={{ backgroundColor: "#f78db3", border: "none" }}
                  >
                    Thêm xét nghiệm liên quan
                  </Button>
                </Col>
              </Row>
            }
            style={{ marginTop: 24 }}
            bodyStyle={{ backgroundColor: "#fff0f5" }}
          >
            <div style={{ maxHeight: 200, overflowY: "auto" }}>
              <Space direction="vertical" style={{ width: "100%" }}>
                {tests.map((test) => (
                  <Card key={test.Test_ID} type="inner" style={{ borderLeft: "5px solid #f78db3" }}>
                    <Row justify="space-between">
                      <Col>
                        <Text strong>Ngày xét nghiệm: </Text>{test.TestDate}<br />
                        <Text strong>Ngày trả kết quả: </Text>{test.ResultDay || "Chưa có"}<br />
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
        ) : (
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setTestModalVisible(true)}
            style={{ marginTop: 24, backgroundColor: "#f78db3", border: "none" }}
          >
            Thêm xét nghiệm liên quan
          </Button>
        )}

        {/* Danh sách mẫu sinh học */}
        {biosamples.length > 0 ? (
          <Card
            title={
              <Row justify="space-between" align="middle">
                <Col><Text strong>Danh sách mẫu sinh học liên quan</Text></Col>
                <Col>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setBiosampleModalVisible(true)}
                    style={{ backgroundColor: "#f78db3", border: "none" }}
                  >
                    Thêm mẫu sinh học liên quan
                  </Button>
                </Col>
              </Row>
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
                        <Link style={{ color: "#f78db3" }} onClick={() => navigate(`/doctorpage/biosampledetail/${bs.BS_ID}`)}>
                          Xem chi tiết
                        </Link>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </Space>
            </div>
          </Card>
        ) : (
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setBiosampleModalVisible(true)}
            style={{ marginTop: 24, backgroundColor: "#f78db3", border: "none" }}
          >
            Thêm mẫu sinh học liên quan
          </Button>
        )}

        {/* Modal thêm xét nghiệm */}
        <Modal
          open={testModalVisible}
          onCancel={() => setTestModalVisible(false)}
          onOk={() => form.validateFields().then(handleTestCreate)}
          title="Thêm xét nghiệm liên quan"
          okText="Thêm"
          cancelText="Hủy"
          width={700}
          cancelButtonProps={{
            style: { color: "#f78db3", borderColor: "#f78db3" },
          }}
        >
          <Form layout="vertical" form={form} initialValues={{ TestDate: dayjs() }}>
            <Form.Item label="Loại xét nghiệm" name="TestType_ID" rules={[{ required: true }]}>
              <Select placeholder="Chọn loại xét nghiệm">
                <Option value={1}>Xét nghiệm máu</Option>
                <Option value={2}>Nội tiết tố</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Ghi chú" name="Note">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Ngày xét nghiệm" name="TestDate">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal thêm mẫu sinh học */}
        <Modal
          open={biosampleModalVisible}
          onCancel={() => setBiosampleModalVisible(false)}
          onOk={() => form.validateFields().then(handleBiosampleCreate)}
          title="Thêm mẫu sinh học liên quan"
          okText="Thêm"
          cancelText="Hủy"
          width={700}
          cancelButtonProps={{
            style: { color: "#f78db3", borderColor: "#f78db3" },
          }}
        >
          <Form layout="vertical" form={form} initialValues={{ CollectionDate: dayjs() }}>
            <Form.Item label="Loại mẫu" name="BT_ID" rules={[{ required: true }]}>
              <Select placeholder="Chọn loại mẫu">
                <Option value={1}>Máu</Option>
                <Option value={2}>Tinh dịch</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Tên mẫu" name="BS_Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Ngày thu thập" name="CollectionDate">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Vị trí lưu trữ" name="StorageLocation">
              <Input placeholder="Tủ A - Ngăn 1..." />
            </Form.Item>
            <Form.Item label="Ghi chú" name="Note">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
}
