import React, { createContext, useContext, useEffect, useState } from "react";
// import { getDoctorInfo } from "../apis/doctorService"; // Nếu có API thật thì dùng dòng này
import Cookies from "js-cookie";
import { message } from "antd";
import { getDoctorInfo } from "../../../apis/doctorService";
import { useNavigate } from "react-router-dom";
import { doctorStatistics } from "../../../data/mockDoctorPageData";

const DoctorStoreContext = createContext();

export const useDoctorStore = () => {
  const context = useContext(DoctorStoreContext);
  if (!context) {
    throw new Error("useDoctorStore must be used within a DoctorStoreProvider");
  }
  return context;
};

const mockDoctorInfo = {
  id: "DOC001",
  name: "BS. Nguyễn Văn A",
  specialization: "Sản phụ khoa - Hỗ trợ sinh sản",
  experience: "15 năm",
  email: "doctor.nguyenvana@fertility.com",
  phone: "0123456789",
  avatar: "https://via.placeholder.com/150",
  department: "Khoa Hỗ trợ sinh sản",
  license: "BS-12345-2024",
  education: [
    "Bác sĩ Đa khoa - Đại học Y Hà Nội (2009)",
    "Thạc sĩ Sản phụ khoa - Đại học Y Hà Nội (2012)",
    "Chứng chỉ Hỗ trợ sinh sản - Bệnh viện Từ Dũ (2015)"
  ],
  certifications: [
    "Chứng chỉ IVF/ICSI",
    "Chứng chỉ Siêu âm sản khoa",
    "Chứng chỉ Nội soi phụ khoa"
  ],
  schedule: {
    monday: "7:00 - 18:00",
    tuesday: "7:00 - 18:00",
    wednesday: "7:00 - 18:00",
    thursday: "7:00 - 18:00",
    friday: "7:00 - 18:00",
    saturday: "7:00 - 15:00",
    sunday: "8:00 - 12:00 (Cấp cứu)",
  },
  statistics: doctorStatistics,
  achievements: [
    "Bác sĩ xuất sắc năm 2023",
    "Giải thưởng nghiên cứu khoa học 2022",
    "Chứng nhận ISO 9001:2015"
  ],
  languages: ["Tiếng Việt", "English", "日本語"],
  workingHours: {
    totalHours: 55,
    consultationHours: 40,
    surgeryHours: 15
  }
};

const DoctorStoreProvider = ({ children }) => {
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [doctorId, setDoctorId] = useState(Cookies.get("accDocId")); // default 1 for demo
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("accDocId");
    setDoctorInfo(null);
    navigate("/doctorSignin");
  };

  useEffect(() => {
    if (doctorId) {
      getDoctorInfo(doctorId)
        .then((res) => {
          if (res.data.success) {
            setDoctorInfo(res.data.data);
          } else {
            message.error(res.data.message);
            Cookies.remove("token");
            Cookies.remove("accDocId");
            setDoctorInfo(null);
            navigate("/doctorSignin");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // Nếu có API thật thì gọi API lấy info bác sĩ ở đây
      // getDoctorInfo(doctorId)
      //   .then((res) => setDoctorInfo(res.data))
      //   .catch((err) => message.error("Không thể tải thông tin bác sĩ"));
      setDoctorInfo(mockDoctorInfo); // Dùng mock cho demo
    }
  }, [doctorId]);

  return (
    <DoctorStoreContext.Provider
      value={{
        doctorInfo,
        setDoctorInfo,
        doctorId,
        setDoctorId,
        handleLogout,
      }}
    >
      {children}
    </DoctorStoreContext.Provider>
  );
};

export default DoctorStoreProvider;
export { DoctorStoreContext };
