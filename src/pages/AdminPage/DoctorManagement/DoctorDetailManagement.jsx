import React, { useEffect, useState } from "react";
import {
  Tag,
  Rate,
  Typography,
  Divider,
  Space,
  Select,
  message,
  Pagination,
  Layout,
  theme,
  Button,
} from "antd";
import dayjs from "dayjs";
import WorkScheduleManagement from "./WorkScheduleManagement";
import FeedbackCardManagement from "./FeedbackCardManagement";
import { getDoctorInfo } from "../../../apis/doctorService";
import { getFeedbackByDoctorId } from "../../../apis/feedbackService";
const { Title, Text } = Typography;
const { Option } = Select;

const DoctorDetailManagement = ({ doctorId, onBack }) => {
  const { token } = theme.useToken();
  const [doctor, setDoctor] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [selectedStar, setSelectedStar] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resDoctor = await getDoctorInfo(doctorId);

        if (resDoctor?.data?.success) {
          setDoctor(resDoctor.data.data);
        } else {
          setDoctor(null);
        }
        // Lấy feedbacks
        const resFeedback = await getFeedbackByDoctorId(doctorId);
        if (resFeedback?.data?.success) {
          // Map lại cho đúng format UI
          const mappedFeedbacks = (resFeedback.data.data || []).map(
            (fb, idx) => ({
              fb_ID: idx + 1, // hoặc fb.treatmentPlanId nếu unique
              star: fb.star,
              content: fb.content,
              createAt: fb.createAt,
              hus_Name: fb.cus?.husName || "",
              wife_Name: fb.cus?.wifeName || "",
            })
          );
          setFeedbacks(mappedFeedbacks);
        } else {
          setFeedbacks([]);
        }
      } catch (err) {
        setDoctor(null);
        setFeedbacks([]);
      } finally {
        setLoading(false);
      }
    };
    if (doctorId) fetchData();
  }, [doctorId]);

  useEffect(() => {
    filterFeedbacks(selectedStar);
    setCurrentPage(1);
  }, [selectedStar, feedbacks]);

  const handleStatusChange = async (value) => {
    setDoctor((prev) => ({ ...prev, status: value }));
    message.success("Đã cập nhật trạng thái.");
  };

  const handleStarFilter = (value) => {
    setSelectedStar(value);
  };

  const filterFeedbacks = (star) => {
    if (!star) {
      setFilteredFeedbacks(feedbacks);
    } else {
      const filtered = feedbacks.filter((fb) => fb.star === star);
      setFilteredFeedbacks(filtered);
    }
  };

  const paginatedFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  console.log(doctor);
  const gender = doctor?.gender || "";
  const yob = doctor?.yob || "1988-03-15T00:00:00.000Z";
  const experience = doctor?.experience || 10;
  const edu_LevelName = doctor?.eduInfo?.eduName;
  const full_Name = doctor?.accountInfo?.fullName || "";
  const mail = doctor?.accountInfo?.mail || "lan.bs88@gmail.com";
  const phone = doctor?.accountInfo?.phone || "0908123456";
  const img = doctor?.img || "/femaledoctor.jpg";
  const avgStar = doctor?.avgStar || 4.8;
  const createAt = doctor?.createAt || "2015-07-01T00:00:00.000Z";
  const status = doctor?.status?.statusId || 1;
  const certificates = doctor?.certificateInfo || [];

  return (
    <Layout style={{ background: "#fff0f4", minHeight: "100vh" }}>
      <div style={{ padding: "24px" }}>
        <Button
          onClick={onBack}
          style={{
            marginBottom: 16,
            backgroundColor: "#f78db3",
            color: "white",
            border: "none",
          }}
        >
          Quay lại
        </Button>

        <Title level={3}>Thông tin bác sĩ</Title>

        <div style={{ display: "flex", gap: "24px" }}>
          <img
            src={img || "imgdefault.jpg"} // ✅ fallback ảnh mặc định
            alt="Doctor"
            style={{
              width: 160,
              height: 160,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <div>
            <Title level={4}>{full_Name}</Title>
            <Text>{mail}</Text>
            <br />
            <Text>{phone}</Text>
            <br />
            <Rate disabled defaultValue={avgStar || 0} />
          </div>
        </div>

        <Divider />

        <div>
          <p>
            <b>Giới tính:</b> {gender || ""}
          </p>
          <p>
            <b>Năm sinh:</b> {dayjs(yob).format("DD/MM/YYYY")}
          </p>
          <p>
            <b>Trình độ:</b>{" "}
            <Tag color="blue">{edu_LevelName || "chưa rõ"}</Tag>
          </p>
          <p>
            <b>Kinh nghiệm:</b> {experience} năm
          </p>
          <p>
            <b>Ngày bắt đầu công tác:</b> {dayjs(createAt).format("DD/MM/YYYY")}
          </p>

          <div style={{ margin: "8px 0" }}>
            <b>Trạng thái:</b>{" "}
            <Select
              value={status}
              onChange={handleStatusChange}
              style={{ width: 160 }}
            >
              <Option value={1}>Đang công tác</Option>
              <Option value={2}>Đang nghỉ phép</Option>
              <Option value={3}>Đã nghỉ việc</Option>
            </Select>
          </div>

          <p>
            <b>Chứng chỉ:</b>
          </p>
          <Space wrap>
            {certificates.map((cer, index) => (
              <Tag
                key={index}
                color="purple"
                style={{ cursor: "pointer" }}
                onClick={() => window.open(cer.filePath, "_blank")}
              >
                {cer.cerName}
              </Tag>
            ))}
          </Space>
        </div>

        <Divider />

        <Title level={4}>Lịch làm việc trong tuần</Title>
        <WorkScheduleManagement doctorId={doctorId} />

        <Divider />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title level={4}>Đánh giá từ bệnh nhân</Title>
          <Select
            allowClear
            placeholder="Lọc theo số sao"
            value={selectedStar}
            onChange={handleStarFilter}
            style={{ width: 160 }}
          >
            {[5, 4, 3, 2, 1].map((star) => (
              <Option key={star} value={star}>
                {star} sao
              </Option>
            ))}
          </Select>
        </div>

        {paginatedFeedbacks.map((fb) => (
          <FeedbackCardManagement
            key={fb.fb_ID}
            data={fb}
            doctorId={doctorId}
          />
        ))}

        {filteredFeedbacks.length > pageSize && (
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredFeedbacks.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DoctorDetailManagement;
