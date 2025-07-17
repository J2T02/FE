import React, { useEffect, useState } from "react"; // ✅ giữ nguyên
import {
  Table,
  Button,
  Input,
  Typography,
  Space,
  Tag,
  Card,
  message,
} from "antd"; // ✅ giữ nguyên
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"; // ✅ giữ nguyên
import axios from "axios"; // ✅ giữ nguyên
import ServiceDetailPage from "../ServiceDetailPage/ServiceDetailPage"; // ✅ giữ nguyên
import CreateService from "./CreateService/CreateService"; // ➕ thêm import để load tab tạo mới

const { Title } = Typography;

const ServiceManagement = () => {
  const [services, setServices] = useState([]); // ✏️ bỏ mảng mock, vì đã fetch từ API (vẫn đúng với logic gốc bạn có ở useEffect)
  const [loading, setLoading] = useState(false); // ✅ giữ nguyên
  const [searchKeyword, setSearchKeyword] = useState(""); // ✅ giữ nguyên
  const [selectedServiceId, setSelectedServiceId] = useState(null); // ✅ giữ nguyên
  const [creatingService, setCreatingService] = useState(false); // ➕ thêm state để bật tab tạo mới

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    } catch (error) {
      message.error("Không thể tải danh sách dịch vụ");
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter((item) =>
    item.ser_Name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const columns = [
    {
      title: "Tên dịch vụ",
      dataIndex: "ser_Name",
      key: "ser_Name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <Tag color="green">{price.toLocaleString()} VND</Tag>,
    },
    {
      title: "",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <Button
          type="link"
          style={{ color: "#1677ff" }}
          onClick={() => setSelectedServiceId(record.ser_ID)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  // ✅ Nếu đang xem chi tiết
  if (selectedServiceId !== null) {
    return (
      <ServiceDetailPage
        serId={selectedServiceId}
        onBack={() => setSelectedServiceId(null)}
      />
    );
  }

  // ➕ Nếu đang tạo dịch vụ
  if (creatingService) {
    return <CreateService onBack={() => setCreatingService(false)} />;
  }

  // ✅ Giao diện danh sách
  return (
    <div style={{ background: "#fff0f4", minHeight: "100vh", padding: 24 }}>
    <Card
      title={<Title level={3}>Quản lý dịch vụ</Title>}
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreatingService(true)} // ✏️ chỉnh từ href → mở tab nội bộ
        >
          Thêm dịch vụ
        </Button>
      }
    >
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm theo tên dịch vụ"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={filteredServices}
        rowKey="ser_ID"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </Card>
    </div>
  );
};

export default ServiceManagement;
