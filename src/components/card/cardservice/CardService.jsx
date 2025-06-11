import { theme, Button } from "antd";

const CardService = () => {
  const { token } = theme.useToken();
  return (
    <div style={{ backgroundColor: "#f8f9fa", padding: "2rem" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* Content Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            {/* Left: Image */}
            <div style={{ flex: 1, minWidth: 300 }}>
              <img
                src="https://www.vinmec.com/static/uploads/medium_VMHN_2024day215290_copy_b559e1faec.jpg"
                alt="IVF lab technician"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            </div>

            {/* Right: Content */}
            <div style={{ flex: 1, minWidth: 300 }}>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#1f1f1f",
                  lineHeight: 1.4,
                }}
              >
                IVF - Dịch vụ thụ tinh trong ống nghiệm
              </h2>
              <div
                style={{
                  width: 56,
                  height: 2,
                  backgroundColor: "#b22222",
                  margin: "8px 0 16px 0",
                }}
              />
              <p
                style={{
                  fontSize: 14,
                  color: "#4a4a4a",
                  lineHeight: 1.7,
                }}
              >
                Hành trình làm cha làm mẹ là điều thiêng liêng và quý giá nhất
                trong cuộc đời mỗi người. Tuy nhiên, với nhiều cặp vợ chồng, con
                đường này không phải lúc nào cũng suôn sẻ. Tại Vinmec, chúng tôi
                không tính bằng số ca chuyển phôi hay số ca có thai mà tính bằng
                số em bé được đón về nhà an toàn lên tới 60%. Vinmec không chỉ
                ươm mầm hạnh phúc cho hàng nghìn gia đình hiếm muộn có thai, mà
                còn đồng hành trọn vẹn trong quá trình chăm sóc thai kỳ và đảm
                bảo em bé khỏe mạnh chào đời. Với mô hình chăm sóc đa chuyên
                khoa khép kín, kết hợp công nghệ tiên tiến và đội ngũ chuyên gia
                đầu ngành là lời cam kết mạnh mẽ của Vinmec trong hành trình
                “đón em bé về nhà”
              </p>
              <Button
                type="primary"
                style={{
                  marginTop: 24,
                  backgroundColor: token.colorPrimary,
                  fontWeight: 600,
                  fontSize: 12,
                  padding: "8px 16px",
                  borderRadius: 6,
                }}
              >
                Tham khảo thêm
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardService;
