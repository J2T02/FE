import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // 👈 thêm useNavigate
import { Layout, Row, Col, Space, Spin, message, Button } from "antd";

import BackButton from "./components/BackButton";
import BookingHeader from "./components/BookingHeader";
import BookingOverviewCard from "./components/BookingOverviewCard";
import CustomerInfoCard from "./components/CustomerInfoCard";
import DoctorInfoCard from "./components/DoctorInfoCard";
import ActionSection from "./components/ActionSection";
import AppointmentInfoCard from "./components/AppointmentInfoCard";
import { BookingDetail } from "../../../../apis/bookingService";

const { Content } = Layout;

export default function BookingDetailPage() {
  const { id } = useParams();              
  const bookingId = parseInt(id);          
  const navigate = useNavigate(); // 👈 khai báo navigate

  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await BookingDetail(bookingId);
        if (res?.data?.success) {
          setBookingData(res.data.data);
        } else {
          message.error("Không thể tải thông tin đặt lịch");
        }
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
        message.error("Có lỗi xảy ra khi tải dữ liệu.");
      }
      setLoading(false);
    };
    fetchBooking();
  }, [bookingId]);

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
              <ActionSection bookingId={bookingId} />
            </Col>
          </Row>

          {/* ✅ Nút Tạo hồ sơ bệnh án */}
          <Row justify="end">
            <Col>
              <Button
                type="primary"
                onClick={() => navigate(`/receptionist/medical-record/create/${bookingId}`)}
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
