// File: pages/CustomerPage/MyBooking/UpdateBooking/components/DoctorSelection.jsx
import React, { useEffect, useState } from "react";
import { Card, Radio, Typography, Space, Button, message, Spin } from "antd";
import { GetAllDoctor } from "../../../../apis/bookingService";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const DoctorSelection = ({ selectedDoctor, setSelectedDoctor, onNext }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await GetAllDoctor();
        setDoctors(res.data.data || []);
      } catch (err) {
        message.error("Lỗi khi tải danh sách bác sĩ");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleNext = () => {
    if (!selectedDoctor) return message.warning("Chọn bác sĩ trước đã!");
    onNext();
  };

  return (
    <Spin spinning={loading}>
      <Radio.Group
        onChange={(e) => setSelectedDoctor(e.target.value)}
        value={selectedDoctor?.doctorId || null}
        style={{ width: "100%" }}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          {doctors.map((doc) => (
            <Card
              key={doc.docId}
              title={doc.accountInfo?.fullName || "Không tên"}
              extra={<Radio value={doc} />}
              style={{
                backgroundColor:
                  selectedDoctor?.doctorId === doc.docId ? "#e6f7ff" : "#fff",
              }}
            >
              <Text>
                <b>Giới tính:</b> {doc.gender} &nbsp;&nbsp;&nbsp;
                <b>Kinh nghiệm:</b> {doc.experience} năm
              </Text>
              <br />
              <Text>
                <b>Email:</b> {doc.accountInfo?.mail} &nbsp;&nbsp;&nbsp;
                <b>SĐT:</b> {doc.accountInfo?.phone}
              </Text>
              <br />
              <Button
                type="link"
                icon={<InfoCircleOutlined />}
                onClick={() => navigate(`/doctor/${doc.docId}`)}
              >
                Xem chi tiết bác sĩ
              </Button>
            </Card>
          ))}
        </Space>
      </Radio.Group>
      <div style={{ textAlign: "right", marginTop: 16 }}>
        <Button type="primary" disabled={!selectedDoctor} onClick={handleNext}>
          Tiếp tục
        </Button>
      </div>
    </Spin>
  );
};

export default DoctorSelection;
