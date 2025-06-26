import { DatePicker, Radio, Button } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const SLOT_OPTIONS = [
  { label: "Sáng (08:00 - 12:00)", value: 1 },
  { label: "Chiều (13:00 - 17:00)", value: 2 },
];

const disabledDate = (current) => {
  return current && current < dayjs().startOf("day");
};

const DateSlotSelectionStep = ({
  selectedDateSlot,
  setSelectedDateSlot,
  onNext,
  onPrev,
}) => {
  const [date, setDate] = useState(
    selectedDateSlot?.date ? dayjs(selectedDateSlot.date) : null
  );
  const [slot, setSlot] = useState(selectedDateSlot?.slot || null);

  const handleNext = () => {
    if (date && slot) {
      setSelectedDateSlot({ date: date.format("YYYY-MM-DD"), slot });
      onNext();
    }
  };

  return (
    <div>
      <DatePicker
        disabledDate={disabledDate}
        value={date}
        onChange={(d) => setDate(d)}
        style={{ marginBottom: 16, display: "block" }}
      />
      <Radio.Group
        options={SLOT_OPTIONS}
        onChange={(e) => setSlot(e.target.value)}
        value={slot}
        optionType="button"
        buttonStyle="solid"
        style={{ marginBottom: 16 }}
      />
      <br />
      <Button onClick={onPrev} style={{ marginRight: 8 }}>
        Quay lại
      </Button>
      <Button type="primary" disabled={!date || !slot} onClick={handleNext}>
        Tiếp tục
      </Button>
    </div>
  );
};

export default DateSlotSelectionStep;
