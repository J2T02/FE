import { useEffect, useState, useCallback } from "react";
import { Steps, message, Layout, Spin, Alert, Button } from "antd";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";
import DoctorScheduleSelection from "../../../HomePage/components/DoctorScheduleSelection";
import ConfirmBooking from "../../../HomePage/components/ConfirmBooking";
import { GetAllDoctor, BookingDetail } from "../../../../apis/bookingService";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const UpdateBookingPage = () => {
  const { bookingId } = useParams();
  const [current, setCurrent] = useState(0);
  const [bookingData, setBookingData] = useState({});
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);

  // Load dữ liệu booking hiện tại và danh sách bác sĩ
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [bookingRes, doctorsRes] = await Promise.all([
          BookingDetail(bookingId),
          GetAllDoctor(),
        ]);
        if (bookingRes?.data?.success) {
          const b = bookingRes.data.data;
          setBookingData({
            bookingId: b.bookingId,
            doctorId: b.docId,
            doctorName: b.doctorName || b.doctor?.accountInfo?.fullName,
            date: b.workDate,
            slot: b.slot?.slotId,
            slotStart: b.slot?.slotStart,
            slotEnd: b.slot?.slotEnd,
            notes: b.note,
          });
        }
        if (doctorsRes?.data?.success) {
          setDoctors(doctorsRes.data.data);
        }
      } catch (err) {
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    if (bookingId) fetchData();
  }, [bookingId]);

  const updateData = useCallback((data) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  }, []);

  const validateCurrentStep = useCallback(() => {
    // Chỉ kiểm tra bước chọn lịch/bác sĩ
    if (!bookingData.date || !bookingData.slot || !bookingData.doctorId) {
      message.warning("Vui lòng chọn đầy đủ bác sĩ, ngày và ca khám.");
      return false;
    }
    // Kiểm tra ngày trong quá khứ
    const selectedDate = dayjs(bookingData.date);
    if (selectedDate.isBefore(dayjs().startOf("day"))) {
      message.error("Không thể đặt lịch cho ngày trong quá khứ.");
      return false;
    }
    return true;
  }, [bookingData]);

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

  // Khi submit, chỉ tạo payload và in ra console
  const submitUpdate = () => {
    const payload = {
      bookingId: bookingId,
      doctorId: bookingData.doctorId,
      workDate: bookingData.date,
      slotId: bookingData.slot,
      slotStart: bookingData.slotStart,
      slotEnd: bookingData.slotEnd,
      notes: bookingData.notes,
    };
    // Bạn có thể truyền payload này ra ngoài qua callback nếu muốn
    // Ở đây chỉ in ra console
    console.log("[UPDATE BOOKING PAYLOAD]", payload);
    message.success(
      "Đã tạo payload cập nhật booking. Xem console để kiểm tra."
    );
    // Nếu muốn reset hoặc chuyển bước, có thể thêm logic ở đây
  };

  const steps = ["Chọn bác sĩ và lịch trình", "Xác nhận"];

  const contentComponents = [
    <DoctorScheduleSelection
      key="DoctorScheduleSelection"
      data={bookingData}
      doctors={doctors}
      onUpdate={updateData}
      onNext={next}
      onPrev={prev}
      disablePrev={true}
      loading={loading}
    />,
    <ConfirmBooking
      key="ConfirmBooking"
      data={bookingData}
      onSubmit={submitUpdate}
      onRestart={restart}
      onPrev={prev}
      disablePrev={current === 0}
      loading={loading}
    />,
  ];

  if (loading && current === 0) {
    return (
      <Layout>
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
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

export default UpdateBookingPage;
