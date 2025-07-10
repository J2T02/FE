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
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
  Divider,
  Radio,
} from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Step } = Steps;
const { Option } = Select;

export default function TreatmentStepsPage() {
  const { id } = useParams();
  const tpId = parseInt(id);
  const navigate = useNavigate();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepGroups, setStepGroups] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [drugFields, setDrugFields] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  const addDrugField = () => {
    setDrugFields([...drugFields, { Drug_Name: undefined, Dosage: undefined }]);
  };

  const handleRemoveDrugField = (index) => {
    const updated = [...drugFields];
    updated.splice(index, 1);
    setDrugFields(updated);
  };

  useEffect(() => {
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

    grouped.sort((a, b) => {
      const earliestA = new Date(Math.min(...a.details.map((d) => new Date(d.PlanDate))));
      const earliestB = new Date(Math.min(...b.details.map((d) => new Date(d.PlanDate))));
      return earliestA - earliestB;
    });

    setStepGroups(grouped);

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

  const latestTS_ID = stepGroups[stepGroups.length - 1]?.TS_ID;

  const mockAvailableSlots = [
    { slotId: 1, label: "08:00 - 08:30" },
    { slotId: 2, label: "08:30 - 09:00" },
    { slotId: 3, label: "09:00 - 09:30" },
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // TODO: call API to load available slots based on doctor schedule
    setAvailableSlots(mockAvailableSlots);
  };

  return (
    <Layout style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      <Content style={{ padding: 24 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Button
              icon={<ArrowLeftOutlined />}
              style={{ backgroundColor: "#f78db3", color: "white", border: "none", marginBottom: 8 }}
              onClick={() => navigate(-1)}
            >
              Quay lại
            </Button>
            <Title level={3} style={{ margin: 0 }}>Quá trình điều trị</Title>
            <Text style={{ color: "#f78db3", fontWeight: 500 }}>Mã hồ sơ: {tpId}</Text>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalVisible(true)}
              style={{ backgroundColor: "#f78db3", borderColor: "#f78db3" }}
            >
              Thêm bước điều trị mới
            </Button>
          </Col>
        </Row>

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
                <Card key={step.SD_ID} type="inner" style={{ borderLeft: "5px solid #f78db3" }}>
                  <Row justify="space-between">
                    <Col>
                      <Text strong>{step.Step_Name}</Text><br />
                      <Text type="secondary">Ngày hẹn: {step.PlanDate}</Text><br />
                      <Text>Bác sĩ: {step.doc?.fullName}</Text>
                    </Col>
                    <Col>
                      <Button type="link" style={{ color: "#f78db3" }} onClick={() => navigate(`/doctorpage/stepdetail/${step.SD_ID}`)}>
                        Xem chi tiết
                      </Button>
                    </Col>
                  </Row>
                </Card>
              ))}
            </Space>
          </Card>
        )}

        <Modal
          open={modalVisible}
          title="Thêm bước điều trị mới"
          onCancel={() => setModalVisible(false)}
          onOk={() => message.success("Đã thêm bước điều trị!")}
          okText="Thêm"
          cancelText="Hủy"
          width={700}
          cancelButtonProps={{ style: { color: "#f78db3", borderColor: "#f78db3" } }}
          okButtonProps={{ style: { backgroundColor: "#f78db3", borderColor: "#f78db3", color: "#fff" } }}
        >
          <Form layout="vertical" form={form}>
            <Form.Item label="Giai đoạn (TS_ID)" name="TS_ID" initialValue={latestTS_ID}>
              <Select>
                <Option value={1}>Khám tổng quát</Option>
                <Option value={2}>Kích trứng</Option>
                <Option value={3}>Lấy noãn</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Tên bước điều trị" name="Step_Name" rules={[{ required: true, message: "Không được để trống" }]}>              
              <Input placeholder="Nhập tên bước" />
            </Form.Item>
            <Form.Item label="Ghi chú" name="Note">
              <Input.TextArea placeholder="Ghi chú thêm (nếu có)" />
            </Form.Item>
            <Form.Item label="Ngày hẹn" name="PlanDate">
              <DatePicker style={{ width: "100%" }} onChange={handleDateChange} />
            </Form.Item>
            {availableSlots.length > 0 && (
              <Form.Item label="Khung giờ">
                <Radio.Group>
                  {availableSlots.map(slot => (
                    <Radio key={slot.slotId} value={slot.slotId}>{slot.label}</Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            )}

            <Divider orientation="left">Thuốc kê (nếu có)</Divider>
            {drugFields.map((field, index) => (
              <Row gutter={8} key={index} style={{ marginBottom: 8 }}>
                <Col span={12}>
                  <Select placeholder="Tên thuốc" style={{ width: "100%" }}>
                    <Option value="Follitropin alfa">Follitropin alfa</Option>
                    <Option value="Follitropin beta">Follitropin beta</Option>
                    <Option value="Urofollitropin">Urofollitropin</Option>
                    <Option value="Menotropins">Menotropins</Option>
                    <Option value="Lutropin alfa">Lutropin alfa</Option>
                    <Option value="hCG">hCG</Option>
                    <Option value="Triptorelin">Triptorelin</Option>
                    <Option value="Leuprolide">Leuprolide</Option>
                    <Option value="Cetrorelix">Cetrorelix</Option>
                    <Option value="Ganirelix">Ganirelix</Option>
                    <Option value="Buserelin">Buserelin</Option>
                    <Option value="Nafarelin">Nafarelin</Option>
                  </Select>
                </Col>
                <Col span={10}>
                  <Input placeholder="Liều lượng" />
                </Col>
                <Col span={2}>
                  <Button danger onClick={() => handleRemoveDrugField(index)}>X</Button>
                </Col>
              </Row>
            ))}
            <Button
              type="dashed"
              block
              icon={<PlusOutlined />}
              onClick={addDrugField}
              style={{ color: "#f78db3" }}
            >
              Thêm thuốc
            </Button>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
}
