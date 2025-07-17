// File: components/ActionSection.jsx
import { Card, Button } from "antd";

export default function ActionSection({ statusId, onConfirm }) {
  let buttonLabel = null;

  if (statusId === 3) {
    buttonLabel = "Xác nhận đang khám"; // Check-in → Đang khám
  } else if (statusId === 4) {
    buttonLabel = "Xác nhận đã khám xong"; // Đang khám → Đã khám
  }

  // Các trạng thái không thao tác: 1 (Chờ xác nhận), 2 (Đã xác nhận), 5 (Đã khám), 6 (Hủy)
  if (![3, 4].includes(statusId)) {
    return <Card title="Thao tác">Không có thao tác khả dụng</Card>;
  }

  return (
    <Card title="Thao tác">
      <Button type="primary" block onClick={onConfirm}>
        {buttonLabel}
      </Button>
    </Card>
  );
}
