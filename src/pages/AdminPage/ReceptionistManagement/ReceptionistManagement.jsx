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
import {
  getAccountByRoleId,
  isActiveAccount,
  createAccount,
} from "../../../apis/adminService";
import AccountDetailPage from "../AccountDetailPage/AccountDetailPage";
import CreateReceptionist from "./CreateReceptionist/CreateReceptionist";

const { Title } = Typography;
const { Option } = Select;

const ReceptionistManagement = () => {
  const [receptionists, setReceptionists] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedReceptionist, setSelectedReceptionist] = useState(null);
  const [creatingReceptionist, setCreatingReceptionist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReceptionists();
  }, []);

  const fetchReceptionists = async () => {
    try {
      setLoading(true);
      const response = await getAccountByRoleId(3); // roleId = 3 for receptionists

      if (response.data.success) {
        setReceptionists(response.data.data);
      } else {
        message.error("Không thể tải danh sách lễ tân");
      }
    } catch (error) {
      console.error("Error fetching receptionists:", error);
      message.error("Có lỗi xảy ra khi tải danh sách lễ tân");
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
      setReceptionists((prevReceptionists) =>
        prevReceptionists.map((receptionist) =>
          receptionist.accId === accId
            ? { ...receptionist, isActive: isActive }
            : receptionist
        )
      );

      // Cập nhật selectedReceptionist nếu đang xem chi tiết
      setSelectedReceptionist((prevSelected) =>
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

  const handleCreateReceptionist = async (receptionistData) => {
    try {
      console.log("Creating receptionist with:", receptionistData);
      const response = await createAccount({
        mail: receptionistData.mail,
        fullName: receptionistData.fullName,
        phone: receptionistData.phone,
        img: receptionistData.img || null,
        roleId: 3, // roleId = 3 for receptionists
      });

      console.log("Create API Response:", response);
      console.log("Create Response data:", response.data);

      // Nếu API call không throw error, coi như thành công
      if (response.data.success) {
        // Thêm receptionist mới vào state
        const newReceptionist = {
          ...receptionistData,
          accId: response.data.data?.accId || Math.floor(Math.random() * 10000),
          roleId: 3,
          isActive: true,
          createAt: new Date().toISOString(),
        };

        setReceptionists((prevReceptionists) => [
          ...prevReceptionists,
          newReceptionist,
        ]);
        message.success("Đã tạo tài khoản lễ tân thành công!");
        setCreatingReceptionist(false);
      } else {
        message.error("Không thể tạo tài khoản lễ tân");
      }
    } catch (error) {
      console.error("Error creating receptionist:", error);
      message.error("Có lỗi xảy ra khi tạo tài khoản lễ tân");
    }
  };

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
        <Space>
          <Button type="link" onClick={() => setSelectedReceptionist(record)}>
            Xem chi tiết
          </Button>
          <Button
            type="link"
            onClick={() =>
              handleUpdateActiveStatus(record.accId, !record.isActive)
            }
            disabled={loading}
          >
            {record.isActive ? "Ngừng hoạt động" : "Kích hoạt"}
          </Button>
        </Space>
      ),
    },
  ];

  if (selectedReceptionist !== null) {
    return (
      <AccountDetailPage
        account={selectedReceptionist}
        onUpdateActiveStatus={handleUpdateActiveStatus}
        embedded
        onBack={() => setSelectedReceptionist(null)}
      />
    );
  }

  if (creatingReceptionist) {
    return (
      <CreateReceptionist
        onBack={() => setCreatingReceptionist(false)}
        onCreateReceptionist={handleCreateReceptionist}
      />
    );
  }

  return (
    <div style={{ background: "#fff0f4", minHeight: "100vh", padding: 24 }}>
      <Card bordered={false}>
        <Row justify="space-between" align="middle">
          <Title level={3}>Danh sách lễ tân</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreatingReceptionist(true)}
          >
            Thêm lễ tân
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
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default ReceptionistManagement;
