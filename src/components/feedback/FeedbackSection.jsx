import React from "react";
import { Card, Typography, Rate, List } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

const FeedbackSection = ({ feedbacks }) => {
  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div style={{ marginTop: 8 }}>
        <Text type="secondary">Chưa có phản hồi nào.</Text>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 8, maxHeight: 250, overflowY: 'auto' }}>
      <List
        dataSource={feedbacks}
        renderItem={(item) => (
          <List.Item style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <Text strong>{`Gia đình anh ${item.hus_Name} và chị ${item.wife_Name}`}</Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>{dayjs(item.createAt).format("DD/MM/YYYY")}</Text>
              </div>
              <div style={{ marginBottom: 8 }}>
                <Rate disabled defaultValue={item.star} style={{ fontSize: '14px' }} />
              </div>
              <div>
                <Text>{item.content}</Text>
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default FeedbackSection;