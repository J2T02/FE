import { createContext, useEffect, useState } from "react";
import { getInfo } from "../apis/authService";
import Cookies from "js-cookie";

import { message } from "antd";
import { GetCustomerInfo } from "../apis/bookingService";
export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [accId, setAccId] = useState(Cookies.get("accId"));
  const [customerInfo, setCustomerInfo] = useState(null);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("accId");
    setUserInfo(null);
    setCustomerInfo(null);
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
      // Fetch customer info
      GetCustomerInfo(accId)
        .then((res) => {
          if (res.data.success) {
            setCustomerInfo(res.data.data);
          } else {
            setCustomerInfo(null);
          }
        })
        .catch((err) => {
          setCustomerInfo(null);
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
        customerInfo,
        setCustomerInfo,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
