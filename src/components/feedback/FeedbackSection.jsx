import React, { useEffect, useState } from "react";
import { Card, Typography, Rate, List } from "antd";
import dayjs from "dayjs";
import { getFeedbackByDoctorId } from "../../apis/feedbackService";
const { Text } = Typography;

const FeedbackSection = ({ docId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!docId) return;
    setLoading(true);
    getFeedbackByDoctorId(docId)
      .then((res) => {
        if (res?.data?.data) {
          setFeedbacks(res.data.data);
        } else {
          setFeedbacks([]);
        }
      })
      .catch(() => setFeedbacks([]))
      .finally(() => setLoading(false));
  }, [docId]);

  if (loading) {
    return <Text type="secondary">Đang tải phản hồi...</Text>;
  }

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div style={{ marginTop: 8 }}>
        <Text type="secondary">Chưa có phản hồi nào.</Text>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 8, maxHeight: 250, overflowY: "auto" }}>
      <List
        dataSource={feedbacks}
        renderItem={(item) => (
          <List.Item
            style={{ padding: "12px 0", borderBottom: "1px solid #f0f0f0" }}
          >
            <div style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text strong>
                  {`Gia đình anh ${item.cus?.husName || ""} và chị ${
                    item.cus?.wifeName || ""
                  }`}
                </Text>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {dayjs(item.createAt).format("DD/MM/YYYY")}
                </Text>
              </div>
              <div style={{ marginBottom: 8 }}>
                <Rate
                  disabled
                  defaultValue={item.star}
                  style={{ fontSize: "14px" }}
                />
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
