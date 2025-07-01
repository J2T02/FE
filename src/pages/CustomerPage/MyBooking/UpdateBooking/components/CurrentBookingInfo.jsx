import { Descriptions } from "antd";

const CurrentBookingInfo = ({ booking }) => {
  const { doc, schedule } = booking;

  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="Bác sĩ" labelStyle={{ fontWeight: "600" }}>
        {doc?.accDoc?.fullName}
      </Descriptions.Item>
      <Descriptions.Item label="Ngày hẹn" labelStyle={{ fontWeight: "600" }}>
        {schedule?.workDate}
      </Descriptions.Item>
      <Descriptions.Item label="Ca" labelStyle={{ fontWeight: "600" }}>
        {schedule?.slot?.slotStart} - {schedule?.slot?.slotStart}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default CurrentBookingInfo;
