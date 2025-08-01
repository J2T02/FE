import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Select,
  Modal,
  Input,
  message,
  Rate,
  Tabs,
} from "antd";
import {
  ArrowLeftOutlined,
  InfoCircleOutlined,
  InfoCircleTwoTone,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { getTreatmentDetail } from "../../../../apis/treatmentService";
import { getStepDetailByTreatmentPlanId } from "../../../../apis/stepDetailService";
import { getTestByTreatmentPlanId } from "../../../../apis/testService";
import { getBioSampleByPlanId } from "../../../../apis/bioSampleService";
import {
  feedbackForTreatmentPlan,
  feedBackForDoctor,
} from "../../../../apis/feedbackService";
const { Content } = Layout;
const { Title, Text, Link } = Typography;
const { Option } = Select;

const EDUCATION_LEVEL = {
  1: "Cử nhân",
  2: "Thạc sĩ",
  3: "Tiến sĩ",
  4: "Giáo sư",
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
  const [doctorList, setDoctorList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isDoctorInactive, setIsDoctorInactive] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedbackData, setFeedbackData] = useState({});

  useEffect(() => {
    setLoading(true);
    setError(null);
    getTreatmentDetail(tpId)
      .then((res) => {
        if (res && res.data && res.data.success && res.data.data) {
          const d = res.data.data;
          setTreatmentPlan({
            TP_ID: d.tpId,
            StartDate: d.startDate,
            EndDate: d.endDate,
            Status: d.status?.statusId,
            Result: d.result,
            service: d.serviceInfo
              ? { Ser_ID: d.serviceInfo.serId, Ser_Name: d.serviceInfo.serName }
              : undefined,
            customer: d.cusInfo
              ? {
                  Hus_Name: d.cusInfo.husName,
                  Wife_Name: d.cusInfo.wifeName,
                  Hus_YOB: d.cusInfo.husYob,
                  Wife_YOB: d.cusInfo.wifeYob,
                  acc: d.cusInfo.accInfo,
                }
              : undefined,
            doctor: d.doctorInfo
              ? {
                  docId: d.doctorInfo.docId,
                  Status: d.doctorInfo.doctorStatus?.statusId,
                  acc: d.doctorInfo.accountInfo,
                }
              : undefined,
            stepDetails: [], // Will be set by step detail API
          });

          // Set feedbacks từ API response
          if (d.feedbacks && Array.isArray(d.feedbacks)) {
            const mappedFeedbacks = d.feedbacks.map((fb) => ({
              fbId: fb.treatmentPlanId || fb.doctorId,
              docId: fb.doctorId,
              doctorName: fb.doctorId
                ? d.doctorInfo?.accountInfo?.fullName
                : null,
              star: fb.star,
              createAt: fb.createAt,
              content: fb.content,
              customerName: `Gia đình anh ${fb.cus?.husName} và chị ${fb.cus?.wifeName}`,
            }));
            setFeedbacks(mappedFeedbacks);
          } else {
            setFeedbacks([]);
          }

          // Chỉ hiển thị form feedback khi đã hoàn thành điều trị VÀ chưa có feedback nào
          if (
            [2, 3, 4].includes(d.status?.statusId) &&
            (!d.feedbacks || d.feedbacks.length === 0)
          ) {
            setShowFeedbackForm(true);
          } else {
            setShowFeedbackForm(false);
          }
        } else {
          setError("Không tìm thấy hồ sơ điều trị");
        }
      })
      .catch(() => setError("Lỗi khi lấy dữ liệu hồ sơ điều trị"))
      .finally(() => setLoading(false));
  }, [tpId]);

  // Fetch step details for this treatment plan
  useEffect(() => {
    if (!tpId) return;
    getStepDetailByTreatmentPlanId(tpId).then((res) => {
      if (res && res.data && res.data.success && Array.isArray(res.data.data)) {
        setTreatmentPlan((prev) =>
          prev
            ? {
                ...prev,
                stepDetails: res.data.data.map((step) => ({
                  SD_ID: step.sdId,
                  Step_Name: step.stepName,
                  PlanDate: step.docSchedule?.workDate,
                  doc: step.doctorInfo
                    ? {
                        fullName: step.doctorInfo.accountInfo?.fullName,
                        docId: step.doctorInfo.docId,
                      }
                    : undefined,
                })),
              }
            : prev
        );
      }
    });
  }, [tpId]);

  // Fetch tests for this treatment plan
  useEffect(() => {
    if (!tpId) return;
    getTestByTreatmentPlanId(tpId).then((res) => {
      if (res && res.data && res.data.success && Array.isArray(res.data.data)) {
        setTests(
          res.data.data.map((test) => ({
            Test_ID: test.testId,
            TestType_ID: test.testType?.id,
            TestDate: test.testDate,
            Status: test.status?.id,
            Person: test.testType?.person,
            TQS_ID: test.testQualityStatus?.id,
            Result: test.testQualityStatus?.name,
            TestName: test.testType?.testName,
          }))
        );
      }
    });
  }, [tpId]);

  // Fetch biosamples for this treatment plan
  useEffect(() => {
    if (!tpId) return;
    getBioSampleByPlanId(tpId).then((res) => {
      if (res && res.data && res.data.success && Array.isArray(res.data.data)) {
        setBiosamples(
          res.data.data.map((bs) => ({
            BS_ID: bs.bsId,
            BS_Name: bs.bsName,
            CollectionDate: bs.collectionDate,
            Status: bs.bioSampleStatus?.id,
            BQS_ID: bs.qualityStatus?.id,
            Note: bs.note,
          }))
        );
      }
    });
  }, [tpId]);

  useEffect(() => {
    if (!tpId) return;
    // Fetch feedbacks từ API getTreatmentDetail (đã có trong phần fetchData)
    // Feedbacks sẽ được set trong fetchData từ apiData.feedbacks
  }, [tpId]);

  const getFeedbackTargets = () => {
    if (!treatmentPlan) return [];

    const doctorSet = new Set();
    const doctorTargets = [];

    // ✅ Bác sĩ chính
    if (treatmentPlan.doctor?.docId) {
      doctorTargets.push({
        docId: treatmentPlan.doctor.docId,
        fullName: treatmentPlan.doctor.acc?.fullName || "Không rõ tên",
        type: "main-doctor",
      });
    }

    // ✅ Bác sĩ phụ trong stepDetails (khác với bác sĩ chính)
    treatmentPlan.stepDetails.forEach((step) => {
      const stepDoc = step.doc;
      if (
        stepDoc?.docId &&
        stepDoc.docId !== treatmentPlan.doctor?.docId &&
        !doctorSet.has(stepDoc.docId)
      ) {
        doctorSet.add(stepDoc.docId);
        doctorTargets.push({
          docId: stepDoc.docId,
          fullName: stepDoc.fullName || "Không rõ tên",
          stepName: step.Step_Name,
          type: "step-doctor",
        });
      }
    });

    return [{ docId: null, type: "service" }, ...doctorTargets];
  };

  const renderFeedbackForm = () => {
    const targets = getFeedbackTargets();

    const handleStarChange = (value, docId) => {
      setFeedbackData((prev) => ({
        ...prev,
        [docId || "service"]: {
          ...prev[docId || "service"],
          star: value,
        },
      }));
    };

    const handleContentChange = (e, docId) => {
      setFeedbackData((prev) => ({
        ...prev,
        [docId || "service"]: {
          ...prev[docId || "service"],
          content: e.target.value,
        },
      }));
    };

    const handleSubmit = async () => {
      try {
        const promises = [];

        // Gửi feedback cho dịch vụ
        if (feedbackData.service?.star && feedbackData.service?.content) {
          const serviceFeedback = {
            tpId: tpId,
            docId: treatmentPlan.doctor?.docId || 0, // Lấy docId từ treatmentPlan
            star: feedbackData.service.star,
            content: feedbackData.service.content,
          };
          promises.push(feedbackForTreatmentPlan(serviceFeedback));
        }

        // Gửi feedback cho từng bác sĩ
        targets.forEach((target) => {
          if (
            target.docId &&
            feedbackData[target.docId]?.star &&
            feedbackData[target.docId]?.content
          ) {
            const doctorFeedback = {
              docId: target.docId,
              star: feedbackData[target.docId].star,
              content: feedbackData[target.docId].content,
            };
            promises.push(feedBackForDoctor(doctorFeedback));
          }
        });

        if (promises.length > 0) {
          await Promise.all(promises);
          message.success("💖 Cảm ơn bạn đã gửi đánh giá!");
          setShowFeedbackForm(false);
          setFeedbackData({});
        } else {
          message.warning("Vui lòng nhập đánh giá trước khi gửi!");
        }
      } catch (error) {
        console.error("Lỗi khi gửi feedback:", error);
        message.error("Có lỗi xảy ra khi gửi đánh giá!");
      }
    };
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card
          title={
            <Title level={4} style={{ color: "#d4376e" }}>
              Trung tâm luôn trân trọng mọi ý kiến đóng góp từ bạn – giúp cải
              thiện chất lượng điều trị từng ngày 💖
            </Title>
          }
          extra={
            <Button
              onClick={() => setShowFeedbackForm(false)}
              style={{
                backgroundColor: "#f78db3",
                color: "white",
                border: "none",
              }}
            >
              Bỏ qua đánh giá
            </Button>
          }
          style={{
            background: "rgba(255, 240, 245, 0.4)",
            backdropFilter: "blur(16px)",
            border: "1px solid #ffd6e5",
            borderRadius: 20,
            boxShadow: "0 12px 40px rgba(247, 141, 179, 0.3)",
            padding: 24,
          }}
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {targets.map(({ docId, type, fullName, stepName }) => (
              <motion.div
                key={docId ?? "service"}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card
                  size="small"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    border: "1px solid #fcd4de",
                    borderRadius: 18,
                    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                    padding: 20,
                  }}
                >
                  <Title
                    level={5}
                    style={{ marginBottom: 8, color: "#d4376e" }}
                  >
                    {type === "service" &&
                      "🏥 Dịch vụ điều trị & Cơ sở vật chất"}
                    {type === "main-doctor" &&
                      `🧑‍⚕️ BS.${fullName} (bác sĩ phụ trách chính)`}
                    {type === "step-doctor" &&
                      `🧑‍⚕️ BS.${fullName} (bác sĩ phụ trách: ${stepName})`}
                  </Title>

                  <Rate
                    value={feedbackData[docId || "service"]?.star || 0}
                    onChange={(value) => handleStarChange(value, docId)}
                    style={{ fontSize: 22, color: "#ee4d2d" }}
                  />

                  <Input.TextArea
                    rows={3}
                    placeholder="Chia sẻ cảm nhận chân thực của bạn..."
                    value={feedbackData[docId || "service"]?.content || ""}
                    onChange={(e) => handleContentChange(e, docId)}
                    style={{
                      marginTop: 12,
                      borderRadius: 12,
                      border: "1px solid #ffd6e5",
                      backgroundColor: "#fffafc",
                      resize: "none",
                      fontStyle: "italic",
                    }}
                  />
                </Card>
              </motion.div>
            ))}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="primary"
                onClick={handleSubmit}
                style={{
                  alignSelf: "flex-end",
                  background: "linear-gradient(to right, #ff9eb5, #f78db3)",
                  border: "none",
                  fontWeight: "bold",
                  padding: "12px 28px",
                  fontSize: 16,
                  borderRadius: 14,
                  boxShadow: "0 6px 18px rgba(247, 141, 179, 0.4)",
                }}
              >
                💖 Gửi đánh giá
              </Button>
            </motion.div>
          </Space>
        </Card>
      </motion.div>
    );
  };

  const getStatusTag = (status) => {
    switch (status) {
      case 1:
        return <Tag color="blue">Đang điều trị</Tag>;
      case 2:
        return <Tag color="green">Thành công</Tag>;
      case 3:
        return <Tag color="red">Thất bại</Tag>;
      case 4:
        return <Tag color="red">Đã hủy</Tag>;
      default:
        return <Tag>Không xác định</Tag>;
    }
  };

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!treatmentPlan) return null;

  return (
    <Layout style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      <Content style={{ padding: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >
          <div style={{ flex: 1 }}>
            <Button
              icon={<ArrowLeftOutlined />}
              style={{
                backgroundColor: "#f78db3",
                color: "white",
                border: "none",
              }}
              onClick={() => navigate(-1)}
            >
              Quay lại
            </Button>
          </div>

          <div style={{ flex: 1, textAlign: "center" }}>
            <Title level={3} style={{ margin: 0, color: "#d4376e" }}>
              Chi tiết hồ sơ bệnh án
            </Title>
          </div>

          <div style={{ flex: 1 }}></div>
        </div>
        {showFeedbackForm ? (
          renderFeedbackForm()
        ) : (
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Card
              title={<Text strong>Tổng quan hồ sơ bệnh án</Text>}
              bodyStyle={{ backgroundColor: "#fff0f5", padding: 16 }}
              size="small"
            >
              <Row gutter={[12, 8]}>
                <Col span={8}>
                  <Text strong>Ngày bắt đầu:</Text>
                  <br />
                  <Text>{treatmentPlan.StartDate}</Text>
                </Col>
                {treatmentPlan.EndDate && (
                  <Col span={8}>
                    <Text strong>Ngày kết thúc:</Text>
                    <br />
                    <Text>{treatmentPlan.EndDate}</Text>
                  </Col>
                )}
                <Col span={8}>
                  <Text strong>Trạng thái:</Text>
                  <br />
                  {getStatusTag(treatmentPlan.Status)}
                </Col>
                <Col span={12}>
                  <Text strong>Dịch vụ điều trị:</Text>
                  <br />
                  <Text>{treatmentPlan.service?.Ser_Name}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Ghi chú:</Text>
                  <br />
                  <Text>{treatmentPlan.Result}</Text>
                </Col>
              </Row>
            </Card>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Card
                  title={
                    <Text strong style={{ fontSize: "14px" }}>
                      <UserOutlined /> Thông tin khách hàng
                    </Text>
                  }
                  bodyStyle={{
                    backgroundColor: "#fde7ef",
                    padding: 12,
                    height: "120px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  size="small"
                >
                  <Row gutter={[8, 4]}>
                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        Chồng:
                      </Text>{" "}
                      <Text style={{ fontSize: "13px" }}>
                        {treatmentPlan.customer?.Hus_Name}
                      </Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: "11px" }}>
                        ({treatmentPlan.customer?.Hus_YOB})
                      </Text>
                    </Col>
                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        Vợ:
                      </Text>{" "}
                      <Text style={{ fontSize: "13px" }}>
                        {treatmentPlan.customer?.Wife_Name}
                      </Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: "11px" }}>
                        ({treatmentPlan.customer?.Wife_YOB})
                      </Text>
                    </Col>
                  </Row>
                  <div style={{ fontSize: "12px", lineHeight: "1.5" }}>
                    <UserOutlined style={{ marginRight: 4 }} />
                    {treatmentPlan.customer?.acc?.fullName}
                    <br />
                    <MailOutlined style={{ marginRight: 4 }} />
                    {treatmentPlan.customer?.acc?.mail}
                    <br />
                    <PhoneOutlined style={{ marginRight: 4 }} />
                    {treatmentPlan.customer?.acc?.phone}
                  </div>
                </Card>
              </Col>
              <Col xs={24} md={12}>
                <Card
                  title={
                    <Text strong style={{ fontSize: "14px" }}>
                      Bác sĩ phụ trách
                    </Text>
                  }
                  extra={
                    <Button
                      shape="circle"
                      icon={<InfoCircleOutlined />}
                      size="small"
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
                  bodyStyle={{
                    backgroundColor: "#fce6ec",
                    padding: 12,
                    height: "120px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                  size="small"
                >
                  <div style={{ fontSize: "12px", lineHeight: "1.5" }}>
                    <Text strong style={{ fontSize: "13px" }}>
                      {treatmentPlan.doctor?.acc?.fullName}
                    </Text>
                    <br />
                    <MailOutlined style={{ marginRight: 4 }} />
                    {treatmentPlan.doctor?.acc?.mail}
                    <br />
                    <PhoneOutlined style={{ marginRight: 4 }} />
                    {treatmentPlan.doctor?.acc?.phone}
                  </div>
                </Card>
              </Col>
            </Row>

            <Tabs
              defaultActiveKey="process"
              type="card"
              size="middle"
              style={{ backgroundColor: "white", padding: 8, borderRadius: 12 }}
              tabBarGutter={12}
              items={[
                {
                  key: "process",
                  label: "Quá trình điều trị",
                  children: (
                    <Card
                      title="Quá trình điều trị"
                      bodyStyle={{ backgroundColor: "#fff7fa", padding: 16 }}
                      size="small"
                    >
                      <div style={{ maxHeight: 200, overflowY: "auto" }}>
                        <Space
                          direction="vertical"
                          size="small"
                          style={{ width: "100%" }}
                        >
                          {treatmentPlan.stepDetails.map((step) => (
                            <Card
                              key={step.SD_ID}
                              type="inner"
                              style={{
                                borderLeft: "3px solid #f78db3",
                                padding: 8,
                              }}
                              size="small"
                            >
                              <Row justify="space-between" align="middle">
                                <Col flex="auto">
                                  <Text strong style={{ fontSize: "14px" }}>
                                    {step.Step_Name}
                                  </Text>
                                  <br />
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: "12px" }}
                                  >
                                    Ngày: {step.PlanDate} | BS:{" "}
                                    {step.doc?.fullName}
                                  </Text>
                                </Col>
                                <Col>
                                  <Link
                                    onClick={() =>
                                      navigate(`/stepdetail/${step.SD_ID}`)
                                    }
                                    style={{
                                      color: "#f78db3",
                                      fontSize: "12px",
                                    }}
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
                  ),
                },
                tests.length > 0 && {
                  key: "tests",
                  label: "Xét nghiệm",
                  children: (
                    <Card
                      title="Danh sách xét nghiệm"
                      bodyStyle={{ backgroundColor: "#fef2f6", padding: 16 }}
                      size="small"
                    >
                      <div style={{ maxHeight: 160, overflowY: "auto" }}>
                        <Space
                          direction="vertical"
                          size="small"
                          style={{ width: "100%" }}
                        >
                          {tests.map((test) => (
                            <Card
                              key={test.Test_ID}
                              type="inner"
                              style={{
                                borderLeft: "3px solid #f78db3",
                                padding: 8,
                              }}
                              size="small"
                            >
                              <Row justify="space-between" align="middle">
                                <Col flex="auto">
                                  <Text strong style={{ fontSize: "14px" }}>
                                    {TEST_TYPE_MAP[test.TestType_ID] ||
                                      "Không rõ"}
                                  </Text>
                                  <br />
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: "12px" }}
                                  >
                                    {test.TestDate} | {test.Person} |{" "}
                                    {TEST_STATUS[test.Status]} |{" "}
                                    {TEST_QUALITY_RESULT_STATUS[test.TQS_ID]}
                                  </Text>
                                </Col>
                                <Col>
                                  <Link
                                    style={{
                                      color: "#f78db3",
                                      fontSize: "12px",
                                    }}
                                    onClick={() =>
                                      navigate(`/testdetail/${test.Test_ID}`)
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
                  ),
                },
                biosamples.length > 0 && {
                  key: "biosamples",
                  label: "Mẫu sinh học",
                  children: (
                    <Card
                      title="Danh sách mẫu sinh học"
                      bodyStyle={{ backgroundColor: "#fff0f5", padding: 16 }}
                      size="small"
                    >
                      <div style={{ maxHeight: 160, overflowY: "auto" }}>
                        <Space
                          direction="vertical"
                          size="small"
                          style={{ width: "100%" }}
                        >
                          {biosamples.map((bs) => (
                            <Card
                              key={bs.BS_ID}
                              type="inner"
                              style={{
                                borderLeft: "3px solid #f78db3",
                                padding: 8,
                              }}
                              size="small"
                            >
                              <Row justify="space-between" align="middle">
                                <Col flex="auto">
                                  <Text strong style={{ fontSize: "14px" }}>
                                    {bs.BS_Name}
                                  </Text>
                                  <br />
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: "12px" }}
                                  >
                                    {bs.CollectionDate} |{" "}
                                    {BIO_SAMPLE_STATUS[bs.Status]} |{" "}
                                    {BIO_QUALITY_STATUS[bs.BQS_ID]}
                                  </Text>
                                </Col>
                                <Col>
                                  <Link
                                    style={{
                                      color: "#f78db3",
                                      fontSize: "12px",
                                    }}
                                    onClick={() =>
                                      navigate(`/biosampledetail/${bs.BS_ID}`)
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
                  ),
                },
                feedbacks.length > 0 && {
                  key: "feedbacks",
                  label: `Phản hồi (${feedbacks.length})`,
                  children: (
                    <Card
                      title="Phản hồi từ khách hàng"
                      bodyStyle={{ backgroundColor: "#fff0f5", padding: 16 }}
                    >
                      <Space
                        direction="vertical"
                        size="small"
                        style={{ width: "100%" }}
                      >
                        {feedbacks.map((fb) => (
                          <Card
                            key={fb.fbId}
                            type="inner"
                            size="small"
                            style={{ borderLeft: "3px solid #f78db3" }}
                          >
                            <Row justify="space-between">
                              <Col>
                                <Text strong style={{ fontSize: 14 }}>
                                  {fb.doctorName
                                    ? `BS. ${fb.doctorName}`
                                    : "Dịch vụ"}
                                </Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                  Ngày đánh giá:{" "}
                                  {dayjs(fb.createAt).format("DD/MM/YYYY")}
                                </Text>
                              </Col>
                              <Col>
                                <Rate disabled value={fb.star} />
                              </Col>
                            </Row>
                            <Divider style={{ margin: "8px 0" }} />
                            <Text>{fb.content}</Text>
                          </Card>
                        ))}
                      </Space>
                    </Card>
                  ),
                },
              ].filter(Boolean)}
            />
          </Space>
        )}
      </Content>
    </Layout>
  );
}
