import { createContext, useEffect, useState } from "react";
import { getCusInfo } from "../apis/authService";
import Cookies from "js-cookie";
import CustomerInfoModal from "../components/formModal/CustomerInfoModal";
export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState(Cookies.get("userId"));
  const [userRole, setUserRole] = useState(Cookies.get("userRole"));
  const [showCustomerModal, setShowCustomerModal] = useState(false);
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
            if (res?.data?.data) {
              setUserInfo(res.data.data);
              // localStorage.setItem("userInfo", JSON.stringify(res.data.data)); // ✅ lưu vào localStorage
            } else {
              setShowCustomerModal(true); //  chưa có dữ liệu -> hiển thị modal
            }
          })
          .catch((err) => {
            setShowCustomerModal(true); //  chưa có dữ liệu -> hiển thị modal
            console.log(err);
          });
      }
      if (userRole == "Doctor") {
        setUserInfo({ name: "Anh Cường", avatar: "/anhcuong.jpg" });
      }
    }
  }, [userId]);
  const handleCustomerSubmit = (customerData) => {
    setUserInfo(customerData);
    // localStorage.setItem("userInfo", JSON.stringify(customerData));
    setShowCustomerModal(false);
  };
  return (
    <StoreContext.Provider
      value={{
        userInfo,
        setUserId,
        setUserRole,
        handleLogout,
        setShowCustomerModal,
      }}
    >
      {children}
      {showCustomerModal && (
        <CustomerInfoModal
          open={showCustomerModal}
          accId={userId} // ✅ Truyền accId
          onClose={() => setShowCustomerModal(false)}
          onCreated={handleCustomerSubmit}
        />
      )}
    </StoreContext.Provider>
  );
};
