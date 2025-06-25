import React from "react";
import { Card, Typography, Button, Tag, Space } from "antd";
import { EnvironmentOutlined, NumberOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
import { formatCurrency } from "../../utils/formater";
import { useBooking } from "../../contexts/BookingContext";
function SeriveBanner({ title, img, price }) {
  const { showBooking } = useBooking();
  return (
    <Card
      hoverable
      cover={
        <img
          alt="Doctor and patient consulting"
          src={img}
          style={{ objectFit: "cover", height: 400 }}
        />
      }
      style={{ maxWidth: "100%", border: "1px solid #1890ff" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Title level={4} style={{ color: "#1d3b73", margin: 0 }}>
          {title}
        </Title>

        <Space wrap size={[20, 8]}>
          <Text type="secondary">
            <NumberOutlined /> HIEMMUON
          </Text>
          <Text type="secondary">
            <EnvironmentOutlined /> Thủ Đức
          </Text>
        </Space>

        <Space size="middle" align="center">
          <Text strong style={{ color: "red", fontSize: 20 }}>
            {formatCurrency(price - 0.1 * price)}
          </Text>
          <Text delete type="secondary">
            {formatCurrency(price)}
          </Text>
          <Tag color="red">-10.0%</Tag>
        </Space>

        <Button type="primary" size="large" block onClick={showBooking}>
          Đặt lịch ngay
        </Button>
      </div>
    </Card>
  );
}

export default SeriveBanner;
