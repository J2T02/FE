import React from "react";
import { Card, Descriptions } from "antd";
import { MedicineBoxOutlined } from "@ant-design/icons";

export default function DoctorInfoCard({ data }) {
  if (!data) return null; // Tránh lỗi khi data là undefined

  return (
    <Card
      title={
        <>
          <MedicineBoxOutlined style={{ color: "#52c41a", marginRight: 8 }} />
          Thông tin bác sĩ
        </>
      }
    >
      <Descriptions column={1} size="small" colon labelStyle={{ fontWeight: 500 }}>
        <Descriptions.Item label="Tên">{data.fullName}</Descriptions.Item>
        <Descriptions.Item label="Email">{data.mail}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">{data.phone}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
}

