import React from "react";
import { Card, Typography, Button, Space } from "antd";

const { Title, Text, Paragraph } = Typography;

const ConfirmBooking = ({ data, onSubmit, onRestart }) => {
  console.log(data);
  return (
    <Card>
      <Title level={4}>Xác nhận lịch hẹn</Title>
      <Paragraph>
        {data.date ? (
          <>
            <Text strong>Ngày:</Text> {data.date} <br />
          </>
        ) : null}

        {data.slotStart && data.slotEnd ? (
          <>
            <Text strong>Khung giờ:</Text> {data.slotStart} - {data.slotEnd}{" "}
            <br />
          </>
        ) : null}

        {data.doctorId !== undefined && data.doctorId !== null ? (
          <>
            <Text strong>Bác sĩ:</Text> {data.doctorName || `#${data.doctorId}`}{" "}
            <br />
          </>
        ) : null}

        {data.wifeName || data.wifeDob ? (
          <>
            <Text strong>Vợ:</Text> {data.wifeName || ""}{" "}
            {data.wifeDob ? `(${data.wifeDob})` : ""} <br />
          </>
        ) : null}

        {data.husbandName || data.husbandDob ? (
          <>
            <Text strong>Chồng:</Text> {data.husbandName || ""}{" "}
            {data.husbandDob ? `(${data.husbandDob})` : ""} <br />
          </>
        ) : null}

        {data.notes && data.notes.trim() !== "" ? (
          <>
            <Text strong>Ghi chú:</Text> {data.notes} <br />
          </>
        ) : null}
      </Paragraph>

      <Space>
        <Button type="primary" onClick={onRestart}>
          Chỉnh sửa
        </Button>
        <Button type="primary" onClick={onSubmit}>
          Xác nhận
        </Button>
      </Space>
    </Card>
  );
};

export default ConfirmBooking;
