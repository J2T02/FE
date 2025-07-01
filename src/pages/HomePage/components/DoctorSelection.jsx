import React, { useState, useEffect } from "react";
import { Card, Radio, Typography, Space, Button, message, Row, Col, Avatar, Divider, Spin } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined, StarOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const DoctorSelection = ({ data, doctors = [], onUpdate, onNext, onPrev, disablePrev, loading }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(data?.doctorId || null);
  const [selectedDoctorDetail, setSelectedDoctorDetail] = useState(null);

  // Cập nhật thông tin bác sĩ khi chọn
  useEffect(() => {
    if (selectedDoctor && doctors.length > 0) {
      const selected = doctors.find((doc) => doc.docId === selectedDoctor);
      if (selected) {
        setSelectedDoctorDetail(selected);
        onUpdate({
          doctorId: selectedDoctor,
          doctorName: selected.accountInfo?.fullName || "Không rõ",
        });
      }
    } else {
      setSelectedDoctorDetail(null);
    }
  }, [selectedDoctor, doctors, onUpdate]);

  const handleSkip = () => {
    onUpdate({ doctorId: null, doctorName: null });
    setSelectedDoctorDetail(null);
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

  const handleDoctorSelect = (doctorId) => {
    setSelectedDoctor(doctorId);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Spin size="large" tip="Đang tải danh sách bác sĩ..." />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Title level={4}>Chọn bác sĩ</Title>
          <Button type="primary" onClick={handleSkip}>
            Bỏ qua
          </Button>
        </Space>

        <Text type="secondary">Không bắt buộc: Bạn có thể chọn một bác sĩ</Text>

        <Row gutter={24}>
          {/* Vùng bên trái - Danh sách bác sĩ */}
          <Col span={12}>
            <Card title="Danh sách bác sĩ" style={{ height: 600, overflowY: 'auto' }}>
              {doctors.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                  <UserOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                  <Text>Không có bác sĩ nào khả dụng</Text>
                </div>
              ) : (
                <Radio.Group
                  onChange={(e) => handleDoctorSelect(e.target.value)}
                  value={selectedDoctor}
                  style={{ width: "100%" }}
                >
                  <Space direction="vertical" style={{ width: "100%" }}>
                    {doctors.map((doc) => (
                      <Card
                        key={doc.docId}
                        size="small"
                        style={{ 
                          cursor: 'pointer',
                          border: selectedDoctor === doc.docId ? '2px solid #1890ff' : '1px solid #d9d9d9',
                          marginBottom: 8
                        }}
                        onClick={() => handleDoctorSelect(doc.docId)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                            <Avatar 
                              size={40} 
                              icon={<UserOutlined />} 
                              style={{ marginRight: 12 }}
                            />
                            <div>
                              <Text strong>{doc.accountInfo?.fullName || "Chưa có tên"}</Text>
                              <br />
                              <Text type="secondary">
                                {doc.gender === 1 ? "Nam" : "Nữ"} • {doc.experience} năm kinh nghiệm
                              </Text>
                            </div>
                          </div>
                          <Radio value={doc.docId} />
                        </div>
                      </Card>
                    ))}
                  </Space>
                </Radio.Group>
              )}
            </Card>
          </Col>

          {/* Vùng bên phải - Chi tiết bác sĩ */}
          <Col span={12}>
            <Card title="Thông tin chi tiết" style={{ height: 600 }}>
              {selectedDoctorDetail ? (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Avatar 
                      size={80} 
                      icon={<UserOutlined />} 
                      style={{ marginBottom: 16 }}
                    />
                    <Title level={3}>{selectedDoctorDetail.accountInfo?.fullName || "Chưa có tên"}</Title>
                    <Text type="secondary">
                      {selectedDoctorDetail.gender === 1 ? "Nam" : "Nữ"} • {selectedDoctorDetail.experience} năm kinh nghiệm

                    </Text>
                  </div>

                  <Divider />

                  <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                    <div>
                      <Text strong>Thông tin cá nhân:</Text>
                      <Paragraph style={{ marginTop: 8 }}>
                        <CalendarOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                        <Text>Năm sinh: {selectedDoctorDetail.yob}</Text>
                      </Paragraph>
                    </div>

                    <div>
                      <Text strong>Thông tin liên hệ:</Text>
                      <Paragraph style={{ marginTop: 8 }}>
                        <MailOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                        <Text>Email: {selectedDoctorDetail.accountInfo?.mail || "Chưa có"}</Text>
                        <br />
                        <PhoneOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                        <Text>Số điện thoại: {selectedDoctorDetail.accountInfo?.phone || "Chưa có"}</Text>
                      </Paragraph>
                    </div>

                    <div>
                      <Text strong>Chuyên môn:</Text>
                      <Paragraph style={{ marginTop: 8 }}>
                        <StarOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                        <Text>Kinh nghiệm: {selectedDoctorDetail.experience} năm</Text>
                        <br />
                        <Text>Trình độ: {selectedDoctorDetail.eduId === 1 ? "Cử nhân" : 
                                         selectedDoctorDetail.eduId === 2 ? "Thạc sĩ" : 
                                         selectedDoctorDetail.eduId === 3 ? "Tiến sĩ" : "Chưa có"}</Text>
                      </Paragraph>
                    </div>

                    {selectedDoctorDetail.filePathEdu && (
                      <div>
                        <Text strong>Chứng chỉ:</Text>
                        <Paragraph style={{ marginTop: 8 }}>
                          <a href={selectedDoctorDetail.filePathEdu} target="_blank" rel="noopener noreferrer">
                            Xem chứng chỉ
                          </a>
                        </Paragraph>
                      </div>
                    )}
                  </Space>
                </div>
              ) : (
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  height: '100%',
                  color: '#999'
                }}>
                  <UserOutlined style={{ fontSize: 64, marginBottom: 16 }} />
                  <Text>Vui lòng chọn một bác sĩ để xem thông tin chi tiết</Text>
                </div>
              )}
            </Card>
          </Col>
        </Row>
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

