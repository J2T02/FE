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
  Modal,
  Select,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  MailOutlined,
  PhoneOutlined,
  InfoCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";

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
  const [doctorSlot, setDoctorSlot] = useState(null);
  const [doctorOptions, setDoctorOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);

  useEffect(() => {
    const mockStepDetail = {
      SD_ID: stepId,
      Step_Name: "Khám tổng quát",
      Note: "Bệnh nhân có dấu hiệu ổn định",
      Status: 1,
      Drug_Name: "Vitamin E",
      Dosage: "1 viên/ngày",
      DS_ID: 10,
      treatmentStep: {
        Step_Name: "Giai đoạn đầu kiểm tra sức khỏe",
      },
      doctor: {
        docId: 301,
        acc: {
          fullName: "BS. Lê Văn C",
          phone: "0901234567",
          mail: "levanc@example.com",
        },
      },
    };

    const mockDoctorSchedule = {
      DS_ID: 10,
      WorkDate: "2025-07-08",
      Slot: {
        Slot_ID: 3,
        Slot_Start: "08:00",
      },
    };

    const mockTests = [
      {
        Test_ID: 1,
        TestDate: "2025-07-08",
        Note: "Xét nghiệm máu tổng quát",
        ResultDay: "2025-07-09",
      },
      {
        Test_ID: 2,
        TestDate: "2025-07-08",
        Note: "Xét nghiệm nội tiết tố",
        ResultDay: "2025-07-10",
      },
    ];

    const mockBiosamples = [
      {
        BS_ID: 1,
        BS_Name: "Mẫu máu bệnh nhân",
        CollectionDate: "2025-07-08",
        StorageLocation: "Tủ A - Ngăn 2",
        Note: "Mẫu đạt tiêu chuẩn",
      },
      {
        BS_ID: 2,
        BS_Name: "Tinh dịch",
        CollectionDate: "2025-07-08",
        StorageLocation: "Tủ B - Ngăn 1",
        Note: "Mẫu hơi loãng",
      },
    ];

    setStepDetail(mockStepDetail);
    setDoctorSlot(mockDoctorSchedule);
    setTests(mockTests);
    setBiosamples(mockBiosamples);
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

  const fetchAvailableDoctors = () => {
    const { WorkDate, Slot } = doctorSlot;
    const mockAvailableDoctors = [
      { docId: 301, fullName: "BS. Lê Văn C" },
      { docId: 302, fullName: "BS. Nguyễn Văn D" },
      { docId: 303, fullName: "BS. Trần Thị E" },
    ];
    const filtered = mockAvailableDoctors.filter(
      (d) => d.docId !== stepDetail.doctor?.docId
    );
    setDoctorOptions(filtered);
    setIsModalOpen(true);
  };

  const handleDoctorChange = async () => {
    if (!selectedDoctorId) {
      message.warning("Vui lòng chọn bác sĩ");
      return;
    }

    const selectedDoctor = doctorOptions.find(
      (d) => d.docId === selectedDoctorId
    );

    const updatedStepDetail = {
      ...stepDetail,
      doctor: {
        docId: selectedDoctor.docId,
        acc: {
          fullName: selectedDoctor.fullName,
          phone: "0123456789",
          mail: `${selectedDoctor.fullName
            .toLowerCase()
            .replace(/\s/g, "")}@example.com`,
        },
      },
    };

    setStepDetail(updatedStepDetail);
    setIsModalOpen(false);
    setSelectedDoctorId(null);
    message.success("Đã cập nhật bác sĩ thành công!");
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
              <Text>{doctorSlot?.WorkDate}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Thời gian:</Text>
              <br />
              <Text>{doctorSlot?.Slot.Slot_Start}</Text>
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
            <Row justify="space-between" align="middle">
              <Col>
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
              </Col>
              <Col>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  style={{ color: "#f78db3" }}
                  onClick={fetchAvailableDoctors}
                >
                  Thay đổi bác sĩ
                </Button>
              </Col>
            </Row>
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

        <Modal
          title="Chọn bác sĩ mới"
          open={isModalOpen}
          onOk={handleDoctorChange}
          onCancel={() => setIsModalOpen(false)}
          okText="Cập nhật"
          cancelText="Hủy"
        >
          <Select
            style={{ width: "100%" }}
            placeholder="Chọn bác sĩ"
            onChange={(value) => setSelectedDoctorId(value)}
            value={selectedDoctorId}
          >
            {doctorOptions.map((doc) => (
              <Option key={doc.docId} value={doc.docId}>
                {doc.fullName}
              </Option>
            ))}
          </Select>
        </Modal>

        {/* Danh sách xét nghiệm */}
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
                          onClick={() => navigate(`/testdetail/${test.Test_ID}`)}
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

        {/* Danh sách mẫu sinh học */}
        {biosamples.length > 0 && (
          <Card
            title="Danh sách mẫu sinh học liên quan"
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
