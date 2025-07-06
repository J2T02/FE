import React from "react";
import { Card, Typography, Space, Row, Col } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const CustomerInfoCard = ({ data }) => {
  return (
    <Card title="Thông tin khách hàng" size="small">
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Space direction="vertical" size="small">
              <Text>
                Chồng: <strong>{data?.husName || "Chưa có thông tin"}</strong>
              </Text>

              <Text>
                Năm sinh:{" "}
                <strong>
                  {dayjs(data?.husYob).format("DD/MM/YYYY") || "N/A"}
                </strong>
              </Text>
            </Space>
          </Col>
          <Col span={12}>
            <Space direction="vertical" size="small">
              <Text>
                Vợ: <strong>{data?.wifeName || "Chưa có thông tin"}</strong>
              </Text>

              <Text>
                Năm sinh:{" "}
                <strong>
                  {" "}
                  {dayjs(data?.wifeYob).format("DD/MM/YYYY") || "N/A"}
                </strong>
              </Text>
            </Space>
          </Col>
        </Row>

        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Space>
            <Text strong>Thông tin liên hệ:</Text>
          </Space>
        </Space>
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Space>
            <UserOutlined />
            <Text>
              Tài khoản:{" "}
              <strong>{data?.accCus?.fullName || "Chưa có thông tin"}</strong>
            </Text>
          </Space>
        </Space>
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Space>
            <PhoneOutlined />
            <Text>
              Số điện thoại:{" "}
              <strong>{data?.accCus?.phone || "Chưa có thông tin"}</strong>
            </Text>
          </Space>
        </Space>

        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Space>
            <MailOutlined />
            <Text>
              Email:{" "}
              <strong>{data?.accCus?.mail || "Chưa có thông tin"}</strong>
            </Text>
          </Space>
        </Space>
      </Space>
    </Card>
  );
};

export default CustomerInfoCard;
