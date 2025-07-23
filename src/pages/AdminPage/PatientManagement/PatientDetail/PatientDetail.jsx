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
  const [detail, setDetail] = useState(null);

  const [activeView, setActiveView] = useState("info"); // "info" | "booking" | "treatment"
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedTPId, setSelectedTPId] = useState(null);

  useEffect(() => {
    if (!patient || !patient.mail) {
      message.error("Thiếu thông tin bệnh nhân.");
      return;
    }

    if (patient.mail === "thib@example.com") {
      setDetail({
        accId: 2,
        fullName: "Trần Thị B",
        mail: "thib@example.com",
        phone: "0912345678",
        customer: {
          cusId: 101,
          husName: "Trần Văn A",
          wifeName: "Trần Thị B",
          husYOB: "1985-01-01",
          wifeYOB: "1988-01-01",
        },
        bookings: [
          {
            bookingId: 1,
            workDate: "2025-07-20",
            slot: "08:30 - 09:30",
            status: "Đang chờ",
          },
          {
            bookingId: 2,
            workDate: "2025-07-22",
            slot: "09:00 - 10:00",
            status: "Hoàn thành",
          },
        ],
        records: [
          {
            tpId: 1,
            service: "Điều trị IVF",
            status: "Hoàn tất",
          },
        ],
      });
    } else {
      setDetail(generateMockDetails(patient));
    }
  }, [patient]);

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

  if (!detail) return null;

  return (
    <div style={{ background: "#fff0f4", padding: 24 }}>
      <Card
        bordered={false}
        bodyStyle={{ padding: 36 }}
        style={{ borderRadius: 16 }}
      >
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
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
          <Descriptions.Item label="Họ tên">{detail.fullName}</Descriptions.Item>
          <Descriptions.Item label="Email">{detail.mail}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{detail.phone}</Descriptions.Item>
          <Descriptions.Item label="Tên chồng">{detail.customer.husName}</Descriptions.Item>
          <Descriptions.Item label="Tên vợ">{detail.customer.wifeName}</Descriptions.Item>
          <Descriptions.Item label="Năm sinh chồng">
            {dayjs(detail.customer.husYOB).format("YYYY")}
          </Descriptions.Item>
          <Descriptions.Item label="Năm sinh vợ">
            {dayjs(detail.customer.wifeYOB).format("YYYY")}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <Title level={4}>📅 Lịch đặt khám</Title>
        <Table
          dataSource={detail.bookings}
          rowKey="bookingId"
          size="small"
          pagination={false}
          columns={[
            { title: "Mã Booking", dataIndex: "bookingId" },
            {
              title: "Ngày hẹn",
              dataIndex: "workDate",
              render: (text) => dayjs(text).format("DD/MM/YYYY"),
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
          dataSource={detail.records}
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
