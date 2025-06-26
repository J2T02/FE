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
import { GetAllAccount } from "../../../apis/adminService";

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
      const res = await GetAllAccount();
      console.log("API Response:", res);
      setPatients(res.data.data); // lấy danh sách từ API
    } catch (error) {
      message.error("Không thể tải danh sách bệnh nhân");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Bệnh nhân",
      dataIndex: "fullName", // ✅ đúng tên theo JSON
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

  const filteredPatients = patients.filter(
    (item) =>
      typeof item.fullName === "string" &&
      item.fullName.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <Card title={<Title level={3}>Quản lý bệnh nhân</Title>}>
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
        rowKey={(record, index) => index} // ✅ nếu không có acc_ID
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default PatientManagement;
