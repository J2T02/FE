import React, { useEffect, useState } from "react";
import { Result, Button, Spin, Layout } from "antd";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";

const PaymentResultPage = () => {
  const { id } = useParams(); // BookingId
  const location = useLocation();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const successParam = query.get("success");

    if (successParam === "true") setIsSuccess(true);
    else if (successParam === "false") setIsSuccess(false);
    else setIsSuccess(null); // unexpected or missing param
  }, [location.search]);

  const handleViewBooking = () => {
    navigate(`/bookingdetail/${id}`);
  };

  const renderLoading = () => (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin size="large" tip="Đang xử lý kết quả thanh toán..." />
    </div>
  );

  const renderResult = () => {
    if (isSuccess === true) {
      return (
        <Result
          status="success"
          title="Thanh toán thành công!"
          subTitle={`Mã đặt lịch: #${id}. Cảm ơn bạn đã sử dụng dịch vụ.`}
          extra={[
            <Button type="primary" onClick={handleViewBooking} key="detail">
              Xem chi tiết đặt lịch
            </Button>,
            <Button key="home" onClick={() => navigate("/")}>
              Về trang chủ
            </Button>,
          ]}
        />
      );
    }

    return (
      <Result
        status="error"
        title="Thanh toán thất bại"
        subTitle={`Mã đặt lịch: #${id}. Giao dịch không thành công hoặc đã bị hủy.`}
        extra={[
          <Button type="primary" onClick={handleViewBooking} key="detail">
            Quay lại chi tiết đặt lịch
          </Button>,
          <Button key="home" onClick={() => navigate("/")}>
            Về trang chủ
          </Button>,
        ]}
      />
    );
  };

  return (
    <Layout>
      <Header />
      <div style={{ paddingTop: 48, paddingBottom: 48, minHeight: "70vh" }}>
        {isSuccess === null ? renderLoading() : renderResult()}
      </div>
      <Footer />
    </Layout>
  );
};

export default PaymentResultPage;
