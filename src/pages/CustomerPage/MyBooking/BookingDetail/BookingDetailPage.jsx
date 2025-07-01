import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout, Row, Col, Space, Spin, message, theme } from "antd";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";
import BackButton from "./components/BackButton";
import BookingHeader from "./components/BookingHeader";
import BookingOverviewCard from "./components/BookingOverviewCard";
import CustomerInfoCard from "./components/CustomerInfoCard";
import DoctorInfoCard from "./components/DoctorInfoCard";
import ActionSection from "./components/ActionSection";
import AppointmentInfoCard from "./components/AppointmentInfoCard";
import { BookingDetail } from "../../../../apis/bookingService";
const { Content } = Layout;

const sampleBookingData = {
  bookingId: 123,
  createAt: "2025-06-28T14:30:00",
  note: "Khách hàng yêu cầu bác sĩ nữ nếu có.",
  status: {
    statusId: 1,
    statusName: "Đang chờ xác nhận",
  },
  cus: {
    husName: "Nguyễn Văn A",
    wifeName: "Trần Thị B",
    husYob: 1990,
    wifeYob: 1992,
    accCus: {
      fullName: "Nguyễn Văn A",
      mail: "nguyenvana@gmail.com",
      phone: "0901234567",
    },
  },
  doc: {
    docId: 2,
    specialty: "Hiếm muộn",
    experience: 12,
    accDoc: {
      fullName: "BS. Trần Thị Lan",
      mail: "lan.bs88@gmail.com",
      phone: "0908123456",
      gender: "Nữ",
      yob: 1988,
      education: "Đại học Y Hà Nội",
      certificates: ["/certs/lan1.pdf", "/certs/lan2.pdf"],
    },
  },
  schedule: {
    bookingId: 123,
    date: "2025-07-01",
    startTime: "09:00",
    endTime: "10:00",
    room: "Phòng khám 302",
    hospital: "Vinmec Central Park",
  },
};

export default function BookingDetailPage() {
  const { id } = useParams();
  const bookingId = parseInt(id);
  const { token } = theme.useToken();
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    // Gán dữ liệu mẫu để test UI
    const fetchBooking = async () => {
      try {
        const res = await BookingDetail(bookingId);
        setBookingData(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(err);
        setLoading(false);
      }
    };

    // setBookingData(sampleBookingData);
    fetchBooking();
  }, [bookingId]);
  if (loading || !bookingData) return <Spin fullscreen />;

  return (
    <Layout
      style={{ minHeight: "100vh", backgroundColor: token.colorBgContainer }}
    >
      <Header />
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
                data={{ ...bookingData?.schedule, bookingId }}
                docId={bookingData?.doc?.docId}
              />
            </Col>
            <Col xs={24} md={12}>
              <ActionSection bookingId={bookingId} />
            </Col>
          </Row>
        </Space>
      </Content>
      <Footer />
    </Layout>
  );
}
