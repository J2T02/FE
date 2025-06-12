import { Button, theme } from "antd";
import { useBooking } from "~/contexts/BookingContext";
const CardDoctor = ({
  name = "TTND.PGS.TS.BSCKII.BSCC Đoàn Hữu Nghị",
  specialty = "Chuyên khoa - Ung bướu",
  description = "Nguyên Giám đốc Bệnh viện E,\nNguyên Phó Giám đốc Bệnh viện K,\nPhó Chủ tịch Hội Ung thư Hà Nội",
  image = "https://medlatec.vn/media/357/catalog/vansang1.png?size=256",
  bgImage = "https://kasmweb.com/docs/feature_KASM-3949_sizing_recommends/_images/background2.jpg",
}) => {
  const { token } = theme.useToken();
  const { showBooking } = useBooking();
  const handleBooking = () => {
    showBooking({
      // doctorId: doctor.Doc_ID,
      // serviceId: doctor.serviceIds?.[0] ?? null, // hoặc truyền kèm service từ card
      doctorId: 1,
      serviceId: 1,
    });
  };
  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "1px solid #eee",
        borderRadius: 12,
        padding: 20,
        width: 300,
        flexShrink: 0,
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        fontFamily: token.fontFamily,
        transition: "transform 0.3s ease",
      }}
    >
      {/* Image block */}
      <div
        style={{
          position: "relative",
          width: 224,
          height: 224,
          margin: "0 auto 24px",
        }}
      >
        {/* Background circle */}
        <img
          src={bgImage}
          // alt="bg circle"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 224,
            height: 224,
            borderRadius: "50%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
        {/* Portrait */}
        <img
          src={image}
          alt="doctor"
          style={{
            position: "relative",
            width: 225,
            height: 225,
            borderRadius: "50%",
            objectFit: "cover",
            zIndex: 1,
          }}
        />
      </div>

      {/* Text Content */}
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{name}</h3>
      <a
        href="#"
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: token.colorPrimary,
          marginBottom: 8,
          display: "inline-block",
        }}
      >
        {specialty}
      </a>
      <p
        style={{
          fontSize: 12,
          color: "#666",
          whiteSpace: "pre-line",
          marginBottom: 16,
        }}
      >
        {description}
      </p>

      <Button
        type="primary"
        style={{
          backgroundColor: token.colorPrimary,
          borderRadius: 6,
          fontSize: 13,
          fontWeight: 600,
          padding: "6px 20px",
          height: "auto",
          border: "none",
        }}
        onClick={handleBooking}
      >
        Đặt lịch
      </Button>
    </div>
  );
};

export default CardDoctor;
