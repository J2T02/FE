import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Select,
  Input,
  Button,
  message,
} from "antd";
import dayjs from "dayjs";
import { GetAllService } from "../../../../../apis/service";
import { updateTreatment } from "../../../../../apis/treatmentService";
const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const getStatusTag = (status) => {
  switch (status) {
    case 1:
      return <Tag color="blue">Đang điều trị</Tag>;
    case 2:
      return <Tag color="green">Đã hoàn thành</Tag>;
    case 3:
      return <Tag color="red">Đã hủy</Tag>;
    default:
      return <Tag>Không xác định</Tag>;
  }
};

export default function TreatmentOverviewCard({ treatmentPlan, onUpdate }) {
  const tpId = treatmentPlan.TP_ID;

  const [status, setStatus] = useState(treatmentPlan.Status);
  const [service, setService] = useState(treatmentPlan.service?.Ser_ID);
  const [note, setNote] = useState(treatmentPlan.Result || "");
  const [endDate, setEndDate] = useState(treatmentPlan.EndDate || null);
  const [isEditable, setIsEditable] = useState(true);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [serviceError, setServiceError] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      setLoadingServices(true);
      setServiceError(null);
      try {
        const res = await GetAllService();

        if (res && res.data.success && Array.isArray(res.data.data)) {
          setServiceOptions(res.data.data);
        } else {
          setServiceOptions([]);
          setServiceError("Không lấy được danh sách dịch vụ");
        }
      } catch (err) {
        setServiceOptions([]);
        setServiceError("Lỗi khi lấy danh sách dịch vụ");
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      const payload = {
        serId: service,
        status: status,
        result: note,
      };
      await updateTreatment(tpId, payload);
      message.success("Cập nhật thành công");
      // Optionally update endDate if status is 2 or 3
      if (status === 2 || status === 3) {
        setEndDate(dayjs().format("YYYY-MM-DD"));
        setIsEditable(false);
      }
      if (onUpdate) onUpdate();
    } catch (err) {
      message.error("Cập nhật thất bại");
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <Card
      title={<Text strong>Tổng quan hồ sơ bệnh án</Text>}
      bodyStyle={{ backgroundColor: "#fff0f5" }}
      extra={
        isEditable && (
          <Button
            onClick={handleSave}
            style={{
              backgroundColor: "#f78db3",
              color: "#fff",
              border: "none",
            }}
            loading={saveLoading}
          >
            Lưu cập nhật
          </Button>
        )
      }
    >
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Text strong>Ngày bắt đầu:</Text>
          <br />
          <Text>
            {treatmentPlan.StartDate
              ? dayjs(treatmentPlan.StartDate).format("DD/MM/YYYY")
              : "Chưa có"}
          </Text>
        </Col>

        {endDate && (
          <Col span={12}>
            <Text strong>Ngày kết thúc:</Text>
            <br />
            <Text>{dayjs(endDate).format("DD/MM/YYYY")}</Text>
          </Col>
        )}

        <Col span={12}>
          <Text strong>Trạng thái:</Text>
          <br />
          {isEditable ? (
            <Select
              value={status}
              onChange={setStatus}
              style={{ width: "100%" }}
            >
              <Option value={1}>Đang điều trị</Option>
              <Option value={2}>Đã hoàn thành</Option>
              <Option value={3}>Đã hủy</Option>
            </Select>
          ) : (
            getStatusTag(status)
          )}
        </Col>

        <Col span={24}>
          <Text strong>Ghi chú:</Text>
          <br />
          {isEditable ? (
            <TextArea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập ghi chú về quá trình điều trị..."
            />
          ) : (
            <Text>{note || "Chưa có ghi chú"}</Text>
          )}
        </Col>

        <Col span={24}>
          <Text strong>Dịch vụ điều trị:</Text>
          <br />
          {isEditable ? (
            <Select
              value={service}
              onChange={setService}
              style={{ width: "100%" }}
              loading={loadingServices}
              placeholder={loadingServices ? "Đang tải..." : "Chọn dịch vụ"}
              disabled={loadingServices || !!serviceError}
            >
              {serviceOptions.map((s) => (
                <Option key={s.serId} value={s.serId}>
                  {s.serName}
                </Option>
              ))}
            </Select>
          ) : (
            <Text>
              {treatmentPlan.service?.Ser_Name ||
                serviceOptions.find((s) => s.serId === service)?.serName ||
                "Không xác định"}
            </Text>
          )}
          {serviceError && <div style={{ color: "red" }}>{serviceError}</div>}
        </Col>
      </Row>
    </Card>
  );
}
