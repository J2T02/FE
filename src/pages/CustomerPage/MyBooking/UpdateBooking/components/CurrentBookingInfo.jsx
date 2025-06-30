import { Descriptions } from "antd";

const CurrentBookingInfo = ({ booking }) => {
  const { doc, schedule } = booking;

  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="Bác sĩ">
        {doc?.accDoc?.fullName}
      </Descriptions.Item>
      <Descriptions.Item label="Ngày hẹn">
        {schedule?.workDate}
      </Descriptions.Item>
      <Descriptions.Item label="Ca">
        {schedule?.slot?.slotStart} - {schedule?.slot?.slotStart}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default CurrentBookingInfo;
