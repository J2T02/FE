import React, { useState, useEffect } from "react";
import { Card, Radio, Typography, Space, Button, message, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title, Text } = Typography;

const UpdateDoctorInBooking = ({ bookingId, currentDoctorId, onBack }) => {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(currentDoctorId || null);
  const [doctors, setDoctors] = useState([
    {
      doctorId: 1,
      name: "BS. Nguyễn Văn A",
      gender: "Nam",
      yob: 1980,
      mail: "nguyenvana@example.com",
      phone: "0909123456",
      experience: 15,
    },
    {
      doctorId: 2,
      name: "BS. Trần Thị B",
      gender: "Nữ",
      yob: 1985,
      mail: "tranthib@example.com",
      phone: "0911234567",
      experience: 12,
    },
    {
      doctorId: 3,
      name: "BS. Phạm Văn C",
      gender: "Nam",
      yob: 1990,
      mail: "phamvanc@example.com",
      phone: "0922345678",
      experience: 8,
    },
    {
      doctorId: 4,
      name: "BS. Lê Thị D",
      gender: "Nữ",
      yob: 1982,
      mail: "lethid@example.com",
      phone: "0933456789",
      experience: 10,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load danh sách bác sĩ (nếu dùng API thật)
  useEffect(() => {
    // const fetchDoctors = async () => {
    //   try {
    //     setLoading(true);
    //     const res = await GetAllDoctor();
    //     setDoctors(res.data.data || []);
    //   } catch (error) {
    //     console.error("Lỗi khi lấy danh sách bác sĩ:", error);
    //     message.error("Không thể tải danh sách bác sĩ.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchDoctors();
  }, []);

  const handleRadioChange = (value) => {
    setSelectedDoctor((prev) => (prev === value ? null : value));
  };

  const handleUpdateDoctor = async () => {
    if (!selectedDoctor || selectedDoctor === currentDoctorId) {
      message.warning("Vui lòng chọn một bác sĩ mới.");
      return;
    }

    try {
      setSubmitting(true);
      await axios.put(`/api/Booking/UpdateDoctor/${bookingId}`, {
        doctorId: selectedDoctor,
      });
      message.success("Cập nhật bác sĩ thành công.");
      navigate(`/booking-detail/${bookingId}`);
    } catch (error) {
      console.error("Lỗi khi cập nhật bác sĩ:", error);
      message.error("Cập nhật thất bại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Title level={3}>Chọn bác sĩ bạn muốn đổi</Title>

        <Radio.Group
          onChange={(e) => handleRadioChange(e.target.value)}
          value={selectedDoctor}
          style={{ width: "100%" }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            {doctors.map((doc) => (
              <Card
                key={doc.doctorId}
                title={
                  <Space>
                    {doc.name}
                    <Tooltip title="Xem chi tiết bác sĩ">
                      <InfoCircleOutlined
                        onClick={() => navigate(`/doctor-detail/${doc.doctorId}`)}
                        style={{ marginLeft: 4, cursor: "pointer" }}
                      />
                    </Tooltip>
                  </Space>
                }
                extra={<Radio value={doc.doctorId} />}
                style={{
                  backgroundColor:
                    selectedDoctor === doc.doctorId ? "#e6f7ff" : "#fff",
                  border:
                    selectedDoctor === doc.doctorId ? "1px solid #1890ff" : undefined,
                }}
              >
                <Text><b>Giới tính:</b> {doc.gender}</Text>
                <br />
                <Text><b>Năm sinh:</b> {doc.yob}</Text>
                <br />
                <Text><b>Kinh nghiệm:</b> {doc.experience} năm</Text>
                <br />
                <Text><b>Email:</b> {doc.mail}</Text>
                <br />
                <Text><b>Số điện thoại:</b> {doc.phone}</Text>
              </Card>
            ))}
          </Space>
        </Radio.Group>

        <div style={{ marginTop: 24, textAlign: "right" }}>
          <Button onClick={onBack} style={{ marginRight: 8 }}>
            Hủy
          </Button>
          <Button
            type="primary"
            onClick={handleUpdateDoctor}
            loading={submitting}
            disabled={
              !selectedDoctor || selectedDoctor === currentDoctorId || submitting
            }
          >
            Xác nhận thay đổi
          </Button>
        </div>
      </Space>
    </div>
  );
};

export default UpdateDoctorInBooking;