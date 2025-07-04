import { Button, Rate, theme } from "antd";
const CardDoctor = ({ doctor }) => {
  const { token } = theme.useToken();
  const { doctorId, accountInfo, img, star, eduInfo, certificateInfo } = doctor;

  const handleBooking = () => {};

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
      {/* Ảnh bác sĩ */}
      <div
        style={{
          position: "relative",
          width: 224,
          height: 224,
          margin: "0 auto 24px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 224,
            height: 224,
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
            zIndex: 0,
          }}
        />
        <img
          src={img}
          alt={accountInfo.fullName}
          style={{
            position: "relative",
            width: 224,
            height: 224,
            borderRadius: "50%",
            objectFit: "cover",
            zIndex: 1,
          }}
        />
      </div>

      {/* Thông tin bác sĩ */}
      <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>
        Bs.{accountInfo.fullName}
      </h3>

      {/* Đánh giá sao */}
      <div style={{ marginBottom: 12 }}>
        <Rate disabled defaultValue={star ? star : 0} />
      </div>

      {/* Trình độ */}
      <div
        style={{
          fontSize: 13,
          color: "#666",
          marginBottom: 16,
        }}
      >
        <strong>Trình độ:{eduInfo?.eduName}</strong>
      </div>

      {/* Nút đặt lịch */}
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
      >
        Đặt lịch
      </Button>
    </div>
  );
};

export default CardDoctor;
