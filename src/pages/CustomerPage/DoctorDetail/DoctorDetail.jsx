// File: DoctorDetail.jsx

import React, { useEffect, useState } from "react";
import {
  Tag,
  Rate,
  Typography,
  Divider,
  Space,
  Select,
  Pagination,
  Layout,
  theme,
} from "antd";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";
import dayjs from "dayjs";
import WorkSchedule from "./WorkSchedule";
import FeedbackCard from "./FeedbackCard";
import { getDoctorInfo } from "../../../apis/doctorService";
import { useParams } from "react-router-dom";
const { Title, Text } = Typography;
const { Option } = Select;

const DoctorDetail = ({ doctorId }) => {
  const { id } = useParams();
  const docId = parseInt(id);
  const { token } = theme.useToken();
  const [doctor, setDoctor] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]); // Keep feedbacks logic as is
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [selectedStar, setSelectedStar] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await getDoctorInfo(docId);
        if (res?.data?.success && res.data.data) {
          const d = res.data.data;
          setDoctor({
            gender: d.gender,
            yob: d.yob,
            experience: d.experience,
            edu_LevelName: d.eduInfo?.eduName,
            statusText: d.status?.statusName,
            full_Name: d.accountInfo?.fullName,
            mail: d.accountInfo?.mail,
            phone: d.accountInfo?.phone,
            img: d.img || d.accountInfo?.img || "/doctor-male.jpg",
            avgStar: 5, // Placeholder, replace with real if available
            certificates: Array.isArray(d.certificateInfo)
              ? d.certificateInfo.map((c) => c.cerName)
              : [],
          });
        } else {
          setDoctor(null);
        }
      } catch (err) {
        setDoctor(null);
      }
    };
    fetchDoctor();
  }, [docId]);

  useEffect(() => {
    filterFeedbacks(selectedStar);
  }, [selectedStar, feedbacks]);

  const handleStarFilter = (value) => {
    setSelectedStar(value);
    setCurrentPage(1);
  };

  const filterFeedbacks = (star) => {
    if (!star) setFilteredFeedbacks(feedbacks);
    else setFilteredFeedbacks(feedbacks.filter((fb) => fb.star === star));
  };

  const paginatedFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (!doctor) return null;

  const {
    gender,
    yob,
    experience,
    edu_LevelName,
    full_Name,
    mail,
    phone,
    img,
    avgStar,
    certificates,
  } = doctor;

  return (
    <Layout>
      <Header />
      <div style={{ padding: "40px 0", backgroundColor: token.colorBgPage }}>
        <Title level={3}>Thông tin bác sĩ</Title>
        <div style={{ display: "flex", gap: 24 }}>
          <img
            src={img}
            alt="doctor"
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
            <Rate disabled defaultValue={avgStar} />
          </div>
        </div>

        <Divider />
        <div>
          <p>
            <b>Giới tính:</b> {gender}
          </p>
          <p>
            <b>Năm sinh:</b> {dayjs(yob).format("DD/MM/YYYY")}
          </p>
          <p>
            <b>Trình độ:</b> <Tag color="blue">{edu_LevelName}</Tag>
          </p>
          <p>
            <b>Kinh nghiệm làm việc:</b> {experience} năm
          </p>
          {certificates.length > 0 && (
            <p>
              <b>Chứng chỉ:</b>{" "}
              <Space wrap>
                {certificates.map((cer, idx) => (
                  <Tag key={idx}>{cer}</Tag>
                ))}
              </Space>
            </p>
          )}
        </div>

        <Divider />
        <Title level={4}>Lịch làm việc trong tuần</Title>
        <WorkSchedule doctorId={docId} />

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
            {[5, 4, 3, 2, 1].map((s) => (
              <Option key={s} value={s}>
                {s} sao
              </Option>
            ))}
          </Select>
        </div>

        {paginatedFeedbacks.map((fb) => (
          <FeedbackCard key={fb.fb_ID} data={fb} />
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
      <Footer />
    </Layout>
  );
};

export default DoctorDetail;
