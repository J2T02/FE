import React from "react";
import { Input, Button } from "antd";

const ConsultBanner = () => {
  return (
    <div
      style={{
        backgroundColor: "#fdf1f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
        gap: 32,
        flexWrap: "wrap", // đảm bảo responsive khi thu nhỏ
      }}
    >
      {/* Ảnh y tá */}
      <img src="/consult.png" alt="consult" style={{ height: 100 }} />

      {/* Tiêu đề giữa */}
      <h3
        style={{
          color: "#D75C78",
          fontWeight: "bold",
          fontSize: 22,
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        TƯ VẤN VÀ ĐẶT HẸN TRỰC TUYẾN
      </h3>

      {/* Input + button */}
      <div style={{ display: "flex", gap: 8 }}>
        <Input placeholder="Nhập số điện thoại" style={{ width: 250 }} />
        <Button
          type="primary"
          style={{
            backgroundColor: "#D75C78",
            border: "none",
            minWidth: 100,
          }}
        >
          ĐĂNG KÝ
        </Button>
      </div>
    </div>
  );
};

export default ConsultBanner;
