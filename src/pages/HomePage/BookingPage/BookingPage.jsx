import React, { useState, useEffect } from "react";
import { Steps, message, Layout } from "antd";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";
import { useNavigate } from "react-router-dom";
import CustomerInfo from "../components/CustomerInfo";
import DoctorSelection from "../components/DoctorSelection";
import Schedule from "../components/Schedule";
import ConfirmBooking from "../components/ConfirmBooking";
import { Booking, GetCustomerInfo } from "../../../apis/bookingService";

const BookingPage = () => {
  const [current, setCurrent] = useState(0);
  const [bookingData, setBookingData] = useState({});
  const [showCustomerInfo, setShowCustomerInfo] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const res = await GetCustomerInfo();
        const customerData = res?.data?.data;

        if (customerData) {
          if (customerData.husName) {
            setShowCustomerInfo(false);
          }
          setBookingData((prev) => ({ ...prev, ...customerData }));
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin khách hàng:", error);
        message.error("Không thể lấy thông tin khách hàng.");
      }
    };

    fetchCustomerInfo();
  }, []);

  const updateData = (data) => setBookingData((prev) => ({ ...prev, ...data }));

  const next = () => {
    const isScheduleStep = current === contentComponents.length - 2;
    if (isScheduleStep && (!bookingData.date || !bookingData.slot)) {
      return message.warning("Vui lòng chọn đầy đủ ngày và ca khám.");
    }
    setCurrent((prev) => prev + 1);
  };

  const prev = () => setCurrent((prev) => prev - 1);

  const restart = () => setCurrent(0);

  const submitBooking = async () => {
    try {
      const payload = {
        slotId:
          bookingData.slot === "morning"
            ? 1
            : bookingData.slot === "afternoon"
            ? 2
            : bookingData.slot,
        workDate: bookingData.date,
        doctorId: bookingData.doctorId || null,
        note: bookingData.notes || "",
      };

      const res = await Booking(payload);
      message.success("Đặt lịch thành công!");
      const bookingId = res.data.data.bookingId;
      navigate(`/bookingDetail/${bookingId}`);
    } catch (error) {
      console.error("Lỗi đặt lịch:", error);
      message.error(error.response?.data?.message || "Lỗi khi đặt lịch.");
    }
  };

  const steps = [
    ...(showCustomerInfo ? ["Patient Info"] : []),
    "Select Doctor",
    "Choose Date",
    "Confirm",
  ];

  const contentComponents = [
    showCustomerInfo && (
      <CustomerInfo
        key="CustomerInfo"
        data={bookingData}
        onUpdate={updateData}
        onNext={next}
      />
    ),
    <DoctorSelection
      key="DoctorSelection"
      data={bookingData}
      onUpdate={updateData}
      onNext={next}
      onPrev={prev}
      disablePrev={current === 0}
    />,
    <Schedule
      key="Schedule"
      data={bookingData}
      onUpdate={updateData}
      onNext={next}
      onPrev={prev}
      disablePrev={current === 0}
    />,
    <ConfirmBooking
      key="ConfirmBooking"
      data={bookingData}
      onSubmit={submitBooking}
      onRestart={restart}
      onPrev={prev}
      disablePrev={current === 0}
    />,
  ].filter(Boolean);

  return (
    <Layout>
      <Header />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
        <Steps current={current} style={{ marginBottom: 24 }}>
          {steps.map((title, idx) => (
            <Steps.Step key={idx} title={title} />
          ))}
        </Steps>

        <div>{contentComponents[current]}</div>
      </div>
      <Footer />
    </Layout>
  );
};

export default BookingPage;
