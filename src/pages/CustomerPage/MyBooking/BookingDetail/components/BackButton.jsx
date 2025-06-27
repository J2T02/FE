import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/customer/booking");
  };

  return (
    <Button
      icon={<ArrowLeftOutlined />}
      onClick={handleBack}
      style={{ display: "flex", alignItems: "center", gap: 4, borderRadius: 6 }}
      type="primary"
    >
      Quay lại
    </Button>
  );
}
