import { Layout, Row, Col, Typography, Space, Divider, theme } from "antd";
import {
  FacebookFilled,
  YoutubeFilled,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { FaTiktok } from "react-icons/fa";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const footerLinks = [
  { label: "Dịch vụ", href: "/services" },
  { label: "Đội ngũ bác sĩ", href: "/doctors" },
  { label: "Đặt lịch khám", href: "/booking" },
  { label: "Blog sức khỏe", href: "/blog" },
  { label: "Chính sách bảo mật", href: "/" },
];

const socialLinks = [
  { icon: <FacebookFilled />, href: "#", color: "#1877f2" },
  { icon: <YoutubeFilled />, href: "#", color: "#ff0000" },
  { icon: <FaTiktok />, href: "#", color: "#ffffff" },
];

function CustomFooter() {
  const { token } = theme.useToken();
  return (
    <Footer
      style={{
        background: "#d35b7b",
        padding: "40px 0 0 0",
        borderTop: `1px solid ${token.colorFooterBorder || "#393e5c"}`,
        color: token.colorFooterText,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px", background: "#d35b7b" }}>
        <Row gutter={[32, 32]} justify="space-between">
          {/* Logo & Slogan */}
          <Col xs={24} md={6}>
            <div style={{ marginBottom: 16 }}>
              <img
                src="/Logo.png"
                alt="logo"
                style={{ width: 120, marginBottom: 8 }}
              />
              <Title
                level={5}
                style={{ margin: 0, color: "#ffffff" }}
              >
                Phòng khám điều trị hiếm muộn
              </Title>
              <Text style={{ fontSize: 13, color: "#ffffff" }}>
                "Nơi gửi trọn niềm tin cho hạnh phúc gia đình"
              </Text>
            </div>
          </Col>

          {/* Liên hệ nhanh */}
          <Col xs={24} md={6}>
            <Title level={5} style={{ color: token.colorFooterText }}>
              Liên hệ
            </Title>
            <Space direction="vertical" size={8}>
              <Text style={{ color: token.colorFooterText, opacity: 0.85 }}>
                <PhoneOutlined style={{ color: "#ffffff", marginRight: 8 }} />
                <b>1900 565656</b>
              </Text>
              <Text style={{ color: token.colorFooterText, opacity: 0.85 }}>
                <MailOutlined style={{ color: "#ffffff", marginRight: 8 }} />
                ConYeu@hiemmuon.vn
              </Text>
              <Text style={{ color: token.colorFooterText, opacity: 0.85 }}>
                <EnvironmentOutlined
                  style={{ color: "#ffffff", marginRight: 8 }}
                />
                123 Đường D1, Thủ Đức, TP.HCM
              </Text>
            </Space>
          </Col>

          {/* Liên kết nhanh */}
          <Col xs={24} md={6}>
            <Title level={5} style={{ color: token.colorFooterText }}>
              Liên kết nhanh
            </Title>
            <Space direction="vertical" size={6}>
              {footerLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{ color: token.colorFooterText, fontWeight: 500 }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = token.colorFooterLink)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = token.colorFooterText)
                  }
                >
                  {item.label}
                </Link>
              ))}
            </Space>
          </Col>

          {/* Mạng xã hội */}
          <Col xs={24} md={6}>
            <Title level={5} style={{ color: token.colorFooterText }}>
              Kết nối với chúng tôi
            </Title>
            <Space size={16} style={{ marginBottom: 8 }}>
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 20,
                    color: item.color || token.colorFooterText,
                  }}
                >
                  {item.icon}
                </a>
              ))}
            </Space>
            <div style={{ marginTop: 12 }}>
              <img
                src="/QRFAP.jpg"
                alt="QR code"
                width={80}
                height={80}
                style={{ borderRadius: 8, border: "1px solid #555" }}
              />
              <div style={{ fontSize: 12, color: "#ffffff", marginTop: 4 }}>
                Quét mã QR để tải app
              </div>
            </div>
          </Col>
        </Row>

        <Divider
          style={{
            margin: "32px 0 16px 0",
            borderColor: token.colorFooterBorder || "#393e5c",
          }}
        />

        <Row
          justify="space-between"
          align="middle"
          style={{ fontSize: 13, color: "#ffffff" }}
        >
          <Col xs={24} md={12} style={{ textAlign: "left" }}>
            © {new Date().getFullYear()} CON YÊU. All rights reserved.
          </Col>
          <Col xs={24} md={12} style={{ textAlign: "right" }}>
            <Link
              href="#"
              style={{ color: "#ffffff", marginRight: 16 }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = token.colorFooterLink)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = token.colorFooterText)
              }
            >
              Chính sách bảo mật
            </Link>
            <Link
              href="#"
              style={{ color: "#ffffff" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = token.colorFooterLink)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.color = token.colorFooterText)
              }
            >
              Điều khoản sử dụng
            </Link>
          </Col>
        </Row>
      </div>
    </Footer>
  );
}

export default CustomFooter;
