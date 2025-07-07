import { Table, Avatar, Input, Button, Tag, Space, Spin, Alert } from "antd";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllDoctor } from "~/apis/bookingService";

const DoctorListTable = () => {
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Gọi API khi mouse enter vào component
  const handleMouseEnter = async () => {
    if (doctors.length > 0 || loading) return; // Đã có data hoặc đang loading thì không gọi lại
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
    return doctors.filter((doctor) =>
      `${doctor.accountInfo?.fullName || ""} ${doctor.accountInfo?.mail || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, doctors]);

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
            {/* <div style={{ fontSize: 12, color: "#888" }}>
              {record.accountInfo?.phone}
            </div> */}
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
          onClick={() => navigate(`/doctordetail/${record.docId}`)}
          // onClick={() => navigate(`/doctordetail/id`)}
        >
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
      onMouseEnter={handleMouseEnter}
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
        {/* <Button type="primary" icon={<PlusOutlined />} onClick={onAddDoctor}>
          Thêm bác sĩ
        </Button> */}
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
