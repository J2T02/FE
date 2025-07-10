// FeedbackCarousel.jsx
import React from "react";
import { Typography, Rate, Avatar } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const { Title, Text } = Typography;

const FeedbackCarousel = ({
  feedbacks = [
    {
      content: "Tôi đã từng khám ở đây, dịch vụ rất tốt và nhanh chóng.",
      name: "Nguyễn Thu Ng.",
      role: "Sinh viên năm 2 ĐH Thủy Lợi",
      rating: 5,
      avatar: "/anhcuong.jpg",
    },
    {
      content: "Các bác sĩ tận tâm và tư vấn kỹ lưỡng, tôi rất hài lòng.",
      name: "Trần Thị Ng.",
      role: "Tiếp viên hàng không",
      rating: 4,
      avatar: "/anhket.jpg",
    },
    {
      content: "Dịch vụ nhanh, chi phí hợp lý, sẽ quay lại.",
      name: "Hoàng Thu Ng.",
      role: "Nhân viên kinh doanh",
      rating: 5,
      avatar: "/anhnhan.jpg",
    },
    {
      content: "Dịch vụ nhanh, chi phí hợp lý, sẽ quay lại.",
      name: "Hoàng Thu Ng.",
      role: "Nhân viên kinh doanh",
      rating: 5,
      avatar: "/anhthinh.jpg",
    },
    {
      content: "Dịch vụ nhanh, chi phí hợp lý, sẽ quay lại.",
      name: "Hoàng Thu Ng.",
      role: "Nhân viên kinh doanh",
      rating: 5,
      avatar: "/hanguyen.jpg",
    },
    {
      content: "Dịch vụ nhanh, chi phí hợp lý, sẽ quay lại.",
      name: "Hoàng Thu Ng.",
      role: "Nhân viên kinh doanh",
      rating: 5,
      avatar: "/khanhtuyensinh.jpg",
    },
  ],
}) => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "4rem 1rem",
        background: "#1b1b1b",
        color: "white",
      }}
    >
      <Title level={3} style={{ color: "#e91e63", marginBottom: 0 }}>
        Cảm nhận của Khách hàng
      </Title>
      <div style={{ fontSize: 40, color: "#64ffda", marginBottom: 32 }}>“</div>

      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
        style={{ maxWidth: 1400, margin: "0 auto" }}
      >
        {feedbacks.map((fb, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "1.5rem",
                textAlign: "left",
                position: "relative",
                minHeight: 220,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 60,
                  width: 0,
                  height: 0,
                  border: "12px solid transparent",
                  borderTopColor: "#fff",
                }}
              />
              <Text style={{ display: "block", marginBottom: 16 }}>
                {fb.content}
              </Text>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar src={fb.avatar} size={64} />
                <div>
                  <Text strong>{fb.name}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {fb.role}
                  </Text>
                  <br />
                  <Rate
                    disabled
                    defaultValue={fb.rating}
                    style={{ fontSize: 14 }}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeedbackCarousel;
