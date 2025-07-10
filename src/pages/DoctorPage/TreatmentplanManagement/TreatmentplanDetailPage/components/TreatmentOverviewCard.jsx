import React, { useState } from "react";
import { Card, Row, Col, Typography, Tag, Select, Input, Button, message } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const getStatusTag = (status) => {
  switch (status) {
    case 1: return <Tag color="blue">Đang điều trị</Tag>;
    case 2: return <Tag color="green">Đã hoàn thành</Tag>;
    case 3: return <Tag color="red">Đã hủy</Tag>;
    default: return <Tag>Không xác định</Tag>;
  }
};

const SERVICE_OPTIONS = {
  1: "Khám tổng quan",
  2: "IVF",
  3: "IUI",
};

export default function TreatmentOverviewCard({ treatmentPlan, onUpdate }) {
  const [status, setStatus] = useState(treatmentPlan.Status);
  const [service, setService] = useState(treatmentPlan.service?.Ser_ID);
  const [note, setNote] = useState(treatmentPlan.Result);
  const [endDate, setEndDate] = useState(treatmentPlan.EndDate || null);
  const [isEditable, setIsEditable] = useState(true); // Cho chỉnh sửa ban đầu

  const handleSave = () => {
    const updated = {
      ...treatmentPlan,
      Status: status,
      Ser_ID: service,
      Result: note,
      EndDate: (status === 2 || status === 3) ? dayjs().format("YYYY-MM-DD") : null,
    };

    if (updated.EndDate) {
      setEndDate(updated.EndDate);
    }

    message.success("Cập nhật thành công (giả lập)");
    console.log("📋 Dữ liệu cập nhật:", updated);

    // Sau khi cập nhật là hoàn thành hoặc hủy → không cho chỉnh nữa
    if (status === 2 || status === 3) {
      setIsEditable(false);
    }

    if (onUpdate) onUpdate();
  };

  return (
    <Card
      title={<Text strong>Tổng quan hồ sơ bệnh án</Text>}
      bodyStyle={{ backgroundColor: "#fff0f5" }}
      extra={
        isEditable && (
          <Button onClick={handleSave} style={{ backgroundColor: "#f78db3", color: "#fff", border: "none" }}>
            Lưu cập nhật
          </Button>
        )
      }
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Text strong>Ngày bắt đầu:</Text><br />
          <Text>{treatmentPlan.StartDate}</Text>
        </Col>

        {endDate && (
          <Col span={12}>
            <Text strong>Ngày kết thúc:</Text><br />
            <Text>{endDate}</Text>
          </Col>
        )}

        <Col span={12}>
          <Text strong>Trạng thái:</Text><br />
          {isEditable ? (
            <Select value={status} onChange={setStatus} style={{ width: "100%" }}>
              <Option value={1}>Đang điều trị</Option>
              <Option value={2}>Đã hoàn thành</Option>
              <Option value={3}>Đã hủy</Option>
            </Select>
          ) : (
            getStatusTag(status)
          )}
        </Col>

        <Col span={24}>
          <Text strong>Ghi chú:</Text><br />
          {isEditable ? (
            <TextArea rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
          ) : (
            <Text>{note}</Text>
          )}
        </Col>

        <Col span={24}>
          <Text strong>Dịch vụ điều trị:</Text><br />
          {isEditable ? (
            <Select value={service} onChange={setService} style={{ width: "100%" }}>
              {Object.entries(SERVICE_OPTIONS).map(([id, name]) => (
                <Option key={id} value={parseInt(id)}>{name}</Option>
              ))}
            </Select>
          ) : (
            <Text>{SERVICE_OPTIONS[service]}</Text>
          )}
        </Col>
      </Row>
    </Card>
  );
}
