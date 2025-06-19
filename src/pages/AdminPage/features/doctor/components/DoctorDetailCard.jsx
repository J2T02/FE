// // import { Card, Avatar, Typography, Space, Tag, Button } from "antd";
// // import {
// //   UserOutlined,
// //   MailOutlined,
// //   PhoneOutlined,
// //   CalendarOutlined,
// //   CloseOutlined,
// //   EditOutlined,
// // } from "@ant-design/icons";

// // const { Title, Text } = Typography;

// // const DoctorDetailCard = ({ doctor, onClose, onEdit }) => {
// //   if (!doctor) return null;

// //   return (
// //     <Card
// //       title="Thông tin bác sĩ"
// //       extra={
// //         <Space>
// //           {onClose && (
// //             <CloseOutlined
// //               style={{ color: "#888", cursor: "pointer" }}
// //               onClick={onClose}
// //             />
// //           )}
// //         </Space>
// //       }
// //     >
// //       <div
// //         style={{
// //           display: "flex",
// //           flexDirection: "column",
// //           alignItems: "center",
// //           position: "relative",
// //         }}
// //       >
// //         {onEdit && (
// //           <div
// //             onClick={onEdit}
// //             style={{
// //               cursor: "pointer",
// //               position: "absolute",
// //               right: 0,
// //               top: -5,
// //             }}
// //           >
// //             <EditOutlined /> Chỉnh sửa
// //           </div>
// //         )}
// //         <Avatar
// //           size={80}
// //           icon={<UserOutlined />}
// //           style={{ marginBottom: 12 }}
// //         />

// //         <Title level={4} style={{ marginBottom: 0 }}>
// //           {doctor.fullName}
// //         </Title>
// //         <Text type="secondary">Chuyên khoa: {doctor.specialty}</Text>

// //         <Tag
// //           color={doctor.status === "Đang làm việc" ? "green" : "default"}
// //           style={{ marginTop: 8 }}
// //         >
// //           {doctor.status}
// //         </Tag>
// //       </div>

// //       <div style={{ marginTop: 24 }}>
// //         <Space direction="vertical" size={12} style={{ width: "100%" }}>
// //           <Text>
// //             <MailOutlined style={{ marginRight: 8 }} />
// //             {doctor.email}
// //           </Text>
// //           <Text>
// //             <PhoneOutlined style={{ marginRight: 8 }} />
// //             {doctor.phone}
// //           </Text>
// //           <Text>
// //             <CalendarOutlined style={{ marginRight: 8 }} />
// //             Ngày vào làm: {doctor.startDate}
// //           </Text>
// //         </Space>
// //       </div>
// //     </Card>
// //   );
// // };

// // export default DoctorDetailCard;

// import { Card, Avatar, Typography, Space, Tag } from "antd";
// import {
//   UserOutlined,
//   MailOutlined,
//   PhoneOutlined,
//   CalendarOutlined,
//   CloseOutlined,
//   EditOutlined,
// } from "@ant-design/icons";

// const { Title, Text } = Typography;

// const DoctorDetailCard = ({ doctor, onClose, onEdit }) => {
//   if (!doctor) return null;

//   const { fullName, specialty, status, email, phone, startDate } = doctor;

//   const statusColor =
//     status === "Đang làm việc"
//       ? "green"
//       : status === "Nghỉ việc"
//       ? "red"
//       : "default";

//   const InfoItem = ({ icon, text }) => (
//     <Text>
//       {icon}
//       {text}
//     </Text>
//   );

//   return (
//     <Card
//       title="Thông tin bác sĩ"
//       extra={
//         onClose && (
//           <CloseOutlined
//             style={{ color: "#888", cursor: "pointer" }}
//             onClick={onClose}
//           />
//         )
//       }
//     >
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           position: "relative",
//         }}
//       >
//         {onEdit && (
//           <div
//             onClick={onEdit}
//             style={{
//               cursor: "pointer",
//               position: "absolute",
//               right: 0,
//               top: -5,
//             }}
//           >
//             <EditOutlined /> Chỉnh sửa
//           </div>
//         )}

//         <Avatar
//           size={80}
//           icon={<UserOutlined />}
//           style={{ marginBottom: 12 }}
//         />

//         <Title level={4} style={{ marginBottom: 0 }}>
//           {fullName}
//         </Title>
//         <Text type="secondary">Chuyên khoa: {specialty}</Text>

//         <Tag color={statusColor} style={{ marginTop: 8 }}>
//           {status}
//         </Tag>
//       </div>

//       <div style={{ marginTop: 24 }}>
//         <Space direction="vertical" size={12} style={{ width: "100%" }}>
//           <InfoItem
//             icon={<MailOutlined style={{ marginRight: 8 }} />}
//             text={email}
//           />
//           <InfoItem
//             icon={<PhoneOutlined style={{ marginRight: 8 }} />}
//             text={phone}
//           />
//           <InfoItem
//             icon={<CalendarOutlined style={{ marginRight: 8 }} />}
//             text={`Ngày vào làm: ${startDate}`}
//           />
//         </Space>
//       </div>
//     </Card>
//   );
// };

// export default DoctorDetailCard;

import { Card, Descriptions, Tag, Avatar, Space } from "antd";

const DoctorDetailCard = ({ doctor, onClose, onEdit }) => {
  if (!doctor) return null;

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

  return (
    <Card
      title="Thông tin bác sĩ"
      extra={
        <>
          <a onClick={onEdit} style={{ marginRight: 16 }}>
            Chỉnh sửa
          </a>
          <a onClick={onClose}>Đóng</a>
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
        <Descriptions.Item label="Kinh nghiệm">
          {doctor.experience} năm
        </Descriptions.Item>
        <Descriptions.Item label="Ngày bắt đầu công tác">
          {new Date(doctor.startDate).toLocaleDateString("vi-VN")}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          {renderStatus(doctor.status)}
        </Descriptions.Item>
        <Descriptions.Item label="Chứng chỉ">
          {doctor.certification?.length > 0 ? (
            doctor.certification.map((cer) => (
              <Tag key={cer.cerId} color="blue">
                {cer.cerName}
              </Tag>
            ))
          ) : (
            <i>Chưa có</i>
          )}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default DoctorDetailCard;
