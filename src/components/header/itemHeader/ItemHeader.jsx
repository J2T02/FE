function ItemHeader({ icon, title, content }) {
  const url = "https://fap.fpt.edu.vn/";
  return (
    <div
      style={{
        display: "flex",
        // width: 155,
        height: 48,
        gap: 15,
      }}
    >
      <div
        style={{
          backgroundColor: "#F5F5F5",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "48px",
          height: "48px",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          gap: 5,
        }}
      >
        <a href={url} target="_blank" rel="noopener noreferrer">
          <div style={{ color: "#A6A6A6", height: 17 }}>{title}</div>
          <div style={{ color: "#132432", height: 48 }}>
            <strong>{content}</strong>
          </div>
        </a>
      </div>
    </div>
  );
}

export default ItemHeader;
