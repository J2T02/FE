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

const PatientDetail = ({
  patient,
  treatmentData = [],
  loadingTreatment = false,
  onBack,
}) => {
  const { cusId } = patient;
  console.log(treatmentData);
  // patient: { cusId, husName, husYob, wifeName, wifeYob, accCus: { accId, fullName, mail, phone, img } }
  const [activeView, setActiveView] = useState("info"); // "info" | "booking" | "treatment"
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedTPId, setSelectedTPId] = useState(null);

  // Nếu có bookings/records thì truyền qua props hoặc fetch thêm, ở đây để trống
  const bookings = patient.bookings || [];

  // Chuyển đổi dữ liệu từ API thành format phù hợp với UI
  const records = treatmentData.map((item) => ({
    tpId: item.tpId,
    service: item.serviceInfo?.serName || "Chưa cập nhật",
    status: item.status?.statusName || "Chưa cập nhật",
    startDate: item.startDate,
    endDate: item.endDate,
    doctorName: item.doctorInfo?.accountInfo?.fullName || "Chưa cập nhật",
    result: item.result || "Chưa cập nhật",
  }));

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
          loading={loadingTreatment}
          columns={[
            { title: "Mã bệnh án", dataIndex: "tpId" },
            { title: "Dịch vụ", dataIndex: "service" },
            {
              title: "Bác sĩ điều trị",
              dataIndex: "doctorName",
            },
            {
              title: "Ngày bắt đầu",
              dataIndex: "startDate",
              render: (text) => (text ? dayjs(text).format("DD/MM/YYYY") : "-"),
            },
            {
              title: "Kết quả",
              dataIndex: "result",
              render: (text) => <Tag color="blue">{text}</Tag>,
            },
            {
              title: "Trạng thái",
              dataIndex: "status",
              render: (status) => {
                let color = "green";
                if (status === "Đang tiến hành") color = "blue";
                if (status === "Hoàn thành") color = "green";
                if (status === "Tạm dừng") color = "orange";
                if (status === "Hủy bỏ") color = "red";
                return <Tag color={color}>{status}</Tag>;
              },
            },
            {
              title: "",
              key: "actions",
              render: (_, record) => (
                <Button
                  type="link"
                  onClick={() => {
                    window.open(
                      `/admin/treatmentplandetail/${treatmentData[0].tpId}`,
                      "_blank"
                    );
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
