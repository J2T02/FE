import { createContext, useContext, useState, useEffect } from "react";
import BookingModal from "~components/formModal/BookingModal";

const BookingContext = createContext();
export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const [services, setServices] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const showBooking = (data = null) => {
    setDoctor(data); // chứa doctorId, serviceId,...
    setOpen(true);
  };
  const hideBooking = () => setOpen(false);

  // Load dữ liệu khi modal mở
  useEffect(() => {
    if (open) {
      loadServices();
      loadDoctors();
      loadSchedules();
    }
  }, [open]);

  // 🧪 Mock: load dịch vụ
  const loadServices = async () => {
    const mockServices = [
      { Ser_ID: 1, Ser_Name: "Khám tổng quát" },
      { Ser_ID: 2, Ser_Name: "Nội soi dạ dày" },
      { Ser_ID: 3, Ser_Name: "Xét nghiệm máu" },
    ];
    setServices(mockServices);
  };

  // 🧪 Mock: load bác sĩ (mỗi bác sĩ có serviceIds)
  const loadDoctors = async () => {
    const mockDoctors = [
      {
        Doc_ID: 1,
        Doc_Name: "BS. Nguyễn Văn A",
        serviceIds: [1, 2],
      },
      {
        Doc_ID: 2,
        Doc_Name: "BS. Trần Thị B",
        serviceIds: [1, 3],
      },
      {
        Doc_ID: 3,
        Doc_Name: "BS. Lê Văn C",
        serviceIds: [2],
      },
    ];
    setDoctors(mockDoctors);
  };

  // 🧪 Mock: load lịch làm việc
  const loadSchedules = async () => {
    const mockSchedules = [
      {
        DS_ID: 1,
        Doc_ID: 1,
        WorkDate: "2025-06-15",
        Slot: "morning",
        isAvailable: true,
      },
      {
        DS_ID: 2,
        Doc_ID: 1,
        WorkDate: "2025-06-17",
        Slot: "afternoon",
        isAvailable: true,
      },
      {
        DS_ID: 3,
        Doc_ID: 2,
        WorkDate: "2025-06-16",
        Slot: "morning",
        isAvailable: true,
      },
      {
        DS_ID: 4,
        Doc_ID: 3,
        WorkDate: "2025-06-17",
        Slot: "afternoon",
        isAvailable: true,
      },
    ];
    setSchedules(mockSchedules);
  };

  // 🔒 Hàm gửi dữ liệu sau khi user điền đầy đủ 2 bước
  const handleSubmit = (values) => {
    console.log("📤 Gửi dữ liệu đặt hẹn:", values);
    // TODO: Gọi API gửi lịch hẹn
    hideBooking();
  };

  return (
    <BookingContext.Provider value={{ showBooking, hideBooking }}>
      {children}

      <BookingModal
        open={open}
        onClose={hideBooking}
        onSubmit={handleSubmit}
        services={services}
        doctors={doctors}
        schedules={schedules}
        doctor={doctor}
      />
    </BookingContext.Provider>
  );
};
