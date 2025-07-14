import React, { useEffect, useState } from "react";
import {
  Table,
  Typography,
  Card,
  Tag,
  Input,
  Select,
  Button,
  Row,
  Col,
  Space,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import AccountDetailPage from "../AccountDetailPage/AccountDetailPage"; // hoặc đúng đường dẫn bạn đang đặt

const { Title } = Typography;
const { Option } = Select;

const mockReceptionists = [
  {
    accId: 1,
    fullName: "Nguyễn Thị Hoa",
    phone: "0912345678",
    mail: "hoa.nguyen@example.com",
    isActive: true,
  },
  {
    accId: 2,
    fullName: "Trần Văn Nam",
    phone: "0987654321",
    mail: "nam.tran@example.com",
    isActive: false,
  },
];

const ReceptionistManagement = () => {
  const [receptionists, setReceptionists] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedReceptionistId, setSelectedReceptionistId] = useState(null);

  useEffect(() => {
    setReceptionists(mockReceptionists);
  }, []);

  const filteredReceptionists = receptionists.filter((item) => {
    const matchSearch =
      item.fullName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.phone.includes(searchKeyword) ||
      item.mail.toLowerCase().includes(searchKeyword.toLowerCase());

    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && item.isActive) ||
      (statusFilter === "inactive" && !item.isActive);

    return matchSearch && matchStatus;
  });

  const columns = [
    {
      title: "Tên lễ tân",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (text) => (
        <Space>
          <PhoneOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: "Email",
      dataIndex: "mail",
      key: "mail",
      render: (text) => (
        <Space>
          <MailOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) =>
        isActive ? (
          <Tag color="green">Đang làm việc</Tag>
        ) : (
          <Tag color="red">Ngừng hoạt động</Tag>
        ),
    },
    {
      title: "",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <Button type="link" onClick={() => setSelectedReceptionistId(record.accId)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  if (selectedReceptionistId !== null) {
    return (
      <AccountDetailPage
        accId={selectedReceptionistId}
        embedded
        onBack={() => setSelectedReceptionistId(null)}
      />
    );
  }

  return (
    <Card bordered={false}>
      <Title level={3} style={{ marginBottom: 20 }}>
        Danh sách lễ tân
      </Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Tìm theo tên, số điện thoại hoặc email"
            prefix={<SearchOutlined />}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            allowClear
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Select
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            style={{ width: "100%" }}
          >
            <Option value="all">Tất cả trạng thái</Option>
            <Option value="active">Đang làm việc</Option>
            <Option value="inactive">Ngừng hoạt động</Option>
          </Select>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredReceptionists}
        rowKey="accId"
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default ReceptionistManagement;
