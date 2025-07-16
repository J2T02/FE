import React, { useState, useEffect } from "react";
import {
  Card,
  Space,
  Typography,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  getStepDetailByTreatmentPlanId,
  createStepDetail,
} from "../../../../apis/stepDetailService";
import { getDoctorScheduleByDoctorId } from "../../../../apis/doctorService";

const { Text, Link } = Typography;

const ReceptionistTreatmentProcessCard = ({
  tpId,
  doctorId,
  stepTypes,
  onRefresh,
}) => {
  const [stepDetails, setStepDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [doctorSchedule, setDoctorSchedule] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStepDetails = async () => {
      setLoading(true);
      try {
        const res = await getStepDetailByTreatmentPlanId(tpId);
        if (res?.data?.success && Array.isArray(res.data.data)) {
          const mapped = res.data.data.map((step, idx) => ({
            SD_ID: step.sdId || idx + 1,
            Step_Name: step.stepName || `Bước ${idx + 1}`,
            PlanDate: step.docSchedule?.workDate
              ? dayjs(step.docSchedule.workDate).format("YYYY-MM-DD")
              : "",
            doc: step.doctorInfo?.accountInfo?.fullName || "Chưa rõ",
          }));
          setStepDetails(mapped);
        } else {
          setStepDetails([]);
        }
      } catch (err) {
        setStepDetails([]);
      } finally {
        setLoading(false);
      }
    };
    if (tpId) fetchStepDetails();
  }, [tpId, isModalOpen]);

  useEffect(() => {
    if (!doctorId) return;
    const fetchDoctorSchedule = async () => {
      try {
        const res = await getDoctorScheduleByDoctorId(doctorId);
        if (res?.data?.success && Array.isArray(res.data.data)) {
          setDoctorSchedule(res.data.data);
        }
      } catch (err) {
        setDoctorSchedule([]);
      }
    };
    fetchDoctorSchedule();
  }, [doctorId]);

  const availableDates = doctorSchedule.map((item) => item.workDate);
  const disabledDate = (current) => {
    return !availableDates.includes(current.format("YYYY-MM-DD"));
  };
  const handleDateChange = (date) => {
    const selected = doctorSchedule.find(
      (item) => item.workDate === date.format("YYYY-MM-DD")
    );
    if (selected) {
      form.setFieldsValue({ dsId: selected.dsId });
    } else {
      form.setFieldsValue({ dsId: undefined });
    }
  };

  const handleCreateStep = async (values) => {
    const newStep = {
      tpId,
      tsId: values.TS_ID,
      docId: doctorId,
      stepName: values.Step_Name,
      note: "",
      dsId: values.dsId,
      drugName: "",
      dosage: "",
    };
    try {
      const res = await createStepDetail(newStep);
      if (res.data.success) {
        message.success("Tạo bước điều trị thành công!");
        setIsModalOpen(false);
        form.resetFields();
        if (onRefresh) onRefresh();
      } else {
        message.error("Tạo bước điều trị thất bại!");
      }
    } catch (err) {
      message.error("Tạo bước điều trị thất bại!");
    }
  };

  return (
    <Card
      title={
        <Space>
          <Text strong>Quá trình điều trị</Text>
          <Link
            style={{ color: "#f78db3" }}
            onClick={() => navigate(`/receptionist/treatmentstep/${tpId}`)}
          >
            Xem đầy đủ
          </Link>
        </Space>
      }
      bodyStyle={{ backgroundColor: "#fff7fa" }}
    >
      <div style={{ maxHeight: 260, overflowY: "auto" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 50 }}>
            <Text>Đang tải...</Text>
          </div>
        ) : stepDetails.length > 0 ? (
          <Space direction="vertical" style={{ width: "100%" }}>
            {stepDetails.map((step) => (
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
                    <Text>Bác sĩ: {step?.doc}</Text>
                  </Col>
                  <Col>
                    <Link
                      onClick={() =>
                        navigate(`/receptionist/stepdetail/${step.SD_ID}`)
                      }
                      style={{ color: "#f78db3" }}
                    >
                      Xem chi tiết
                    </Link>
                  </Col>
                </Row>
              </Card>
            ))}
          </Space>
        ) : (
          <div style={{ textAlign: "center", padding: 50 }}>
            <Button
              icon={<PlusOutlined />}
              size="large"
              type="dashed"
              style={{ fontSize: 28, color: "#f78db3", borderColor: "#f78db3" }}
              onClick={() => setIsModalOpen(true)}
            >
              Thêm bước điều trị đầu tiên
            </Button>
          </div>
        )}
      </div>
      <Modal
        title="Tạo bước điều trị đầu tiên"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        cancelButtonProps={{
          style: { color: "#f78db3", borderColor: "#f78db3" },
        }}
        onOk={() => {
          form.validateFields().then(handleCreateStep);
        }}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="Step_Name"
            label="Tên bước điều trị"
            rules={[
              { required: true, message: "Vui lòng nhập tên bước điều trị" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="TS_ID"
            label="Loại bước điều trị"
            rules={[
              { required: true, message: "Vui lòng chọn loại bước điều trị" },
            ]}
          >
            <Select
              placeholder="Chọn loại bước điều trị"
              loading={stepTypes.length === 0}
              showSearch
              optionFilterProp="children"
            >
              {stepTypes.map((type) => (
                <Select.Option key={type.tsId} value={type.tsId}>
                  {type.stepName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="PlanDate"
            label="Ngày hẹn"
            rules={[{ required: true, message: "Vui lòng chọn ngày hẹn" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              disabledDate={disabledDate}
              onChange={handleDateChange}
            />
          </Form.Item>

          <Form.Item name="dsId" style={{ display: "none" }}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ReceptionistTreatmentProcessCard;
