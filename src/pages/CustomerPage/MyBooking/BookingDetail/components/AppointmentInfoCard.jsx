import React from "react";
import { Card, Typography, Space, Button } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function AppointmentInfoCard({ data, docId, isDisable }) {
  const navigate = useNavigate();

  const handleChangeSchedule = () => {
    navigate(`/customer/updatescheduleinbooking/${data?.bookingId}`, {
      state: { bookingData: data, docId: data.docId },
    });
  };

  return (
    <Card
      title={
        <>
          <CalendarOutlined /> Thông tin lịch hẹn
        </>
      }
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Space direction="vertical" size={0}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Ngày hẹn
          </Typography.Text>
          <Typography.Text>
            {new Date(data?.workDate).toLocaleDateString("vi-VN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography.Text>
        </Space>

        <Space direction="vertical" size={0}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Khung giờ
          </Typography.Text>
          <Typography.Text>
            {data?.slot?.slotStart} - {data?.slot?.slotEnd}
          </Typography.Text>
        </Space>

        <Button
          type="primary"
          size="small"
          style={{ marginTop: 4, fontWeight: 500 }}
          onClick={handleChangeSchedule}
          disabled={isDisable}
        >
          Thay đổi lịch hẹn
        </Button>
      </Space>
    </Card>
  );
}
