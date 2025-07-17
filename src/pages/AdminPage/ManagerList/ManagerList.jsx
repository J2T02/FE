import React, { useEffect, useState } from "react";
import {
  Table, Typography, Card, Tag, Input, Select, Button, Row, Col, Space,
} from "antd";
import {
  MailOutlined, PhoneOutlined, UserOutlined, SearchOutlined, PlusOutlined,
} from "@ant-design/icons";
import AccountDetailPage from "../AccountDetailPage/AccountDetailPage";
import CreateManager from "./CreateManager/CreateManager";

const { Title } = Typography;
const { Option } = Select;

const mockManagers = [
  {
    accId: 1,
    fullName: "Phạm Minh Đức",
    phone: "0901234567",
    mail: "duc.pham@example.com",
    isActive: true,
  },
  {
    accId: 2,
    fullName: "Lê Thị Hương",
    phone: "0938765432",
    mail: "huong.le@example.com",
    isActive: false,
  },
];

const ManagerList = () => {
  const [managers, setManagers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedManagerId, setSelectedManagerId] = useState(null);
  const [creatingManager, setCreatingManager] = useState(false);

  useEffect(() => {
    setManagers(mockManagers);
  }, []);

  const filteredManagers = managers.filter((item) => {
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
      title: "Tên quản lý",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => (<Space><UserOutlined />{text}</Space>),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (text) => (<Space><PhoneOutlined />{text}</Space>),
    },
    {
      title: "Email",
      dataIndex: "mail",
      key: "mail",
      render: (text) => (<Space><MailOutlined />{text}</Space>),
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => isActive ? (
        <Tag color="green">Đang hoạt động</Tag>
      ) : (
        <Tag color="red">Ngưng hoạt động</Tag>
      ),
    },
    {
      title: "",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <Button type="link" onClick={() => setSelectedManagerId(record.accId)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  if (selectedManagerId !== null) {
    return (
      <AccountDetailPage
        accId={selectedManagerId}
        embedded
        onBack={() => setSelectedManagerId(null)}
      />
    );
  }

  if (creatingManager) {
    return <CreateManager onBack={() => setCreatingManager(false)} />;
  }

  return (
    <Card bordered={false}>
      <Row justify="space-between" align="middle">
        <Title level={3}>Danh sách quản lý</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreatingManager(true)}
        >
          Thêm quản lý
        </Button>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 16, marginTop: 16 }}>
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
          <Select value={statusFilter} onChange={setStatusFilter} style={{ width: "100%" }}>
            <Option value="all">Tất cả trạng thái</Option>
            <Option value="active">Đang hoạt động</Option>
            <Option value="inactive">Ngưng hoạt động</Option>
          </Select>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredManagers}
        rowKey="accId"
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default ManagerList;
