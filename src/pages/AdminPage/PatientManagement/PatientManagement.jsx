import React, { useEffect, useState } from "react";
import { Table, Input, Typography, Space, Card, message, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import PatientDetail from "./PatientDetail/PatientDetail";
import { getCustomerList } from "../../../apis/CustomerService";

const { Title } = Typography;

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await getCustomerList();
      if (res?.data?.success && Array.isArray(res.data.data)) {
        setPatients(res.data.data);
      } else {
        setPatients([]);
        message.error("Không thể tải danh sách bệnh nhân");
      }
    } catch (error) {
      message.error("Không thể tải danh sách bệnh nhân");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Bệnh nhân",
      dataIndex: ["accCus", "fullName"],
      key: "fullName",
      render: (_, record) => <b>{record.accCus?.fullName || "-"}</b>,
    },
    {
      title: "Thông tin liên hệ",
      key: "contact",
      render: (_, record) => (
        <span>
          📞 {record.accCus?.phone || "-"} <br /> ✉️{" "}
          {record.accCus?.mail || "-"}
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
      (item.accCus?.fullName &&
        item.accCus.fullName.toLowerCase().includes(keyword)) ||
      (item.accCus?.phone && item.accCus.phone.includes(keyword)) ||
      (item.accCus?.mail && item.accCus.mail.toLowerCase().includes(keyword))
    );
  });

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
          rowKey="cusId"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default PatientManagement;
