// ... giữ nguyên import ban đầu
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
  message,
  Tabs,
} from "antd";
import {
  ArrowLeftOutlined,
  InfoCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import TreatmentProcessCard from "./components/TreatmentProcessCard"; // ✅ Import
import TreatmentOverviewCard from "./components/TreatmentOverviewCard";
import { getTreatmentDetail } from "../../../../apis/treatmentService";
import { getTestByTreatmentPlanId } from "../../../../apis/testService";
import { getBioSampleByPlanId } from "../../../../apis/bioSampleService";
import TestListCard from "./components/TestListCard";
import BioSampleListCard from "./components/BioSampleListCard";

const { Content } = Layout;
const { Title, Text, Link } = Typography;

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

export default function TreatmentPlanDetailPage({
  tpId: propTPId,
  onBack,
  embedded = false,
}) {
  const params = useParams();
  const tpId = propTPId ?? parseInt(params?.id);
  const navigate = useNavigate();

  const [treatmentPlan, setTreatmentPlan] = useState(null);
  const [biosamples, setBiosamples] = useState([]);
  const [tests, setTests] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getTreatmentDetail(tpId);

      if (response.data.success) {
        const apiData = response.data.data;

        // Map API data to match existing UI structure
        const mappedTreatmentPlan = {
          TP_ID: apiData.tpId,
          StartDate: apiData.startDate,
          EndDate: apiData.endDate,
          Status: apiData.status.statusId,
          StatusName: apiData.status.statusName,
          Result: apiData?.result || "",
          service: {
            Ser_ID: apiData.serviceInfo.serId,
            Ser_Name: apiData.serviceInfo.serName,
          },
          customer: {
            Hus_Name: apiData.cusInfo.husName,
            Wife_Name: apiData.cusInfo.wifeName,
            Hus_YOB: apiData.cusInfo.husYob,
            Wife_YOB: apiData.cusInfo.wifeYob,
            acc: {
              fullName: apiData?.cusInfo?.accInfo?.fullName, // Keep mock data as API doesn't provide this
              mail: apiData?.cusInfo?.accInfo?.mail, // Keep mock data
              phone: apiData?.cusInfo?.accInfo?.phone, // Keep mock data
            },
          },
          doctor: {
            docId: apiData.doctorInfo.docId,
            acc: {
              fullName: apiData.doctorInfo.accountInfo.fullName,
              phone: apiData.doctorInfo.accountInfo.phone,
              mail: apiData.doctorInfo.accountInfo.mail,
            },
          },
          stepDetails: Array.isArray(apiData.stepDetails)
            ? apiData.stepDetails.map((step, idx) => ({
                SD_ID: step.sdId || idx + 1,
                TS_ID: step.tsId,
                Step_Name: step.stepName,
                PlanDate: step.planDate,
                doc: { fullName: step.doctorName },
              }))
            : [],
          Feedback: apiData.feedback || "",
        };

        mappedTreatmentPlan.stepDetails.sort(
          (a, b) => new Date(b.PlanDate) - new Date(a.PlanDate)
        );
        setTreatmentPlan(mappedTreatmentPlan);

        // Map feedbacks từ API
        if (apiData.feedbacks && Array.isArray(apiData.feedbacks)) {
          const mappedFeedbacks = apiData.feedbacks.map((fb) => ({
            fbId: fb.treatmentPlanId, // Sử dụng treatmentPlanId làm fbId
            docId: fb.doctorId,
            doctorName: apiData.doctorInfo.accountInfo.fullName, // Lấy tên bác sĩ từ doctorInfo
            star: fb.star,
            createAt: fb.createAt,
            content: fb.content,
            customerName: `Gia đình anh ${fb.cus?.husName} và chị ${fb.cus?.wifeName}`,
          }));
          setFeedbacks(mappedFeedbacks);
        } else {
          setFeedbacks([]);
        }

        // Lấy danh sách mẫu sinh học từ API
        const bioSampleRes = await getBioSampleByPlanId(tpId);
        if (
          bioSampleRes?.data?.success &&
          Array.isArray(bioSampleRes.data.data)
        ) {
          const mappedBiosamples = bioSampleRes.data.data.map((bs) => ({
            BS_ID: bs.bsId,
            BS_Name: bs.bsName,
            CollectionDate: bs.collectionDate,
            Status: bs.bioSampleStatus?.id,
            StatusName: bs.bioSampleStatus?.name,
            BQS_ID: bs.qualityStatus?.id,
            BQS_Name: bs.qualityStatus?.name,
            BioType: bs.bioType?.name,
            StorageLocation: bs.storageLocation,
            Note: bs.note,
          }));
          setBiosamples(mappedBiosamples);
        } else {
          setBiosamples([]);
        }

        // Lấy danh sách xét nghiệm từ API mới
        const testRes = await getTestByTreatmentPlanId(tpId);
        if (testRes?.data?.success && Array.isArray(testRes.data.data)) {
          const mappedTests = testRes.data.data.map((test) => ({
            Test_ID: test.testId,
            TestType_ID: test.testType?.id,
            TestType_Name: test.testType?.testName,
            TestDate: test.testDate,
            Person: test.testType?.person,
            Status: test.status?.id,
            StatusName: test.status?.name,
            TQS_ID: test.testQualityStatus?.id,
            TQS_Name: test.testQualityStatus?.name,
            StepDetail: test.stepDetail,
            Note: test.note,
          }));
          setTests(mappedTests);
        } else {
          setTests([]);
        }
      } else {
        message.error("Không thể tải thông tin hồ sơ bệnh án");
      }
    } catch (error) {
      console.error("Error fetching treatment plan:", error);
      // message.error("Có lỗi xảy ra khi tải thông tin hồ sơ bệnh án");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tpId]);

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

  if (loading) {
    return (
      <Layout style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
        <Content
          style={{
            padding: 24,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>Đang tải...</div>
        </Content>
      </Layout>
    );
  }

  if (!treatmentPlan) return null;
  const tabItems = [
    {
      key: "process",
      label: "Quá trình điều trị",
      children: (
        <TreatmentProcessCard
          tpId={treatmentPlan.TP_ID}
          stepDetails={treatmentPlan.stepDetails}
          doctorId={treatmentPlan.doctor?.docId}
          serviceId={treatmentPlan.service?.Ser_ID}
          latestTSID={treatmentPlan.stepDetails?.[0]?.TS_ID}
          onRefresh={fetchData}
        />
      ),
    },
  ];

  if (tests.length > 0) {
    tabItems.push({
      key: "tests",
      label: "Xét nghiệm",
      children: <TestListCard tests={tests} tpId={tpId} />,
    });
  }

  if (biosamples.length > 0) {
    tabItems.push({
      key: "biosamples",
      label: "Mẫu sinh học",
      children: <BioSampleListCard biosamples={biosamples} tpId={tpId} />,
    });
  }

  if (feedbacks.length > 0) {
    tabItems.push({
      key: "feedback",
      label: "Phản hồi",
      children: (
        <Space direction="vertical" style={{ width: "100%" }}>
          {feedbacks.map((fb) => (
            <Card
              key={fb.fbId}
              title={
                <Space>
                  <Text strong>Đánh giá:</Text>
                  <span>
                    {Array.from({ length: fb.star }).map((_, idx) => (
                      <span key={idx}>⭐</span>
                    ))}
                  </span>
                </Space>
              }
              extra={
                <Text type="secondary">
                  Ngày đánh giá:{" "}
                  {new Date(fb.createAt).toLocaleDateString("vi-VN")}
                </Text>
              }
              bodyStyle={{ backgroundColor: "#fff0f5" }}
            >
              <p>{fb.content}</p>
              <div style={{ marginTop: 8 }}>
                <Text type="secondary">
                  <strong>Khách hàng:</strong> {fb.customerName}
                </Text>
                <br />
                {fb.docId && fb.doctorName && (
                  <Text type="secondary">
                    <strong>Phản hồi về bác sĩ:</strong> {fb.doctorName}
                  </Text>
                )}
              </div>
            </Card>
          ))}
        </Space>
      ),
    });
  }

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
          onClick={() => {
            if (embedded && typeof onBack === "function") {
              onBack();
            } else {
              navigate(-1);
            }
          }}
        >
          Quay lại
        </Button>

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Title level={3}>Chi tiết hồ sơ bệnh án</Title>
          <Text style={{ color: "#f78db3", fontWeight: 500 }}>
            Mã hồ sơ: {treatmentPlan.TP_ID}
          </Text>

          {/* Tổng quan */}
          <Card
            title={<Text strong>Tổng quan hồ sơ bệnh án</Text>}
            bodyStyle={{ backgroundColor: "#fff0f5" }}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <TreatmentOverviewCard
                  treatmentPlan={treatmentPlan}
                  onUpdate={fetchData}
                />
              </Col>
            </Row>
          </Card>

          {/* Thông tin khách hàng & bác sĩ */}
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
          <Tabs defaultActiveKey="process" items={tabItems} />
        </Space>
      </Content>
    </Layout>
  );
}
