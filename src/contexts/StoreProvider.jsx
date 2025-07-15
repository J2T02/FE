import { createContext, useEffect, useState } from "react";
import { getInfo } from "../apis/authService";
import Cookies from "js-cookie";

import { message } from "antd";
import { GetCustomerInfo } from "../apis/bookingService";
import { useNavigate } from "react-router-dom";
export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [accCusId, setAccCusId] = useState(Cookies.get("accCusId"));
  const [customerInfo, setCustomerInfo] = useState(null);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("accCusId");
    setUserInfo(null);
    setCustomerInfo(null);
    window.location.href = "/";
  };
  useEffect(() => {
    if (accCusId) {
      getInfo()
        .then((res) => {
          setUserInfo(res.data.data);
        })
        .catch((err) => {
          message.error(err);
        });
      // Fetch customer info
      GetCustomerInfo(accCusId)
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
  }, [accCusId]);
  return (
    <StoreContext.Provider
      value={{
        userInfo,
        accCusId,
        setUserInfo,
        setAccCusId,
        handleLogout,
        customerInfo,
        setCustomerInfo,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
