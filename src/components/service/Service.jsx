import React from "react";
import { Typography, Row, Col, Button, Divider, theme } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const Service = ({ services }) => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  return (
    <div style={{ padding: "60px 20px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          DỊCH VỤ TẠI <span style={{ color: token.colorPrimary }}>CON YÊU</span>
        </Title>
        <Divider style={{ background: token.colorPrimary }} />

        {services?.map((service, index) => (
          <Row
            key={service.serId}
            gutter={32}
            align="middle"
            style={{
              marginBottom: 80,
              flexDirection: index % 2 === 0 ? "row" : "row-reverse",
            }}
          >
            <Col xs={24} md={12}>
              <img
                src={service.filePath || "/IVF.jpg"}
                alt={service.serName}
                style={{ width: "100%", borderRadius: 10 }}
              />
            </Col>

            <Col xs={24} md={12}>
              <Title level={4} style={{ color: "#333", fontWeight: "bold" }}>
                {service.serName}
              </Title>
              <Paragraph style={{ fontSize: 16, lineHeight: "1.6em" }}>
                {service.description}
              </Paragraph>
              <Button
                type="primary"
                onClick={() =>
                  navigate(`/service/${service.serId}`, {
                    state: { serviceData: service },
                  })
                }
              >
                XEM THÊM
              </Button>
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );
};

export default Service;
