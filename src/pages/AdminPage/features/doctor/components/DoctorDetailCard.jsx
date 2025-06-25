import { Card, Descriptions, Tag, Avatar, Space, Tooltip } from "antd";
import { StarFilled, EditOutlined, CloseOutlined } from "@ant-design/icons";

const DoctorDetailCard = ({ doctor, educationLevels, onClose, onEdit }) => {
  if (!doctor) return null;

  const educationLevel = educationLevels.filter(
    (e) => e.eduId === doctor.eduId
  );
  const renderStatus = (status) => {
    const map = {
      1: { label: "Đang làm việc", color: "green" },
      2: { label: "Nghỉ việc", color: "red" },
      3: { label: "Nghỉ phép", color: "gold" },
    };
    const tag = map[status];
    return <Tag color={tag?.color}>{tag?.label}</Tag>;
  };

  const renderGender = (gender) => (gender === 1 ? "Nam" : "Nữ");

  const renderStars = (count) => {
    if (!count || count <= 0) return null;
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(
        <StarFilled key={i} style={{ color: "#fadb14", marginRight: 2 }} />
      );
    }
    return (
      <Tooltip title={`${count} sao đánh giá`}>
        <div style={{ marginTop: 4 }}>{stars}</div>
      </Tooltip>
    );
  };
  return (
    <Card
      title="Thông tin bác sĩ"
      extra={
        <>
          <a onClick={onEdit} style={{ marginRight: 16 }}>
            <EditOutlined /> Chỉnh sửa
          </a>
          <a onClick={onClose}>
            <CloseOutlined /> Đóng
          </a>
        </>
      }
      style={{ marginBottom: 24 }}
      bordered={false}
    >
      <Space align="start" style={{ marginBottom: 24 }}>
        <Avatar
          size={100}
          src={doctor.image}
          alt={doctor.doctorName}
          style={{ border: "1px solid #ddd" }}
        />
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>
            {doctor.doctorName}
          </div>
          <div style={{ color: "#888" }}>{doctor.email}</div>
          <div style={{ color: "#888" }}>{doctor.phone}</div>
          {renderStars(doctor.star)}
        </div>
      </Space>

      <Descriptions column={1} size="middle">
        <Descriptions.Item label="Mã bác sĩ">
          {doctor.doctorId}
        </Descriptions.Item>
        <Descriptions.Item label="Giới tính">
          {renderGender(doctor.gender)}
        </Descriptions.Item>
        <Descriptions.Item label="Năm sinh">
          {new Date(doctor.yob).toLocaleDateString("vi-VN")}
        </Descriptions.Item>
        <Descriptions.Item label="Trình độ">
          {educationLevel?.length > 0 ? (
            educationLevel.map((e) => {
              return (
                <Tag color="blue">
                  <a href={doctor.filePathEdu} target="blank">
                    {e.eduName}
                  </a>
                </Tag>
              );
            })
          ) : (
            <i>Chưa có</i>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Kinh nghiệm">
          {doctor.experience} năm
        </Descriptions.Item>
        <Descriptions.Item label="Ngày bắt đầu công tác">
          {new Date(doctor.startDate).toLocaleDateString("vi-VN")}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          {renderStatus(doctor.status)}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default DoctorDetailCard;
