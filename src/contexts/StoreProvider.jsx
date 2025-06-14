import { createContext, useEffect, useState } from "react";
import { getCusInfo } from "../apis/authService";
import Cookies from "js-cookie";
export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState(Cookies.get("userId"));
  const [userRole, setUserRole] = useState(Cookies.get("userRole"));
  const handleLogout = () => {
    setUserId(null);
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("userRole");
    setUserInfo(null);
    window.location.reload();
  };
  useEffect(() => {
    if (userId) {
      if (userRole == "Customer") {
        getCusInfo(userId)
          .then((res) => {
            console.log(res.data);
            setUserInfo(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (userRole == "Doctor") {
        setUserInfo({ name: "Anh Cường", avatar: "/anhcuong.jpg" });
      }
    }
  }, [userId]);
  return (
    <StoreContext.Provider
      value={{ userInfo, setUserId, setUserRole, handleLogout }}
    >
      {children}
    </StoreContext.Provider>
  );
};
