import { Row, Col, Typography, Card, theme } from "antd";
import {
  HeartOutlined,
  SafetyCertificateOutlined,
  ClusterOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const features = [
  {
    icon: <HeartOutlined />,
    title: "Chuyên gia hàng đầu",
    description:
      "Vinmec quy tụ đội ngũ chuyên gia, bác sĩ, dược sĩ và điều dưỡng có trình độ chuyên môn cao, tận tâm và chuyên nghiệp. Luôn đặt người bệnh làm trung tâm.",
  },
  {
    icon: <SafetyCertificateOutlined />,
    title: "Chất lượng quốc tế",
    description:
      "Hệ thống Vinmec vận hành bởi các nhà quản lý y tế giàu kinh nghiệm với phương tiện kỹ thuật hiện đại, đảm bảo dịch vụ chăm sóc toàn diện.",
  },
  {
    icon: <ClusterOutlined />,
    title: "Công nghệ tiên tiến",
    description:
      "Cơ sở vật chất hạng nhất, dịch vụ 5 sao, ứng dụng công nghệ tiên tiến và bác sĩ lâm sàng lành nghề để mang lại hiệu quả cao.",
  },
  {
    icon: <ExperimentOutlined />,
    title: "Nghiên cứu & Đổi mới",
    description:
      "Vinmec thúc đẩy y học hàn lâm thông qua nghiên cứu, đổi mới và hợp tác với các hệ thống chăm sóc sức khỏe hàng đầu thế giới.",
  },
];

function WhyUs() {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        padding: "60px 20px",
        backgroundColor: token.colorBgBase,
        fontFamily: token.fontFamily,
        color: token.colorTextBase,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Title
          level={2}
          style={{
            color: token.colorTextBase,
            borderBottom: `4px solid ${token.colorPrimary}`,
            display: "inline-block",
            marginBottom: 40,
            fontFamily: token.fontFamily,
          }}
        >
          Tại sao nên chọn Vinmec?
        </Title>

        <Row gutter={[32, 32]} align="top">
          <Col xs={24} md={8} style={{ textAlign: "center" }}>
            <img
              src="https://www.vinmec.com/static/uploads/wepik_export_20230610051550k_Azj_1_1_de0e3052ea.png"
              alt="doctor"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: token.borderRadius * 1.5,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          </Col>

          <Col xs={24} md={16}>
            <Row gutter={[24, 24]}>
              {features.map((item, index) => (
                <Col xs={24} sm={12} key={index}>
                  <Card
                    bordered={false}
                    style={{
                      background: token.colorBgContainer,
                      borderRadius: token.borderRadius * 1.5,
                      boxShadow: "0 2px 8px rgba(247, 141, 179, 0.15)",
                      fontFamily: token.fontFamily,
                      minHeight: 180,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 24,
                          color: token.colorPrimary,
                          marginTop: 4,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <Title
                          level={4}
                          style={{
                            marginBottom: 8,
                            color: token.colorTextBase,
                            fontFamily: token.fontFamily,
                          }}
                        >
                          {item.title}
                        </Title>
                        <Paragraph
                          style={{
                            color: "#666",
                            fontSize: token.fontSize,
                            lineHeight: 1.6,
                            fontFamily: token.fontFamily,
                          }}
                        >
                          {item.description}
                        </Paragraph>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default WhyUs;
