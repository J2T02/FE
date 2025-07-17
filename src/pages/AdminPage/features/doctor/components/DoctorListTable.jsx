import { useState, useMemo } from "react";
import {
  Table,
  Avatar,
  Input,
  Button,
  Tag,
  Space,
  Spin,
  Alert,
  Select,
} from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import { GetAllDoctor } from "~/apis/bookingService";
import CreateDoctor from "../../../DoctorManagement/CreateDoctor/CreateDoctor";
import DoctorDetailManagement from "../../../DoctorManagement/DoctorDetailManagement"; // ✅ THÊM

const { Option } = Select;

const DoctorListTable = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreatingDoctor, setIsCreatingDoctor] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null); // ✅ THÊM

  const handleMouseEnter = async () => {
    if (doctors.length > 0 || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await GetAllDoctor();
      if (res?.data?.success) {
        setDoctors(res.data.data);
      } else {
        setError(res?.data?.message || "Không thể tải danh sách bác sĩ");
      }
    } catch (err) {
      setError("Không thể tải danh sách bác sĩ");
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        `${doctor.accountInfo?.fullName || ""} ${doctor.accountInfo?.mail || ""}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || doctor.status?.statusId === Number(statusFilter);

      return matchesSearch && matchesStatus;
    });
  }, [search, doctors, statusFilter]);

  const renderStatus = (statusObj) => {
    if (!statusObj) return null;
    const map = {
      1: { color: "green" },
      2: { color: "red" },
      3: { color: "gold" },
    };
    return (
      <Tag color={map[statusObj.statusId]?.color}>{statusObj.statusName}</Tag>
    );
  };

  const columns = [
    {
      title: "Bác sĩ",
      key: "name",
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 500 }}>
              {record.accountInfo?.fullName}
            </div>
            <div style={{ fontSize: 12, color: "#888" }}>
              {record.accountInfo?.mail}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: renderStatus,
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => setSelectedDoctorId(record.docId)} // ✅ SỬA navigate → tab nội bộ
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  // ✅ Chuyển sang tab DoctorDetailManagement nếu có selectedDoctorId
  if (selectedDoctorId !== null) {
    return (
      <DoctorDetailManagement
        doctorId={selectedDoctorId}
        onBack={() => setSelectedDoctorId(null)}
      />
    );
  }

  // ✅ Giữ nguyên tạo bác sĩ
  if (isCreatingDoctor) {
    return <CreateDoctor onBack={() => setIsCreatingDoctor(false)} />;
  }

  return (
    <div
      style={{
        background: "#fff0f4",
        padding: 24,
        borderRadius: 8,
        marginBottom: 24,
        minHeight: "100vh",
      }}
      onMouseEnter={handleMouseEnter}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <Input.Search
          placeholder="Tìm kiếm theo tên hoặc email"
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <Select
          value={statusFilter}
          onChange={(value) => setStatusFilter(value)}
          style={{ width: 200 }}
        >
          <Option value="all">Tất cả trạng thái</Option>
          <Option value="1">Đang làm việc</Option>
          <Option value="2">Ngừng hoạt động</Option>
          <Option value="3">Tạm nghỉ</Option>
        </Select>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsCreatingDoctor(true)}
        >
          Thêm bác sĩ
        </Button>
      </div>
      {loading ? (
        <div style={{ textAlign: "center", padding: 32 }}>
          <Spin size="large" tip="Đang tải danh sách bác sĩ..." />
        </div>
      ) : error ? (
        <Alert type="error" message={error} />
      ) : (
        <Table
          dataSource={filteredDoctors}
          columns={columns}
          rowKey="docId"
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default DoctorListTable;
