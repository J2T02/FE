import { Card, Button, Space, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ActionSection() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (mode) => {
    navigate(`/bookingUpdate/:id?option=${mode}`); // bookingId cần được lấy từ props hoặc context
// chuyển sang trang BookingUpdatePage
  };

  return (
    <>
      <Card title="Thao tác">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Button type="primary" block onClick={() => setOpen(true)}>
            Chỉnh sửa đặt lịch
          </Button>
          <Button danger block onClick={() => console.log("Hủy đặt lịch")}>
            Hủy đặt lịch
          </Button>
          <Button type="primary" block onClick={() => window.print()}>
            In thông tin
          </Button>
        </Space>
      </Card>

      <Modal
        title="Chọn hành động chỉnh sửa"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Button type="primary" block onClick={() => handleSelect("schedule")}>
            Đổi lịch hẹn
          </Button>
          <Button type="primary" block onClick={() => handleSelect("doctor")}>
            Đổi bác sĩ
          </Button>
        </Space>
      </Modal>
    </>
  );
}
