import { Modal, Form, Select, Button, Input, DatePicker, message } from "antd";
import { useEffect, useState } from "react";
import BookingFormWrapper from "./bookingModal/BookingFormWrapper";
const BookingModal = ({
  open,
  onClose,
  onSubmit,
  services,
  doctors,
  schedules,
  doctor,
}) => {
  return (
    <Modal open={open} onCancel={onClose} footer={null} width={700}>
      <div className="bookingForm" style={{ paddingTop: 40 }}>
        <BookingFormWrapper
          services={services}
          doctors={doctors}
          schedules={schedules}
          doctor={doctor}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
};

export default BookingModal;
