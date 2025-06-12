import { theme, Button } from "antd";
import { useNavigate } from "react-router-dom";
const CardService = ({ image, title, content }) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
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
                src={image}
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
                {title}
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
                {content}
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
                onClick={() => navigate("/service/:id")}
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
