// File: pages/ReceptionistPage/BookingDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Row, Col, Space, Spin, message } from "antd";
import BackButton from "./components/BackButton";
import BookingHeader from "./components/BookingHeader";
import BookingOverviewCard from "./components/BookingOverviewCard";
import CustomerInfoCard from "./components/CustomerInfoCard";
import DoctorInfoCard from "./components/DoctorInfoCard";
import AppointmentInfoCard from "./components/AppointmentInfoCard";
import ActionSection from "./components/ActionSection";

const { Content } = Layout;

export default function BookingDetailPage() {
  const { id } = useParams();
  const bookingId = parseInt(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);
  const [treatmentPlan, setTreatmentPlan] = useState(null);

  // Common mock data for any booking ID
  const generateMockBookingDetail = (id) => ({
    bookingId: id,
    status: {
      statusId: id === 112 ? 2 : 3,
      statusName: id === 112 ? "Đã xác nhận" : "Checkin",
    },
    cus: {
      cusId: 200 + id,
      husName: "Nguyễn Văn A",
      wifeName: "Trần Thị B",
      husYob: "1990-01-01",
      wifeYob: "1992-03-03",
      accCus: {
        fullName: "Nguyễn Văn A",
        mail: "husband@example.com",
        phone: "0912345678",
      },
    },
    doc: {
      docId: 300 + id,
      accDoc: {
        fullName: "BS. Lê Văn C",
        phone: "0901234567",
        mail: "levanc@example.com",
        img: "https://via.placeholder.com/100",
      },
    },
    schedule: {
      workDate: "2025-07-07",
      slotStart: "08:00",
      slotEnd: "09:00",
      room: "Phòng 101",
    },
  });

  useEffect(() => {
    setTimeout(() => {
      const mock = generateMockBookingDetail(bookingId);
      setBookingData(mock);
      // Giả lập đã tạo treatment plan cho bookingId 111
      if (bookingId === 111) {
        setTreatmentPlan({ tpId: 501, bookingId });
      }
      setLoading(false);
    }, 300);
  }, [bookingId]);

  const handleCheckIn = () => {
    message.success("Check-in thành công (giả lập)");
    setBookingData((prev) => ({
      ...prev,
      status: { statusId: 3, statusName: "Checkin" },
    }));
  };

  const handleCreateTreatmentPlan = () => {
    message.success("Tạo hồ sơ bệnh án thành công (giả lập)");
    const newTpId = 500 + bookingId;
    setTreatmentPlan({ tpId: newTpId, bookingId });
    navigate(`/treatmentplan/${newTpId}`);
  };

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
                treatmentPlan={treatmentPlan}
                onCreateTP={handleCreateTreatmentPlan}
              />
            </Col>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
}
