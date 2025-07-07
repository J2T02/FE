// File: pages/ReceptionistPage/components/CustomerInfoCard.jsx
import { Card, Typography, Space, Row, Col } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

export default function CustomerInfoCard({ data }) {
  return (
    <Card
      title={<><UserOutlined /> Thông tin khách hàng</>}
      bodyStyle={{ backgroundColor: "#fdf2f8" }} // ✅ Thêm màu nền nhẹ
    >
      <Row gutter={[16, 8]}>
        {[
          ["Tên chồng", data?.husName || "Chưa có"],
          ["Tên vợ", data?.wifeName || "Chưa có"],
          ["Năm sinh chồng", data?.husYob || "Chưa có"],
          ["Năm sinh vợ", data?.wifeYob || "Chưa có"],
        ].map(([label, value]) => (
          <Col xs={12} key={label}>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {label}
            </Typography.Text>
            <br />
            <Typography.Text>{value}</Typography.Text>
          </Col>
        ))}
      </Row>

      <Space direction="vertical" size={4} style={{ marginTop: 16 }}>
        <Typography.Text strong>Thông tin liên hệ</Typography.Text>
        <Typography.Text>
          <UserOutlined /> {data?.accCus?.fullName || "Chưa có"}
        </Typography.Text>
        <Typography.Text>
          <MailOutlined /> {data?.accCus?.mail || "Chưa có"}
        </Typography.Text>
        <Typography.Text>
          <PhoneOutlined /> {data?.accCus?.phone || "Chưa có"}
        </Typography.Text>
      </Space>
    </Card>
  );
}
