import { createContext, useEffect, useState } from "react";
import { getInfo } from "../apis/authService";
import Cookies from "js-cookie";

import { message } from "antd";
export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [accId, setAccId] = useState(Cookies.get("accId"));

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("accId");
    setUserInfo(null);
    window.location.reload();
  };
  useEffect(() => {
    if (accId) {
      getInfo()
        .then((res) => {
          setUserInfo(res.data.data);
        })
        .catch((err) => {
          message.error(err);
        });
    }
  }, [accId]);
  return (
    <StoreContext.Provider
      value={{
        userInfo,
        setUserInfo,
        setAccId,
        handleLogout,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
