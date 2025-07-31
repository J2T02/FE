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
  message,
} from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import AccountDetailPage from "../AccountDetailPage/AccountDetailPage";
import CreateManager from "./CreateManager/CreateManager";
import {
  getAccountByRoleId,
  isActiveAccount,
  createAccount,
} from "../../../apis/adminService";
const { Title } = Typography;
const { Option } = Select;

const ManagerList = () => {
  const [managers, setManagers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedManager, setSelectedManager] = useState(null);
  const [creatingManager, setCreatingManager] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      setLoading(true);
      const response = await getAccountByRoleId(2); // roleId = 2 for managers

      if (response.data.success) {
        setManagers(response.data.data);
      } else {
        message.error("Không thể tải danh sách quản lý");
      }
    } catch (error) {
      console.error("Error fetching managers:", error);
      message.error("Có lỗi xảy ra khi tải danh sách quản lý");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateActiveStatus = async (accId, isActive) => {
    try {
      console.log("Calling API with:", { accId, isActive });
      const response = await isActiveAccount({
        accId: accId,
        isActive: isActive,
      });

      console.log("API Response:", response);
      console.log("Response data:", response.data);

      // Nếu API call không throw error, coi như thành công
      // Cập nhật state local
      setManagers((prevManagers) =>
        prevManagers.map((manager) =>
          manager.accId === accId ? { ...manager, isActive: isActive } : manager
        )
      );

      // Cập nhật selectedManager nếu đang xem chi tiết
      setSelectedManager((prevSelected) =>
        prevSelected && prevSelected.accId === accId
          ? { ...prevSelected, isActive: isActive }
          : prevSelected
      );

      message.success(
        `Tài khoản đã được ${
          isActive ? "kích hoạt" : "ngưng hoạt động"
        } thành công`
      );
    } catch (error) {
      console.error("Error updating account status:", error);
      message.error("Có lỗi xảy ra khi cập nhật trạng thái tài khoản");
    }
  };

  const handleCreateManager = async (managerData) => {
    try {
      console.log("Creating manager with:", managerData);
      const response = await createAccount({
        mail: managerData.mail,
        fullName: managerData.fullName,
        phone: managerData.phone,
        img: managerData.img || null,
        roleId: 2, // roleId = 2 for managers
      });

      console.log("Create API Response:", response);
      console.log("Create Response data:", response.data);

      // Nếu API call không throw error, coi như thành công
      if (response.data.success) {
        // Thêm manager mới vào state
        const newManager = {
          ...managerData,
          accId: response.data.data?.accId || Math.floor(Math.random() * 10000),
          roleId: 2,
          isActive: true,
          createAt: new Date().toISOString(),
        };

        setManagers((prevManagers) => [...prevManagers, newManager]);
        message.success("Đã tạo tài khoản quản lý thành công!");
        setCreatingManager(false);
      } else {
        message.error("Không thể tạo tài khoản quản lý");
      }
    } catch (error) {
      console.error("Error creating manager:", error);
      message.error("Có lỗi xảy ra khi tạo tài khoản quản lý");
    }
  };

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
        <Button type="link" onClick={() => setSelectedManager(record)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  if (selectedManager !== null) {
    return (
      <AccountDetailPage
        account={selectedManager}
        onUpdateActiveStatus={handleUpdateActiveStatus}
        embedded
        onBack={() => setSelectedManager(null)}
      />
    );
  }

  if (creatingManager) {
    return (
      <CreateManager
        onBack={() => setCreatingManager(false)}
        onCreateManager={handleCreateManager}
      />
    );
  }

  return (
    <div style={{ background: "#fff0f4", minHeight: "100vh", padding: 24 }}>
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
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: "100%" }}
            >
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
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default ManagerList;
