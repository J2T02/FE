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

export default function TreatmentPlanDetailPage({ tpId: propTPId, onBack, embedded = false }) {
  const params = useParams();
  const tpId = propTPId ?? parseInt(params?.id);
  const navigate = useNavigate();

  const [treatmentPlan, setTreatmentPlan] = useState(null);
  const [biosamples, setBiosamples] = useState([]);
  const [tests, setTests] = useState([]);
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
        };

        mappedTreatmentPlan.stepDetails.sort(
          (a, b) => new Date(b.PlanDate) - new Date(a.PlanDate)
        );
        setTreatmentPlan(mappedTreatmentPlan);

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

          {/* ✅ Quá trình điều trị */}
          <TreatmentProcessCard
            tpId={treatmentPlan.TP_ID}
            stepDetails={treatmentPlan.stepDetails}
            doctorId={treatmentPlan.doctor?.docId}
            serviceId={treatmentPlan.service?.Ser_ID}
            latestTSID={treatmentPlan.stepDetails?.[0]?.TS_ID} // ✅ bổ sung TS_ID mới nhất
            onRefresh={fetchData}
          />

          {/* ✅ Xét nghiệm */}
          {tests.length > 0 && (
            <Card
              title={
                <Space>
                  <Text strong>Danh sách xét nghiệm</Text>
                  <Link
                    style={{ color: "#f78db3" }}
                    onClick={() => navigate(`/doctorpage/testlist/${tpId}`)}
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
                          {test.TestType_Name || "Không rõ"}
                          <br />
                          <Text strong>Ngày xét nghiệm: </Text>
                          {test.TestDate}
                          <br />
                          <Text strong>Người xét nghiệm: </Text>
                          {test.Person}
                          <br />
                          <Text strong>Trạng thái: </Text>
                          {test.StatusName || "Không xác định"}
                          <br />
                          <Text strong>Tình trạng kết quả: </Text>
                          {test.TQS_Name || "Chưa có"}
                        </Col>
                        <Col>
                          <Link
                            style={{ color: "#f78db3" }}
                            onClick={() =>
                              navigate(`/doctorpage/testdetail/${test.Test_ID}`)
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

          {/* ✅ Mẫu sinh học */}
          {biosamples.length > 0 && (
            <Card
              title={
                <Space>
                  <Text strong>Danh sách mẫu sinh học</Text>
                  <Link
                    style={{ color: "#f78db3" }}
                    onClick={() =>
                      navigate(`/doctorpage/biosamplelist/${tpId}`)
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
                          <Text strong>Loại mẫu: </Text>
                          {bs.BioType || "Không xác định"}
                          <br />
                          <Text strong>Ngày thu thập: </Text>
                          {bs.CollectionDate}
                          <br />
                          <Text strong>Vị trí lưu trữ: </Text>
                          {bs.StorageLocation || "Chưa cập nhật"}
                          <br />
                          <Text strong>Trạng thái: </Text>
                          {bs.StatusName ||
                            BIO_SAMPLE_STATUS[bs.Status] ||
                            "Không xác định"}
                          <br />
                          <Text strong>Chất lượng: </Text>
                          {bs.BQS_Name ||
                            BIO_QUALITY_STATUS[bs.BQS_ID] ||
                            "Chưa đánh giá"}
                          <br />
                          {bs.Note && (
                            <>
                              <Text strong>Ghi chú: </Text>
                              {bs.Note}
                              <br />
                            </>
                          )}
                        </Col>
                        <Col>
                          <Link
                            style={{ color: "#f78db3" }}
                            onClick={() =>
                              navigate(
                                `/doctorpage/biosampledetail/${bs.BS_ID}`
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
