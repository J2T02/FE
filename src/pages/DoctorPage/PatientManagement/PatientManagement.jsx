import React, { useContext, useEffect, useState } from "react";
import { Table, Input, Typography, Space, Card, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DoctorStoreContext } from "../contexts/DoctorStoreProvider";
import { getTreatmentListForDoctor } from "../../../apis/treatmentService";
const { Title } = Typography;

const PatientManagement = () => {
  const { doctorInfo } = useContext(DoctorStoreContext);

  if (doctorInfo) {
    const { docId } = doctorInfo;
    console.log(docId);
  }
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      if (!doctorInfo || !doctorInfo.docId) {
        setPatients([]);
        setLoading(false);
        return;
      }
      const res = await getTreatmentListForDoctor(doctorInfo.docId);
      if (res?.data?.data && Array.isArray(res.data.data)) {
        // Lấy thông tin accInfo từ cusInfo
        const mappedPatients = res.data.data.map((item) => {
          const acc = item.cusInfo?.accInfo || {};
          return {
            fullName: acc.fullName || "",
            phone: acc.phone || "",
            mail: acc.mail || "",
            tpId: item.tpId, // Có thể dùng cho key hoặc link chi tiết
          };
        });
        setPatients(mappedPatients);
      } else {
        setPatients([]);
      }
    } catch (error) {
      message.error("Không thể tải danh sách bệnh nhân");
      setPatients([]);
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
        <a
          href={`/doctorpage/treatmentplandetail/${record.tpId || ""}`}
          style={{ color: "#1677ff" }}
        >
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
        rowKey={(record) => record.tpId || record.fullName}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </Card>
    </div>
  );
};

export default PatientManagement;
