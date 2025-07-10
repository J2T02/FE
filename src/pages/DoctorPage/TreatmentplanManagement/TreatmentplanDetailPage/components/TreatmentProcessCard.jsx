import React, { useState } from "react";
import { Card, Space, Typography, Row, Col, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AddStepModal from "./AddStepModal"; // Modal thêm step detail

const { Text } = Typography;

const TreatmentProcessCard = ({
  stepDetails = [],
  tpId,
  doctorId,
  serviceId,
  onRefresh,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddStepClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalSuccess = () => {
    setIsModalVisible(false);
    if (onRefresh) {
      onRefresh(); // Load lại dữ liệu sau khi thêm thành công
    }
  };

  return (
    <>
      <Card
        title={
          <Row justify="space-between" align="middle">
            <Col>
              <Space>
                <Text strong>Quá trình điều trị</Text>
                <RouterLink
                  to={`/doctorpage/treatmentstep/${tpId}`}
                  style={{ color: "#f78db3" }}
                >
                  Xem đầy đủ
                </RouterLink>
              </Space>
            </Col>
            <Col>
              <Button
                icon={<PlusOutlined />}
                onClick={handleAddStepClick}
                style={{
                  backgroundColor: "#f78db3",
                  color: "white",
                  border: "none",
                }}
              >
                Thêm bước điều trị
              </Button>
            </Col>
          </Row>
        }
        bodyStyle={{ backgroundColor: "#fff7fa" }}
      >
        <div style={{ maxHeight: 260, overflowY: "auto" }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            {stepDetails.map((step) => (
              <Card
                key={step.SD_ID}
                type="inner"
                style={{ borderLeft: "5px solid #f78db3" }}
              >
                <Row justify="space-between">
                  <Col>
                    <Text strong>{step.Step_Name}</Text>
                    <br />
                    <Text type="secondary">Ngày hẹn: {step.PlanDate}</Text>
                    <br />
                    <Text>Bác sĩ: {step.doc?.fullName}</Text>
                  </Col>
                  <Col>
                    <RouterLink
                      to={`/doctorpage/stepdetail/${step.SD_ID}`}
                      style={{ color: "#f78db3" }}
                    >
                      Xem chi tiết
                    </RouterLink>
                  </Col>
                </Row>
              </Card>
            ))}
          </Space>
        </div>
      </Card>

      <AddStepModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onSuccess={handleModalSuccess}
        tpId={tpId}
        doctorId={doctorId}
        serviceId={serviceId}
        latestTSID={stepDetails?.[0]?.TS_ID} // ✅
      />
    </>
  );
};

export default TreatmentProcessCard;
