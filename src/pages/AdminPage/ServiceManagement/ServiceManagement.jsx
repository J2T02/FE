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
import { GetAllService } from "../../../apis/service";
import {
  getTreatmentStepList,
  createTreatmentStep,
} from "../../../apis/treatmentService";
const { Title } = Typography;

const ServiceManagement = () => {
  const [services, setServices] = useState([]); // ✏️ bỏ mảng mock, vì đã fetch từ API (vẫn đúng với logic gốc bạn có ở useEffect)
  const [loading, setLoading] = useState(false); // ✅ giữ nguyên
  const [searchKeyword, setSearchKeyword] = useState(""); // ✅ giữ nguyên
  const [selectedServiceId, setSelectedServiceId] = useState(null); // ✅ giữ nguyên
  const [creatingService, setCreatingService] = useState(false); // ➕ thêm state để bật tab tạo mới
  const [treatmentSteps, setTreatmentSteps] = useState([]); // ➕ thêm state để lưu danh sách treatment steps

  useEffect(() => {
    fetchServices();
    fetchTreatmentSteps();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await GetAllService();
      if (res?.data?.success && Array.isArray(res.data.data)) {
        setServices(res.data.data);
      } else {
        setServices([]);
        message.error("Không thể tải danh sách dịch vụ");
      }
    } catch (error) {
      message.error("Không thể tải danh sách dịch vụ");
    } finally {
      setLoading(false);
    }
  };

  const fetchTreatmentSteps = async () => {
    try {
      const res = await getTreatmentStepList();
      if (res?.data?.success && Array.isArray(res.data.data)) {
        setTreatmentSteps(res.data.data);
      } else {
        setTreatmentSteps([]);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách treatment steps:", error);
      setTreatmentSteps([]);
    }
  };

  const handleStepCreated = () => {
    // Refresh treatment steps sau khi tạo mới
    fetchTreatmentSteps();
  };

  const filteredServices = services.filter((item) =>
    item.serName.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const columns = [
    {
      title: "Tên dịch vụ",
      dataIndex: "serName",
      key: "serName",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <Tag color="green">{price?.toLocaleString()} VND</Tag>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (desc) => <span>{desc}</span>,
    },
    {
      title: "",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <Button
          type="link"
          style={{ color: "#1677ff" }}
          onClick={() => setSelectedServiceId(record.serId)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  // ✅ Nếu đang xem chi tiết
  if (selectedServiceId !== null) {
    // Lọc treatment steps theo serId
    const filteredSteps = treatmentSteps.filter(
      (step) => step.serviceInfo?.serId === selectedServiceId
    );

    return (
      <ServiceDetailPage
        serId={selectedServiceId}
        treatmentSteps={filteredSteps}
        onBack={() => setSelectedServiceId(null)}
        onStepCreated={handleStepCreated}
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
          rowKey="serId"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default ServiceManagement;
