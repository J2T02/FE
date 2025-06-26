import { List, Button } from "antd";

const AvailableDoctorsStep = ({ doctors, onSelectDoctor, onPrev }) => {
  return (
    <div>
      <List
        bordered
        dataSource={doctors}
        renderItem={(doctor) => (
          <List.Item
            style={{ cursor: "pointer" }}
            onClick={() => onSelectDoctor(doctor)}
          >
            {doctor.name}
          </List.Item>
        )}
        locale={{ emptyText: "Không có bác sĩ trống" }}
      />
      <div style={{ marginTop: 16 }}>
        <Button onClick={onPrev}>Quay lại</Button>
      </div>
    </div>
  );
};

export default AvailableDoctorsStep;
