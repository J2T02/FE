import { Button, Carousel, theme } from "antd";
import {
  PhoneOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CardItem from "~components/card/carditem/CardItem";

const Banner = () => {
  const { token } = theme.useToken();

  const images = [
    "https://storage.googleapis.com/a1aa/image/f6686c9b-d0b9-446c-7a44-4e24600cdfff.jpg",
    "/banner.jpg",
    "logo.png",
  ];

  return (
    <div style={{ position: "relative", marginBottom: 20 }}>
      {/* Slide Image */}
      <Carousel autoplay>
        {images.map((img, index) => (
          <div key={index}>
            <div
              style={{
                height: 400,
                width: "100%",
                position: "relative",
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay Content */}
              <div
                style={{
                  position: "absolute",
                  top: -100,
                  left: "27%",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",

                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    maxWidth: 850,
                    fontFamily: token.fontFamily,
                    color: token.colorTextBase,
                    fontWeight: 600,
                    fontSize: 26,
                    lineHeight: 1.3,
                  }}
                >
                  Chăm sóc bằng tài năng,
                  <br />
                  y đức và sự thấu cảm
                  <br />
                  <Button
                    type="primary"
                    style={{
                      marginTop: 24,
                      backgroundColor: "#4db6a1",
                      borderRadius: 24,
                      fontWeight: "bold",
                      fontSize: 13,
                      padding: "6px 20px",
                      height: "auto",
                    }}
                  >
                    Xem thêm
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Floating Card Group */}
      <div
        style={{
          position: "relative",
          marginTop: -40,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#ffffff",
          borderRadius: 12,
          border: "2px solid #ddd",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
          width: "794px",

          zIndex: 1,
          padding: "28px",
        }}
      >
        <CardItem
          icon={
            <PhoneOutlined
              style={{ color: token.colorPrimary, fontSize: 20 }}
            />
          }
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
        />
        <CardItem
          icon={
            <UserOutlined style={{ color: token.colorPrimary, fontSize: 20 }} />
          }
          title="Tìm bác sĩ"
          description="Tìm kiếm thông tin chuyên gia y tế Vinmec nhanh chóng"
          showDivider={false}
        />
      </div>
    </div>
  );
};

export default Banner;
