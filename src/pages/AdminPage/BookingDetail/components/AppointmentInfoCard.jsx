import React from "react";
import { Card, Typography, Space } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const AppointmentInfoCard = ({ data }) => {
  return (
    <Card title="Thông tin lịch hẹn" size="small">
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Space>
            <CalendarOutlined />
            <Text>
              Ngày hẹn:{" "}
              <strong>
                {data?.workDate
                  ? dayjs(data.workDate).format("DD/MM/YYYY")
                  : "Chưa có thông tin"}
              </strong>
            </Text>
          </Space>
        </Space>

        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Space>
            <ClockCircleOutlined />
            <Text strong>Khung giờ:</Text>
          </Space>
          <Text>
            {data?.slot?.slotStart && data?.slot?.slotEnd
              ? `${data.slot.slotStart.slice(0, 5)} - ${data.slot.slotEnd.slice(
                  0,
                  5
                )}`
              : "Chưa có thông tin"}
          </Text>
        </Space>

        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Space>
            <EnvironmentOutlined />
            <Text strong>Ghi chú:</Text>
          </Space>
          <Text>{data?.note || "Không có ghi chú"}</Text>
        </Space>
      </Space>
    </Card>
  );
};

export default AppointmentInfoCard;
