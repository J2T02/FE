import React from "react";
import { Card, Typography, Button, Space, Descriptions, Divider, Spin } from "antd";
import { UserOutlined, CalendarOutlined, ClockCircleOutlined, FileTextOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;

const ConfirmBooking = ({ data, onSubmit, onRestart, onPrev, disablePrev, loading }) => {
  const formatDate = (dateStr) => {
    return dayjs(dateStr).format("DD/MM/YYYY");
  };

  const formatTime = (timeStr) => {
    return timeStr?.substring(0, 5) || "";
  };

  const getSlotText = () => {
    if (data.slotStart && data.slotEnd) {
      return `${formatTime(data.slotStart)} - ${formatTime(data.slotEnd)}`;
    }
    return data.slot === 1 ? "08:00 - 12:00" : "13:00 - 17:00";
  };

  const getDoctorName = () => {
    return data.doctorName || "Không chọn bác sĩ cụ thể";
  };

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={3}>
            <FileTextOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            Xác nhận lịch hẹn
          </Title>
          <Text type="secondary">
            Vui lòng kiểm tra lại thông tin trước khi xác nhận
          </Text>
        </div>

        <Divider />

        <Descriptions 
          title="Thông tin lịch hẹn" 
          bordered 
          column={1}
          size="middle"
        >
          <Descriptions.Item 
            label={
              <Space>
                <CalendarOutlined />
                <Text strong>Ngày khám</Text>
              </Space>
            }
          >
            <Text>{formatDate(data.date)}</Text>
          </Descriptions.Item>

          <Descriptions.Item 
            label={
              <Space>
                <ClockCircleOutlined />
                <Text strong>Khung giờ</Text>
              </Space>
            }
          >
            <Text>{getSlotText()}</Text>
          </Descriptions.Item>

          <Descriptions.Item 
            label={
              <Space>
                <UserOutlined />
                <Text strong>Bác sĩ</Text>
              </Space>
            }
          >
            <Text>{getDoctorName()}</Text>
          </Descriptions.Item>
        </Descriptions>

        {(data.wifeName || data.husName) && (
          <>
            <Divider />
            <Descriptions 
              title="Thông tin bệnh nhân" 
              bordered 
              column={1}
              size="middle"
            >
              {data.wifeName && (
                <Descriptions.Item label="Tên vợ">
                  <Text>{data.wifeName}</Text>
                  {data.wifeYob && (
                    <Text type="secondary" style={{ marginLeft: 8 }}>
                      (Sinh năm: {dayjs(data.wifeYob).format("YYYY")})
                    </Text>
                  )}
                </Descriptions.Item>
              )}

              {data.husName && (
                <Descriptions.Item label="Tên chồng">
                  <Text>{data.husName}</Text>
                  {data.husYob && (
                    <Text type="secondary" style={{ marginLeft: 8 }}>
                      (Sinh năm: {dayjs(data.husYob).format("YYYY")})
                    </Text>
                  )}
                </Descriptions.Item>
              )}
            </Descriptions>
          </>
        )}

        {data.notes && data.notes.trim() !== "" && (
          <>
            <Divider />
            <Card size="small" title="Ghi chú">
              <Paragraph style={{ margin: 0 }}>
                {data.notes}
              </Paragraph>
            </Card>
          </>
        )}

        <Divider />

        <div style={{ textAlign: "center" }}>
          <Space size="large">
            <Button 
              type="primary" 
              onClick={onSubmit}
              size="large"
              loading={loading}
              style={{ minWidth: 140 }}
            >
              {loading ? "Đang xử lý..." : "Xác nhận đặt lịch"}
            </Button>
            
            <Button 
              type="default" 
              onClick={onRestart}
              size="large"
              icon={<EditOutlined />}
              style={{ 
                minWidth: 120,
                borderColor: '#1890ff',
                color: '#1890ff',
                fontWeight: 500
              }}
            >
              Chỉnh sửa
            </Button>
            
            {!disablePrev && (
              <Button 
                type="text" 
                onClick={onPrev}
                size="large"
              >
                Quay lại
              </Button>
            )}
          </Space>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Spin size="small" />
            <Text type="secondary" style={{ marginLeft: 8 }}>
              Đang tạo lịch hẹn...
            </Text>
          </div>
        )}
      </Space>
    </Card>
  );
};

export default ConfirmBooking;
