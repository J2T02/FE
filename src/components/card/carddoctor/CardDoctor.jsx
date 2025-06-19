import { Button, Rate, theme } from "antd";

const CardDoctor = ({ doctor, showBooking }) => {
  const { token } = theme.useToken();
  const { doctorId, doctorName, image, star, certification = [] } = doctor;

  const handleBooking = () => {
    showBooking(doctorId);
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
          src={image}
          alt={doctorName}
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
        {doctorName}
      </h3>

      {/* Đánh giá sao */}
      <div style={{ marginBottom: 12 }}>
        <Rate disabled defaultValue={star} />
      </div>

      {/* Chứng chỉ */}
      <div
        style={{
          fontSize: 13,
          color: "#666",
          marginBottom: 16,
        }}
      >
        <strong>Chứng chỉ:</strong>
        <ul style={{ paddingLeft: 16, margin: 0 }}>
          {certification.map((cert, index) => (
            <li key={index} style={{ marginBottom: 4 }}>
              {cert}
            </li>
          ))}
        </ul>
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
        onClick={handleBooking}
      >
        Đặt lịch
      </Button>
    </div>
  );
};

export default CardDoctor;
