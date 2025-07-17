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
import { BookingDetail, checkBooking } from "../../../apis/bookingService";
import ReceptionistHeader from "../components/ReceptionistHeader";
import ReceptionistStoreProvider from "../contexts/ReceptionistStoreProvider";
import Footer from "~components/footer/Footer";
import { createTreatment } from "../../../apis/treatmentService";

const { Content } = Layout;

export default function BookingDetailPage({ bookingId: propBookingId, onBack }) {
  const params = useParams();
  const navigate = useNavigate();

  const bookingId = propBookingId ?? parseInt(params.id); // ✅ Dùng props nếu có, fallback sang URL param
  const isEmbedded = !!propBookingId; // ✅ Xác định gọi từ nội bộ hay route riêng

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
      try {
        const res = await createTreatment(payload);
        if (res.data.success) {
          setTreatmentPlan(res.data.data);
          message.success(res.data.message);
          const newTpId = res.data.data.tpId;
          navigate(`/receptionist/treatmentplandetail/${newTpId}`);
        } else {
          message.error(res.data.message);
        }
      } catch (err) {
        message.error("Tạo hồ sơ bệnh án thất bại!");
      }
    }
  };

  if (loading || !bookingData) return <Spin fullscreen />;

  const appointmentData = {
    ...bookingData.schedule,
    slot: bookingData.slot,
    bookingId: bookingData.bookingId,
    docId: bookingData.doc?.docId,
  };

  return (
    <ReceptionistStoreProvider>
      <Layout style={{ background: "#fff0f4", minHeight: "100vh" }}>
        {!isEmbedded && <ReceptionistHeader />} {/* ✅ Không render Header nếu là embedded */}
        <Content style={{ padding: 24 }}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {isEmbedded ? (
              <Button 
                    style={{ marginBottom: 20,
                  backgroundColor: "#f78db3",
                  color: "white",
                  border: "none",
              }} onClick={onBack}
              >← Quay lại
              </Button> // ✅ Nút back nội bộ
            ) : (
              <BackButton /> // ✅ Vẫn hỗ trợ khi chạy qua router
            )}
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
        {!isEmbedded && <Footer />} {/* ✅ Không render Footer nếu là embedded */}
      </Layout>
    </ReceptionistStoreProvider>
  );
}
