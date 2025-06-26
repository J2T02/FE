import { List, Button } from "antd";

const DoctorSelectionStep = ({
  doctors,
  selectedDoctor,
  setSelectedDoctor,
  onNext,
  onPrev,
}) => {
  return (
    <div>
      <List
        bordered
        dataSource={doctors}
        renderItem={(doctor) => (
          <List.Item
            onClick={() => setSelectedDoctor(doctor.doctorId)}
            style={{
              cursor: "pointer",
              backgroundColor:
                doctor.doctorId === selectedDoctor ? "#e6f7ff" : undefined,
            }}
          >
            {doctor.name}
          </List.Item>
        )}
      />
      <div style={{ marginTop: 16 }}>
        <Button onClick={onPrev} style={{ marginRight: 8 }}>
          Quay lại
        </Button>
        <Button type="primary" disabled={!selectedDoctor} onClick={onNext}>
          Tiếp tục
        </Button>
      </div>
    </div>
  );
};

export default DoctorSelectionStep;
