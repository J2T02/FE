import { Card, Button, Space, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPayment } from "../../../../../apis/bookingService";
export default function ActionSection({ bookingId, isDisable, unPaid }) {
  const navigate = useNavigate();
  const handleSelect = (mode) => {
    navigate(`/bookingUpdate/:id?option=${mode}`); // bookingId cần được lấy từ props hoặc context
    // chuyển sang trang BookingUpdatePage
  };

  const handlePayment = async () => {
    try {
      const res = await createPayment(bookingId);
      const paymentUrl = res?.data?.paymentUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      }
    } catch (error) {
      Modal.error({
        title: "Lỗi thanh toán",
        content: "Không thể tạo thanh toán. Vui lòng thử lại sau.",
      });
    }
  };

  return (
    <>
      <Card title="Thao tác">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Button
            type="primary"
            block
            onClick={() => navigate(`/customer/updatebooking/${bookingId}`)}
            disabled={isDisable}
          >
            Chỉnh sửa đặt lịch
          </Button>
          <Button
            danger
            block
            onClick={() => console.log("Hủy đặt lịch")}
            disabled={isDisable}
          >
            Hủy đặt lịch
          </Button>
          <Button type="primary" block onClick={() => window.print()}>
            In thông tin
          </Button>
          {unPaid && (
            <Button
              type="primary"
              disabled={isDisable}
              block
              onClick={handlePayment}
              danger
            >
              Thanh toán
            </Button>
          )}
        </Space>
      </Card>
    </>
  );
}
