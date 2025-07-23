import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  Input,
  Typography,
  Space,
  Card,
  Tag,
  Row,
  Col,
  Select,
  Button,
} from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getTreatmentListForDoctor } from "../../../apis/treatmentService";
import { DoctorStoreContext } from "../contexts/DoctorStoreProvider";
const { Title } = Typography;
const { Option } = Select;

const TreatmentplanManagement = () => {
  let docId;
  const context = useContext(DoctorStoreContext);
  const { doctorInfo } = context;
  if (doctorInfo) {
    docId = doctorInfo.docId;
  }

  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);

  useEffect(() => {
    fetchTreatmentPlans();
  }, []);

  const fetchTreatmentPlans = async () => {
    if (docId) {
      setLoading(true);
      try {
        const res = await getTreatmentListForDoctor(docId);
        if (res && res.data && Array.isArray(res.data.data)) {
          // Map API data to UI format
          const mappedPlans = res.data.data.map((item) => ({
            tp_ID: item.tpId,
            service_Name: item.serviceInfo?.serName || "",
            status:
              item.status?.statusId === 1
                ? 0
                : item.status?.statusId === 2
                ? 1
                : 2, // Map statusId to UI status
            // You can add more fields if needed
          }));
          setPlans(mappedPlans);
        } else {
          setPlans([]);
        }
      } catch (error) {
        setPlans([]);
      }
      setLoading(false);
    }
  };

  const getStatusTag = (status) => {
    const statusMap = {
      0: { text: "Đang tiến hành", color: "blue" },
      1: { text: "Đã hoàn thành", color: "green" },
      2: { text: "Đã huỷ", color: "red" },
    };
    const s = statusMap[status] || { text: "Không xác định", color: "default" };
    return <Tag color={s.color}>{s.text}</Tag>;
  };

  const columns = [
    {
      title: "Mã Bệnh Án",
      dataIndex: "tp_ID",
      key: "tp_ID",
      render: (id) => <b>#{id}</b>,
    },
    {
      title: "Dịch vụ hiện tại",
      dataIndex: "service_Name",
      key: "service_Name",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <a
          href={`/doctorpage/treatmentplandetail/${record.tp_ID}`}
          style={{ color: "#1677ff" }}
        >
          Xem chi tiết
        </a>
      ),
    },
  ];

  const filteredData = plans.filter((item) => {
    const isSearching = searchKeyword.trim() !== "";

    const matchSearch = item.tp_ID.toString().includes(searchKeyword.trim());

    const matchStatus =
      selectedStatus !== null
        ? item.status === selectedStatus
        : item.status === 0;

    if (isSearching) return matchSearch;

    return matchStatus;
  });

  return (
    <div style={{ background: "#fff0f4", minHeight: "100vh", padding: 24 }}>
      <Card>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 12 }}
        >
          <Col span={24}>
            <Title level={3} style={{ margin: 0 }}>
              Danh sách Hồ sơ bệnh án
            </Title>
          </Col>
        </Row>

        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 16 }}
        >
          <Col>
            <Input
              placeholder="Tìm theo mã bệnh án"
              prefix={<SearchOutlined />}
              allowClear
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              style={{ width: 240 }}
            />
          </Col>
          <Col>
            <Space>
              <Select
                allowClear
                placeholder="Lọc theo trạng thái"
                style={{ width: 180 }}
                value={selectedStatus}
                onChange={(value) => setSelectedStatus(value)}
              >
                <Option value={0}>Đang tiến hành</Option>
                <Option value={1}>Đã hoàn thành</Option>
                <Option value={2}>Đã huỷ</Option>
              </Select>
            </Space>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="tp_ID"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
};

export default TreatmentplanManagement;
