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
} from "antd";
import dayjs from "dayjs";
import WorkScheduleManagement from "./WorkScheduleManagement";
import FeedbackCardManagement from "./FeedbackCardManagement";
import axios from "axios";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";
const { Title, Text } = Typography;
const { Option } = Select;

const DoctorDetailManagement = ({ doctorId }) => {
  const { token } = theme.useToken();
  const [doctor, setDoctor] = useState({
    gender: "Nữ",
    yob: "1988-03-15T00:00:00.000Z",
    experience: 10,
    edu_LevelName: "Thạc sĩ",
    full_Name: "Trần Thị Lan",
    mail: "lan.bs88@gmail.com",
    phone: "0908123456",
    img: "/femaledoctor.jpg",
    avgStar: 4.8,
    createAt: "2015-07-01T00:00:00.000Z",
    statusText: "Đang công tác",
    certificates: [
      {
        Cer_Name: "Chứng chỉ IVF nâng cao",
        File_Path: "https://example.com/certificates/ivf-nang-cao.pdf",
      },
      {
        Cer_Name: "Chứng chỉ Nội tiết sinh sản",
        File_Path: "https://example.com/certificates/noi-tiet.pdf",
      },
      {
        Cer_Name: "Chứng chỉ Hỗ trợ sinh sản quốc tế",
        File_Path: "https://example.com/certificates/ho-tro-sinh-san.pdf",
      },
    ],
  });

  const [feedbacks, setFeedbacks] = useState([
    {
      fb_ID: 309,
      star: 5,
      content:
        "Bác sĩ nhẹ nhàng đến mức tôi tưởng mình đang được chữa lành bằng tâm linh 🤣.",
      createAt: "2025-06-20",
      hus_Name: "Nguyễn Văn Hùng",
      wife_Name: "Phạm Thị Mai",
    },
    {
      fb_ID: 310,
      star: 5,
      content:
        "Vừa vào đã thấy bác sĩ cười, tôi quên luôn lý do mình đến khám 😅.",
      createAt: "2025-06-21",
      hus_Name: "Trần Công Minh",
      wife_Name: "Nguyễn Thị Hường",
    },
    {
      fb_ID: 311,
      star: 5,
      content:
        "Tôi bị mất tập trung mỗi khi bác sĩ nói... nên xin được tái khám nhiều lần 😂.",
      createAt: "2025-06-22",
      hus_Name: "Lê Văn Thái",
      wife_Name: "Vũ Ngọc Hà",
    },
    {
      fb_ID: 312,
      star: 4,
      content:
        "Khám xong ra ngoài mà vợ tôi bảo 'em thấy anh nhìn bác sĩ hơi lâu đấy nha' 🙈.",
      createAt: "2025-06-23",
      hus_Name: "Phan Văn Nghĩa",
      wife_Name: "Lê Thị Hồng",
    },
    {
      fb_ID: 313,
      star: 5,
      content:
        "Lần đầu tiên đi bệnh viện mà thấy như... đến spa! Cảm ơn bác sĩ rất nhiều!",
      createAt: "2025-06-24",
      hus_Name: "Đỗ Mạnh Hùng",
      wife_Name: "Đào Thị Kim",
    },
    {
      fb_ID: 314,
      star: 5,
      content:
        "Giọng bác sĩ nhẹ nhàng đến mức tôi tưởng đang nghe ASMR trị liệu 😌.",
      createAt: "2025-06-25",
      hus_Name: "Bùi Minh Quân",
      wife_Name: "Trịnh Ngọc Anh",
    },
    {
      fb_ID: 315,
      star: 5,
      content:
        "Chuyên môn vững, tâm lý tốt, ngoại hình như idol. Không biết chê chỗ nào!",
      createAt: "2025-06-26",
      hus_Name: "Lý Đức Thịnh",
      wife_Name: "Tô Thị Tuyết",
    },
    {
      fb_ID: 316,
      star: 4,
      content:
        "Có lẽ tôi cần bác sĩ khám tim sau buổi hôm nay… tim đập mạnh quá!",
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
    },
  ]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [selectedStar, setSelectedStar] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    fetchDoctorInfo();
    fetchDoctorFeedback();
  }, [doctorId]);

  useEffect(() => {
    filterFeedbacks(selectedStar);
    setCurrentPage(1); // reset trang về đầu khi lọc
  }, [selectedStar, feedbacks]);

  const fetchDoctorInfo = async () => {
    try {
      const res = await axios.get(`/api/doctors/${doctorId}`);
      setDoctor(res.data);
    } catch (error) {
      console.error("Failed to fetch doctor info:", error);
    }
  };

  const fetchDoctorFeedback = async () => {
    try {
      const res = await axios.get(`/api/doctors/${doctorId}/feedbacks`);
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    }
  };

  const handleStatusChange = async (value) => {
    try {
      setDoctor((prev) => ({ ...prev, statusText: value }));
      await axios.put(`/api/doctors/${doctorId}/status`, { status: value });
      message.success("Đã cập nhật trạng thái.");
    } catch (error) {
      message.error("Cập nhật trạng thái thất bại.");
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
    statusText,
    certificates,
  } = doctor;

  return (
    <Layout>
      <Header />
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
            <b>Kinh nghiệm:</b> {experience} năm
          </p>
          <p>
            <b>Ngày bắt đầu công tác:</b> {dayjs(createAt).format("DD/MM/YYYY")}
          </p>

          <div style={{ margin: "8px 0" }}>
            <b>Trạng thái:</b>{" "}
            <Select
              value={statusText}
              onChange={handleStatusChange}
              style={{ width: 160 }}
            >
              <Option value="Đang công tác">Đang công tác</Option>
              <Option value="Đang nghỉ phép">Đang nghỉ phép</Option>
              <Option value="Đã nghỉ việc">Đã nghỉ việc</Option>
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
                onClick={() => window.open(cer.File_Path, "_blank")}
              >
                {cer.Cer_Name}
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
          <FeedbackCardManagement key={fb.fb_ID} data={fb} />
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

export default DoctorDetailManagement;
