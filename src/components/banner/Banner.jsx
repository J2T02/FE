import { Button, Carousel, theme } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { FiPhone } from "react-icons/fi";
import CardItem from "~components/card/carditem/CardItem";
import { useBooking } from "~contexts/BookingContext";
const Banner = () => {
  const { showBooking } = useBooking();
  const { token } = theme.useToken();

  const images = ["/anhcuongbanner.jpg", "/banner.jpg"];
  //data
  const doctors = [
    { Doc_ID: 1, Doc_Name: "Dr. Nguyễn Văn A" },
    { Doc_ID: 2, Doc_Name: "Dr. Trần Thị B" },
  ];

  const schedules = [
    {
      DS_ID: 1,
      Doc_ID: 1,
      WorkDate: "2025-06-12",
      Slot_Start: "08:00",
      Slot_End: "09:00",
      isAvailable: true,
      Room_Number: "101",
    },
    {
      DS_ID: 2,
      Doc_ID: 1,
      WorkDate: "2025-06-13",
      Slot_Start: "09:00",
      Slot_End: "10:00",
      isAvailable: true,
      Room_Number: "102",
    },
  ];
  //
  return (
    <div style={{ position: "relative" }}>
      {/* Slide Image */}
      <Carousel autoplay arrows draggable>
        {images.map((img, index) => (
          <div key={index}>
            <div
              style={{
                height: 500,
                width: "100%",
                position: "relative",
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
              }}
            >
              {/* Overlay Content */}
              {/* <div
                style={{
                  position: "absolute",
                  top: -120,
                  left: "28%",
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
              </div> */}
            </div>
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
              onClick={showBooking}
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
