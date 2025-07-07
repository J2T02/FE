// File: pages/ReceptionistPage/components/DoctorInfoCard.jsx
import React from "react";
import { Card, Descriptions } from "antd";
import { MedicineBoxOutlined } from "@ant-design/icons";

export default function DoctorInfoCard({ data, statusId }) {
  if (!data) return null;
  // Nếu statusId khác 1 hoặc 2 thì không cho thao tác
  const isDisabled = statusId !== 1 && statusId !== 2;
  return (
    <Card
      title={
        <>
          <MedicineBoxOutlined style={{ color: "#52c41a", marginRight: 8 }} />
          Thông tin bác sĩ
        </>
      }
      bodyStyle={{ backgroundColor: "#fdf2f8" }} // ✅ Thêm màu nền nhẹ
    >
      <Descriptions
        column={1}
        size="small"
        colon
        labelStyle={{ fontWeight: 500 }}
      >
        <Descriptions.Item label="Tên">{data.fullName}</Descriptions.Item>
        <Descriptions.Item label="Email">{data.mail}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {data.phone}
        </Descriptions.Item>
      </Descriptions>
      {/* Nếu cho phép thao tác thì mới hiển thị nút thay đổi bác sĩ */}
      {/* { !isDisabled && (
        <Button type="primary">Thay đổi bác sĩ</Button>
      ) } */}
    </Card>
  );
}
