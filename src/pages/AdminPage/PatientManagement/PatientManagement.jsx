import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Typography,
  Space,
  Card,
  Button,
  message,
} from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title } = Typography;

const PatientManagement = () => {
  const [patients, setPatients] = useState([{
    acc_ID: 1,
    full_Name: "Nguyễn Thị Lan",
    phone: "0901234567",
    mail: "lan@gmail.com"
  },
  {
    acc_ID: 2,
    full_Name: "Trần Văn B",
    phone: "0934567890",
    mail: "tranb@example.com"
  },
  {
    acc_ID: 3,
    full_Name: "Lê Thị C",
    phone: "0987654321",
    mail: "lethic@example.com"
  }]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/patients"); // API lấy danh sách bệnh nhân
      setPatients(res.data);
    } catch (error) {
      message.error("Không thể tải danh sách bệnh nhân");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Bệnh nhân",
      dataIndex: "full_Name",
      key: "full_Name",
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
      title: "", // Không có tiêu đề
      key: "actions",
      align: "right",
      render: (_, record) => (
        <a href={`/patients/${record.acc_ID}`} style={{ color: "#1677ff" }}>
          Xem chi tiết
        </a>
      ),
    },
  ];

  const filteredPatients = patients.filter((item) =>
    item.full_Name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <Card
      title={<Title level={3}>Quản lý bệnh nhân</Title>}
    >
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm theo tên bệnh nhân"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={filteredPatients}
        rowKey="acc_ID"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default PatientManagement;
