import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { message } from "antd";
import { getInfo } from "../../../apis/authService";
import { useNavigate } from "react-router-dom";
import { getTreatmentList } from "../../../apis/treatmentService";
import { getDoctorList } from "../../../apis/doctorService";
import { GetAllService } from "../../../apis/service";
export const ReceptionistStoreContext = createContext();

const ReceptionistStoreProvider = ({ children }) => {
  const [receptionistInfo, setReceptionistInfo] = useState(null);
  const [receptionistId, setAccRecepId] = useState(Cookies.get("accRecepId"));
  const [treatmentList, setTreatmentList] = useState([]);
  const [treatmentListLoading, setTreatmentListLoading] = useState(false);
  const [doctorList, setDoctorList] = useState([]);
  const [doctorListLoading, setDoctorListLoading] = useState(false);
  const [serviceList, setServiceList] = useState([]);
  const [serviceListLoading, setServiceListLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("accRecepId");
    setReceptionistInfo(null);
    navigate("/");
  };

  const fetchTreatmentList = async () => {
    setTreatmentListLoading(true);
    try {
      const res = await getTreatmentList();
      if (res.data && res.data.success) {
        setTreatmentList(res.data.data);
      } else {
        setTreatmentList([]);
      }
    } catch (err) {
      setTreatmentList([]);
    } finally {
      setTreatmentListLoading(false);
    }
  };

  const fetchDoctorList = async () => {
    setDoctorListLoading(true);
    try {
      const res = await getDoctorList();
      if (res.data && res.data.success) {
        setDoctorList(res.data.data);
      } else {
        setDoctorList([]);
      }
    } catch (err) {
      setDoctorList([]);
    } finally {
      setDoctorListLoading(false);
    }
  };

  const fetchServiceList = async () => {
    setServiceListLoading(true);
    try {
      const res = await GetAllService();
      if (res.data && res.data.success) {
        setServiceList(res.data.data);
      } else {
        setServiceList([]);
      }
    } catch (err) {
      setServiceList([]);
    } finally {
      setServiceListLoading(false);
    }
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
            Cookies.remove("accRecepId");
            setReceptionistInfo(null);
            navigate("/");
          }
        })
        .catch((err) => {
          setReceptionistInfo(mockReceptionistInfo); // fallback to mock
        });
      fetchTreatmentList();
      fetchDoctorList();
      fetchServiceList();
    }
  }, [receptionistId]);

  return (
    <ReceptionistStoreContext.Provider
      value={{
        receptionistInfo,
        setReceptionistInfo,
        receptionistId,
        setAccRecepId,
        handleLogout,
        treatmentList,
        treatmentListLoading,
        fetchTreatmentList,
        doctorList,
        doctorListLoading,
        fetchDoctorList,
        serviceList,
        serviceListLoading,
        fetchServiceList,
      }}
    >
      {children}
    </ReceptionistStoreContext.Provider>
  );
};

export default ReceptionistStoreProvider;
