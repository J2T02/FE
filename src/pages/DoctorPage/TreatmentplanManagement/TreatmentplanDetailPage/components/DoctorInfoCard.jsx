import React from "react";
import { Card, Typography, Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export default function DoctorInfoCard({ doctor }) {
  const navigate = useNavigate();

  return (
    <Card
      title={<Text strong>Bác sĩ chính phụ trách</Text>}
      extra={
        <Button
          shape="circle"
          icon={<InfoCircleOutlined />}
          style={{ backgroundColor: "#f78db3", color: "white", border: "none" }}
          onClick={() => navigate(`/doctordetail/${doctor?.docId}`)}
        />
      }
      bodyStyle={{ backgroundColor: "#fce6ec" }}
    >
      <Text strong>Họ tên:</Text><br /><Text>{doctor?.acc?.fullName}</Text><br />
      <Text strong>Email:</Text><br /><Text>{doctor?.acc?.mail}</Text><br />
      <Text strong>SĐT:</Text><br /><Text>{doctor?.acc?.phone}</Text>
    </Card>
  );
}
