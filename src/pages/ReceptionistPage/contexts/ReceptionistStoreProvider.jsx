import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { message } from "antd";
import { getInfo } from "../../../apis/authService";
import { useNavigate } from "react-router-dom";

export const ReceptionistStoreContext = createContext();

const mockReceptionistInfo = {
  receptionistId: 1,
  fullName: "Nguyễn Thị Lễ Tân",
  email: "receptionist@example.com",
  phone: "0909123456",
  img: "/anhthinh.jpg",
  role: "Receptionist",
};

const ReceptionistStoreProvider = ({ children }) => {
  const [receptionistInfo, setReceptionistInfo] = useState(null);
  const [receptionistId, setReceptionistId] = useState(
    Cookies.get("accReceptionistId")
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("accReceptionistId");
    setReceptionistInfo(null);
    navigate("/receptionistSignin");
  };

  useEffect(() => {
    if (receptionistId) {
      getInfo()
        .then((res) => {
          if (res.data.success) {
            setReceptionistInfo(res.data.data);
          } else {
            message.error(res.data.message);
            Cookies.remove("token");
            Cookies.remove("accReceptionistId");
            setReceptionistInfo(null);
            navigate("/receptionistSignin");
          }
        })
        .catch((err) => {
          setReceptionistInfo(mockReceptionistInfo); // fallback to mock
        });
    }
  }, [receptionistId]);

  return (
    <ReceptionistStoreContext.Provider
      value={{
        receptionistInfo,
        setReceptionistInfo,
        receptionistId,
        setReceptionistId,
        handleLogout,
      }}
    >
      {children}
    </ReceptionistStoreContext.Provider>
  );
};

export default ReceptionistStoreProvider;
