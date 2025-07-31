// FeedbackCarousel.jsx
import React, { useState, useEffect } from "react";
import { Typography, Rate, Avatar, Spin } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { getAllFeedback } from "../../../apis/feedbackService";

const { Title, Text } = Typography;

const FeedbackCarousel = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await getAllFeedback();
        if (response.data.success) {
          setFeedbacks(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Hàm format tên theo yêu cầu
  const formatName = (husName, wifeName) => {
    return `Gia đình anh ${husName} và chị ${wifeName}`;
  };

  // Hàm format ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "4rem 1rem",
          background: "#fdf1f5",
          minHeight: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        textAlign: "center",
        padding: "4rem 1rem",
        background: "#fdf1f5",
        color: "white",
      }}
    >
      <Title level={3} style={{ color: "#e91e63", marginBottom: 0 }}>
        Cảm nhận của Khách hàng
      </Title>
      <div style={{ fontSize: 40, color: "#e91e63", marginBottom: 32 }}>"</div>

      {feedbacks.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <Text style={{ color: "#666" }}>Chưa có phản hồi nào</Text>
        </div>
      ) : (
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
                  <Avatar
                    src={fb.cus?.accCus?.img || "/imgdefault.jpg"}
                    size={64}
                  />
                  <div>
                    <Text strong>
                      {formatName(
                        fb.cus?.husName || "",
                        fb.cus?.wifeName || ""
                      )}
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {formatDate(fb.createAt)}
                    </Text>
                    <br />
                    <Rate
                      disabled
                      defaultValue={fb.star}
                      style={{ fontSize: 14 }}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default FeedbackCarousel;
