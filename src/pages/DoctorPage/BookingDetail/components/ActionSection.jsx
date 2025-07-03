// File: components/ActionSection.jsx
import { Card, Button } from "antd";

export default function ActionSection({ statusId, onConfirm }) {
  let buttonLabel = null;

  if (statusId === 3) buttonLabel = "Xác nhận đang khám";
  else if (statusId === 4) buttonLabel = "Xác nhận đã khám";

  return (
    <Card title="Thao tác">
      {buttonLabel && (
        <Button type="primary" block onClick={onConfirm}>
          {buttonLabel}
        </Button>
      )}
    </Card>
  );
}
