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
import {
  getStepDetailDetail,
  updateStepDetailStatus,
} from "../../../../apis/stepDetailService";
import {
  getTestTypeList,
  createTest,
  getTestByStepDetailId,
} from "../../../../apis/testService";
import {
  getBioAllSampleType,
  getBioSampleByStepDetailId,
  createBioSample,
} from "../../../../apis/bioSampleService";
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
  const [testTypes, setTestTypes] = useState([]);
  const [bioSampleTypes, setBioSampleTypes] = useState([]);

  useEffect(() => {
    async function fetchStepDetail() {
      try {
        const res = await getStepDetailDetail(stepId);
        if (res && res.data && res.data.data) {
          const d = res.data.data;
          // Map API response to UI state
          setStepDetail({
            SD_ID: d.sdId,
            Step_Name: d.stepName,
            Note: d.note,
            Status: d.status?.statusId,
            StatusName: d.status?.statusName,
            Drug_Name: d.drugName,
            Dosage: d.dosage,
            treatmentStep: d.treatmentStepInfo
              ? { Step_Name: d.treatmentStepInfo.stepName }
              : undefined,
            doctor: d.doctorInfo
              ? {
                  docId: d.doctorInfo.docId,
                  acc: d.doctorInfo.accountInfo,
                }
              : undefined,
            doctorSchedule: d.docSchedule
              ? {
                  WorkDate: d.docSchedule.workDate,
                  Slot_ID: d.docSchedule.slotId,
                  // Slot_Start: (lookup if you have slot info elsewhere)
                }
              : undefined,
            treatmentPlanInfo: d.treatmentPlanInfo,
          });
        } else {
          setStepDetail(null);
        }
      } catch (err) {
        setStepDetail(null);
        message.error("Không thể tải thông tin bước điều trị");
      }
    }
    fetchStepDetail();
    // Fetch test types
    async function fetchTestTypes() {
      try {
        const res = await getTestTypeList();
        if (res && res.data && res.data.data) {
          setTestTypes(res.data.data);
        } else {
          setTestTypes([]);
        }
      } catch (err) {
        setTestTypes([]);
      }
    }
    fetchTestTypes();
    // Fetch biosample types
    async function fetchBioSampleTypes() {
      try {
        const res = await getBioAllSampleType();
        if (res && res.data && res.data.data) {
          setBioSampleTypes(res.data.data);
        } else {
          setBioSampleTypes([]);
        }
      } catch (err) {
        setBioSampleTypes([]);
      }
    }
    fetchBioSampleTypes();
    fetchTest();
    // Fetch biosamples by step detail id
    async function fetchBiosamples() {
      try {
        const res = await getBioSampleByStepDetailId(stepId);
        if (res && res.data && res.data.success) {
          setBiosamples(res.data.data);
        } else {
          setBiosamples([]);
        }
      } catch (err) {
        setBiosamples([]);
      }
    }
    fetchBiosamples();
  }, [stepId]);
  const fetchTest = async () => {
    await getTestByStepDetailId(stepId)
      .then((res) => {
        if (res.data.success) {
          setTests(res.data.data);
          console.log(tests);
        } else {
          console.log("lấy danh sách xét nghiệm thất bại.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(biosamples);
  const handleStatusChange = async (val) => {
    setStatusUpdating(true);
    try {
      const res = await updateStepDetailStatus(stepDetail.SD_ID, {
        statusId: val,
      });
      if (res && res.data && res.data.success) {
        setStepDetail((prev) => ({ ...prev, Status: val }));
        message.success("Cập nhật trạng thái thành công!");
      } else {
        message.error(res?.data?.message || "Cập nhật trạng thái thất bại!");
      }
    } catch (error) {
      message.error("Cập nhật trạng thái thất bại!");
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleTestCreate = async (values) => {
    console.log(values, "value");

    const newTest = {
      // TestDate: values.TestDate.format("YYYY-MM-DD"),
      // ResultDay: null,
      tpId: stepDetail?.treatmentPlanInfo?.tpId,
      sdId: stepDetail.SD_ID,
      tqsId: 1,
      testTypeId: values.TestType_ID,
      note: values.Note || "",
      filePath: "",
    };
    console.log(newTest);
    await createTest(newTest)
      .then((res) => {
        if (res.data.success) {
          message.success(res.data.message);
          const createdTest = res.data.data;
          setTests((prev) => [...prev, createdTest]);
          setTestModalVisible(false);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("tạo xét nghiệm thấy bại !");
      });
  };

  const handleBiosampleCreate = async (values) => {
    const payload = {
      tpId: stepDetail?.treatmentPlanInfo?.tpId,
      btId: values.BT_ID,
      sdId: stepDetail.SD_ID,
      name: values.BS_Name,
      storageLocation: values.StorageLocation,
      bqsId: 1,
      note: values.Note,
    };
    console.log(payload);
    await createBioSample(payload)
      .then((res) => {
        if (res.data.success) {
          const newBs = res.data.data;
          setBiosamples((prev) => [...prev, newBs]);
          setBiosampleModalVisible(false);
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("tạo mẫu sinh học thất bại.");
      });
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

        <Card
          title="Thông tin bước điều trị"
          bodyStyle={{ backgroundColor: "#fff0f5" }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong>Tên bước:</Text>
              <br />
              <Text>{stepDetail.Step_Name}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Giai đoạn:</Text>
              <br />
              <Text>{stepDetail.treatmentStep?.Step_Name}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Ngày hẹn:</Text>
              <br />
              <Text>{stepDetail.doctorSchedule?.WorkDate}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Khung giờ:</Text>
              <br />
              <Text>{stepDetail.doctorSchedule?.Slot_ID}</Text>
            </Col>
            <Col span={24}>
              <Text strong>Ghi chú:</Text>
              <br />
              <Text>{stepDetail.Note}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Thuốc:</Text>
              <br />
              <Text>{stepDetail?.drugName}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Liều lượng:</Text>
              <br />
              <Text>{stepDetail?.dosage}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Trạng thái:</Text>
              <br />
              <Select
                value={stepDetail.Status}
                onChange={handleStatusChange}
                loading={statusUpdating}
                style={{ width: 180 }}
              >
                <Option value={1}>Chờ thực hiện</Option>
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
                style={{
                  backgroundColor: "#f78db3",
                  color: "white",
                  border: "none",
                }}
                onClick={() =>
                  navigate(`/doctordetail/${stepDetail.doctor?.docId}`)
                }
              />
            </Space>
          }
          style={{ marginTop: 24 }}
          bodyStyle={{ backgroundColor: "#fdf2f8" }}
        >
          <Text strong>Họ tên:</Text>
          <br />
          <Text>{stepDetail.doctor?.acc?.fullName}</Text>
          <br />
          <MailOutlined style={{ marginRight: 8 }} />
          {stepDetail.doctor?.acc?.mail}
          <br />
          <PhoneOutlined style={{ marginRight: 8 }} />
          {stepDetail.doctor?.acc?.phone}
        </Card>

        {/* Danh sách xét nghiệm */}
        {tests.length > 0 ? (
          <Card
            title={
              <Row justify="space-between" align="middle">
                <Col>
                  <Text strong>Danh sách xét nghiệm liên quan</Text>
                </Col>
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
                  <Card
                    key={test.Test_ID}
                    type="inner"
                    style={{ borderLeft: "5px solid #f78db3" }}
                  >
                    <Row justify="space-between">
                      <Col>
                        <Text strong>Loại xét nghiệm: </Text>
                        {test.testType?.testName}
                        <br />
                        <Text strong>Ngày xét nghiệm: </Text>
                        {test.testDate}
                        <br />
                        <Text strong>Ngày trả kết quả: </Text>
                        {test.ResultDay || "Chưa có"}
                        <br />
                        <Text strong>Ghi chú: </Text>
                        {test.note}
                      </Col>
                      <Col>
                        <Link
                          style={{ color: "#f78db3" }}
                          onClick={() =>
                            navigate(`/doctorpage/testdetail/${test.testId}`)
                          }
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
        ) : (
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setTestModalVisible(true)}
            style={{
              marginTop: 24,
              backgroundColor: "#f78db3",
              border: "none",
            }}
          >
            Thêm xét nghiệm liên quan
          </Button>
        )}

        {/* Danh sách mẫu sinh học */}
        {biosamples.length > 0 ? (
          <Card
            title={
              <Row justify="space-between" align="middle">
                <Col>
                  <Text strong>Danh sách mẫu sinh học liên quan</Text>
                </Col>
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
                  <Card
                    key={bs.bsId}
                    type="inner"
                    style={{ borderLeft: "5px solid #f78db3" }}
                  >
                    <Row justify="space-between">
                      <Col>
                        <Text strong>Loại mẫu: </Text>
                        {bs.bioType?.name}
                        <br />
                        <Text strong>Tên mẫu: </Text>
                        {bs.bsName}
                        <br />
                        <Text strong>Ngày thu thập: </Text>
                        {bs.collectionDate}
                        <br />
                        <Text strong>Vị trí lưu trữ: </Text>
                        {bs.storageLocation}
                        <br />
                        <Text strong>Trạng thái mẫu: </Text>
                        {bs.bioSampleStatus?.name}
                        <br />
                        <Text strong>Chất lượng: </Text>
                        {bs.qualityStatus?.name}
                        <br />
                        <Text strong>Ghi chú: </Text>
                        {bs.note}
                      </Col>
                      <Col>
                        <Link
                          style={{ color: "#f78db3" }}
                          onClick={() =>
                            navigate(`/doctorpage/biosampledetail/${bs.bsId}`)
                          }
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
        ) : (
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setBiosampleModalVisible(true)}
            style={{
              marginTop: 24,
              backgroundColor: "#f78db3",
              border: "none",
            }}
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
          <Form
            layout="vertical"
            form={form}
            initialValues={{ TestDate: dayjs() }}
          >
            <Form.Item
              label="Loại xét nghiệm"
              name="TestType_ID"
              rules={[{ required: true }]}
            >
              <Select placeholder="Chọn loại xét nghiệm">
                {testTypes.map((type) => (
                  <Option key={type.id} value={type.id}>
                    {type.testName}
                  </Option>
                ))}
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
          <Form
            layout="vertical"
            form={form}
            initialValues={{ CollectionDate: dayjs() }}
          >
            <Form.Item
              label="Loại mẫu"
              name="BT_ID"
              rules={[{ required: true }]}
            >
              <Select placeholder="Chọn loại mẫu">
                {bioSampleTypes.map((type) => (
                  <Option key={type.id} value={type.id}>
                    {type.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Tên mẫu"
              name="BS_Name"
              rules={[{ required: true }]}
            >
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
