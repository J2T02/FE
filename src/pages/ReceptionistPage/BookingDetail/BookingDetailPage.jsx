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
import { BookingDetail } from "../../../apis/bookingService";
import { checkBooking } from "../../../apis/bookingService";
const { Content } = Layout;

export default function BookingDetailPage() {
  const { id } = useParams();
  const bookingId = parseInt(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);
  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        const res = await BookingDetail(bookingId);
        if (res?.data?.success) {
          setBookingData(res.data.data);
        } else {
          message.error("Không thể tải thông tin đặt lịch");
        }
      } catch (err) {
        message.error("Lỗi khi tải dữ liệu");
      }
      setLoading(false);
    };
    fetchBooking();
    // eslint-disable-next-line
  }, [bookingId]);

  const handleCheckIn = async () => {
    try {
      const res = await checkBooking(bookingId, 3);
      if (res?.data?.success) {
        message.success(res.data.message);
        // Reload booking data
        const updated = await BookingDetail(bookingId);
        if (updated?.data?.success) {
          setBookingData(updated.data.data);
        }
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      message.error("Check-in thất bại");
    }
  };

  console.log(bookingData);
  if (loading || !bookingData) return <Spin fullscreen />;

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
        </Space>
      </Content>
    </Layout>
  );
}
