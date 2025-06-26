import React, { useState } from "react";
import { Steps, Button, message } from "antd";
import { useNavigate } from "react-router-dom"; // ⬅️ Thêm dòng này
import CustomerInfo from "../components/CustomerInfo";
import DoctorSelection from "../components/DoctorSelection";
import Schedule from "../components/Schedule";
import ConfirmBooking from "../components/ConfirmBooking";
import { Booking } from "../../../apis/bookingService";

const steps = ["Patient Info", "Select Doctor", "Choose Date", "Confirm"];

const BookingPage = () => {
  const [current, setCurrent] = useState(0);
  const [bookingData, setBookingData] = useState({});
  const navigate = useNavigate(); // ⬅️ Khởi tạo

  const next = () => {
    if (current === 2 && (!bookingData.date || !bookingData.slot)) {
      return message.warning("Please select both date and time slot.");
    }
    setCurrent(current + 1);
  };

  const prev = () => setCurrent(current - 1);

  const updateData = (data) => setBookingData((prev) => ({ ...prev, ...data }));

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

      console.log("Payload gửi đi:", payload);
      const res = await Booking(payload);
      console.log("Booking success:", res.data);
      message.success("Đặt lịch thành công!");
      const bookingId = res.data.data.bookingId;
      // ⬇️ Điều hướng sau khi thành công
      navigate(`/bookingDetail/${bookingId}`); // Thay đổi đường dẫn nếu cần
    } catch (error) {
      console.error("Lỗi đặt lịch:", error);
      message.error(error.response?.data?.message || "Lỗi khi đặt lịch.");
    }
  };

  const restart = () => setCurrent(0);

  const contentMap = [
    <CustomerInfo data={bookingData} onUpdate={updateData} onNext={next} />,
    <DoctorSelection
      data={bookingData}
      onUpdate={updateData}
      onNext={next}
      onPrev={prev}
    />,
    <Schedule data={bookingData} onUpdate={updateData} />,
    <ConfirmBooking
      data={bookingData}
      onSubmit={submitBooking}
      onRestart={restart}
    />,
  ];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <Steps current={current} style={{ marginBottom: 24 }}>
        {steps.map((title, idx) => (
          <Steps.Step key={idx} title={title} />
        ))}
      </Steps>

      <div>{contentMap[current]}</div>

      {current < steps.length - 1 && current !== 0 && current !== 1 && (
        <div style={{ marginTop: 24, textAlign: "right" }}>
          <Button type="primary" onClick={prev} style={{ marginRight: 8 }}>
            Previous
          </Button>
          <Button type="primary" onClick={next}>
            Next Step
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
