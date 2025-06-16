import { Table, Avatar, Input, Button, Tag, Space } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";

const DoctorListTable = ({ data = [], onSelect, onAddDoctor }) => {
  const [search, setSearch] = useState("");

  const filteredDoctors = useMemo(() => {
    return data.filter((doctor) =>
      `${doctor.name} ${doctor.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, data]);

  const columns = [
    {
      title: "Bác sĩ",
      key: "name",
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ fontSize: 12, color: "#888" }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Chuyên khoa",
      dataIndex: "specialty",
      key: "specialty",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Đang làm việc" ? "green" : "default"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Button type="link" onClick={() => onSelect(record)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: 24,
        borderRadius: 8,
        marginBottom: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Input.Search
          placeholder="Tìm kiếm theo tên hoặc email"
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddDoctor}>
          Thêm bác sĩ
        </Button>
      </div>
      <Table
        dataSource={filteredDoctors}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default DoctorListTable;
