import { Card, Typography, Space } from "antd";
import dayjs from "dayjs";

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

const DoctorWeeklySchedule = ({ doctorId, schedules = [], weekStartDate }) => {
  const startOfWeek = dayjs(weekStartDate);
  const endOfWeek = startOfWeek.add(6, "day");

  const getScheduleForDate = (targetDay) => {
    const date = startOfWeek.day(targetDay);
    return schedules.find(
      (s) => s.doctorId === doctorId && dayjs(s.date).isSame(date, "day")
    );
  };

  return (
    <Card>
      <Title level={5} style={{ marginBottom: 12 }}>
        Lịch làm việc tuần {startOfWeek.format("DD/MM")} -{" "}
        {endOfWeek.format("DD/MM")}
      </Title>

      <Space direction="vertical" size={8} style={{ width: "100%" }}>
        {weekdays.map(({ label, day }) => {
          const schedule = getScheduleForDate(day);
          return (
            <div key={day}>
              <Text strong>{label}:</Text>

              <Text style={{ marginLeft: 8 }}>
                {schedule ? `${schedule.start} - ${schedule.end}` : "Nghỉ"}
              </Text>
            </div>
          );
        })}
      </Space>
    </Card>
  );
};

export default DoctorWeeklySchedule;
