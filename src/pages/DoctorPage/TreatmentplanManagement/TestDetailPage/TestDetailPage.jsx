// File: pages/DoctorPage/TestDetailPage.jsx
import React, { useEffect, useState } from "react";
import {
  Layout,
  Typography,
  Card,
  Space,
  Row,
  Col,
  Button,
  Form,
  Select,
  Input,
  Upload,
  message,
  theme,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  getTestById,
  getTestStatusList,
  getTestQualityResultStatusList,
  updateTest,
} from "../../../../apis/testService";
const { Content } = Layout;
const { Title, Text, Link } = Typography;
const { Option } = Select;

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
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [testDetail, setTestDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testStatusList, setTestStatusList] = useState([]);
  const [testQualityResultStatusList, setTestQualityResultStatusList] =
    useState([]);

  useEffect(() => {
    async function fetchTestDetail() {
      try {
        const res = await getTestById(testId);
        if (res && res.data && res.data.success) {
          const d = res.data.data;
          // Map API response to UI state
          const mapped = {
            Test_ID: d.testId,
            TP_ID: d.treatmenPlanInfo?.tpId,
            TestType_ID: d.testType?.id,
            TestType_Name: d.testType?.testName,
            TestDate: d.testDate,
            ResultDay: d.resultDate,
            Note: d.note,
            File_Path: d.filePath,
            Status: d.status?.id,
            StatusName: d.status?.name,
            TQS_ID: d.testQualityStatus?.id,
            TQS_Name: d.testQualityStatus?.name,
            SD_ID: d.stepDetail?.sdId,
            stepDetail: {
              Step_Name: d.stepDetail?.stepName,
              treatmentStep: {
                Step_Name: d.stepDetail?.treatmentStep?.stepName || "",
              },
            },
          };
          setTestDetail(mapped);
          form.setFieldsValue({
            Status: mapped.Status,
            TQS_ID: mapped.TQS_ID,
            Note: mapped.Note,
          });
        } else {
          setTestDetail(null);
        }
      } catch (err) {
        setTestDetail(null);
        message.error("Không thể tải thông tin xét nghiệm");
      }
    }
    fetchTestDetail();
    // Fetch test status list
    async function fetchTestStatusList() {
      try {
        const res = await getTestStatusList();
        if (res && res.data && res.data.success) {
          setTestStatusList(res.data.data);
        } else {
          setTestStatusList([]);
        }
      } catch (err) {
        setTestStatusList([]);
      }
    }
    fetchTestStatusList();
    // Fetch test quality result status list
    async function fetchTestQualityResultStatusListApi() {
      try {
        const res = await getTestQualityResultStatusList();
        if (res && res.data && res.data.success) {
          setTestQualityResultStatusList(res.data.data);
        } else {
          setTestQualityResultStatusList([]);
        }
      } catch (err) {
        setTestQualityResultStatusList([]);
      }
    }
    fetchTestQualityResultStatusListApi();
  }, [testId, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      // Build payload for updateTest
      const payload = {
        resultDate: dayjs().format("YYYY-MM-DD"),
        note: values.Note,
        filePath: testDetail.File_Path || "",
        status: values.Status,
        testType: testDetail.TestType_ID,
        testQualityStatus: values.TQS_ID,
      };
      console.log(payload);
      setLoading(true);
      await updateTest(testDetail.Test_ID, payload)
        .then((res) => {
          if (res.data.success) {
            message.success("Cập nhật thông tin xét nghiệm thành công");
            setTestDetail((prev) => ({
              ...prev,
              ...values,
              Status: values.Status,
              TQS_ID: values.TQS_ID,
              Note: values.Note,
              ResultDay: payload.resultDate,
            }));
          } else {
            message.error(res.data.message || "Cập nhật thất bại");
          }
        })
        .catch((err) => {
          message.error("Cập nhật thất bại");
        })
        .finally(() => setLoading(false));
    } catch (err) {
      message.error("Vui lòng điền đủ thông tin");
    }
  };

  const handleUpload = (info) => {
    if (info.file.status === "done") {
      const fakeURL = URL.createObjectURL(info.file.originFileObj);
      setTestDetail((prev) => ({ ...prev, File_Path: fakeURL }));
      message.success(`Tải file thành công`);
    }
  };

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

        <Title level={3}>Chie tiết xét nghiệm (bác sĩ)</Title>

        <Card
          title="Thông tin xét nghiệm"
          bodyStyle={{ backgroundColor: "#fff0f5" }}
        >
          <Form layout="vertical" form={form}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>Mã bệnh án:</Text>
                <br />
                <Text>{testDetail.TP_ID}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Loại xét nghiệm:</Text>
                <br />
                <Text>{testDetail.TestType_Name}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Giai đoạn điều trị:</Text>
                <br />
                <Text>{testDetail.stepDetail?.treatmentStep?.Step_Name}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Bước điều trị:</Text>
                <br />
                <Text>{testDetail.stepDetail?.Step_Name}</Text>
              </Col>

              <Col span={12}>
                <Text strong>Ngày xét nghiệm:</Text>
                <br />
                <Text>{testDetail.TestDate}</Text>
              </Col>
              {testDetail.ResultDay && (
                <Col span={12}>
                  <Text strong>Ngày có kết quả:</Text>
                  <br />
                  <Text>{testDetail.ResultDay}</Text>
                </Col>
              )}

              <Col span={12}>
                <Form.Item name="Status" label={<Text strong>Trạng thái</Text>}>
                  <Select value={testDetail.Status}>
                    {testStatusList.map((status) => (
                      <Option key={status.id} value={status.id}>
                        {status.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="TQS_ID"
                  label={<Text strong>Tình trạng kết quả</Text>}
                >
                  <Select allowClear value={testDetail.TQS_ID}>
                    {testQualityResultStatusList.map((status) => (
                      <Option key={status.id} value={status.id}>
                        {status.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item name="Note" label={<Text strong>Ghi chú</Text>}>
                  <Input.TextArea rows={2} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label={<Text strong>Kết quả xét nghiệm (PDF)</Text>}>
                  <Upload
                    name="file"
                    customRequest={({ onSuccess }) =>
                      setTimeout(() => onSuccess("ok"), 500)
                    }
                    onChange={handleUpload}
                    showUploadList={false}
                  >
                    <Button
                      style={{
                        color: token.colorPrimary,
                        backgroundColor: "white",
                      }}
                      icon={<UploadOutlined />}
                    >
                      Tải lên
                    </Button>
                  </Upload>
                  {testDetail.File_Path && (
                    <div style={{ marginTop: 8 }}>
                      <Link
                        href={testDetail.File_Path}
                        target="_blank"
                        style={{ color: "#f78db3" }}
                      >
                        Xem file đã tải lên
                      </Link>
                    </div>
                  )}
                </Form.Item>
              </Col>

              <Col span={24}>
                <Button
                  type="primary"
                  style={{ backgroundColor: "#f78db3", border: "none" }}
                  onClick={handleSave}
                  loading={loading}
                >
                  Lưu thay đổi
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
}
