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
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  InfoCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  getTreatmentDetail,
  getTreatmentStepList,
} from "../../../apis/treatmentService";
import { getDoctorScheduleByDoctorId } from "../../../apis/doctorService";
import { createStepDetail } from "../../../apis/stepDetailService";
import { getStepDetailByTreatmentPlanId } from "../../../apis/stepDetailService";
import ReceptionistTreatmentProcessCard from "./components/ReceptionistTreatmentProcessCard";
const { Content } = Layout;
const { Title, Text, Link } = Typography;

// ✅ Mapping cho trạng thái và chất lượng mẫu sinh học
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

// ✅ Mapping loại xét nghiệm và trạng thái xét nghiệm
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [stepTypes, setStepTypes] = useState([]);
  const [doctorSchedule, setDoctorSchedule] = useState([]);

  useEffect(() => {
    const fetchTreatmentPlan = async () => {
      try {
        const res = await getTreatmentDetail(tpId);

        if (res?.data?.success && res.data.data) {
          const apiData = res.data.data;
          // Map API response to UI expected format
          console.log(apiData);
          const mappedTP = {
            TP_ID: apiData.tpId,
            StartDate: apiData.startDate ? apiData.startDate.split("T")[0] : "",
            EndDate: apiData.endDate ? apiData.endDate.split("T")[0] : "",
            Status: apiData.status?.statusId || 1,
            Result:
              apiData.result ||
              "Đáp ứng tốt với phác đồ điều trị đầu tiên, theo dõi thêm trong các bước tiếp theo.",
            service: {
              Ser_ID: apiData.serviceInfo?.serId || 1,
              Ser_Name: apiData.serviceInfo?.serName || "IVF",
            },
            customer: {
              Hus_Name: apiData.cusInfo?.husName || "Nguyen van A",
              Wife_Name: apiData.cusInfo?.wifeName || "Nguyen THI B",
              Hus_YOB: apiData.cusInfo?.husYob || "2000-05-11",
              Wife_YOB: apiData.cusInfo?.wifeYob || "2000-05-11",
              acc: {
                fullName: apiData?.cusInfo?.accInfo?.fullName || "",
                mail: apiData?.cusInfo?.accInfo.mail || "",
                phone: apiData?.cusInfo?.accInfo.phone || "",
              },
            },
            doctor: {
              docId: apiData.doctorInfo?.docId || 1,
              acc: {
                fullName:
                  apiData.doctorInfo?.accountInfo?.fullName || "Doctor 01",
                phone: apiData.doctorInfo?.accountInfo?.phone || "0900000020",
                mail:
                  apiData.doctorInfo?.accountInfo?.mail ||
                  "doctor01@example.com",
              },
            },
            stepDetails: Array.isArray(apiData.stepDetails)
              ? apiData.stepDetails.map((step, idx) => ({
                  SD_ID: step.sdId || idx + 1,
                  Step_Name: step.stepName || `Bước ${idx + 1}`,
                  PlanDate: step.planDate ? step.planDate.split("T")[0] : "",
                  doc: { fullName: step.doctorName || "Chưa rõ" },
                }))
              : [],
          };
          setTreatmentPlan(mappedTP);
          console.log(treatmentPlan);
        } else {
          setTreatmentPlan(null);
        }
      } catch (err) {
        setTreatmentPlan(null);
      }
    };
    fetchTreatmentPlan();
  }, [tpId]);

  useEffect(() => {
    const fetchStepTypes = async () => {
      try {
        const res = await getTreatmentStepList();
        if (res?.data?.success && Array.isArray(res.data.data)) {
          setStepTypes(res.data.data);
        }
      } catch (err) {
        setStepTypes([]);
      }
    };
    fetchStepTypes();
  }, []);

  useEffect(() => {
    if (!treatmentPlan?.doctor?.docId) return;
    const fetchDoctorSchedule = async () => {
      try {
        const res = await getDoctorScheduleByDoctorId(
          treatmentPlan.doctor.docId
        );
        if (res?.data?.success && Array.isArray(res.data.data)) {
          setDoctorSchedule(res.data.data);
        }
      } catch (err) {
        setDoctorSchedule([]);
      }
    };
    fetchDoctorSchedule();
  }, [treatmentPlan?.doctor?.docId]);

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
  const createStep = async (newStep) => {
    await createStepDetail(newStep)
      .then((res) => {
        if (res.data.success) {
          message.success("Tạo bước điều trị thành công!");
          setIsModalOpen(false);
          form.resetFields();
          // Map API response to stepDetails format and update state
          if (res.data.data) {
            const step = res.data.data;
            const mappedStep = {
              SD_ID: step.sdId,
              Step_Name: step.stepName,
              PlanDate: step?.docSchedule?.workDate,
              doc: step?.doctorInfo?.accountInfo?.fullName || "chưa rõ",
            };
            setTreatmentPlan((prev) => ({
              ...prev,
              stepDetails: [mappedStep, ...(prev.stepDetails || [])],
            }));
          }
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Tạo bước điều trị thất bại!");
      });
  };
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
  console.log(treatmentPlan);
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

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Title level={3}>Chi tiết hồ sơ bệnh án</Title>
          <Text style={{ color: "#f78db3", fontWeight: 500 }}>
            Mã hồ sơ: {treatmentPlan.TP_ID}
          </Text>

          <Card
            title={<Text strong>Tổng quan hồ sơ bệnh án</Text>}
            bodyStyle={{ backgroundColor: "#fff0f5" }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>Ngày bắt đầu:</Text>
                <br />
                <Text>{treatmentPlan.StartDate}</Text>
              </Col>
              {treatmentPlan.EndDate && (
                <Col span={12}>
                  <Text strong>Ngày kết thúc:</Text>
                  <br />
                  <Text>{treatmentPlan.EndDate}</Text>
                </Col>
              )}
              <Col span={12}>
                <Text strong>Trạng thái:</Text>
                <br />
                {getStatusTag(treatmentPlan.Status)}
              </Col>
              <Col span={24}>
                <Text strong>Ghi chú:</Text>
                <br />
                <Text>{treatmentPlan.Result}</Text>
              </Col>
              <Col span={24}>
                <Text strong>Dịch vụ điều trị:</Text>
                <br />
                <Text>{treatmentPlan.service?.Ser_Name}</Text>
              </Col>
            </Row>
          </Card>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card
                title={
                  <Text strong>
                    <UserOutlined /> Thông tin khách hàng
                  </Text>
                }
                bodyStyle={{ backgroundColor: "#fde7ef" }}
              >
                <Row>
                  <Col span={12}>
                    <Text type="secondary">Tên chồng</Text>
                    <br />
                    <Text>{treatmentPlan.customer?.Hus_Name}</Text>
                    <br />
                    <Text type="secondary">Năm sinh chồng</Text>
                    <br />
                    <Text>{treatmentPlan.customer?.Hus_YOB}</Text>
                  </Col>
                  <Col span={12}>
                    <Text type="secondary">Tên vợ</Text>
                    <br />
                    <Text>{treatmentPlan.customer?.Wife_Name}</Text>
                    <br />
                    <Text type="secondary">Năm sinh vợ</Text>
                    <br />
                    <Text>{treatmentPlan.customer?.Wife_YOB}</Text>
                  </Col>
                </Row>
                <Divider />
                <Text strong>Thông tin liên hệ</Text>
                <br />
                <UserOutlined style={{ marginRight: 8 }} />
                {treatmentPlan.customer?.acc?.fullName}
                <br />
                <MailOutlined style={{ marginRight: 8 }} />
                {treatmentPlan.customer?.acc?.mail}
                <br />
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
                    style={{
                      backgroundColor: "#f78db3",
                      color: "white",
                      border: "none",
                    }}
                    onClick={() =>
                      navigate(`/doctordetail/${treatmentPlan.doctor?.docId}`)
                    }
                  />
                }
                bodyStyle={{ backgroundColor: "#fce6ec" }}
              >
                <Text strong>Họ tên:</Text>
                <br />
                <Text>{treatmentPlan.doctor?.acc?.fullName}</Text>
                <br />
                <Text strong>Email:</Text>
                <br />
                <Text>{treatmentPlan.doctor?.acc?.mail}</Text>
                <br />
                <Text strong>SĐT:</Text>
                <br />
                <Text>{treatmentPlan.doctor?.acc?.phone}</Text>
              </Card>
            </Col>
          </Row>

          {/* ✅ KHUNG QUÁ TRÌNH ĐIỀU TRỊ - refactor dùng component mới */}
          <ReceptionistTreatmentProcessCard
            tpId={treatmentPlan.TP_ID}
            doctorId={treatmentPlan.doctor?.docId}
            stepTypes={stepTypes}
            onRefresh={null}
          />

          {/* ✅ KHUNG DANH SÁCH XÉT NGHIỆM */}
          {Array.isArray(tests) && tests.length > 0 && (
            <Card
              title={
                <Space>
                  <Text strong>Danh sách xét nghiệm</Text>
                  <Link
                    style={{ color: "#f78db3" }}
                    onClick={() => navigate(`/receptionist/testlist/${tpId}`)}
                  >
                    Xem đầy đủ
                  </Link>
                </Space>
              }
              bodyStyle={{ backgroundColor: "#fef2f6" }}
            >
              <div style={{ maxHeight: 220, overflowY: "auto" }}>
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
                          {TEST_TYPE_MAP[test.TestType_ID] || "Không rõ"}
                          <br />
                          <Text strong>Ngày xét nghiệm: </Text>
                          {test.TestDate}
                          <br />
                          <Text strong>Người xét nghiệm: </Text>
                          {test.Person}
                          <br />
                          <Text strong>Trạng thái: </Text>
                          {TEST_STATUS[test.Status] || "Không xác định"}
                          <br />
                          <Text strong>Tình trạng kết quả: </Text>
                          {TEST_QUALITY_RESULT_STATUS[test.TQS_ID] || "Chưa có"}
                        </Col>
                        <Col>
                          <Link
                            style={{ color: "#f78db3" }}
                            onClick={() => navigate(`${test.Test_ID}`)}
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
                  <Link
                    style={{ color: "#f78db3" }}
                    onClick={() =>
                      navigate(`/receptionist/biosamplelist/${tpId}`)
                    }
                  >
                    Xem đầy đủ
                  </Link>
                </Space>
              }
              bodyStyle={{ backgroundColor: "#fff0f5" }}
            >
              <div style={{ maxHeight: 220, overflowY: "auto" }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  {biosamples.map((bs) => (
                    <Card
                      key={bs.BS_ID}
                      type="inner"
                      style={{ borderLeft: "5px solid #f78db3" }}
                    >
                      <Row justify="space-between">
                        <Col>
                          <Text strong>Tên mẫu: </Text>
                          {bs.BS_Name}
                          <br />
                          <Text strong>Ngày thu thập: </Text>
                          {bs.CollectionDate}
                          <br />
                          <Text strong>Trạng thái: </Text>
                          {BIO_SAMPLE_STATUS[bs.Status] || "Không xác định"}
                          <br />
                          <Text strong>Chất lượng: </Text>
                          {BIO_QUALITY_STATUS[bs.BQS_ID] || "Chưa đánh giá"}
                          <br />
                        </Col>
                        <Col>
                          <Link
                            style={{ color: "#f78db3" }}
                            onClick={() =>
                              navigate(
                                `/receptionist/biosampledetail/${bs.BS_ID}`
                              )
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
          )}
        </Space>
      </Content>
    </Layout>
  );
}
