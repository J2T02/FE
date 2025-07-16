// File: pages/ReceptionistPage/TestListPage.jsx
import React, { useEffect, useState } from "react";
import { Layout, Typography, Card, Row, Col, Space, Button, Tag } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { getTestByTreatmentPlanId } from "../../../../apis/testService";
const { Content } = Layout;
const { Title, Text } = Typography;

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

export default function TestListPage() {
  const { id } = useParams();
  const tpId = parseInt(id);
  const navigate = useNavigate();

  const [tests, setTests] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await getTestByTreatmentPlanId(tpId);
        if (res?.data?.success && Array.isArray(res.data.data)) {
          // Map API data to UI format
          const mapped = res.data.data.map((test) => ({
            Test_ID: test.testId,
            TestType_ID: test.testType?.id,
            TestType_Name: test.testType?.testName,
            TestDate: test.testDate,
            Status: test.status?.id,
            StatusName: test.status?.name,
            Person:
              test.testType?.person === "wife"
                ? "Vợ"
                : test.testType?.person === "husband"
                ? "Chồng"
                : test.testType?.person,
            TQS_ID: test.testQualityStatus?.id,
            TQS_Name: test.testQualityStatus?.name,
            SD_ID: test.stepDetail?.sdId,
            Step_Name: test.stepDetail?.stepName,
            Doctor:
              test.stepDetail?.docInfo?.accountInfo?.fullName || "Chưa rõ",
            Note: test.note,
          }));
          setTests(mapped);
        } else {
          setTests([]);
        }
      } catch (err) {
        setTests([]);
      }
    };
    fetchTests();
  }, [tpId]);

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

        <Title level={3}>Danh sách các xét nghiệm</Title>
        <Text style={{ color: "#f78db3", fontWeight: 500 }}>
          Mã hồ sơ: {tpId}
        </Text>

        <Space direction="vertical" style={{ width: "100%", marginTop: 24 }}>
          {tests.map((test) => (
            <Card
              key={test.Test_ID}
              type="inner"
              style={{ borderLeft: "5px solid #f78db3" }}
            >
              <Row justify="space-between">
                <Col>
                  <Text strong>Loại xét nghiệm: </Text>
                  {test.TestType_Name ||
                    TEST_TYPE_MAP[test.TestType_ID] ||
                    "Không rõ"}
                  <br />
                  <Text strong>Ngày xét nghiệm: </Text>
                  {test.TestDate}
                  <br />
                  <Text strong>Người xét nghiệm: </Text>
                  {test.Person || "-"}
                  <br />
                  <Text strong>Trạng thái: </Text>
                  {test.StatusName ||
                    TEST_STATUS[test.Status] ||
                    "Không xác định"}
                  <br />
                  <Text strong>Tình trạng kết quả: </Text>
                  {test.TQS_Name ||
                    TEST_QUALITY_RESULT_STATUS[test.TQS_ID] ||
                    "Chưa có"}
                  <br />
                  <Text strong>Bước điều trị: </Text>
                  {test.Step_Name || "-"}
                  <br />
                  <Text strong>Bác sĩ: </Text>
                  {test.Doctor || "-"}
                  <br />
                  {test.Note && (
                    <>
                      <Text strong>Ghi chú: </Text>
                      {test.Note}
                      <br />
                    </>
                  )}
                </Col>
                <Col>
                  <Button
                    type="link"
                    style={{ color: "#f78db3" }}
                    onClick={() =>
                      navigate(`/doctorpage/testdetail/${test.Test_ID}`)
                    }
                  >
                    Xem chi tiết
                  </Button>
                </Col>
              </Row>
            </Card>
          ))}
        </Space>
      </Content>
    </Layout>
  );
}
