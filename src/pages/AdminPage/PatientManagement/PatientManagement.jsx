import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Typography,
  Space,
  Card,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Title } = Typography;

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = {
        data: {
          data: [
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
          ],
        },
      };
      setPatients(res.data.data);
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
      render: (_, record, index) => (
        <a href={`/patients/${index}`} style={{ color: "#1677ff" }}>
          Xem chi tiết
        </a>
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

  return (
    <div style={{ background: "#fff0f4", minHeight: "100vh", padding: 24 }}>
    <Card title={<Title level={3}>Quản lý bệnh nhân</Title>}>
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
