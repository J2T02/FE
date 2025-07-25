import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Descriptions,
  Table,
  Divider,
  Button,
  message,
  Row,
  Col,
  Tag,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { getTreatmentListForCustomer } from "../../../../apis/treatmentService";
// 🔻 import trang chi tiết
import BookingDetailPage from "../../BookingDetail/BookingDetailPage";
import TreatmentPlanDetailPage from "../../TreatmentplanManagement/TreatmentplanDetailPage/TreatmentplanDetailPage";

const { Title } = Typography;

// Dữ liệu giả lập cho các bệnh nhân khác
const generateMockDetails = (patient) => ({
  accId: 0,
  fullName: patient.fullName,
  mail: patient.mail,
  phone: patient.phone,
  customer: {
    cusId: 999,
    husName: "Chưa cập nhật",
    wifeName: patient.fullName,
    husYOB: "1990-01-01",
    wifeYOB: "1992-01-01",
  },
  bookings: [
    {
      bookingId: 1,
      workDate: "2025-07-20",
      slot: "08:30 - 09:30",
      status: "Đang chờ",
    },
  ],
  records: [
    {
      tpId: 1,
      service: "Tư vấn",
      status: "Đang điều trị",
    },
  ],
});

const PatientDetail = ({ patient, onBack }) => {
  const { cusId } = patient;
  // patient: { cusId, husName, husYob, wifeName, wifeYob, accCus: { accId, fullName, mail, phone, img } }
  const [activeView, setActiveView] = useState("info"); // "info" | "booking" | "treatment"
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedTPId, setSelectedTPId] = useState(null);

  // Nếu có bookings/records thì truyền qua props hoặc fetch thêm, ở đây để trống
  const bookings = patient.bookings || [];
  const records = patient.records || [];

  // 🔝 Hiển thị BookingDetailPage nếu chọn
  if (activeView === "booking") {
    return (
      <BookingDetailPage
        id={selectedBookingId}
        embedded
        onBack={() => setActiveView("info")}
      />
    );
  }

  // 🔝 Hiển thị TreatmentPlanDetailPage nếu chọn
  if (activeView === "treatment") {
    return (
      <TreatmentPlanDetailPage
        tpId={selectedTPId}
        embedded
        onBack={() => setActiveView("info")}
      />
    );
  }

  if (!patient) return null;

  return (
    <div style={{ background: "#fff0f4", padding: 24 }}>
      <Card
        bordered={false}
        bodyStyle={{ padding: 36 }}
        style={{ borderRadius: 16 }}
      >
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 24 }}
        >
          <Col>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={onBack}
              style={{
                backgroundColor: "#f78db3",
                color: "white",
                border: "none",
              }}
            >
              Quay lại
            </Button>
          </Col>
          <Col>
            <Title level={3}>🩺 Thông tin bệnh nhân</Title>
          </Col>
        </Row>

        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="Họ tên">
            {patient.accCus?.fullName || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {patient.accCus?.mail || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {patient.accCus?.phone || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Tên chồng">
            {patient.husName || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Tên vợ">
            {patient.wifeName || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Năm sinh chồng">
            {patient.husYob ? dayjs(patient.husYob).format("YYYY") : "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Năm sinh vợ">
            {patient.wifeYob ? dayjs(patient.wifeYob).format("YYYY") : "-"}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <Title level={4}>📅 Lịch đặt khám</Title>
        <Table
          dataSource={bookings}
          rowKey="bookingId"
          size="small"
          pagination={false}
          columns={[
            { title: "Mã Booking", dataIndex: "bookingId" },
            {
              title: "Ngày hẹn",
              dataIndex: "workDate",
              render: (text) => (text ? dayjs(text).format("DD/MM/YYYY") : "-"),
            },
            { title: "Khung giờ", dataIndex: "slot" },
            {
              title: "Trạng thái",
              dataIndex: "status",
              render: (status) => <Tag color="blue">{status}</Tag>,
            },
            {
              title: "",
              key: "actions",
              render: (_, record) => (
                <Button
                  type="link"
                  onClick={() => {
                    setSelectedBookingId(record.bookingId);
                    setActiveView("booking");
                  }}
                >
                  Xem chi tiết
                </Button>
              ),
            },
          ]}
        />

        <Divider />

        <Title level={4}>📋 Hồ sơ điều trị</Title>
        <Table
          dataSource={records}
          rowKey="tpId"
          size="small"
          pagination={false}
          columns={[
            { title: "Mã bệnh án", dataIndex: "tpId" },
            { title: "Dịch vụ hiện tại", dataIndex: "service" },
            {
              title: "Trạng thái",
              dataIndex: "status",
              render: (status) => <Tag color="green">{status}</Tag>,
            },
            {
              title: "",
              key: "actions",
              render: (_, record) => (
                <Button
                  type="link"
                  onClick={() => {
                    setSelectedTPId(record.tpId);
                    setActiveView("treatment");
                  }}
                >
                  Xem chi tiết
                </Button>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default PatientDetail;
