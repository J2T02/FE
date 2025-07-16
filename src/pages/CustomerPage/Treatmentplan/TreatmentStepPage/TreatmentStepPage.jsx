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
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getStepDetailByTreatmentPlanId } from "../../../../apis/stepDetailService";
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
    const fetchStepDetails = async () => {
      try {
        const res = await getStepDetailByTreatmentPlanId(tpId);
        if (res?.data?.success && Array.isArray(res.data.data)) {
          // Group by treatmentStepInfo (TS_ID)
          const grouped = res.data.data.reduce((acc, step) => {
            const tsId = step.treatmentStepInfo?.tsId;
            const tsName = step.treatmentStepInfo?.stepName;
            let group = acc.find((g) => g.TS_ID === tsId);
            const mappedStep = {
              SD_ID: step.sdId,
              Step_Name: step.stepName,
              PlanDate: step.docSchedule?.workDate,
              doc: step.doctorInfo?.accountInfo?.fullName || "Chưa rõ",
              TS_ID: tsId,
              TS_Name: tsName,
              note: step.note,
              status: step.status,
              slotId: step.docSchedule?.slotId,
              drugName: step.drugName,
              dosage: step.dosage,
            };
            if (group) {
              group.details.push(mappedStep);
            } else {
              acc.push({
                TS_ID: tsId,
                TS_Name: tsName,
                details: [mappedStep],
              });
            }
            return acc;
          }, []);
          // Sort groups by earliest PlanDate in each group
          grouped.sort((a, b) => {
            const earliestA = new Date(
              Math.min(...a.details.map((d) => new Date(d.PlanDate)))
            );
            const earliestB = new Date(
              Math.min(...b.details.map((d) => new Date(d.PlanDate)))
            );
            return earliestA - earliestB;
          });
          setStepGroups(grouped);
          // Set currentStepIndex to latest group (by latest PlanDate)
          let latestGroupIndex = 0;
          let latestDate = new Date(0);
          grouped.forEach((group, index) => {
            const groupLatest = new Date(
              Math.max(...group.details.map((d) => new Date(d.PlanDate)))
            );
            if (groupLatest > latestDate) {
              latestDate = groupLatest;
              latestGroupIndex = index;
            }
          });
          setCurrentStepIndex(latestGroupIndex);
        } else {
          setStepGroups([]);
        }
      } catch (err) {
        setStepGroups([]);
      }
    };
    fetchStepDetails();
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
            <Title level={3} style={{ margin: 0 }}>
              Quá trình điều trị
            </Title>
            <Text style={{ color: "#f78db3", fontWeight: 500 }}>
              Mã hồ sơ: {tpId}
            </Text>
          </Col>
          <Col>
            
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
            title={
              <Text strong>
                Giai đoạn: {stepGroups[currentStepIndex].TS_Name}
              </Text>
            }
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
                      <Text strong>{step.Step_Name}</Text>
                      <br />
                      <Text type="secondary">Ngày hẹn: {step.PlanDate}</Text>
                      <br />
                      <Text>Bác sĩ: {step.doc}</Text>
                    </Col>
                    <Col>
                      <Button
                        type="link"
                        style={{ color: "#f78db3" }}
                        onClick={() =>
                          navigate(`/stepdetail/${step.SD_ID}`)
                        }
                      >
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
          cancelButtonProps={{
            style: { color: "#f78db3", borderColor: "#f78db3" },
          }}
          okButtonProps={{
            style: {
              backgroundColor: "#f78db3",
              borderColor: "#f78db3",
              color: "#fff",
            },
          }}
        >
          <Form layout="vertical" form={form}>
            <Form.Item
              label="Giai đoạn (TS_ID)"
              name="TS_ID"
              initialValue={latestTS_ID}
            >
              <Select>
                <Option value={1}>Khám tổng quát</Option>
                <Option value={2}>Kích trứng</Option>
                <Option value={3}>Lấy noãn</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Tên bước điều trị"
              name="Step_Name"
              rules={[{ required: true, message: "Không được để trống" }]}
            >
              <Input placeholder="Nhập tên bước" />
            </Form.Item>
            <Form.Item label="Ghi chú" name="Note">
              <Input.TextArea placeholder="Ghi chú thêm (nếu có)" />
            </Form.Item>
            <Form.Item label="Ngày hẹn" name="PlanDate">
              <DatePicker
                style={{ width: "100%" }}
                onChange={handleDateChange}
              />
            </Form.Item>
            {availableSlots.length > 0 && (
              <Form.Item label="Khung giờ">
                <Radio.Group>
                  {availableSlots.map((slot) => (
                    <Radio key={slot.slotId} value={slot.slotId}>
                      {slot.label}
                    </Radio>
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
                  <Button danger onClick={() => handleRemoveDrugField(index)}>
                    X
                  </Button>
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
