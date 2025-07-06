import React from "react";
import { Card, Row, Col, Typography, Space } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Text, Title } = Typography;

const BookingOverviewCard = ({ data }) => {
  return (
    <Card>
      <Row gutter={[24, 16]}>
        <Col xs={24} md={8}>
          <Space direction="vertical" size="small">
            <Space>
              <CalendarOutlined style={{ color: "#1890ff" }} />
              <Text strong>Ngày hẹn:</Text>
            </Space>
            <Text>
              {data?.schedule?.workDate
                ? dayjs(data.schedule.workDate).format("DD/MM/YYYY")
                : "Chưa có thông tin"}
            </Text>
          </Space>
        </Col>
        <Col xs={24} md={8}>
          <Space direction="vertical" size="small">
            <Space>
              <ClockCircleOutlined style={{ color: "#52c41a" }} />
              <Text strong>Khung giờ:</Text>
            </Space>
            <Text>
              {data?.slot?.slotStart && data?.slot?.slotEnd
                ? `${data.slot.slotStart.slice(
                    0,
                    5
                  )} - ${data.slot.slotEnd.slice(0, 5)}`
                : "Chưa có thông tin"}
            </Text>
          </Space>
        </Col>
        <Col xs={24} md={8}>
          <Space direction="vertical" size="small">
            <Space>
              <UserOutlined style={{ color: "#722ed1" }} />
              <Text strong>Bác sĩ:</Text>
            </Space>
            <Text>{data?.doc?.accDoc?.fullName || "Chưa có thông tin"}</Text>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default BookingOverviewCard;
