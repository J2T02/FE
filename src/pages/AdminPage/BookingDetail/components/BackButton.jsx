import React from "react";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      type="text"
      icon={<ArrowLeftOutlined />}
      onClick={() => navigate("/admin")}
      style={{ padding: 5, height: "auto", background: "#f78db3" }}
    >
      Quay lại danh sách lịch hẹn
    </Button>
  );
};

export default BackButton;
