import { useEffect, useState } from "react";
import { Card, Typography, Divider, Layout } from "antd";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";
import CurrentBookingInfo from "./components/CurrentBookingInfo";
import NewBookingForm from "./components/NewBookingForm";
import { GetAllDoctor, BookingDetail } from "../../../../apis/bookingService";
import { useParams } from "react-router-dom";
const BookingUpdatePage = () => {
  const { bookingId } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [currentBooking, setCurrentBooking] = useState({});
  const fetchCurrentBooking = async () => {
    try {
      const res = await BookingDetail(bookingId);
      console.log("Booking Detail:", res);
      if (res.data.success) {
        setCurrentBooking(res.data.data);
      }
    } catch (err) {
      console.error("Lỗi booking:", err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await GetAllDoctor();
      console.log("Doctor list:", res);
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (err) {
      console.error("Lỗi doctor:", err);
    }
  };

  useEffect(() => {
    if (bookingId) {
      fetchDoctors();
      fetchCurrentBooking();
    } else {
      console.warn("bookingId chưa có:", bookingId);
    }
  }, [bookingId]);

  console.log(currentBooking);
  return (
    <Layout>
      <Header />
      <Card title="Cập nhật lịch hẹn" style={{ padding: "40px 0" }}>
        <Typography.Title level={4}>Thông tin hiện tại</Typography.Title>
        <CurrentBookingInfo booking={currentBooking} />

        <Divider />

        <Typography.Title level={4}>Thông tin mới</Typography.Title>
        <NewBookingForm bookingId={bookingId} doctors={doctors} />
      </Card>
      <Footer />
    </Layout>
  );
};

export default BookingUpdatePage;
