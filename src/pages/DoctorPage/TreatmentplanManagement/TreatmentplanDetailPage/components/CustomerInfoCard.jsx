import React from "react";
import { Card, Col, Divider, Row, Typography } from "antd";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function CustomerInfoCard({ customer }) {
  return (
    <Card title={<Text strong><UserOutlined /> Thông tin khách hàng</Text>} bodyStyle={{ backgroundColor: "#fde7ef" }}>
      <Row>
        <Col span={12}>
          <Text type="secondary">Tên chồng</Text><br /><Text>{customer?.Hus_Name}</Text><br />
          <Text type="secondary">Năm sinh chồng</Text><br /><Text>{customer?.Hus_YOB}</Text>
        </Col>
        <Col span={12}>
          <Text type="secondary">Tên vợ</Text><br /><Text>{customer?.Wife_Name}</Text><br />
          <Text type="secondary">Năm sinh vợ</Text><br /><Text>{customer?.Wife_YOB}</Text>
        </Col>
      </Row>
      <Divider />
      <Text strong>Thông tin liên hệ</Text><br />
      <UserOutlined style={{ marginRight: 8 }} />
      {customer?.acc?.fullName}<br />
      <MailOutlined style={{ marginRight: 8 }} />
      {customer?.acc?.mail}<br />
      <PhoneOutlined style={{ marginRight: 8 }} />
      {customer?.acc?.phone}
    </Card>
  );
}
