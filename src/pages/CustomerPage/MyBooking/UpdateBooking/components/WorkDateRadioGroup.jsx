import { Form, Radio } from "antd";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import "dayjs/locale/vi";

dayjs.extend(weekday);
dayjs.locale("vi");

const WorkDateRadioGroup = ({ dates, selectedDate, onChange }) => {
  const getDayLabel = (dateStr) => {
    const dow = dayjs(dateStr).day(); // 0 = Sunday
    return dow === 0 ? "CN" : `T${dow + 1}`; // 1 -> T2, 2 -> T3, ...
  };

  return (
    <Form.Item label="Chọn ngày khám">
      <Radio.Group
        value={selectedDate}
        onChange={(e) => onChange(e.target.value)}
        optionType="button"
        buttonStyle="solid"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {dates.map((date) => (
          <Radio.Button
            key={date}
            value={date}
            style={{
              width: 60,
              height: 60,
              padding: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 12 }}>
              {getDayLabel(date)}
            </div>
            <div style={{ fontSize: 13 }}>{dayjs(date).format("DD/MM")}</div>
          </Radio.Button>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default WorkDateRadioGroup;
