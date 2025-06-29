import { useState } from "react";

function CardItem({ icon, title, description, showDivider, onClick }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick} // ✅ hỗ trợ click chuyển trang
    >
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          paddingRight: showDivider ? 16 : 0,
          paddingLeft: 16,
          width: 233,
          height: 68,
          transition: "color 0.3s",
        }}
      >
        <div style={{ height: "100%", marginRight: 8 }}>{icon}</div>
        <div style={{ fontSize: 12, color: "#666", height: "100%" }}>
          <div
            style={{
              fontWeight: 600,
              fontSize: 14,
              color: hover ? "#f78db3" : "#000",
              transition: "color 0.3s",
              marginBottom: 8,
            }}
          >
            {title}
          </div>
          <div>{description}</div>
        </div>
      </div>

      {showDivider && (
        <div
          style={{
            width: 2,
            backgroundColor: "#eee",
            height: 62,
          }}
        />
      )}
    </div>
  );
}

export default CardItem;
