// File: pages/ReceptionistPage/BookingDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Row, Col, Space, Spin, message, Button } from "antd";

import BackButton from "./components/BackButton";
import BookingHeader from "./components/BookingHeader";
import BookingOverviewCard from "./components/BookingOverviewCard";
import CustomerInfoCard from "./components/CustomerInfoCard";
import DoctorInfoCard from "./components/DoctorInfoCard";
import AppointmentInfoCard from "./components/AppointmentInfoCard";
import ActionSection from "./components/ActionSection";

const { Content } = Layout;

// ❗ Mock API ngay trong file (giả lập gọi server)
const mockFetchBooking = async (bookingId) => {
  return {
    success: true,
    data: {
      bookingId,
      createAt: "2025-07-01",
      note: "Khách cần tư vấn thêm",
      status: { statusId: 2, statusName: "Đã xác nhận" },
      cus: {
        husName: "Nguyễn Văn A",
        wifeName: "Trần Thị B",
        husYob: 1985,
        wifeYob: 1989,
        accCus: {
          fullName: "Nguyễn Văn A",
          mail: "vana@example.com",
          phone: "0912345678",
        },
      },
      doc: {
        accDoc: {
          fullName: "BS. Lê Văn C",
          mail: "bs.c@example.com",
          phone: "0988123456",
        },
      },
      schedule: {
        slotId: 1,
      },
    },
  };
};

const mockUpdateStatus = async (bookingId, statusId) => {
  console.log(`Mock update booking ${bookingId} to status ${statusId}`);
  return { success: true };
};

export default function BookingDetailPage() {
  const { id } = useParams();              
  const bookingId = parseInt(id);          
  const navigate = useNavigate();          

  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);

  const fetchBooking = async () => {
    setLoading(true);
    try {
      const res = await mockFetchBooking(bookingId);
      if (res?.success) {
        setBookingData(res.data);
      } else {
        message.error("Không thể tải thông tin đặt lịch");
      }
    } catch (err) {
      message.error("Lỗi khi tải dữ liệu");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooking();
  }, [bookingId]);

  const handleCheckIn = async () => {
    const res = await mockUpdateStatus(bookingId, 3); // 3 = Check-in
    if (res.success) {
      message.success("Check-in thành công!");
      fetchBooking(); // Reload
    } else {
      message.error("Check-in thất bại");
    }
  };

  if (loading) return <Spin fullscreen />;

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
      <Content style={{ padding: 24 }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <BackButton />
          <BookingHeader data={bookingData} />
          <BookingOverviewCard data={bookingData} />

          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <CustomerInfoCard data={bookingData?.cus} />
            </Col>
            <Col xs={24} md={12}>
              <DoctorInfoCard data={bookingData?.doc?.accDoc} />
            </Col>
            <Col xs={24} md={12}>
              <AppointmentInfoCard data={bookingData?.schedule} />
            </Col>
            <Col xs={24} md={12}>
              <ActionSection
                statusId={bookingData?.status?.statusId}
                onCheckIn={handleCheckIn}
              />
            </Col>
          </Row>

          <Row justify="end">
            <Col>
              <Button
                type="primary"
                onClick={() =>
                  navigate(`/receptionist/medical-record/create/${bookingId}`)
                }
              >
                Tạo hồ sơ bệnh án
              </Button>
            </Col>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
}
