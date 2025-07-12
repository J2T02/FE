import React, { useState, useEffect } from "react";
import { Card, Space, Typography, Row, Col, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AddStepModal from "./AddStepModal"; // Modal thêm step detail
import { getStepDetailByTreatmentPlanId } from "../../../../../apis/stepDetailService";
import dayjs from "dayjs";
const { Text } = Typography;

const TreatmentProcessCard = ({ tpId, doctorId, serviceId, onRefresh }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [stepDetails, setStepDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStepDetails = async () => {
    try {
      setLoading(true);
      const response = await getStepDetailByTreatmentPlanId(tpId);

      if (response.data.success) {
        const apiData = response.data.data;

        // Map API data to match existing UI structure
        const mappedStepDetails = apiData.map((step) => ({
          SD_ID: step.sdId,
          TS_ID: step.treatmentStepInfo?.tsId,
          Step_Name: step.stepName,
          PlanDate: step.planDate
            ? dayjs(step.planDate).format("DD/MM/YYYY")
            : "Chưa có lịch",
          DoneDate: step.doneDate
            ? dayjs(step.doneDate).format("DD/MM/YYYY")
            : null,
          Status: step.status?.statusId,
          StatusName: step.status?.statusName,
          Note: step.note,
          DrugName: step.drugName,
          Dosage: step.dosage,
          doc: {
            fullName:
              step.doctorInfo?.accountInfo?.fullName || "Chưa phân công",
            phone: step.doctorInfo?.accountInfo?.phone,
            mail: step.doctorInfo?.accountInfo?.mail,
          },
          treatmentStepInfo: step.treatmentStepInfo,
        }));

        // Sort by plan date (newest first)
        mappedStepDetails.sort((a, b) => {
          if (!a.PlanDate || a.PlanDate === "Chưa có lịch") return 1;
          if (!b.PlanDate || b.PlanDate === "Chưa có lịch") return -1;
          return (
            new Date(b.PlanDate.split("/").reverse().join("-")) -
            new Date(a.PlanDate.split("/").reverse().join("-"))
          );
        });

        setStepDetails(mappedStepDetails);
      } else {
        message.error("Không thể tải danh sách bước điều trị");
        setStepDetails([]);
      }
    } catch (error) {
      console.error("Error fetching step details:", error);
      message.error("Có lỗi xảy ra khi tải danh sách bước điều trị");
      setStepDetails([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tpId) {
      fetchStepDetails();
    }
  }, [tpId]);

  const handleAddStepClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleModalSuccess = () => {
    setIsModalVisible(false);
    fetchStepDetails(); // Load lại dữ liệu sau khi thêm thành công
    if (onRefresh) {
      onRefresh();
    }
  };

  const getStatusTag = (status) => {
    switch (status) {
      case 1:
        return <Text type="secondary">Chờ thực hiện</Text>;
      case 2:
        return <Text type="warning">Đang thực hiện</Text>;
      case 3:
        return <Text type="success">Đã hoàn thành</Text>;
      case 4:
        return <Text type="danger">Đã hủy</Text>;
      default:
        return <Text type="secondary">Không xác định</Text>;
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
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <Text>Đang tải...</Text>
            </div>
          ) : stepDetails.length > 0 ? (
            <Space direction="vertical" style={{ width: "100%" }}>
              {stepDetails.map((step) => (
                <Card
                  key={step.SD_ID}
                  type="inner"
                  style={{ borderLeft: "5px solid #f78db3" }}
                >
                  <Row justify="space-between">
                    <Col span={18}>
                      <Text strong>{step.Step_Name}</Text>
                      <br />
                      <Text type="secondary">Ngày hẹn: {step.PlanDate}</Text>
                      {step.DoneDate && (
                        <>
                          <br />
                          <Text type="success">
                            Ngày hoàn thành: {step.DoneDate}
                          </Text>
                        </>
                      )}
                      <br />
                      <Text>Bác sĩ: {step.doc?.fullName}</Text>
                      <br />
                      {getStatusTag(step.Status)}
                      {step.Note && (
                        <>
                          <br />
                          <Text type="secondary">Ghi chú: {step.Note}</Text>
                        </>
                      )}
                    </Col>
                    <Col span={6} style={{ textAlign: "right" }}>
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
          ) : (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <Text type="secondary">Chưa có bước điều trị nào</Text>
            </div>
          )}
        </div>
      </Card>

      <AddStepModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        onSuccess={handleModalSuccess}
        tpId={tpId}
        doctorId={doctorId}
        serviceId={serviceId}
        latestTSID={stepDetails?.[0]?.TS_ID}
      />
    </>
  );
};

export default TreatmentProcessCard;
