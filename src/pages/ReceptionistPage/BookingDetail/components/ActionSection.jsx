// File: components/ActionSection.jsx
import { Card, Button } from "antd";

export default function ActionSection({ statusId, onCheckIn }) {
  return (
    <Card title="Thao tác">
      <Button
        type="primary"
        block
        disabled={statusId !== 2} // Chỉ check-in khi đã xác nhận
        onClick={onCheckIn}
      >
        Check-in
      </Button>
    </Card>
  );
}
