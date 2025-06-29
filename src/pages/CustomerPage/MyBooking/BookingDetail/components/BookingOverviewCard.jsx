import React from "react";
import { Card, Row, Col, Typography, Space } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

export default function BookingOverviewCard({ data }) {
  return (
    <Card
      title={
        <Space>
          <FileTextOutlined style={{ color: "#1677ff" }} />
          <Typography.Text strong>Tổng quan đặt lịch</Typography.Text>
        </Space>
      }
    >
      {/* Hàng 1: Ngày tạo | Mã đặt lịch */}
      <Row
        justify="space-between"
        gutter={[16, 16]}
        style={{ marginBottom: 16 }}
      >
        <Col xs={24} md={12}>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Ngày tạo:
          </Typography.Text>
          <br />
          <Typography.Text>{data?.createAt}</Typography.Text>
        </Col>
        <Col xs={24} md={8} mdOffset={4}>
          {/* Căn phải nhưng không sát lề */}
          <div style={{ textAlign: "left" }}>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Mã đặt lịch:
            </Typography.Text>
            <br />
            <Typography.Text strong>{data?.bookingId}</Typography.Text>
          </div>
        </Col>
      </Row>

      {/* Ghi chú */}
      <div>
        <Typography.Text strong>Ghi chú:</Typography.Text>
        <br />
        <Typography.Paragraph style={{ marginTop: 4 }}>
          {data?.note || "Không có ghi chú"}
        </Typography.Paragraph>
      </div>
    </Card>
  );
}
