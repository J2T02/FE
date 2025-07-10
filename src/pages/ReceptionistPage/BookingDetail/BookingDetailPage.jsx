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
import { BookingDetail, checkBooking } from "../../../apis/bookingService";
import ReceptionistHeader from "../components/ReceptionistHeader";
import ReceptionistStoreProvider from "../contexts/ReceptionistStoreProvider";
import Footer from "~components/footer/Footer";
import { createTreatment } from "../../../apis/treatmentService";
const { Content } = Layout;

export default function BookingDetailPage() {
  const { id } = useParams();
  const bookingId = parseInt(id);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);
  const [treatmentPlan, setTreatmentPlan] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      try {
        const res = await BookingDetail(bookingId);
        if (res?.data?.success && res.data.data) {
          setBookingData(res.data.data);
        } else {
          setBookingData(null);
        }
      } catch (err) {
        setBookingData(null);
      }
      setLoading(false);
    };
    fetchBooking();
  }, [bookingId]);

  const handleCheckIn = async () => {
    try {
      const res = await checkBooking(bookingId, 3);
      if (res?.data?.success) {
        message.success("Check-in thành công!");
        // Sau khi checkin, cập nhật lại trạng thái booking
        setBookingData((prev) => ({
          ...prev,
          status: { statusId: 3, statusName: "Checkin" },
        }));
      } else {
        message.error(res?.data?.message || "Check-in thất bại!");
      }
    } catch (err) {
      message.error("Check-in thất bại!");
    }
  };

  const handleCreateTreatmentPlan = async () => {
    if (bookingData) {
      const { cus, doc } = bookingData;
      const payload = {
        docId: doc.docId,
        serId: 1,
        cusId: cus.cusId,
      };
      await createTreatment(payload)
        .then((res) => {
          if (res.data.success) {
            setTreatmentPlan(res.data.data);
            message.success(res.data.message);
            const newTpId = res.data.data.tpId;
            navigate(`/receptionist/treatmentplandetail/${newTpId}`);
          } else {
            message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);

          message.error("Tạo hồ sơ bệnh án thất bại!");
        });
    }
  };

  if (loading || !bookingData) return <Spin fullscreen />;

  // Map lại dữ liệu cho các component con nếu cần
  const appointmentData = {
    ...bookingData.schedule,
    slot: bookingData.slot,
    bookingId: bookingData.bookingId,
    docId: bookingData.doc?.docId,
  };

  return (
    <ReceptionistStoreProvider>
      <Layout style={{ minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
        <ReceptionistHeader />
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
                <DoctorInfoCard
                  data={bookingData?.doc?.accDoc}
                  statusId={bookingData?.status?.statusId}
                />
              </Col>
              <Col xs={24} md={12}>
                <AppointmentInfoCard
                  data={appointmentData}
                  statusId={bookingData?.status?.statusId}
                />
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
        <Footer />
      </Layout>
    </ReceptionistStoreProvider>
  );
}
