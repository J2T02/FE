import React from "react";
import { Card, Typography, Space, Tag } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  TrophyOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const DoctorInfoCard = ({ data, docId }) => {
  return (
    <Card title="Thông tin bác sĩ" size="small">
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Space>
            <UserOutlined />
            <Text>Tên bác sĩ:</Text>
            <Text strong>{data?.fullName || "Chưa có thông tin"}</Text>
          </Space>
        </Space>

        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Space>
            <PhoneOutlined />
            <Text>Số điện thoại:</Text>
            <Text strong>{data?.phone || "Chưa có thông tin"}</Text>
          </Space>
        </Space>

        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Space>
            <MailOutlined />
            <Text>Email:</Text>
            <Text strong>{data?.mail || "Chưa có thông tin"}</Text>
          </Space>
        </Space>
      </Space>
    </Card>
  );
};

export default DoctorInfoCard;
