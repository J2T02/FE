import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { message } from "antd";
import { getDoctorInfoByAccId } from "../../../apis/doctorService";
import { useNavigate } from "react-router-dom";
export const DoctorStoreContext = createContext();

const DoctorStoreProvider = ({ children }) => {
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [accDoctorId, setDoctorId] = useState(Cookies.get("accDocId"));
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("accDocId");
    setDoctorInfo(null);
    navigate("/doctorSignin");
  };

  useEffect(() => {
    if (accDoctorId) {
      getDoctorInfoByAccId(accDoctorId)
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
    }
  }, [accDoctorId]);

  return (
    <DoctorStoreContext.Provider
      value={{
        doctorInfo,
        // setDoctorInfo,
        handleLogout,
      }}
    >
      {children}
    </DoctorStoreContext.Provider>
  );
};

export default DoctorStoreProvider;
