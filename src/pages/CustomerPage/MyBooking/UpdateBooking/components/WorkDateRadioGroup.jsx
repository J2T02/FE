import { Form, Radio } from "antd";
import dayjs from "dayjs";

const WorkDateRadioGroup = ({ dates, selectedDate, onChange }) => {
  return (
    <Form.Item label="Chọn ngày làm việc">
      <Radio.Group
        value={selectedDate}
        onChange={(e) => onChange(e.target.value)}
        optionType="button"
        buttonStyle="solid"
      >
        {dates.map((date) => (
          <Radio.Button key={date} value={date}>
            {dayjs(date).format("DD/MM")}
          </Radio.Button>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default WorkDateRadioGroup;
