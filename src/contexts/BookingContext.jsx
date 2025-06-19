import { createContext, useContext, useState, useEffect } from "react";
import BookingModal from "~components/formModal/BookingModal";
import Cookies from "js-cookie";
import { message } from "antd";
const BookingContext = createContext();
export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const [doctor, setDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const showBooking = (doctorId) => {
    if (!Cookies.get("userId")) {
      message.warning("Bạn cần đăng nhập để đặt lịch!");
    } else {
      const selectedDoctor = doctors.find((d) => d.doctorId === doctorId);
      setDoctor(selectedDoctor || null);
      setOpen(true);
    }
  };
  const hideBooking = () => setOpen(false);

  // Load dữ liệu khi modal mở
  useEffect(() => {
    if (open) {
      loadDoctors();
      loadSchedules();
    } else {
      loadDoctors();
    }
  }, [open]);

  // 🧪 Mock: load bác sĩ
  const loadDoctors = async () => {
    const mockDoctors = [
      {
        doctorId: 1,
        doctorName: "Anh Cường",
        image: "/anhcuong.jpg",
        star: 5,
        status: 1,
        certification: [
          "Chứng chỉ hành nghề khám chữa bệnh",
          "Chứng chỉ chuyên ngành Nhi khoa",
          "Chứng chỉ BLS (Basic Life Support)",
        ],
      },

      {
        doctorId: 2,
        doctorName: "Anh Huỳnh",
        image: "/anhhuynh.png",
        star: 4.8,
        status: 2,
        certification: [
          "Chứng chỉ hành nghề khám chữa bệnh",
          "Chứng chỉ chuyên ngành Nội tổng quát",
          "Chứng chỉ ACLS (Advanced Cardiovascular Life Support)",
        ],
      },

      {
        doctorId: 3,
        doctorName: "Lê Văn Cết",
        image: "/anhket.jpg",
        star: 4.6,
        status: 3,
        certification: [
          "Chứng chỉ hành nghề khám chữa bệnh",
          "Chứng chỉ chuyên ngành Da liễu",
          "Chứng chỉ chăm sóc da chuyên sâu",
        ],
      },

      {
        doctorId: 4,
        doctorName: "Phạm Nhàn",
        image: "/anhnhan.jpg",
        star: 4.9,
        status: 1,
        certification: [
          "Chứng chỉ hành nghề khám chữa bệnh",
          "Chứng chỉ chuyên ngành Sản phụ khoa",
          "Chứng chỉ siêu âm thai nâng cao",
        ],
      },

      {
        doctorId: 5,
        doctorName: "Hoàng Văn Huy",
        image: "/doctorhuy.jpg",
        star: 4.7,
        status: 2,
        certification: [
          "Chứng chỉ hành nghề khám chữa bệnh",
          "Chứng chỉ chuyên ngành Ngoại thần kinh",
          "Chứng chỉ phẫu thuật nội soi",
        ],
      },

      {
        doctorId: 6,
        doctorName: "Nguyễn Thị F",
        image: "/femaledoctor.jpg",
        star: 4.5,
        status: 1,
        certification: [
          "Chứng chỉ hành nghề khám chữa bệnh",
          "Chứng chỉ chuyên ngành Hồi sức cấp cứu",
          "Chứng chỉ sơ cứu nâng cao",
        ],
      },

      {
        doctorId: 7,
        doctorName: "Đặng Văn Khánh",
        image: "/khanhtuyensinh.jpg",
        star: 4.3,
        status: 3,
        certification: [
          "Chứng chỉ hành nghề khám chữa bệnh",
          "Chứng chỉ chuyên ngành Cơ xương khớp",
          "Chứng chỉ vật lý trị liệu",
        ],
      },

      {
        doctorId: 8,
        doctorName: "Lý Thị Hà",
        image: "/maihadoctor.jpg",
        star: 4.6,
        status: 1,
        certification: [
          "Chứng chỉ hành nghề khám chữa bệnh",
          "Chứng chỉ chuyên ngành Tiêu hóa",
          "Chứng chỉ nội soi tiêu hóa",
        ],
      },

      {
        doctorId: 9,
        doctorName: "Vũ Văn Anh",
        image: "/quocanhjpg",
        star: 4.4,
        status: 2,
        certification: [
          "Chứng chỉ hành nghề khám chữa bệnh",
          "Chứng chỉ chuyên ngành Thần kinh",
          "Chứng chỉ điện não đồ chuyên sâu",
        ],
      },

      {
        doctorId: 10,
        doctorName: "ThinhDP",
        image: "/anhthinhbg.png",
        star: 4.9,
        status: 1,
        certification: [
          "Chứng chỉ hành nghề khám chữa bệnh",
          "Chứng chỉ chuyên ngành Tai Mũi Họng",
          "Chứng chỉ nội soi tai mũi họng",
        ],
      },
    ];
    setDoctors(mockDoctors);
  };

  // 🧪 Mock: load lịch làm việc
  const loadSchedules = async () => {
    const mockSchedules = [
      {
        scheduleId: 1,
        doctorId: 1,
        date: "2025-06-20",
        slotId: 1,
        note: "Khám IVF buổi sáng",
        isAvailable: true,
        maxBooking: 5,
      },
      {
        scheduleId: 2,
        doctorId: 1,
        date: "2025-06-20",
        slotId: 2,
        note: "Khám tổng quát buổi chiều",
        isAvailable: true,
        maxBooking: 4,
      },
      {
        scheduleId: 3,
        doctorId: 2,
        date: "2025-06-20",
        slotId: 1,
        note: "Khám Nhi sáng",
        isAvailable: true,
        maxBooking: 4,
      },
      {
        scheduleId: 4,
        doctorId: 2,
        date: "2025-06-20",
        slotId: 2,
        note: "Tư vấn sức khỏe chiều",
        isAvailable: false,
        maxBooking: 0,
      },
      {
        scheduleId: 5,
        doctorId: 3,
        date: "2025-06-20",
        slotId: 1,
        note: "Khám Da liễu sáng",
        isAvailable: true,
        maxBooking: 6,
      },
      {
        scheduleId: 6,
        doctorId: 3,
        date: "2025-06-20",
        slotId: 2,
        note: "Điều trị da chiều",
        isAvailable: true,
        maxBooking: 5,
      },
      {
        scheduleId: 7,
        doctorId: 4,
        date: "2025-06-20",
        slotId: 1,
        note: "Khám Sản khoa sáng",
        isAvailable: true,
        maxBooking: 4,
      },
      {
        scheduleId: 8,
        doctorId: 4,
        date: "2025-06-20",
        slotId: 2,
        note: "Siêu âm thai chiều",
        isAvailable: true,
        maxBooking: 3,
      },
      {
        scheduleId: 9,
        doctorId: 5,
        date: "2025-06-20",
        slotId: 1,
        note: "Khám Ngoại thần kinh sáng",
        isAvailable: true,
        maxBooking: 4,
      },
      {
        scheduleId: 10,
        doctorId: 5,
        date: "2025-06-20",
        slotId: 2,
        note: "Tái khám hậu phẫu chiều",
        isAvailable: true,
        maxBooking: 2,
      },
      {
        scheduleId: 11,
        doctorId: 6,
        date: "2025-06-20",
        slotId: 1,
        note: "Hồi sức cấp cứu sáng",
        isAvailable: true,
        maxBooking: 5,
      },
      {
        scheduleId: 12,
        doctorId: 6,
        date: "2025-06-20",
        slotId: 2,
        note: "Tư vấn hồi sức chiều",
        isAvailable: false,
        maxBooking: 0,
      },
      {
        scheduleId: 13,
        doctorId: 7,
        date: "2025-06-20",
        slotId: 1,
        note: "Khám Cơ xương khớp sáng",
        isAvailable: true,
        maxBooking: 5,
      },
      {
        scheduleId: 14,
        doctorId: 7,
        date: "2025-06-20",
        slotId: 2,
        note: "Vật lý trị liệu chiều",
        isAvailable: true,
        maxBooking: 4,
      },
      {
        scheduleId: 15,
        doctorId: 8,
        date: "2025-06-20",
        slotId: 1,
        note: "Nội soi tiêu hóa sáng",
        isAvailable: true,
        maxBooking: 3,
      },
      {
        scheduleId: 16,
        doctorId: 8,
        date: "2025-06-20",
        slotId: 2,
        note: "Khám tiêu hóa chiều",
        isAvailable: true,
        maxBooking: 4,
      },
      {
        scheduleId: 17,
        doctorId: 9,
        date: "2025-06-20",
        slotId: 1,
        note: "Điện não đồ sáng",
        isAvailable: true,
        maxBooking: 2,
      },
      {
        scheduleId: 18,
        doctorId: 9,
        date: "2025-06-20",
        slotId: 2,
        note: "Khám Thần kinh chiều",
        isAvailable: false,
        maxBooking: 0,
      },
      {
        scheduleId: 19,
        doctorId: 10,
        date: "2025-06-20",
        slotId: 1,
        note: "Khám Tai Mũi Họng sáng",
        isAvailable: true,
        maxBooking: 5,
      },
      {
        scheduleId: 20,
        doctorId: 10,
        date: "2025-06-20",
        slotId: 2,
        note: "Nội soi TMH chiều",
        isAvailable: true,
        maxBooking: 4,
      },
    ];
    setSchedules(mockSchedules);
  };

  const handleSubmit = (values) => {
    console.log("📤 Gửi dữ liệu đặt hẹn:", values);
    // TODO: Gọi API gửi lịch hẹn
    hideBooking();
  };

  return (
    <BookingContext.Provider value={{ doctors, showBooking, hideBooking }}>
      {children}

      <BookingModal
        open={open}
        onClose={hideBooking}
        onSubmit={handleSubmit}
        doctors={doctors}
        schedules={schedules}
        doctor={doctor}
      />
    </BookingContext.Provider>
  );
};
