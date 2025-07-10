import { Button, Carousel, theme, message } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CardItem from "~components/card/carditem/CardItem"; // đường dẫn đúng với dự án của bạn
import Cookies from "js-cookie";
const Banner = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const images = ["/eventbanner.jpg", "/anhcuongbanner.jpg", "/banner.jpg"];
  const handleBooking = () => {
    if (!Cookies.get("accId")) {
      message.warning("Vui lòng đăng nhập để đặt lịch!");
    } else {
      navigate("/booking");
    }
  };
  return (
    <div style={{ position: "relative" }}>
      {/* Slide Image */}
      <Carousel autoplay arrows draggable>
        {images.map((img, index) => (
          <div key={index}>
            <div
              style={{
                height: 600,
                width: "100%",
                position: "relative",
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
              }}
            />
          </div>
        ))}
      </Carousel>

      {/* Floating Card Group */}
      <div
        style={{
          position: "absolute",
          marginTop: -100,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#ffffff",
          borderRadius: 12,
          border: "2px solid #ddd",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
          width: 795,
          zIndex: 1,
          padding: "28px",
        }}
      >
        <CardItem
          icon={<FiPhone style={{ color: token.colorPrimary, fontSize: 20 }} />}
          title="Gọi tổng đài"
          description="Tư vấn và giải đáp các vấn đề của bạn"
          showDivider={true}
        />
        <CardItem
          icon={
            <CalendarOutlined
              style={{ color: token.colorPrimary, fontSize: 20 }}
            />
          }
          title="Đặt lịch hẹn"
          description="Đặt lịch hẹn nhanh chóng, tiện lợi"
          showDivider={true}
          onClick={handleBooking} // ✅ điều hướng
        />
        <CardItem
          icon={
            <UserOutlined style={{ color: token.colorPrimary, fontSize: 20 }} />
          }
          title="Tìm bác sĩ"
          description="Tìm kiếm thông tin chuyên gia y tế Vinmec nhanh chóng"
          showDivider={false}
          onClick={() => navigate("/doctors")}
        />
      </div>
    </div>
  );
};

export default Banner;
