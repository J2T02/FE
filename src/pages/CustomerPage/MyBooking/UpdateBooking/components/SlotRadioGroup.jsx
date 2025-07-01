import { Form, Radio } from "antd";

const SlotRadioGroup = ({ slots, selectedSlot, onChange }) => {
  return (
    <Form.Item label="Chọn khung giờ">
      <Radio.Group
        value={selectedSlot}
        onChange={(e) => onChange(e.target.value)}
        optionType="button"
        buttonStyle="solid"
      >
        {slots.map((s) => (
          <Radio.Button
            key={s.slot.slotId}
            value={s.slot.slotId}
            style={{ marginRight: 8 }}
          >
            {s.slot.slotStart} - {s.slot.slotEnd}
          </Radio.Button>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default SlotRadioGroup;
