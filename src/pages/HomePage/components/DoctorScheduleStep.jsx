import { List, Button, Tag } from "antd";

const SLOT_LABELS = {
  1: "08:00 - 12:00",
  2: "13:00 - 17:00",
};

const DoctorScheduleStep = ({ doctorSchedules, onSelectSchedule, onPrev }) => {
  return (
    <div>
      <List
        bordered
        dataSource={doctorSchedules.filter((s) => s.isAvailable)}
        renderItem={(schedule) => (
          <List.Item
            style={{ cursor: "pointer" }}
            onClick={() => onSelectSchedule(schedule)}
          >
            <div>
              <b>Ngày:</b> {schedule.date} - <b>Ca:</b>{" "}
              {SLOT_LABELS[schedule.slotId] || "Không rõ"}
              <Tag color="green" style={{ marginLeft: 8 }}>
                Còn chỗ
              </Tag>
            </div>
          </List.Item>
        )}
        locale={{ emptyText: "Không có lịch trống" }}
      />
      <div style={{ marginTop: 16 }}>
        <Button onClick={onPrev}>Quay lại</Button>
      </div>
    </div>
  );
};

export default DoctorScheduleStep;
