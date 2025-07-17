import React, { useEffect, useState } from "react";
import { Card, Typography, List } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { getTreatmentStepList } from "../../../apis/treatmentService";
const { Title, Text } = Typography;

function CardList({ serId }) {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const res = await getTreatmentStepList();
        if (res?.data?.data) {
          // Lọc các bước có serId trùng với prop
          const filtered = res.data.data.filter(
            (step) => step.serviceInfo?.serId === serId
          );
          setSteps(filtered);
        }
      } catch (error) {
        setSteps([]);
      }
    };
    fetchSteps();
  }, [serId]);

  return (
    <div>
      <Card bordered style={{ borderColor: "#f0dede", borderRadius: 8 }}>
        <Title
          level={4}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#1f1f1f",
          }}
        >
          <CheckCircleOutlined style={{ color: "green" }} />
          Quá trình điều trị
        </Title>
        <List
          dataSource={steps}
          renderItem={(item, index) => (
            <List.Item style={{ paddingLeft: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: "#cce4ff",
                    color: "#1d39c4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {index + 1}
                </span>
                <Text>{item.stepName}</Text>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

export default CardList;
