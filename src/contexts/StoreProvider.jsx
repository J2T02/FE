import { createContext, useEffect, useState } from "react";
import { getInfo } from "../apis/authService";
import Cookies from "js-cookie";
export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState(Cookies.get("userId"));
  const handleLogout = () => {
    setUserId(null);
    Cookies.remove("token");
    Cookies.remove("userId");
    setUserInfo(null);
    window.location.reload();
  };
  useEffect(() => {
    if (userId) {
      setUserInfo({ name: "Anh Cường", avatar: "/anhcuong.jpg" });
    }

    // if (userId) {
    //   getInfo(userId)
    //     .then((res) => {
    //       setUserInfo(res.data.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  }, [userId]);
  return (
    <StoreContext.Provider value={{ userInfo, setUserId, handleLogout }}>
      {children}
    </StoreContext.Provider>
  );
};
