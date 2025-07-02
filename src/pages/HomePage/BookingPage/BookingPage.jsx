import React, { useState, useEffect, useCallback } from "react";
import { Steps, message, Layout, Spin, Alert, Button } from "antd";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";
import { useNavigate } from "react-router-dom";
import CustomerInfo from "../components/CustomerInfo";
import DoctorScheduleSelection from "../components/DoctorScheduleSelection";
import ConfirmBooking from "../components/ConfirmBooking";
import { Booking, GetCustomerInfo, GetAllDoctor } from "../../../apis/bookingService";
import Cookies from "js-cookie";
import dayjs from "dayjs";

const BookingPage = () => {
  const [current, setCurrent] = useState(0);
  const [bookingData, setBookingData] = useState({});
  const [showCustomerInfo, setShowCustomerInfo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Pre-load data khi component mount
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Load customer info và doctors song song
        const [customerRes, doctorsRes] = await Promise.all([
          GetCustomerInfo(Cookies.get("accId")),
          GetAllDoctor()
        ]);

        const customerData = customerRes?.data?.data;
        const doctorsData = doctorsRes?.data?.data || [];

        // Set customer info
        if (customerData) {
          if (customerData.husName && customerData.wifeName) {
            setShowCustomerInfo(false);
          }
          setBookingData((prev) => ({ ...prev, ...customerData }));
        }

        // Set doctors data
        setDoctors(doctorsData);

      } catch (error) {
        console.error("Lỗi khi khởi tạo dữ liệu:", error);
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
        message.error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const updateData = useCallback((data) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  }, []);

  const validateCurrentStep = useCallback(() => {
    switch (current) {
      case 0: // Customer Info (nếu có)
        if (showCustomerInfo) {
          const { wifeName, husName, wifeYob, husYob } = bookingData;
          if (!wifeName || !husName || !wifeYob || !husYob) {
            message.warning("Vui lòng điền đầy đủ thông tin.");
            return false;
          }
        }
        break;
      case 1: // Doctor and Schedule Selection
        if (!bookingData.date || !bookingData.slot) {
          message.warning("Vui lòng chọn đầy đủ ngày và ca khám.");
          return false;
        }
        
        // Kiểm tra ngày trong quá khứ
        const selectedDate = dayjs(bookingData.date);
        if (selectedDate.isBefore(dayjs().startOf('day'))) {
          message.error("Không thể đặt lịch cho ngày trong quá khứ.");
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  }, [current, bookingData, showCustomerInfo]);

  const next = useCallback(() => {
    if (!validateCurrentStep()) return;
    setCurrent((prev) => prev + 1);
  }, [validateCurrentStep]);

  const prev = useCallback(() => {
    setCurrent((prev) => prev - 1);
  }, []);

  const restart = useCallback(() => {
    setCurrent(0);
  }, []);

  const submitBooking = async () => {
    try {
      setLoading(true);
      
      // Kiểm tra lại ngày trước khi submit
      const selectedDate = dayjs(bookingData.date);
      if (selectedDate.isBefore(dayjs().startOf('day'))) {
        message.error("Không thể đặt lịch cho ngày trong quá khứ.");
        setLoading(false);
        return;
      }
      
      const payload = {
        slotId: bookingData.slot,
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
      const errorMessage = error.response?.data?.message || "Lỗi khi đặt lịch.";
      message.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Tính toán steps động
  const steps = [
    ...(showCustomerInfo ? ["Thông tin bệnh nhân"] : []),
    "Chọn bác sĩ và lịch trình",
    "Xác nhận"
  ];

  // Tính toán content components động
  const contentComponents = [
    showCustomerInfo && (
      <CustomerInfo
        key="CustomerInfo"
        data={bookingData}
        onUpdate={updateData}
        onNext={next}
        loading={loading}
      />
    ),
    <DoctorScheduleSelection
      key="DoctorScheduleSelection"
      data={bookingData}
      doctors={doctors}
      onUpdate={updateData}
      onNext={next}
      onPrev={prev}
      disablePrev={current === 0}
      loading={loading}
    />,
    <ConfirmBooking
      key="ConfirmBooking"
      data={bookingData}
      onSubmit={submitBooking}
      onRestart={restart}
      onPrev={prev}
      disablePrev={current === 0}
      loading={loading}
    />,
  ].filter(Boolean);

  if (loading && current === 0) {
    return (
      <Layout>
        <Header />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}>
          <Spin size="large" tip="Đang tải dữ liệu..." />
        </div>
        <Footer />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Header />
        <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
          <Alert
            message="Lỗi"
            description={error}
            type="error"
            showIcon
            action={
              <Button size="small" onClick={() => window.location.reload()}>
                Thử lại
              </Button>
            }
          />
        </div>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
        <Steps current={current} style={{ marginBottom: 24 }}>
          {steps.map((title, idx) => (
            <Steps.Step key={idx} title={title} />
          ))}
        </Steps>

        <Spin spinning={loading} tip="Đang xử lý...">
          <div>{contentComponents[current]}</div>
        </Spin>
      </div>
      <Footer />
    </Layout>
  );
};

export default BookingPage;
