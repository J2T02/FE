import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Typography,
  Space,
  Tag,
  Card,
  message,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import ServiceDetailPage from "../ServiceDetailPage/ServiceDetailPage";

const { Title } = Typography;

const ServiceManagement = () => {
  const [services, setServices] = useState([
    {
      ser_ID: 1,
      ser_Name: "Khám phụ khoa tổng quát",
      price: 300000,
      description: "Kiểm tra tổng quát sức khỏe phụ khoa định kỳ.",
      file_Path: "/files/phu-khoa.pdf",
    },
    {
      ser_ID: 2,
      ser_Name: "Siêu âm đầu dò",
      price: 500000,
      description: "Dịch vụ siêu âm đầu dò chính xác cao, an toàn.",
      file_Path: "/files/sieu-am.pdf",
    },
    {
      ser_ID: 3,
      ser_Name: "Tư vấn hiếm muộn",
      price: 250000,
      description: "Tư vấn và phân tích tình trạng hiếm muộn cho các cặp vợ chồng.",
      file_Path: "/files/hiem-muon.pdf",
    },
    {
      ser_ID: 4,
      ser_Name: "Xét nghiệm nội tiết",
      price: 450000,
      description: "Đánh giá chỉ số hormone liên quan đến sinh sản.",
      file_Path: "/files/noi-tiet.pdf",
    },
    {
      ser_ID: 5,
      ser_Name: "Chụp tử cung vòi trứng (HSG)",
      price: 800000,
      description: "Kiểm tra thông tắc vòi trứng và tử cung bằng HSG.",
      file_Path: "/files/hsg.pdf",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState(null); // ✅ THÊM

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
          onClick={() => setSelectedServiceId(record.ser_ID)} // ✅ THÊM
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const filteredServices = services.filter((item) =>
    item.ser_Name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // ✅ Nếu đang xem chi tiết dịch vụ => hiện ServiceDetailPage
  if (selectedServiceId !== null) {
    return (
      <ServiceDetailPage
        serId={selectedServiceId}
        onBack={() => setSelectedServiceId(null)} // ✅ Nút quay lại
      />
    );
  }

  // ✅ Trang danh sách dịch vụ (không đổi logic gì cả)
  return (
    <Card
      title={<Title level={3}>Quản lý dịch vụ</Title>}
      extra={
        <Button type="primary" icon={<PlusOutlined />} href="/services/create">
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
  );
};

export default ServiceManagement;
