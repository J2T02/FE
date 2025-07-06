import React, { useState, useMemo } from "react";
import {
  Card,
  Table,
  Tag,
  Button,
  Input,
  Row,
  Col,
  Space,
  Select,
  Typography,
  Descriptions,
  Modal,
  Timeline,
  Divider,
  Badge,
  Avatar
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  HeartOutlined,
  AlertOutlined
} from "@ant-design/icons";
import { mockPatients, medicalHistoryTypes } from "../../../data/mockDoctorPageData";

const { Title, Text } = Typography;
const { Option } = Select;

const PatientManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  // Filter patients based on search and filters
  const filteredPatients = useMemo(() => {
    return mockPatients.filter(patient => {
      const matchesSearch = 
        patient.personalInfo.husName.toLowerCase().includes(searchText.toLowerCase()) ||
        patient.personalInfo.wifeName.toLowerCase().includes(searchText.toLowerCase()) ||
        patient.patientId.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || patient.currentStatus.includes(statusFilter);
      const matchesRisk = riskFilter === "all" || patient.riskLevel === riskFilter;
      
      return matchesSearch && matchesStatus && matchesRisk;
    });
  }, [searchText, statusFilter, riskFilter]);

  // Risk level colors
  const getRiskColor = (level) => {
    switch (level) {
      case "high": return "red";
      case "medium": return "orange";
      case "low": return "green";
      default: return "blue";
    }
  };

  // Status colors
  const getStatusColor = (status) => {
    if (status.includes("IVF")) return "purple";
    if (status.includes("IUI")) return "blue";
    if (status.includes("Hoàn thành")) return "green";
    return "orange";
  };

  const columns = [
    {
      title: "Mã BN",
      dataIndex: "patientId",
      key: "patientId",
      width: 100,
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: "Thông tin bệnh nhân",
      key: "patientInfo",
      width: 250,
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{record.personalInfo.husName} & {record.personalInfo.wifeName}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {new Date().getFullYear() - record.personalInfo.husYob}/{new Date().getFullYear() - record.personalInfo.wifeYob} tuổi
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            <PhoneOutlined /> {record.personalInfo.husPhone}
          </Text>
        </Space>
      )
    },
    {
      title: "Tình trạng hiện tại",
      dataIndex: "currentStatus",
      key: "currentStatus",
      width: 180,
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      )
    },
    {
      title: "Mức độ rủi ro",
      dataIndex: "riskLevel",
      key: "riskLevel",
      width: 120,
      render: (level) => (
        <Badge 
          color={getRiskColor(level)} 
          text={level === "high" ? "Cao" : level === "medium" ? "Trung bình" : "Thấp"}
        />
      )
    },
    {
      title: "Bác sĩ phụ trách",
      dataIndex: "assignedDoctor",
      key: "assignedDoctor",
      width: 150
    },
    {
      title: "Hẹn tiếp theo",
      dataIndex: "nextAppointment",
      key: "nextAppointment",
      width: 120,
      render: (date) => (
        <Space>
          <CalendarOutlined />
          <Text>{new Date(date).toLocaleDateString('vi-VN')}</Text>
        </Space>
      )
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedPatient(record);
              setDetailModalVisible(true);
            }}
          >
            Xem
          </Button>
          <Button 
            size="small" 
            icon={<EditOutlined />}
          >
            Sửa
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <Card>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col span={24}>
            <Title level={4}>Quản lý bệnh nhân</Title>
          </Col>
          
          <Col xs={24} sm={8}>
            <Input
              placeholder="Tìm kiếm theo tên hoặc mã bệnh nhân"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          
          <Col xs={24} sm={6}>
            <Select
              placeholder="Lọc theo tình trạng"
              style={{ width: "100%" }}
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Option value="all">Tất cả tình trạng</Option>
              <Option value="IVF">Đang điều trị IVF</Option>
              <Option value="IUI">Đang điều trị IUI</Option>
              <Option value="Hoàn thành">Hoàn thành điều trị</Option>
            </Select>
          </Col>
          
          <Col xs={24} sm={6}>
            <Select
              placeholder="Lọc theo mức độ rủi ro"
              style={{ width: "100%" }}
              value={riskFilter}
              onChange={setRiskFilter}
            >
              <Option value="all">Tất cả mức độ</Option>
              <Option value="high">Rủi ro cao</Option>
              <Option value="medium">Rủi ro trung bình</Option>
              <Option value="low">Rủi ro thấp</Option>
            </Select>
          </Col>
          
          <Col xs={24} sm={4}>
            <Button type="primary" block>
              Thêm bệnh nhân
            </Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredPatients}
          rowKey="patientId"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bệnh nhân`
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Patient Detail Modal */}
      <Modal
        title={selectedPatient ? `Chi tiết bệnh nhân - ${selectedPatient.patientId}` : ""}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Đóng
          </Button>,
          <Button key="edit" type="primary">
            Chỉnh sửa
          </Button>
        ]}
        width={800}
      >
        {selectedPatient && (
          <div>
            <Descriptions title="Thông tin cá nhân" bordered column={2} size="small">
              <Descriptions.Item label="Tên chồng">{selectedPatient.personalInfo.husName}</Descriptions.Item>
              <Descriptions.Item label="Tên vợ">{selectedPatient.personalInfo.wifeName}</Descriptions.Item>
              <Descriptions.Item label="Năm sinh chồng">{selectedPatient.personalInfo.husYob}</Descriptions.Item>
              <Descriptions.Item label="Năm sinh vợ">{selectedPatient.personalInfo.wifeYob}</Descriptions.Item>
              <Descriptions.Item label="SĐT chồng">{selectedPatient.personalInfo.husPhone}</Descriptions.Item>
              <Descriptions.Item label="SĐT vợ">{selectedPatient.personalInfo.wifePhone}</Descriptions.Item>
              <Descriptions.Item label="Email" span={2}>{selectedPatient.personalInfo.email}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ" span={2}>{selectedPatient.personalInfo.address}</Descriptions.Item>
              <Descriptions.Item label="Nghề nghiệp chồng">{selectedPatient.personalInfo.husOccupation}</Descriptions.Item>
              <Descriptions.Item label="Nghề nghiệp vợ">{selectedPatient.personalInfo.wifeOccupation}</Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="Tiền sử y khoa" bordered column={1} size="small">
              <Descriptions.Item label="Năm kết hôn">{selectedPatient.medicalHistory.marriageYear}</Descriptions.Item>
              <Descriptions.Item label="Thời gian hiếm muộn">{selectedPatient.medicalHistory.infertilityDuration} năm</Descriptions.Item>
              <Descriptions.Item label="Điều trị trước đây">
                {selectedPatient.medicalHistory.previousTreatments.join(", ")}
              </Descriptions.Item>
              <Descriptions.Item label="Tình trạng chồng">
                {selectedPatient.medicalHistory.husConditions.join(", ") || "Bình thường"}
              </Descriptions.Item>
              <Descriptions.Item label="Tình trạng vợ">
                {selectedPatient.medicalHistory.wifeConditions.join(", ") || "Bình thường"}
              </Descriptions.Item>
              <Descriptions.Item label="Dị ứng">
                {selectedPatient.medicalHistory.allergies.join(", ") || "Không"}
              </Descriptions.Item>
              <Descriptions.Item label="Tiền sử gia đình">
                {selectedPatient.medicalHistory.familyHistory.join(", ") || "Không"}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Title level={5}>Lịch sử điều trị</Title>
            <Timeline
              items={selectedPatient.treatmentHistory.map((treatment, index) => ({
                key: index,
                children: (
                  <div>
                    <Text strong>{treatment.treatment}</Text>
                    <br />
                    <Text type="secondary">{new Date(treatment.date).toLocaleDateString('vi-VN')}</Text>
                    <br />
                    <Tag color={treatment.result.includes("thành công") ? "green" : treatment.result.includes("Không") ? "red" : "blue"}>
                      {treatment.result}
                    </Tag>
                    <br />
                    <Text>{treatment.notes}</Text>
                  </div>
                )
              }))}
            />

            <Divider />

            <Row gutter={16}>
              <Col span={12}>
                <Card size="small" title="Tình trạng hiện tại">
                  <Tag color={getStatusColor(selectedPatient.currentStatus)}>
                    {selectedPatient.currentStatus}
                  </Tag>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="Mức độ rủi ro">
                  <Badge 
                    color={getRiskColor(selectedPatient.riskLevel)} 
                    text={selectedPatient.riskLevel === "high" ? "Cao" : selectedPatient.riskLevel === "medium" ? "Trung bình" : "Thấp"}
                  />
                </Card>
              </Col>
            </Row>

            {selectedPatient.notes && (
              <>
                <Divider />
                <Card size="small" title="Ghi chú">
                  <Text>{selectedPatient.notes}</Text>
                </Card>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PatientManagement;
