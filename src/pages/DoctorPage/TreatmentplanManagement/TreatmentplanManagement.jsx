import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Typography,
  Space,
  Card,
  Tag,
  Row,
  Col,
  Select,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const TreatmentplanManagement = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null); // null = mặc định chỉ hiển thị "Đang tiến hành"

  useEffect(() => {
    fetchMockTreatmentPlans();
  }, []);

  const fetchMockTreatmentPlans = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        { tp_ID: 1, service_Name: "Khám tổng quát", status: 0 },
        { tp_ID: 2, service_Name: "IVF", status: 1 },
        { tp_ID: 3, service_Name: "IUI", status: 2 },
        { tp_ID: 4, service_Name: "Hỗ trợ sinh sản", status: 0 },
        { tp_ID: 5, service_Name: "Xét nghiệm nội tiết", status: 1 },
        { tp_ID: 6, service_Name: "Chọc hút trứng", status: 0 },
        { tp_ID: 7, service_Name: "Khám phụ khoa", status: 2 },
        { tp_ID: 8, service_Name: "IUI nâng cao", status: 0 },
        { tp_ID: 9, service_Name: "Khám hiếm muộn", status: 1 },
        { tp_ID: 10, service_Name: "IVF lần 2", status: 2 },
      ];
      setPlans(mockData);
      setLoading(false);
    }, 300);
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

  const filteredData = plans.filter((item) => {
    const isSearching = searchKeyword.trim() !== "";

    const matchSearch = item.tp_ID
      .toString()
      .includes(searchKeyword.trim());

    const matchStatus =
      selectedStatus !== null
        ? item.status === selectedStatus
        : item.status === 0; // mặc định chỉ hiện Đang tiến hành

    // Nếu đang tìm kiếm → chỉ lọc theo mã
    if (isSearching) return matchSearch;

    // Nếu không tìm → lọc theo status
    return matchStatus;
  });

  return (
    <Card
      title={
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} style={{ margin: 0 }}>
              Danh sách Hồ sơ bệnh án
            </Title>
          </Col>
          <Col>
            <Space>
              <Input
                placeholder="Tìm theo mã bệnh án"
                prefix={<SearchOutlined />}
                allowClear
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <Select
                allowClear
                placeholder="Lọc theo trạng thái"
                style={{ width: 180 }}
                value={selectedStatus}
                onChange={(value) => setSelectedStatus(value)}
              >
                <Option value={0}>Đang tiến hành</Option>
                <Option value={1}>Đã hoàn thành</Option>
                <Option value={2}>Đã huỷ</Option>
              </Select>
            </Space>
          </Col>
        </Row>
      }
    >
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
