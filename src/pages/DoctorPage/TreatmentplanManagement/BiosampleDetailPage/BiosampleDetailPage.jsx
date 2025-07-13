// ... giữ nguyên import ban đầu
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Button,
  Tag,
  Divider,
  Form,
  Select,
  Input,
  message,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  getBioSamplesBySampleId,
  getAllBioSampleStatus,
  getAllBioSampleQualityStatus,
  updateBioSample,
} from "../../../../apis/bioSampleService";
const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// ✅ Mapping cho các bảng phụ
const BIO_TYPE_MAP = {
  1: "Phôi",
  2: "Noãn",
  3: "Tinh trùng",
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

export default function BiosampleDetailPage() {
  const { id } = useParams(); // id = BS_ID
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [biosample, setBiosample] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bioSampleStatusList, setBioSampleStatusList] = useState([]);
  const [bioSampleQualityStatusList, setBioSampleQualityStatusList] = useState(
    []
  );

  useEffect(() => {
    async function fetchBiosample() {
      try {
        const res = await getBioSamplesBySampleId(id);
        if (res && res.data && res.data.success) {
          const d = res.data.data;
          // Map API response to UI state
          const mapped = {
            BS_ID: d.bsId,
            TP_ID: d.treatmentPlanInfo?.tpId,
            BT_ID: d.bioType?.id,
            BS_Name: d.bsName,
            Status: d.bioSampleStatus?.id,
            BS_Type: d?.bioType?.name,
            CollectionDate: d.collectionDate,
            StorageLocation: d.storageLocation,
            BQS_ID: d.qualityStatus?.id,
            Note: d.note,
          };
          setBiosample(mapped);
          form.setFieldsValue(mapped);
        } else {
          setBiosample(null);
        }
      } catch (err) {
        setBiosample(null);
      }
    }
    fetchBiosample();
    // Fetch bio sample status list
    async function fetchBioSampleStatusList() {
      try {
        const res = await getAllBioSampleStatus();
        if (res && res.data && res.data.success) {
          setBioSampleStatusList(res.data.data);
        } else {
          setBioSampleStatusList([]);
        }
      } catch (err) {
        setBioSampleStatusList([]);
      }
    }
    fetchBioSampleStatusList();
    // Fetch bio sample quality status list
    async function fetchBioSampleQualityStatusList() {
      try {
        const res = await getAllBioSampleQualityStatus();
        if (res && res.data && res.data.success) {
          setBioSampleQualityStatusList(res.data.data);
        } else {
          setBioSampleQualityStatusList([]);
        }
      } catch (err) {
        setBioSampleQualityStatusList([]);
      }
    }
    fetchBioSampleQualityStatusList();
  }, [id, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      // Build payload for updateBioSample
      const payload = {
        note: values.Note,
        bqsId: values.BQS_ID,
        statusId: values.Status,
        storageLocation: values.StorageLocation,
      };
      await updateBioSample(biosample.BS_ID, payload)
        .then((res) => {
          if (res.data.success) {
            setBiosample((prev) => ({ ...prev, ...values }));
            message.success("Cập nhật mẫu sinh học thành công!");
          } else {
            message.error(res.data.message || "Cập nhật thất bại");
          }
        })
        .catch((err) => {
          message.error("Cập nhật thất bại");
        })
        .finally(() => setLoading(false));
    } catch (err) {
      message.error("Vui lòng điền đầy đủ thông tin hợp lệ.");
    }
  };

  if (!biosample) return null;
  console.log(biosample);
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

        <Title level={3} style={{ marginBottom: 4 }}>
          Chi tiết mẫu sinh học (bác sĩ)
        </Title>
        <Text type="secondary">Mã hồ sơ điều trị: {biosample.TP_ID}</Text>

        <Card
          style={{ marginTop: 24, backgroundColor: "#fff0f5" }}
          title={<Text strong>Thông tin mẫu sinh học</Text>}
          bordered={false}
        >
          <Form form={form} layout="vertical">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>Tên mẫu:</Text>
                <br />
                <Text>{biosample.BS_Name}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Loại mẫu:</Text>
                <br />
                <Tag color="purple">
                  {/* Use BT_ID to display name if needed, or show d.bioType?.name if you want */}
                  {biosample.BS_Type}
                </Tag>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="Status"
                  label={<Text strong>Trạng thái</Text>}
                  rules={[{ required: true, message: "Chọn trạng thái" }]}
                >
                  <Select placeholder="Chọn trạng thái">
                    {bioSampleStatusList.map((status) => (
                      <Option key={status.statusId} value={status.statusId}>
                        {status.statusName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="BQS_ID"
                  label={<Text strong>Chất lượng</Text>}
                  rules={[{ required: true, message: "Chọn chất lượng" }]}
                >
                  <Select placeholder="Chọn chất lượng mẫu">
                    {bioSampleQualityStatusList.map((status) => (
                      <Option key={status.id} value={status.id}>
                        {status.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Text strong>Ngày thu thập:</Text>
                <br />
                <Text>{biosample.CollectionDate}</Text>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="StorageLocation"
                  label={<Text strong>Vị trí lưu trữ</Text>}
                  rules={[{ required: true, message: "Nhập vị trí lưu trữ" }]}
                >
                  <Input placeholder="Ví dụ: Tủ A - Ngăn 2" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item name="Note" label={<Text strong>Ghi chú</Text>}>
                  <Input.TextArea rows={3} placeholder="Ghi chú thêm..." />
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            <Row justify="end">
              <Col>
                <Button
                  type="primary"
                  loading={loading}
                  onClick={handleSave}
                  style={{ backgroundColor: "#f78db3", border: "none" }}
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
