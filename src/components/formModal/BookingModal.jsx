import { Modal, Radio, Select, DatePicker, message, Input } from "antd";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const BookingModal = ({
  open,
  onClose,
  onSubmit,
  doctors,
  schedules,
  doctor,
}) => {
  const [mode, setMode] = useState("manual");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [autoDate, setAutoDate] = useState(null);
  const [autoSlotId, setAutoSlotId] = useState(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (doctor && doctor.doctorId) {
      setSelectedDoctorId(doctor.doctorId);
    }
  }, [doctor]);

  const isDateInThisOrNextWeek = (current) => {
    const today = dayjs().startOf("day");
    const endOfNextWeek = dayjs().add(1, "week").endOf("week");
    return current && (current < today || current > endOfNextWeek);
  };

  const handleSubmit = () => {
    if (mode === "manual") {
      if (!selectedScheduleId) {
        message.warning("Vui lòng chọn lịch làm việc.");
        return;
      }

      onSubmit({
        mode,
        scheduleId: selectedScheduleId,
        doctorId: selectedDoctorId,
        note: note?.trim() || "",
      });
      setNote("");
    } else {
      if (!autoDate || !autoSlotId) {
        message.warning("Vui lòng chọn ngày và ca khám.");
        return;
      }

      onSubmit({
        mode,
        schedule: {
          date: dayjs(autoDate).format("YYYY-MM-DD"),
          slotId: autoSlotId,
        },
        doctorId: null,
        note: note?.trim() || "",
      });
      setNote("");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      title="Đặt lịch khám"
      destroyOnClose
    >
      <Radio.Group
        value={mode}
        onChange={(e) => {
          setMode(e.target.value);
          setNote("");
          if (e.target.value === "auto") {
            setSelectedDoctorId(null);
            setSelectedScheduleId(null);
          } else {
            setAutoDate(null);
            setAutoSlotId(null);
            if (doctor?.doctorId) {
              setSelectedDoctorId(doctor.doctorId);
            }
          }
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <Radio value="manual">Tôi muốn chọn bác sĩ</Radio>
        <Radio value="auto">Hệ thống chọn bác sĩ phù hợp</Radio>
      </Radio.Group>

      {mode === "manual" && (
        <>
          <Select
            placeholder="Chọn bác sĩ"
            value={selectedDoctorId}
            onChange={setSelectedDoctorId}
            style={{ width: "100%", marginBottom: 16 }}
            disabled={!!doctor}
          >
            {doctors.map((doc) => (
              <Select.Option key={doc.doctorId} value={doc.doctorId}>
                {doc.doctorName}
              </Select.Option>
            ))}
          </Select>

          <div style={{ marginTop: 8 }}>
            {schedules
              .filter((sch) => sch.isAvailable)
              .filter((sch) => sch.doctorId === selectedDoctorId)
              .map((sch) => {
                const doctorItem = doctors.find(
                  (d) => d.doctorId === sch.doctorId
                );
                return (
                  <div
                    key={sch.scheduleId}
                    onClick={() => setSelectedScheduleId(sch.scheduleId)}
                    style={{
                      border:
                        sch.scheduleId === selectedScheduleId
                          ? "2px solid #1890ff"
                          : "1px solid #ccc",
                      padding: 12,
                      marginBottom: 8,
                      borderRadius: 6,
                      cursor: "pointer",
                      background:
                        sch.scheduleId === selectedScheduleId
                          ? "#e6f7ff"
                          : "white",
                    }}
                  >
                    <div>
                      <strong>Ngày:</strong>{" "}
                      {dayjs(sch.date).format("DD/MM/YYYY")}
                    </div>
                    <div>
                      <strong>Ca:</strong>{" "}
                      {sch.slotId === 1
                        ? "Sáng"
                        : sch.slotId === 2
                        ? "Chiều"
                        : "?"}
                    </div>
                    <div>
                      <strong>Bác sĩ:</strong>{" "}
                      {doctorItem?.doctorName || "Không xác định"}
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}

      {mode === "auto" && (
        <div style={{ marginBottom: 16 }}>
          <DatePicker
            value={autoDate}
            onChange={setAutoDate}
            style={{ width: "100%", marginBottom: 12 }}
            placeholder="Chọn ngày khám"
            disabledDate={isDateInThisOrNextWeek}
          />
          <Radio.Group
            value={autoSlotId}
            onChange={(e) => setAutoSlotId(e.target.value)}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Radio.Button value={1}>Sáng</Radio.Button>
            <Radio.Button value={2}>Chiều</Radio.Button>
          </Radio.Group>
        </div>
      )}

      {(selectedScheduleId || (autoDate && autoSlotId)) && (
        <Input.TextArea
          placeholder="Nhập nội dung khám (tùy chọn)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          style={{ marginTop: 16 }}
        />
      )}
    </Modal>
  );
};

export default BookingModal;
