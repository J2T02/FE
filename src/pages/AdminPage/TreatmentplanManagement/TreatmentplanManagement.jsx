import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Typography,
  Space,
  Card,
  Tag,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;

const TreatmentplanManagement = () => {
  const [plans, setPlans] = useState([{
    tp_ID: 1,
    service_Name: "Khám tổng quát",
    status: 0,
    startDate: "2025-06-01",
    endDate: null,
    ser_ID: 1,
    cus_ID: 2,
    doc_ID: 1
  },
  {
    tp_ID: 2,
    service_Name: "IVF",
    status: 1,
    startDate: "2025-05-01",
    endDate: "2025-06-10",
    ser_ID: 2,
    cus_ID: 3,
    doc_ID: 1
  },
  {
    tp_ID: 3,
    service_Name: "IUI",
    status: 2,
    startDate: "2025-04-15",
    endDate: "2025-04-30",
    ser_ID: 3,
    cus_ID: 4,
    doc_ID: 2
  }]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchTreatmentPlans();
  }, []);

  const fetchTreatmentPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/treatmentplans");
      setPlans(res.data);
    } catch (error) {
      message.error("Không thể tải danh sách hồ sơ bệnh án");
    } finally {
      setLoading(false);
    }
  };

  const getStatusTag = (status) => {
    const statusMap = {
      0: { text: "Đang tiến hành", color: "blue" },
      1: { text: "Đã hoàn thành", color: "green" },
      2: { text: "Đã huỷ", color: "red" },
    };
    const s = statusMap[status] || { text: "Không xác định", color: "default" };
    return <Tag color={s.color}>{s.text}</Tag>;
  };

  const columns = [
    {
      title: "Mã Bệnh Án",
      dataIndex: "tp_ID",
      key: "tp_ID",
      render: (id) => <b>#{id}</b>,
    },
    {
      title: "Dịch vụ hiện tại",
      dataIndex: "service_Name",
      key: "service_Name",
      render: (name) => name || "Không rõ",
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
        <a href={`/treatmentplans/${record.tp_ID}`} style={{ color: "#1677ff" }}>
          Xem chi tiết
        </a>
      ),
    },
  ];

  const filteredData = plans.filter((item) =>
    item.tp_ID.toString().includes(searchKeyword)
  );

  return (
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
        rowKey="tp_ID"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default TreatmentplanManagement;
