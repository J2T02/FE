// File: components/BackButton.jsx
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      icon={<ArrowLeftOutlined />}
      onClick={() => {
        if (embedded && typeof onBack === "function") {
          onBack();
        } else {
          navigate(-1);
        }
      }}
      style={{ display: "flex", alignItems: "center", gap: 4, borderRadius: 6 }}
      type="primary"
    >
      Quay lại
    </Button>
  );
}
