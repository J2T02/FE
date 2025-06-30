import { createContext, useEffect, useState } from "react";
// import { getDoctorInfo } from "../apis/doctorService"; // Nếu có API thật thì dùng dòng này
import Cookies from "js-cookie";
import { message } from "antd";
import { getDoctorInfo } from "../../../apis/doctorService";
import { useNavigate } from "react-router-dom";
export const DoctorStoreContext = createContext();

const mockDoctorInfo = {
  doctorId: 1,
  doctorName: "Nguyễn Văn A",
  email: "bs.a@gmail.com",
  phone: "0909123456",
  gender: 1,
  yob: "1990-06-01",
  img: "/anhcuong.jpg",
  experience: 4,
  status: 1,
  eduId: 1,
  filePathEdu: "https://fap.fpt.edu.vn/",
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
