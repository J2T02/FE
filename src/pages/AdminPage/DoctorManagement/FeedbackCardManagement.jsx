import React from "react";
import { Card, Rate, Typography } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

const FeedbackCardManagement = ({ data, doctorId }) => {
  // Lấy đúng các trường từ data
  const { hus_Name, wife_Name, createAt, star, content } = data;

  return (
    <Card style={{ marginBottom: 12 }}>
      <Text strong>
        Gia đình anh {hus_Name} và chị {wife_Name}
      </Text>
      <div style={{ marginTop: 4 }}>
        <Text type="secondary">{dayjs(createAt).format("DD/MM/YYYY")}</Text>
        <Rate disabled defaultValue={star} style={{ marginLeft: 8 }} />
      </div>
      <div style={{ marginTop: 8 }}>
        <Text>{content}</Text>
      </div>
    </Card>
  );
};

export default FeedbackCardManagement;
