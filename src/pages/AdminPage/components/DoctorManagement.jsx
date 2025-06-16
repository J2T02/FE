import { useState } from "react";
import { Row, Col, message } from "antd";
import dayjs from "dayjs";

import DoctorListTable from "./doctor/DoctorListTable";
import DoctorCreateModal from "./doctor/DoctorCreateModal";
import DoctorCalendar from "./doctor/DoctorCalendar";
import DoctorDetailCard from "./doctor/DoctorDetailCard";
import DoctorWeeklySchedule from "./doctor/DoctorWeeklySchedule";
import DoctorScheduleForm from "./doctor/DoctorScheduleForm";
import DoctorEditModal from "./doctor/DoctorEditModal";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      fullName: "Nguyễn Văn A",
      email: "bs.a@gmail.com",
      phone: "0909123456",
      specialty: "IVF",
      startDate: "2021-06-01",
      status: "Đang làm việc",
    },
    {
      id: 2,
      name: "Trần Thị B",
      fullName: "Trần Thị B",
      email: "bs.b@gmail.com",
      phone: "0912345678",
      specialty: "IUI",
      startDate: "2022-01-15",
      status: "Đang làm việc",
    },
  ]);

  const [schedules, setSchedules] = useState([
    {
      doctorId: 1,
      date: "2024-06-17",
      start: "08:00",
      end: "17:00",
      note: "",
    },
    {
      doctorId: 2,
      date: "2024-06-17",
      start: "13:00",
      end: "17:00",
      note: "Buổi chiều",
    },
    {
      doctorId: 1,
      date: "2024-06-18",
      start: "08:00",
      end: "12:00",
    },
  ]);
  const [selectedWeekStart, setSelectedWeekStart] = useState(
    dayjs().startOf("week").add(1, "day")
  );
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleAddDoctor = (newDoctor) => {
    const fullName =
      newDoctor.fullName || `${newDoctor.lastName} ${newDoctor.firstName}`;
    const doctor = {
      ...newDoctor,
      id: Date.now(),
      name: fullName,
      fullName,
      status: "Đang làm việc",
    };
    setDoctors((prev) => [...prev, doctor]);
    message.success("Đã thêm bác sĩ");
    setIsModalOpen(false);
  };

  const handleAddSchedule = (schedule) => {
    setSchedules((prev) => [...prev, schedule]);
    message.success("Đã thêm lịch làm việc");
  };

  const handleRemoveDoctorFromDate = (doctorId, date) => {
    setSchedules((prev) =>
      prev.filter(
        (s) =>
          !(s.doctorId === doctorId && dayjs(s.date).isSame(dayjs(date), "day"))
      )
    );
  };

  return (
    <>
      <DoctorCreateModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onCreate={handleAddDoctor}
      />

      <Row gutter={16}>
        {/* Cột trái */}
        <Col span={selectedDoctor ? 16 : 24}>
          <DoctorListTable
            data={doctors}
            onAddDoctor={() => setIsModalOpen(true)}
            onSelect={setSelectedDoctor}
          />

          <DoctorCalendar
            data={schedules}
            doctors={doctors}
            onRemoveDoctorFromDate={handleRemoveDoctorFromDate}
            selectedWeekStart={selectedWeekStart}
            onChangeWeekStart={(val) => setSelectedWeekStart(dayjs(val))}
          />
        </Col>

        {/* Cột phải - Có thể đóng */}
        {selectedDoctor && (
          <Col span={8}>
            <DoctorDetailCard
              doctor={selectedDoctor}
              onClose={() => setSelectedDoctor(null)}
              onEdit={() => setIsEditModalOpen(true)}
            />
            <DoctorWeeklySchedule
              doctorId={selectedDoctor.id}
              schedules={schedules}
              weekStartDate={selectedWeekStart}
            />
            <DoctorScheduleForm
              doctors={doctors}
              defaultDoctorId={selectedDoctor.id}
              onAdd={handleAddSchedule}
            />
          </Col>
        )}
      </Row>
      <DoctorEditModal
        open={isEditModalOpen}
        doctor={selectedDoctor}
        onCancel={() => setIsEditModalOpen(false)}
        onUpdate={(updatedDoctor) => {
          setDoctors((prev) =>
            prev.map((doc) =>
              doc.id === updatedDoctor.id ? updatedDoctor : doc
            )
          );
          setSelectedDoctor(updatedDoctor);
          setIsEditModalOpen(false);
          message.success("Cập nhật thông tin bác sĩ thành công");
        }}
      />
    </>
  );
};

export default DoctorManagement;
