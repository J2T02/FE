import { Card, Typography, Space, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useDoctor } from "../context/DoctorContext";

const { Title, Text } = Typography;

const weekdays = [
  { label: "Thứ 2", day: 1 },
  { label: "Thứ 3", day: 2 },
  { label: "Thứ 4", day: 3 },
  { label: "Thứ 5", day: 4 },
  { label: "Thứ 6", day: 5 },
  { label: "Thứ 7", day: 6 },
  { label: "Chủ nhật", day: 0 },
];

const DoctorWeeklySchedule = ({
  doctorId,
  schedules,
  weekStartDate,
  onEditSchedule,
}) => {
  const { slots } = useDoctor();
  const startOfWeek = dayjs(weekStartDate);
  const endOfWeek = startOfWeek.add(6, "day");

  const getShiftsForDate = (day) => {
    const date = startOfWeek.day(day);
    return schedules.filter(
      (s) => s.doctorId === doctorId && dayjs(s.date).isSame(date, "day")
    );
  };

  const getSlotLabel = (slotId) => {
    const slot = slots.find((s) => s.id === slotId);
    return slot
      ? `${slot.slotName} (${slot.start} - ${slot.end})`
      : `Ca ${slotId}`;
  };

  return (
    <Card style={{ marginTop: 16 }}>
      <Title level={5} style={{ marginBottom: 12 }}>
        Lịch làm việc tuần {startOfWeek.format("DD/MM")} -{" "}
        {endOfWeek.format("DD/MM")}
      </Title>

      <Space direction="vertical" style={{ width: "100%" }}>
        {weekdays.map(({ label, day }) => {
          const shifts = getShiftsForDate(day);
          return (
            <div key={day}>
              <Text strong>{label}:</Text>
              {shifts.length === 0 ? (
                <Text style={{ marginLeft: 8 }}>Nghỉ</Text>
              ) : (
                <Space direction="vertical" style={{ marginLeft: 8 }}>
                  {shifts.map((s, idx) => (
                    <div
                      key={idx}
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <Text>
                        {getSlotLabel(s.slotId)} {s.note ? `(${s.note}) ` : ""}
                        {s.isAvailable
                          ? "✅ Còn nhận booking"
                          : "❌ Không nhận booking"}
                        {/* – SL:{" "} */}
                        {/* {s.maxBooking} */}
                      </Text>
                      <Tooltip title="Chỉnh sửa ca">
                        <EditOutlined
                          style={{ color: "#1890ff", cursor: "pointer" }}
                          onClick={() => onEditSchedule?.(s)}
                        />
                      </Tooltip>
                    </div>
                  ))}
                </Space>
              )}
            </div>
          );
        })}
      </Space>
    </Card>
  );
};

export default DoctorWeeklySchedule;
