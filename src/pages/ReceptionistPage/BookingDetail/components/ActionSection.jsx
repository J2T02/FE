// File: pages/ReceptionistPage/components/ActionSection.jsx
import { Card, Button, Typography } from "antd";

export default function ActionSection({ statusId, onCheckIn, treatmentPlan, onCreateTP }) {
  const { Link, Text } = Typography;

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
            <Link href={`/treatmentplan/${treatmentPlan.tpId}`}>Xem chi tiết</Link>
          </>
        )}
      </Card>
    );
  }

  return (
    <Card title="Thao tác">
      <Text type="secondary">Không có thao tác khả dụng</Text>
    </Card>
  );
}
