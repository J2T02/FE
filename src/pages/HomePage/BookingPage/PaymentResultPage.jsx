import React, { useEffect, useState } from 'react';
import { Result, Button, Spin } from 'antd';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const PaymentResultPage = () => {
  const { id } = useParams(); // bookingId
  const location = useLocation();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const successParam = query.get('success');
    if (successParam === 'true') setIsSuccess(true);
    else if (successParam === 'false') setIsSuccess(false);
    else setIsSuccess(null); // Trường hợp thiếu tham số
  }, [location.search]);

  const handleViewBooking = () => {
    navigate(`/bookingdetail/${id}`);
  };

  if (isSuccess === null) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '20%' }}>
        <Spin size="large" tip="Đang xử lý kết quả thanh toán..." />
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '5%', textAlign: 'center' }}>
      {isSuccess ? (
        <Result
          status="success"
          title="Thanh toán thành công!"
          subTitle={`Mã đặt lịch: #${id}. Cảm ơn bạn đã sử dụng dịch vụ.`}
          extra={[
            <Button type="primary" onClick={handleViewBooking} key="detail">
              Xem chi tiết đặt lịch
            </Button>,
          ]}
        />
      ) : (
        <Result
          status="error"
          title="Thanh toán thất bại"
          subTitle={`Mã đặt lịch: #${id}. Giao dịch không thành công hoặc đã bị hủy.`}
          extra={[
            <Button type="primary" onClick={handleViewBooking} key="detail">
              Quay lại chi tiết đặt lịch
            </Button>,
          ]}
        />
      )}
    </div>
  );
};

export default PaymentResultPage;
