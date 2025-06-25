import { Row, Col, message } from "antd";
import { useState } from "react";
import { useDoctor } from "./context/DoctorContext";
import DoctorListTable from "./components/DoctorListTable";
import DoctorDetailCard from "./components/DoctorDetailCard";
import DoctorScheduleForm from "./components/DoctorScheduleForm";
import DoctorCreateModal from "./modals/DoctorCreateModal";
import DoctorEditModal from "./modals/DoctorEditModal";
import DoctorWeeklySchedule from "./components/DoctorWeeklySchedule";
import DoctorCalendar from "./components/DoctorCalendar";
import DoctorScheduleEditModal from "./modals/DoctorScheduleEditModal";
const DoctorManagement = () => {
  const {
    doctors,
    dispatch,
    selectedDoctor,
    setSelectedDoctor,
    selectedWeekStart,
    schedules,
    certificates,
    educationLevels,
  } = useDoctor();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [isEditScheduleOpen, setIsEditScheduleOpen] = useState(false);
  const handleAddDoctor = (newDoctor) => {
    const doctor = {
      ...newDoctor,
      doctorId: Date.now(),
      status: 1,
    };
    dispatch({ type: "ADD_DOCTOR", payload: doctor });
    setIsModalOpen(false);
    message.success("Đã thêm bác sĩ");
  };

  const handleUpdateDoctor = (updatedDoctor) => {
    dispatch({ type: "UPDATE_DOCTOR", payload: updatedDoctor });
    setSelectedDoctor(updatedDoctor);
    setIsEditModalOpen(false);
    message.success("Cập nhật thông tin bác sĩ thành công");
  };

  const handleAddSchedule = (newSchedule) => {
    dispatch({ type: "ADD_SCHEDULE", payload: newSchedule });
    console.log(newSchedule);
    message.success("Đã thêm lịch làm việc");
  };
  const handleEditSchedule = (schedule) => {
    setEditingSchedule(schedule);
    setIsEditScheduleOpen(true);
  };
  const handleUpdateSchedule = (updatedSchedule) => {
    dispatch({ type: "UPDATE_SCHEDULE", payload: updatedSchedule });
    setIsEditScheduleOpen(false);
    setEditingSchedule(null);
    message.success("Cập nhật ca làm thành công");
  };
  const handleRemoveSchedule = (doctorId, date, slotId) => {
    dispatch({
      type: "REMOVE_SCHEDULE",
      payload: (s) =>
        s.doctorId === doctorId &&
        s.date === date &&
        (s.slotId === slotId || s.slotId === 3),
    });
  };

  return (
    <>
      <Row gutter={16}>
        {/* Cột trái */}
        <Col span={selectedDoctor ? 16 : 24}>
          <DoctorListTable
            data={doctors}
            onSelect={setSelectedDoctor}
            onAddDoctor={() => setIsModalOpen(true)}
          />
          <DoctorCalendar onRemove={handleRemoveSchedule} />
        </Col>

        {/* Cột phải */}
        {selectedDoctor && (
          <Col span={8}>
            <DoctorDetailCard
              doctor={selectedDoctor}
              onClose={() => setSelectedDoctor(null)}
              onEdit={() => setIsEditModalOpen(true)}
              educationLevels={educationLevels}
            />
            <DoctorWeeklySchedule
              doctorId={selectedDoctor.doctorId}
              schedules={schedules}
              weekStartDate={selectedWeekStart}
              onEditSchedule={handleEditSchedule}
            />
            <DoctorScheduleForm
              defaultDoctorId={selectedDoctor.doctorId}
              onAdd={handleAddSchedule}
            />
          </Col>
        )}
      </Row>

      <DoctorCreateModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onCreate={handleAddDoctor}
      />

      <DoctorEditModal
        open={isEditModalOpen}
        initialValues={selectedDoctor}
        onCancel={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateDoctor}
      />
      <DoctorScheduleEditModal
        open={isEditScheduleOpen}
        schedule={editingSchedule}
        onCancel={() => {
          setEditingSchedule(null);
          setIsEditScheduleOpen(false);
        }}
        onUpdate={handleUpdateSchedule}
      />
    </>
  );
};

export default DoctorManagement;
