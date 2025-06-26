import { Button, message } from "antd";

const ConfirmUpdateStep = ({
  selectedDoctorId,
  selectedSchedule,
  bookingId,
  onPrev,
  doctors,
}) => {
  const doctor = doctors.find((d) => d.doctorId === selectedDoctorId);

  const handleConfirm = () => {
    // Ở đây bạn có thể gọi API cập nhật, hiện tại mock luôn thành công
    message.success("Cập nhật lịch hẹn thành công");
  };

  return (
    <div>
      <p>
        <b>Mã lịch hẹn:</b> {bookingId}
      </p>
      <p>
        <b>Bác sĩ:</b> {doctor ? doctor.name : "Không rõ"}
      </p>
      <p>
        <b>Ngày:</b> {selectedSchedule?.date || "Chưa chọn"}
      </p>
      <p>
        <b>Ca:</b> {selectedSchedule?.slotId === 1 ? "Sáng" : "Chiều"}
      </p>

      <Button onClick={onPrev} style={{ marginRight: 8 }}>
        Quay lại
      </Button>
      <Button type="primary" onClick={handleConfirm}>
        Xác nhận cập nhật
      </Button>
    </div>
  );
};

export default ConfirmUpdateStep;
