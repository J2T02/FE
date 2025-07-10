// File: pages/ReceptionistPage/components/ActionSection.jsx
import { Card, Button, Typography } from "antd";
import { ArrowLeftOutlined, PrinterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function ActionSection({
  statusId,
  onCheckIn,
  treatmentPlan,
  onCreateTP,
}) {
  const { Link, Text } = Typography;
  const navigate = useNavigate();

  if (statusId === 2) {
    return (
      <Card title="Thao tác">
        <Button type="primary" block onClick={onCheckIn}>
          Check-in
        </Button>
      </Card>
    );
  }

  if (statusId === 3) {
    return (
      <Card title="Thao tác">
        {!treatmentPlan ? (
          <Button type="primary" block onClick={onCreateTP}>
            Tạo hồ sơ bệnh án
          </Button>
        ) : (
          <>
            <Text strong>Đã tạo hồ sơ bệnh án cho booking này.</Text>
            <br />
            <Link href={`/treatmentplan/${treatmentPlan.tpId}`}>
              Xem chi tiết
            </Link>
          </>
        )}
      </Card>
    );
  }

  // Nếu statusId khác 1 hoặc 2 chỉ hiển thị nút In và Quay lại
  if (statusId !== 1 && statusId !== 2) {
    return (
      <Card title="Thao tác">
        <Button
          icon={<PrinterOutlined />}
          block
          style={{ marginBottom: 8 }}
          onClick={() => window.print()}
          type="primary"
        >
          In thông tin
        </Button>
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          block
          onClick={() => navigate(-1)}
        >
          Quay lại
        </Button>
      </Card>
    );
  }

  // Trạng thái 1 (Chờ xác nhận) hoặc fallback
  return (
    <Card title="Thao tác">
      <Text type="secondary">Không có thao tác khả dụng</Text>
    </Card>
  );
}
