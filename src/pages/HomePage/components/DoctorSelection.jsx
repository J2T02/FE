import React, { useState, useEffect } from "react";
import { Card, Radio, Typography, Space, Button, message } from "antd";
import { GetAllDoctor } from "../../../apis/bookingService";

const { Title, Text } = Typography;

const DoctorSelection = ({ data, onUpdate, onNext, onPrev, disablePrev }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(data?.doctorId || null);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await GetAllDoctor();
        setDoctors(res.data.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bác sĩ:", error);
        message.error("Không thể tải danh sách bác sĩ. Vui lòng thử lại sau.");
      }
    };

    fetchDoctors();
  }, []);

  // Cập nhật thông tin bác sĩ khi chọn
  useEffect(() => {
    if (selectedDoctor && doctors.length > 0) {
      const selected = doctors.find((doc) => doc.docId === selectedDoctor);
      if (selected) {
        onUpdate({
          doctorId: selectedDoctor,
          doctorName: selected.accountInfo?.fullName || "Không rõ",
        });
      }
    }
  }, [selectedDoctor, doctors, onUpdate]);

  const handleSkip = () => {
    onUpdate({ doctorId: null, doctorName: null });
    onNext();
  };

  const handleNext = () => {
    if (!selectedDoctor) {
      message.warning("Vui lòng chọn một bác sĩ trước khi tiếp tục.");
      return;
    }
    onUpdate({ doctorId: selectedDoctor });
    onNext();
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Title level={4}>Chọn bác sĩ</Title>
          <Button type="primary" onClick={handleSkip}>
            Bỏ qua
          </Button>
        </Space>

        <Text type="secondary">Không bắt buộc: Bạn có thể chọn một bác sĩ</Text>

        <Radio.Group
          onChange={(e) => setSelectedDoctor(e.target.value)}
          value={selectedDoctor}
          style={{ width: "100%" }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            {doctors.map((doc) => (
              <Card
                key={doc.docId}
                title={doc.accountInfo?.fullName || "Chưa có tên"}
                extra={<Radio value={doc.docId} />}
              >
                <Text>
                  <b>Giới tính:</b> {doc.gender}
                </Text>
                <br />
                <Text>
                  <b>Năm sinh:</b> {doc.yob}
                </Text>
                <br />
                <Text>
                  <b>Kinh nghiệm:</b> {doc.experience} năm
                </Text>
                <br />
                <Text>
                  <b>Email:</b> {doc.accountInfo?.mail}
                </Text>
                <br />
                <Text>
                  <b>Số điện thoại:</b> {doc.accountInfo?.phone}
                </Text>
                <br />
              </Card>
            ))}
          </Space>
        </Radio.Group>
      </Space>

      <div style={{ marginTop: 24, textAlign: "right" }}>
        {!disablePrev && (
          <Button type="primary" onClick={onPrev} style={{ marginRight: 8 }}>
            Quay lại
          </Button>
        )}
        <Button type="primary" onClick={handleNext}>
          Tiếp tục
        </Button>
      </div>
    </div>
  );
};

export default DoctorSelection;
