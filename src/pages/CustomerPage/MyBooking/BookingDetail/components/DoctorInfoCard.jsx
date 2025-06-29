import React from "react";
import { Card, Descriptions, Button, Space, Tooltip } from "antd";
import { MedicineBoxOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function DoctorInfoCard({ data, docId, bookingData }) {
  const navigate = useNavigate();
  if (!data) return null;

  const handleChangeDoctor = () => {
    navigate(`/customer/updatedoctorinbooking`, {
      state: bookingData,
    });
  };

  const handleViewDetail = () => {
    navigate(`/doctordetail/${docId}`);
  };

  return (
    <Card
      title={
        <Space>
          <MedicineBoxOutlined style={{ color: "#52c41a" }} />
          Thông tin bác sĩ
          <Tooltip title="Xem chi tiết bác sĩ">
            <InfoCircleOutlined
              onClick={handleViewDetail}
              style={{ cursor: "pointer", marginLeft: 4 }}
            />
          </Tooltip>
        </Space>
      }
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

      <Button
        type="primary"
        size="small"
        style={{ marginTop: 12, fontWeight: 500 }}
        onClick={handleChangeDoctor}
      >
        Thay đổi bác sĩ
      </Button>
    </Card>
  );
}
