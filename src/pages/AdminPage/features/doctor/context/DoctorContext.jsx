import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import dayjs from "dayjs";
import doctorReducer, { initialState } from "./doctorReducer";
import { doctorApi } from "../services/doctorApi";
import { certificateApi } from "../services/certificateApi";
import { educationLevelApi } from "../services/EducationLevel";
import slotData from "./slotData";
const DoctorContext = createContext();
export const useDoctor = () => useContext(DoctorContext);

export const DoctorProvider = ({ children }) => {
  const [state, dispatch] = useReducer(doctorReducer, initialState);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedWeekStart, setSelectedWeekStart] = useState(
    dayjs().startOf("week").add(1, "day")
  );

  // 🔃 Load dữ liệu khi app khởi chạy
  useEffect(() => {
    const fetchData = async () => {
      const [doctors, schedules, certificates, educationLevels] =
        await Promise.all([
          doctorApi.getDoctors(),
          doctorApi.getSchedules(),
          certificateApi.getCertificates(),
          educationLevelApi.getEducationLevels(),
        ]);
      dispatch({ type: "SET_DOCTORS", payload: doctors });
      dispatch({ type: "SET_SCHEDULES", payload: schedules });
      dispatch({ type: "SET_CERTIFICATES", payload: certificates });
      dispatch({ type: "SET_EDUCATION_LEVELS", payload: educationLevels });
    };
    fetchData();
  }, []);

  const value = {
    ...state, // { doctors, schedules, selectedDoctor,educationLevels }
    dispatch,
    selectedDoctor,
    setSelectedDoctor,
    selectedWeekStart,
    setSelectedWeekStart,
    slots: slotData,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};
