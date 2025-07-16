import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Space,
  Spin,
  message,
  theme,
  Button,
  Typography,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import AdminHeader from "../components/AdminHeader";
import BackButton from "./components/BackButton";
import BookingHeader from "./components/BookingHeader";
import BookingOverviewCard from "./components/BookingOverviewCard";
import CustomerInfoCard from "./components/CustomerInfoCard";
import DoctorInfoCard from "./components/DoctorInfoCard";
import ActionSection from "./components/ActionSection";
import AppointmentInfoCard from "./components/AppointmentInfoCard";
import { BookingDetail, checkBooking } from "../../../apis/bookingService";

const { Content } = Layout;
const { Title } = Typography;

export default function BookingDetailPage({ id, embedded = false, onBack }) {
  const routeParams = useParams();
  const bookingId = parseInt(id || routeParams?.id);
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
        console.error(error);
        message.warning("Dùng dữ liệu mock vì không gọi được API");

        // Dữ liệu mock
        const mockData = {
          bookingId: bookingId,
          status: 1,
          createdAt: "2025-07-15T08:00:00Z",
          note: "Khám hiếm muộn lần đầu",
          cus: {
            fullName: "Nguyễn Văn A",
            gender: "Nam",
            dob: "1990-01-01",
            phone: "0901234567",
            email: "nguyenvana@example.com",
          },
          doc: {
            docId: 2,
            accDoc: {
              fullName: "BS. Trần Thị B",
              email: "bs.b@example.com",
              phone: "0912345678",
              gender: "Nữ",
            },
          },
          schedule: {
            scheduleId: 5,
            date: "2025-07-20",
            timeStart: "08:00",
            timeEnd: "09:00",
          },
          slot: "08:00 - 09:00",
        };

        setBookingData(mockData);
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
      {!embedded && <AdminHeader />}
      <Content
        style={{
          padding: embedded ? 0 : 24,
          backgroundColor: token.colorBgLayout,
        }}
      >
        <Space
          direction="vertical"
          size="large"
          style={{
            width: "100%",
            padding: embedded ? 24 : 0,
            backgroundColor: "#fff0f6", // màu nền cho tab
            borderRadius: 12,
          }}
        >
          {embedded ? (
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={onBack}
              style={{
                backgroundColor: "#f78db3",
                color: "white",
                border: "none",
                width: "fit-content",
              }}
            >
              Quay lại danh sách lịch hẹn
            </Button>
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
              <ActionSection
                statusId={
                  bookingData?.status?.statusId || bookingData?.status || 1
                }
                onConfirm={async () => {
                  try {
                    const res = await checkBooking(bookingId, 2);
                    if (res?.data?.success) {
                      message.success("Đã xác nhận lịch hẹn!");
                      setBookingData((prev) => ({
                        ...prev,
                        status: { statusId: 2, statusName: "Đã xác nhận" },
                      }));
                    } else {
                      message.error(
                        res?.data?.message || "Xác nhận lịch hẹn thất bại!"
                      );
                    }
                  } catch (err) {
                    message.error("Xác nhận lịch hẹn thất bại!");
                  }
                }}
                onCancel={async () => {
                  try {
                    const res = await checkBooking(bookingId, 6);
                    if (res?.data?.success) {
                      message.success("Đã hủy lịch hẹn!");
                      setBookingData((prev) => ({
                        ...prev,
                        status: { statusId: 6, statusName: "Đã hủy" },
                      }));
                    } else {
                      message.error(
                        res?.data?.message || "Hủy lịch hẹn thất bại!"
                      );
                    }
                  } catch (err) {
                    message.error("Hủy lịch hẹn thất bại!");
                  }
                }}
              />
            </Col>
          </Row>
        </Space>
      </Content>
    </Layout>
  );
}
