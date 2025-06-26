import React, { useEffect, useState } from "react";
import {
  Tag,
  Rate,
  Typography,
  Divider,
  Space,
  Select,
  Pagination,
} from "antd";
import dayjs from "dayjs";
import WorkSchedule from "./WorkSchedule";
import FeedbackCard from "./FeedbackCard";
import axios from "axios";

const { Title, Text } = Typography;
const { Option } = Select;

const DoctorDetail = ({ doctorId }) => {
  const [doctor, setDoctor] = useState({
  "doc_ID": 2,
  "gender": "Nữ",
  "yob": "1988-03-15",
  "experience": 6,
  "edu_LevelName": "Thạc sĩ",
  "statusText": "Đang làm việc",
  "full_Name": "Trần Thị Lan",
  "mail": "lan.bs88@gmail.com",
  "phone": "0908123456",
  "img": "/femaledoctor.jpg", 
  "avgStar": 4.8,
  "createAt": "2019-06-01",
  "certificates": [
    "Chứng chỉ IVF nâng cao",
    "Chứng chỉ Nội tiết sinh sản",
    "Chứng chỉ Hỗ trợ sinh sản cấp quốc tế"
  ]
});
  const [feedbacks, setFeedbacks] = useState([
  {
    fb_ID: 309,
    star: 5,
    content: "Bác sĩ nhẹ nhàng đến mức tôi tưởng mình đang được chữa lành bằng tâm linh 🤣.",
    createAt: "2025-06-20",
    hus_Name: "Nguyễn Văn Hùng",
    wife_Name: "Phạm Thị Mai",
  },
  {
    fb_ID: 310,
    star: 5,
    content: "Vừa vào đã thấy bác sĩ cười, tôi quên luôn lý do mình đến khám 😅.",
    createAt: "2025-06-21",
    hus_Name: "Trần Công Minh",
    wife_Name: "Nguyễn Thị Hường",
  },
  {
    fb_ID: 311,
    star: 5,
    content: "Tôi bị mất tập trung mỗi khi bác sĩ nói... nên xin được tái khám nhiều lần 😂.",
    createAt: "2025-06-22",
    hus_Name: "Lê Văn Thái",
    wife_Name: "Vũ Ngọc Hà",
  },
  {
    fb_ID: 312,
    star: 4,
    content: "Khám xong ra ngoài mà vợ tôi bảo 'em thấy anh nhìn bác sĩ hơi lâu đấy nha' 🙈.",
    createAt: "2025-06-23",
    hus_Name: "Phan Văn Nghĩa",
    wife_Name: "Lê Thị Hồng",
  },
  {
    fb_ID: 313,
    star: 5,
    content: "Lần đầu tiên đi bệnh viện mà thấy như... đến spa! Cảm ơn bác sĩ rất nhiều!",
    createAt: "2025-06-24",
    hus_Name: "Đỗ Mạnh Hùng",
    wife_Name: "Đào Thị Kim",
  },
  {
    fb_ID: 314,
    star: 5,
    content: "Giọng bác sĩ nhẹ nhàng đến mức tôi tưởng đang nghe ASMR trị liệu 😌.",
    createAt: "2025-06-25",
    hus_Name: "Bùi Minh Quân",
    wife_Name: "Trịnh Ngọc Anh",
  },
  {
    fb_ID: 315,
    star: 5,
    content: "Chuyên môn vững, tâm lý tốt, ngoại hình như idol. Không biết chê chỗ nào!",
    createAt: "2025-06-26",
    hus_Name: "Lý Đức Thịnh",
    wife_Name: "Tô Thị Tuyết",
  },
  {
    fb_ID: 316,
    star: 4,
    content: "Có lẽ tôi cần bác sĩ khám tim sau buổi hôm nay… tim đập mạnh quá!",
    createAt: "2025-06-26",
    hus_Name: "Vũ Hải Đăng",
    wife_Name: "Lê Như Quỳnh",
  },
  {
    fb_ID: 317,
    star: 5,
    content: "Nếu được chọn bác sĩ khám cả đời, tôi chọn chị Lan ❤️.",
    createAt: "2025-06-26",
    hus_Name: "Ngô Bá Duy",
    wife_Name: "Trần Kim Chi",
  }
]
);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [selectedStar, setSelectedStar] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    fetchDoctorInfo();
    fetchDoctorFeedback();
  }, [doctorId]);

  useEffect(() => {
    filterFeedbacks(selectedStar);
    setCurrentPage(1);
  }, [selectedStar, feedbacks]);

  const fetchDoctorInfo = async () => {
    try {
      const res = await axios.get(`/api/doctors/${doctorId}`);
      setDoctor(res.data);
    } catch (error) {
      console.error("Lỗi khi tải thông tin bác sĩ:", error);
    }
  };

  const fetchDoctorFeedback = async () => {
    try {
      const res = await axios.get(`/api/doctors/${doctorId}/feedbacks`);
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Lỗi khi tải đánh giá:", error);
    }
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

  if (!doctor) return <p>Đang tải thông tin bác sĩ...</p>;

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
    createAt,
    certificates = [],
  } = doctor;

  return (
    <div style={{ padding: "24px" }}>
      <Title level={3}>Thông tin bác sĩ</Title>

      <div style={{ display: "flex", gap: "24px" }}>
        <img
          src={img}
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
        <p><b>Giới tính:</b> {gender}</p>
        <p><b>Năm sinh:</b> {dayjs(yob).format("DD/MM/YYYY")}</p>
        <p><b>Trình độ:</b> <Tag color="blue">{edu_LevelName}</Tag></p>
        <p><b>Kinh nghiệm làm việc:</b> {experience} năm</p>

        {certificates.length > 0 && (
          <p>
            <b>Chứng chỉ:</b>{" "}
            <Space wrap>
              {certificates.slice(0, 3).map((cer, index) => (
                <Tag key={index}>{cer}</Tag>
              ))}
            </Space>
          </p>
        )}
      </div>

      <Divider />

      <Title level={4}>Lịch làm việc trong tuần</Title>
      <WorkSchedule doctorId={doctorId} />

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
  );
};

export default DoctorDetail;
