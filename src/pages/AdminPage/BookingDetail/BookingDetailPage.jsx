import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Row, Col, Space, Spin, message, theme } from "antd";
import AdminHeader from "../components/AdminHeader";
import BackButton from "./components/BackButton";
import BookingHeader from "./components/BookingHeader";
import BookingOverviewCard from "./components/BookingOverviewCard";
import CustomerInfoCard from "./components/CustomerInfoCard";
import DoctorInfoCard from "./components/DoctorInfoCard";
import ActionSection from "./components/ActionSection";
import AppointmentInfoCard from "./components/AppointmentInfoCard";
import { BookingDetail } from "../../../apis/bookingService";

const { Content } = Layout;

export default function BookingDetailPage() {
  const { id } = useParams();
  const bookingId = parseInt(id);
  const { token } = theme.useToken();
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await BookingDetail(bookingId);
        setBookingData(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        message.error("Không thể tải thông tin booking");
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading || !bookingData) return <Spin fullscreen />;

  return (
    <Layout
      style={{ minHeight: "100vh", backgroundColor: token.colorBgContainer }}
    >
      <AdminHeader />
      <Content style={{ padding: 24, backgroundColor: token.colorBgLayout }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <BackButton />
          <BookingHeader data={bookingData} />
          <BookingOverviewCard data={bookingData} />

          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <CustomerInfoCard data={bookingData?.cus} />
            </Col>
            <Col xs={24} md={12}>
              <DoctorInfoCard
                bookingData={bookingData}
                data={bookingData?.doc?.accDoc}
                docId={bookingData?.doc?.docId}
              />
            </Col>
            <Col xs={24} md={12}>
              <AppointmentInfoCard
                data={{
                  ...bookingData?.schedule,
                  bookingId,
                  docId: bookingData?.doc?.docId,
                  slot: bookingData?.slot,
                }}
                docId={bookingData?.doc?.docId}
              />
            </Col>
            <Col xs={24} md={12}>
              <ActionSection bookingId={bookingId} />
            </Col>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
}
