import React, { useState, useEffect } from "react";
import {
  Card,
  Radio,
  Typography,
  Space,
  Button,
  message,
  Tooltip,
  Layout,
} from "antd";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import {
  filterDoctor,
  updatebookingDoctor,
} from "../../../../apis/bookingService";

const { Title, Text } = Typography;

const UpdateDoctorInBooking = ({ bookingId, currentDoctorId, onBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingdata = location.state;

  const { slotId, workDate } = bookingdata.schedule;

  const [selectedDoctor, setSelectedDoctor] = useState(currentDoctorId || null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // Load danh sách bác sĩ (nếu dùng API thật)
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const res = await filterDoctor(slotId, workDate, workDate);

        setDoctors(res.data.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bác sĩ:", error);
        message.error("Không thể tải danh sách bác sĩ.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
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
      const res = await updatebookingDoctor(
        bookingdata.bookingId,
        selectedDoctor
      );
      if (res.data.success) {
        navigate(`/bookingDetail/${bookingdata.bookingId}`);
        message.success("Cập nhật bác sĩ thành công.");
      } else {
        message.error(res.data.message);
      }
      // navigate(`/booking-detail/${bookingId}`);
    } catch (error) {
      console.error("Lỗi khi cập nhật bác sĩ:", error);
      message.error("Cập nhật thất bại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <Header />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 0" }}>
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
                  key={doc.docId}
                  title={
                    <Space>
                      {doc.doctorName}
                      <Tooltip title="Xem chi tiết bác sĩ">
                        <InfoCircleOutlined
                          onClick={() =>
                            navigate(`/doctor-detail/${doc.docId}`)
                          }
                          style={{ marginLeft: 4, cursor: "pointer" }}
                        />
                      </Tooltip>
                    </Space>
                  }
                  extra={<Radio value={doc.docId} />}
                  style={{
                    backgroundColor:
                      selectedDoctor === doc.docId ? "#e6f7ff" : "#fff",
                    border:
                      selectedDoctor === doc.docId
                        ? "1px solid #1890ff"
                        : undefined,
                  }}
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
                    <b>Email:</b> {doc.mail}
                  </Text>
                  <br />
                  <Text>
                    <b>Số điện thoại:</b> {doc.phone}
                  </Text>
                </Card>
              ))}
            </Space>
          </Radio.Group>

          <div style={{ marginTop: 24, textAlign: "right", padding: 30 }}>
            <Button
              type="primary"
              onClick={() => navigate(-1)}
              style={{ marginRight: 8 }}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              onClick={handleUpdateDoctor}
              loading={submitting}
              disabled={
                !selectedDoctor ||
                selectedDoctor === currentDoctorId ||
                submitting
              }
            >
              Xác nhận thay đổi
            </Button>
          </div>
        </Space>
      </div>
      <Footer />
    </Layout>
  );
};

export default UpdateDoctorInBooking;
