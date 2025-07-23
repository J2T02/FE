import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Typography,
  Space,
  Card,
  message,
  Button,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PatientDetail from "./PatientDetail/PatientDetail"; // ✅ Đảm bảo đường dẫn đúng

const { Title } = Typography;

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetchMockPatients();
  }, []);

  const fetchMockPatients = () => {
    try {
      setLoading(true);
      // 👇 Dữ liệu mock tương tự API getTreatmentListForDoctor
      const mockData = [
        {
          fullName: "Nguyễn Văn A",
          phone: "0901234567",
          mail: "vana@example.com",
        },
        {
          fullName: "Trần Thị B",
          phone: "0912345678",
          mail: "thib@example.com",
        },
        {
          fullName: "Lê Văn C",
          phone: "0987654321",
          mail: "vanc@example.com",
        },
      ];
      setPatients(mockData);
    } catch (error) {
      message.error("Không thể tải danh sách bệnh nhân");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Bệnh nhân",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Thông tin liên hệ",
      key: "contact",
      render: (_, record) => (
        <span>
          📞 {record.phone} <br /> ✉️ {record.mail}
        </span>
      ),
    },
    {
      title: "",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <Button type="link" onClick={() => setSelectedPatient(record)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const filteredPatients = patients.filter((item) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      (item.fullName && item.fullName.toLowerCase().includes(keyword)) ||
      (item.phone && item.phone.includes(keyword)) ||
      (item.mail && item.mail.toLowerCase().includes(keyword))
    );
  });

  // ✅ Nếu có selectedPatient, hiển thị trang chi tiết
  if (selectedPatient) {
    return (
      <PatientDetail
        patient={selectedPatient}
        onBack={() => setSelectedPatient(null)}
      />
    );
  }

  return (
    <div style={{ background: "#fff0f4", minHeight: "100vh", padding: 24 }}>
      <Card title={<Title level={3}>Danh sách bệnh nhân</Title>}>
        <Space style={{ marginBottom: 16 }}>
          <Input
            placeholder="Tìm theo tên, số điện thoại hoặc email"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </Space>
        <Table
          columns={columns}
          dataSource={filteredPatients}
          rowKey={(record, index) => index}
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default PatientManagement;
