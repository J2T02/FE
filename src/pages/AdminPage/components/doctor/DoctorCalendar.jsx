import { Card, Typography, Select, Tag, Space, Tooltip, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useMemo, useState } from "react";

const { Title, Text } = Typography;

const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

const DoctorCalendar = ({
  data = [],
  doctors = [],
  onRemoveDoctorFromDate,
  selectedWeekStart,
  onChangeWeekStart,
}) => {
  const currentYear = dayjs().year();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  // Khi chọn năm → nếu tuần hiện tại không thuộc năm đó thì reset về tuần đầu năm
  const handleChangeYear = (year) => {
    setSelectedYear(year);

    const currentWeekYear = dayjs(selectedWeekStart).year();
    if (currentWeekYear !== year) {
      const firstMonday = dayjs(`${year}-01-01`).startOf("week").add(1, "day");
      onChangeWeekStart(firstMonday.format("YYYY-MM-DD"));
    }
  };

  const yearOptions = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const year = currentYear - 2 + i;
      return { label: `${year}`, value: year };
    });
  }, [currentYear]);

  const weekOptions = useMemo(() => {
    const startOfYear = dayjs(`${selectedYear}-01-01`)
      .startOf("week")
      .add(1, "day");
    return Array.from({ length: 52 }, (_, i) => {
      const start = startOfYear.add(i * 7, "day");
      const end = start.add(6, "day");
      return {
        label: `${start.format("DD/MM")} - ${end.format("DD/MM")}`,
        value: start.format("YYYY-MM-DD"),
      };
    });
  }, [selectedYear]);

  const currentWeekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) =>
      dayjs(selectedWeekStart).add(i, "day")
    );
  }, [selectedWeekStart]);

  const getDoctorsByDate = (date) => {
    return data.filter((s) => dayjs(s.date).isSame(date, "day"));
  };

  const handleRemove = (doctorId, date) => {
    onRemoveDoctorFromDate?.(doctorId, date);
    message.success("Đã xoá bác sĩ khỏi ngày làm việc");
  };

  return (
    <Card
      title={
        <Title level={5} style={{ margin: 0 }}>
          Lịch làm việc
        </Title>
      }
      extra={
        <Space>
          <Select
            value={selectedYear}
            options={yearOptions}
            onChange={handleChangeYear}
          />
          <Select
            style={{ width: 240 }}
            value={dayjs(selectedWeekStart).format("YYYY-MM-DD")}
            options={weekOptions}
            onChange={(val) => onChangeWeekStart(val)}
          />
        </Space>
      }
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 8,
        }}
      >
        {currentWeekDays.map((date, idx) => {
          const doctorsInDay = getDoctorsByDate(date);

          return (
            <div
              key={idx}
              style={{
                border: "1px solid #eee",
                borderRadius: 6,
                padding: 8,
                minHeight: 120,
              }}
            >
              <div style={{ marginBottom: 8 }}>
                <Text strong>{weekdays[date.day()]}</Text> <br />
                <Text type="secondary">{date.format("DD/MM")}</Text>
              </div>

              <Space direction="vertical" size={4} style={{ width: "100%" }}>
                {doctorsInDay.map((item) => {
                  const doctor = doctors.find((d) => d.id === item.doctorId);
                  return (
                    <div
                      key={item.doctorId + item.date}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#f5f5f5",
                        borderRadius: 4,
                        padding: "2px 8px",
                      }}
                    >
                      <Tooltip title={item.note}>
                        <Text style={{ fontSize: 13 }}>
                          {doctor?.fullName || doctor?.name}
                        </Text>
                      </Tooltip>
                      <Tooltip title="Xoá khỏi ngày này">
                        <CloseOutlined
                          style={{ color: "#999", fontSize: 12 }}
                          onClick={() => handleRemove(item.doctorId, item.date)}
                        />
                      </Tooltip>
                    </div>
                  );
                })}
              </Space>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default DoctorCalendar;
