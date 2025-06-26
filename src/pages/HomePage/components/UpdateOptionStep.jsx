import { Radio, Button } from "antd";

const UpdateOptionStep = ({ option, setOption, onNext }) => {
  return (
    <div>
      <Radio.Group
        onChange={(e) => setOption(e.target.value)}
        value={option}
        style={{ marginBottom: 16 }}
      >
        <Radio value="doctor">Đổi bác sĩ</Radio>
        <Radio value="schedule">Đổi lịch</Radio>
      </Radio.Group>
      <br />
      <Button type="primary" disabled={!option} onClick={onNext}>
        Tiếp tục
      </Button>
    </div>
  );
};

export default UpdateOptionStep;
