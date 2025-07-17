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

export default function BookingDetailPage({ bookingId: propBookingId, onBack }) {
  const params = useParams();
  const navigate = useNavigate();

  const bookingId = propBookingId ?? parseInt(params.id); // ✅ fallback giữa prop và URL param
  const isEmbedded = !!propBookingId; // ✅ xác định gọi nội bộ hay từ route

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

  const handleStatusUpdate = async () => {
    const currentStatus = bookingData?.status?.statusId;
    let newStatus = null;

    if (currentStatus === 3) newStatus = 4;
    else if (currentStatus === 4) newStatus = 5;
    else return;

    const res = await mockUpdateStatus(bookingId, newStatus);
    if (res.success) {
      message.success("Cập nhật trạng thái thành công!");
      fetchBooking();
    } else {
      message.error("Cập nhật thất bại");
    }
  };

  if (loading) return <Spin fullscreen />;

  return (
    <Layout style={{ background: "#fff0f4", minHeight: "100vh" }}>
      <Content style={{ padding: 24 }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {isEmbedded ? (
            <Button 
              style={{ marginBottom: 20,
                  backgroundColor: "#f78db3",
                  color: "white",
                  border: "none",
              }}
             onClick={onBack}>← Quay lại</Button> // ✅ thêm Back nội bộ
          ) : (
            <BackButton />
          )}

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
                onConfirm={handleStatusUpdate}
              />
            </Col>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
}
