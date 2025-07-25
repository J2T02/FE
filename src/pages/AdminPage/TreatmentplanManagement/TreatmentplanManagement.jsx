import React, { useEffect, useState } from "react";
import { Table, Input, Typography, Space, Card, Tag, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { getTreatmentList } from "../../../apis/treatmentService";
const { Title } = Typography;

const TreatmentplanManagement = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchTreatmentPlans();
  }, []);

  const fetchTreatmentPlans = async () => {
    try {
      setLoading(true);
      const res = await getTreatmentList();
      if (res?.data?.success && Array.isArray(res.data.data)) {
        setPlans(res.data.data);
      } else {
        setPlans([]);
        message.error("Không thể tải danh sách hồ sơ bệnh án");
      }
    } catch (error) {
      message.error("Không thể tải danh sách hồ sơ bệnh án");
    } finally {
      setLoading(false);
    }
  };

  const getStatusTag = (statusObj) => {
    if (!statusObj) return <Tag color="default">Không xác định</Tag>;
    const colorMap = {
      "Đang tiến hành": "blue",
      "Đã hoàn thành": "green",
      "Đã huỷ": "red",
    };
    return (
      <Tag color={colorMap[statusObj.statusName] || "default"}>
        {statusObj.statusName}
      </Tag>
    );
  };

  const columns = [
    {
      title: "Mã Bệnh Án",
      dataIndex: "tpId",
      key: "tpId",
      render: (id) => <b>#{id}</b>,
    },
    {
      title: "Dịch vụ hiện tại",
      dataIndex: ["serviceInfo", "serName"],
      key: "serviceInfo",
      render: (_, record) => record.serviceInfo?.serName || "Không rõ",
    },
    {
      title: "Bác sĩ phụ trách",
      dataIndex: ["doctorInfo", "accountInfo", "fullName"],
      key: "doctorInfo",
      render: (_, record) => record.doctorInfo?.accountInfo?.fullName || "-",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "-",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "-",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <a
          href={`/admin/treatmentplandetail/${record.tpId}`}
          style={{ color: "#1677ff" }}
        >
          Xem chi tiết
        </a>
      ),
    },
  ];

  const filteredData = plans.filter((item) =>
    item.tpId?.toString().includes(searchKeyword)
  );

  return (
    <div style={{ background: "#fff0f4", minHeight: "100vh", padding: 24 }}>
      <Card title={<Title level={3}>Danh sách Hồ sơ bệnh án</Title>}>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Tìm theo mã bệnh án"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </Space>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="tpId"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default TreatmentplanManagement;
