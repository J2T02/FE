import React from "react";
import { Button } from "antd";
import { CheckOutlined, ArrowRightOutlined } from "@ant-design/icons";

const processSteps = [
  {
    step: "BƯỚC 1",
    title: "Tư vấn online + Đặt hẹn",
    desc: "Giúp bạn tối ưu hóa thời gian, rút ngắn thủ tục thăm khám và nhận hỗ trợ ưu đãi",
    items: [
      "Nói chuyện với bác sĩ",
      "Lấy số thứ tự online",
      "Đến khám theo lịch",
    ],
    color: "#6FCF97",
    buttonColor: "#27AE60",
  },
  {
    step: "BƯỚC 2",
    title: "Xét nghiệm + Điều trị",
    desc: "Giúp chẩn đoán chính xác bệnh và áp dụng phác đồ điều trị hiệu quả",
    items: [
      "Bác sĩ thăm khám",
      "Làm xét nghiệm, siêu âm",
      "Điều trị theo phác đồ",
    ],
    color: "#EB5757",
    buttonColor: "#C0392B",
  },
  {
    step: "BƯỚC 3",
    title: "Theo dõi + Tái khám",
    desc: "Giúp giảm thiểu tối đa các biến chứng, rút ngắn quá trình phục hồi sức khỏe",
    items: [
      "Theo dõi sau điều trị",
      "Tuân thủ đúng liệu trình",
      "Tái khám theo lịch hẹn",
    ],
    color: "#F2C94C",
    buttonColor: "#F2994A",
  },
];

const ProcessSection = () => {
  return (
    <div
      style={{
        padding: "80px 0",
        textAlign: "center",
        backgroundImage: `url("/i2.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 style={{ fontSize: 28, fontWeight: 700, color: "white" }}>
        Quy trình hỗ trợ khám chữa bệnh
      </h2>
      <p style={{ maxWidth: 700, margin: "12px auto", color: "white" }}>
        Dịch vụ y tế đạt chuẩn quốc tế từ khâu đón tiếp, hỗ trợ, điều trị tới hỗ
        trợ trực tuyến, giúp người bệnh trải nghiệm quy trình khám chữa bệnh
        chuyên nghiệp ngay tại Việt Nam
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 24,
          marginTop: 40,
          flexWrap: "wrap",
        }}
      >
        {processSteps.map((step, index) => (
          <div
            key={index}
            style={{
              width: 300,
              background: "#fff",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                background: step.color,
                padding: "8px 0",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {step.step}
            </div>
            <div style={{ padding: 24 }}>
              <img
                src={`buoc${index + 1}.png`}
                alt="step icon"
                style={{ height: 64, marginBottom: 16 }}
              />
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: "#666", minHeight: 60 }}>
                {step.desc}
              </p>
              <ul
                style={{
                  textAlign: "left",
                  paddingLeft: 0,
                  marginBottom: 24,
                  listStyle: "none",
                }}
              >
                {step.items.map((item, i) => (
                  <li key={i} style={{ marginBottom: 8 }}>
                    <CheckOutlined
                      style={{ color: step.color, marginRight: 8 }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                type="primary"
                icon={<ArrowRightOutlined />}
                style={{
                  background: step.buttonColor,
                  borderColor: step.buttonColor,
                  width: "100%",
                }}
              >
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessSection;
