
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function BackButton() {
  return (
    <Button
      icon={<ArrowLeftOutlined />}
      onClick={() => window.history.back()}
      /* token: dùng màu text mặc định & border radius = 6 */
      style={{ display: "flex", alignItems: "center", gap: 4 }}
      type="primary"
    >
      Quay lại
    </Button>
  );
}
