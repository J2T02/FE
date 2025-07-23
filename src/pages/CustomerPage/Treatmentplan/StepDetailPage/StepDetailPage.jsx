import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Typography, Card, Button, Row, Col, Space, Tag } from "antd";
import {
  ArrowLeftOutlined,
  MailOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { getStepDetailDetail } from "../../../../apis/stepDetailService";
import { getTestByStepDetailId } from "../../../../apis/testService";
import { getBioSampleByStepDetailId } from "../../../../apis/bioSampleService";
const { Content } = Layout;
const { Title, Text, Link } = Typography;

export default function StepDetailPage() {
  const { id } = useParams();
  const stepId = parseInt(id);
  const navigate = useNavigate();

  const [stepDetail, setStepDetail] = useState(null);
  const [tests, setTests] = useState([]);
  const [biosamples, setBiosamples] = useState([]);
  const [doctorSlot, setDoctorSlot] = useState(null);

  useEffect(() => {
    getStepDetailDetail(stepId).then((res) => {
      if (res && res.data && res.data.success && res.data.data) {
        const d = res.data.data;
        setStepDetail({
          SD_ID: d.sdId,
          Step_Name: d.stepName,
          Note: d.note,
          Status: d.status?.statusId,
          StatusName: d.status?.statusName,
          Drug_Name: d.drugName,
          Dosage: d.dosage,
          treatmentStep: {
            Step_Name: d.treatmentStepInfo?.stepName,
            StatusName: d.treatmentStepInfo?.statusName,
          },
          doctor: {
            docId: d.doctorInfo?.docId,
            acc: d.doctorInfo?.accountInfo,
          },
        });
        setDoctorSlot({
          WorkDate: d.docSchedule?.workDate,
          Slot_ID: d.docSchedule?.slotId,
          slotStar: d.docSchedule?.slotStart,
          slotEnd: d.docSchedule?.slotEnd,
        });
      }
    });
    getTestByStepDetailId(stepId).then((res) => {
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
            ResultDay: test.resultDate,
            Note: test.note,
          }))
        );
      }
    });
    getBioSampleByStepDetailId(stepId).then((res) => {
      if (res && res.data && res.data.success && Array.isArray(res.data.data)) {
        setBiosamples(
          res.data.data.map((bs) => ({
            BS_ID: bs.bsId,
            BS_Name: bs.bsName,
            CollectionDate: bs.collectionDate,
            Status: bs.bioSampleStatus?.id,
            BQS_ID: bs.qualityStatus?.id,
            Note: bs.note,
            StorageLocation: bs.storageLocation,
          }))
        );
      }
    });
  }, [stepId]);

  const getStatusTag = (status) => {
    switch (status) {
      case 1:
        return <Tag color="blue">Chưa thực hiện</Tag>;
      case 2:
        return <Tag color="green">Hoàn thành</Tag>;
      case 3:
        return <Tag color="red">Đã hủy</Tag>;
      default:
        return <Tag>Mới</Tag>;
    }
  };

  if (!stepDetail) return null;
  // console.log(stepDetail);
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
              {stepDetail.treatmentStep?.StatusName && (
                <span style={{ marginLeft: 8, color: "#888" }}>
                  ({stepDetail.treatmentStep.StatusName})
                </span>
              )}
            </Col>

            <Col span={12}>
              <Text strong>Ngày hẹn:</Text>
              <br />
              <Text>{doctorSlot?.WorkDate}</Text>
            </Col>

            <Col span={12}>
              <Text strong>Thời gian:</Text>
              <br />
              <Text>{doctorSlot?.slotStar + "-" + doctorSlot?.slotEnd}</Text>
            </Col>

            <Col span={24}>
              <Text strong>Ghi chú:</Text>
              <br />
              <Text>{stepDetail.Note}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Thuốc:</Text>
              <br />
              <Text>{stepDetail.Drug_Name}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Liều lượng:</Text>
              <br />
              <Text>{stepDetail.Dosage}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Trạng thái:</Text>
              <br />
              {getStatusTag(stepDetail.Status)}
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

        {tests.length > 0 && (
          <Card
            title="Danh sách xét nghiệm liên quan"
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
                        <Text strong>Ngày xét nghiệm: </Text>
                        {test.TestDate}
                        <br />
                        <Text strong>Ngày trả kết quả: </Text>
                        {test.ResultDay}
                        <br />
                        <Text strong>Ghi chú: </Text>
                        {test.Note}
                      </Col>
                      <Col>
                        <Link
                          style={{ color: "#f78db3" }}
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
        )}

        {biosamples.length > 0 && (
          <Card
            title={
              <Space>
                <Text strong>Danh sách mẫu sinh học liên quan</Text>
              </Space>
            }
            style={{ marginTop: 24 }}
            bodyStyle={{ backgroundColor: "#fff0f5" }}
          >
            <div style={{ maxHeight: 200, overflowY: "auto" }}>
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
                        <Text strong>Vị trí lưu trữ: </Text>
                        {bs.StorageLocation}
                        <br />
                        <Text strong>Ghi chú: </Text>
                        {bs.Note}
                      </Col>
                      <Col>
                        <Link
                          style={{ color: "#f78db3" }}
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
        )}
      </Content>
    </Layout>
  );
}
