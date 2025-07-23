// DoctorCarousel.jsx
import React from "react";
import { Card, Typography, Avatar, Rate, theme, Button } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const { Title, Text } = Typography;

const DoctorCarousel = ({ doctors = [] }) => {
  console.log(doctors);
  const navigate = useNavigate();

  const { token } = theme.useToken();
  const handleBooking = (docId) => {
    const accId = Cookies.get("accCusId");
    if (accId) {
      navigate(`/booking/${docId}`);
    } else {
      message.warning("Vui lòng đăng nhập để đặt lịch");
    }
  };
  return (
    <div
      className="DoctorList"
      style={{
        paddingTop: 64,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontWeight: "700",
            fontFamily: token.fontFamily,
            fontSize: 36,
            color: "#111827",
          }}
        >
          ĐỘI NGŨ CHUYÊN GIA Y TẾ
        </h1>
        <p
          style={{
            color: "#4B5563",
            fontSize: 16,
            fontWeight: 700,
            lineHeight: "1.6",
            maxWidth: 600,
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Cam kết đồng hành cùng bạn trên hành trình tìm con
        </p>
      </div>
      <div
        style={{
          width: "70%",
          margin: "60px auto",

          cursor: "pointer",
        }}
      >
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={16}
          slidesPerView={3}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 4 },
          }}
          style={{ padding: "1rem 0", height: "auto" }}
        >
          {doctors.map((doc) => (
            <SwiperSlide key={doc.docId}>
              <Card
                hoverable
                style={{
                  borderRadius: "16px",
                  textAlign: "center",
                  height: "auto",
                  minHeight: 400,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={doc.img}
                  size={200}
                  style={{ marginBottom: 12 }}
                  onClick={() => navigate(`/doctordetail/${doc.docId}`)}
                />
                <Title level={5}>Bs.{doc.accountInfo.fullName}</Title>
                <div>
                  <Rate disabled defaultValue={doc?.star ? doc.star : 5} />
                </div>
                <p>
                  <Text type="secondary">{doc.eduInfo.eduName}</Text>
                </p>
                {/* Nút đặt lịch */}
                <Button
                  type="primary"
                  style={{
                    marginTop: 3,
                    backgroundColor: token.colorPrimary,
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    padding: "6px 20px",
                    height: "auto",
                    border: "none",
                  }}
                  onClick={() => handleBooking(doc.docId)}
                >
                  Đặt lịch
                </Button>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DoctorCarousel;
