import { theme, Layout } from "antd";
import { YoutubeOutlined, FacebookOutlined } from "@ant-design/icons";
const Footer = () => {
  const { token } = theme.useToken();
  const { Footer } = Layout;
  return (
    <Footer style={{ width: "100%", borderTop: "1px solid #e5e7eb" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "2rem 1rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1.5rem",
          color: "#4b5563",
          fontSize: 12,
          fontWeight: 400,
        }}
      >
        {/* Hệ thống Vinmec */}
        <div style={{ minWidth: 140 }}>
          <h3
            style={{
              fontWeight: 700,
              fontSize: 12,
              color: "#111827",
              marginBottom: 8,
            }}
          >
            Hệ thống Vinmec
          </h3>
          <ul style={{ lineHeight: 1.8 }}>
            <li>Tầm nhìn sứ mệnh</li>
            <li>Hệ thống cơ sở y tế</li>
            <li>Tìm bác sĩ</li>
            <li>Làm việc tại Vinmec</li>
          </ul>
        </div>

        {/* Dịch vụ */}
        <div style={{ minWidth: 100 }}>
          <h3
            style={{
              fontWeight: 700,
              fontSize: 12,
              color: "#111827",
              marginBottom: 8,
            }}
          >
            Dịch vụ
          </h3>
          <ul style={{ lineHeight: 1.8 }}>
            <li>Chuyên khoa</li>
            <li>Gói dịch vụ</li>
            <li>Bảo hiểm</li>
            <li>Đặt lịch hẹn</li>
          </ul>
        </div>

        {/* QR App */}
        <div style={{ minWidth: 100, textAlign: "center" }}>
          <h3
            style={{
              fontWeight: 700,
              fontSize: 12,
              color: "#111827",
              marginBottom: 8,
            }}
          >
            Tải App MyVinmec
          </h3>
          <img
            src="https://storage.googleapis.com/a1aa/image/d9dad149-3684-46c6-7763-918bf0c5b011.jpg"
            alt="QR code"
            width={80}
            height={80}
            style={{ width: 80, height: 80 }}
          />
        </div>

        {/* Social + Partner */}
        <div style={{ minWidth: 140, textAlign: "center" }}>
          <h3
            style={{
              fontWeight: 700,
              fontSize: 12,
              color: "#111827",
              marginBottom: 8,
            }}
          >
            Theo dõi chúng tôi
          </h3>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <a href="#" style={{ color: "#dc2626", fontSize: 18 }}>
              <YoutubeOutlined />
            </a>
            <a href="#" style={{ color: "#2563eb", fontSize: 18 }}>
              <FacebookOutlined />
            </a>
          </div>
          <h4
            style={{
              fontWeight: 700,
              fontSize: 12,
              color: "#111827",
              marginBottom: 4,
            }}
          >
            Đối tác liên kết
          </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <img
              src="https://storage.googleapis.com/a1aa/image/7e6145e1-f748-4ea7-b97f-623d3f6a2577.jpg"
              alt="YlocCongdong"
              width={100}
              height={20}
            />
            <img
              src="https://storage.googleapis.com/a1aa/image/d1b18836-6106-4ed1-2f24-d2be515f1125.jpg"
              alt="Bước tiếp"
              width={100}
              height={20}
            />
          </div>
        </div>

        {/* Certification */}
        <div style={{ minWidth: 120, textAlign: "center", marginTop: 12 }}>
          <div>
            <img
              src="https://storage.googleapis.com/a1aa/image/c670a6d7-8157-425f-b20b-e0fe7c197a15.jpg"
              alt="Bộ Công Thương"
              width={120}
              height={40}
              style={{ marginBottom: 8 }}
            />
          </div>
          <div>
            <img
              src="https://storage.googleapis.com/a1aa/image/1ba6a414-32e4-410b-f850-1552145b74e1.jpg"
              alt="DMCA"
              width={120}
              height={20}
            />
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #e5e7eb",
          fontSize: 10,
          color: "#6b7280",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0.5rem 1rem",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ textAlign: "center" }}>
            Bản quyền © 2024 thuộc về Công ty Cổ phần Bệnh viện Đa khoa Quốc tế
            Vinmec
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <span>Chính sách bảo vệ dữ liệu cá nhân của Vinmec</span>
            <span>|</span>
            <span>GR Privacy</span>
            <span>|</span>
            <span>GR Terms</span>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default Footer;
