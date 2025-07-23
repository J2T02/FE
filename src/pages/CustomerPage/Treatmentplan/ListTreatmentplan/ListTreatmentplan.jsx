import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Tag,
  message,
  Spin,
  Space,
  Button,
} from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const STATUS_COLORS = {
  "Đang điều trị": "gold",
  "Hoàn tất": "green",
  "Chờ điều trị": "blue",
  "Đã hủy": "red",
};

const mockTreatmentPlans = [
  {
    tpId: 1,
    startDate: "2025-07-01",
    endDate: "2025-07-20",
    status: { statusName: "Hoàn tất" },
    serviceInfo: { serName: "IVF Full Package" },
    doctorInfo: { accountInfo: { fullName: "BS. Nguyễn Văn A" } },
  },
  {
    tpId: 2,
    startDate: "2025-08-01",
    endDate: null,
    status: { statusName: "Đang điều trị" },
    serviceInfo: { serName: "Theo dõi rụng trứng" },
    doctorInfo: { accountInfo: { fullName: "BS. Trần Thị B" } },
  },
];

const ListTreatmentplan = ({ customerId }) => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customerId) {
      fetchTreatmentPlans(customerId);
    } else {
      // Mock mode
      setTreatments(mockTreatmentPlans);
    }
  }, [customerId]);

  const fetchTreatmentPlans = async (cusId) => {
    try {
      setLoading(true);
      const res = await getTreatmentPlansForCustomer(cusId);
      if (res?.data?.success && Array.isArray(res.data.data)) {
        setTreatments(res.data.data);
      } else {
        message.error("Không thể tải danh sách hồ sơ bệnh án.");
      }
    } catch (error) {
      console.error(error);
      message.error("Đã xảy ra lỗi khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, background: "#fff0f4", minHeight: "100vh" }}>
      <Card>
        <Title level={3}>📋 Hồ sơ điều trị của bạn</Title>
        {loading ? (
          <Spin />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {treatments.map((record) => {
              const {
                tpId,
                startDate,
                endDate,
                status,
                serviceInfo,
                doctorInfo,
              } = record;
              const service = serviceInfo?.serName || "";
              const doctor = doctorInfo?.accountInfo?.fullName || "";
              const statusText = status?.statusName || "";

              return (
                <Card
                  key={tpId}
                  title={`Mã hồ sơ #${tpId}`}
                  extra={
                    <Tag color={STATUS_COLORS[statusText] || "default"}>
                      {statusText}
                    </Tag>
                  }
                >
                  <p>
                    <Text strong>Dịch vụ:</Text> {service}
                  </p>
                  <p>
                    <Text strong>Bác sĩ phụ trách:</Text> {doctor}
                  </p>
                  <p>
                    <Text strong>Ngày bắt đầu:</Text> {dayjs(startDate).format("DD/MM/YYYY")}
                  </p>
                  {endDate && (
                    <p>
                      <Text strong>Ngày kết thúc:</Text> {dayjs(endDate).format("DD/MM/YYYY")}
                    </p>
                  )}
                  <div style={{ marginTop: 12 }}>
                    <Button type="link">Xem chi tiết</Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ListTreatmentplan;