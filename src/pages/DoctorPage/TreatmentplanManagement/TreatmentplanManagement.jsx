import React, { useEffect, useState, useMemo } from "react";
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
  Modal,
  Descriptions,
  Timeline,
  Divider,
  Progress,
  Badge,
  List,
  Avatar
} from "antd";
import { 
  SearchOutlined, 
  PlusOutlined, 
  EyeOutlined, 
  EditOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  UserOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { mockTreatmentPlans, treatmentPlanStatuses, treatmentTypes } from "../../../data/mockDoctorPageData";

const { Title, Text } = Typography;
const { Option } = Select;

const TreatmentplanManagement = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const navigate = useNavigate();

  // Filter treatment plans based on search and filters
  const filteredPlans = useMemo(() => {
    return mockTreatmentPlans.filter(plan => {
      const matchesSearch = 
        plan.patientInfo.husName.toLowerCase().includes(searchText.toLowerCase()) ||
        plan.patientInfo.wifeName.toLowerCase().includes(searchText.toLowerCase()) ||
        plan.planId.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || plan.status === statusFilter;
      const matchesType = typeFilter === "all" || plan.treatmentInfo.type.includes(typeFilter);
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchText, statusFilter, typeFilter]);

  // Calculate progress percentage
  const calculateProgress = (plan) => {
    const startDate = new Date(plan.treatmentInfo.startDate);
    const endDate = new Date(plan.treatmentInfo.estimatedEndDate);
    const currentDate = new Date();
    
    const totalDuration = endDate - startDate;
    const elapsed = currentDate - startDate;
    
    if (plan.status === "COMPLETED") return 100;
    if (plan.status === "CANCELLED") return 0;
    
    const progress = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));
    return Math.round(progress);
  };

  // Get status color
  const getStatusColor = (status) => {
    const statusConfig = treatmentPlanStatuses.find(s => s.value === status);
    return statusConfig ? statusConfig.color : 'default';
  };

  // Get status text
  const getStatusText = (status) => {
    const statusConfig = treatmentPlanStatuses.find(s => s.value === status);
    return statusConfig ? statusConfig.label : status;
  };

  // Show plan details
  const showPlanDetails = (plan) => {
    setSelectedPlan(plan);
    setDetailModalVisible(true);
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
      title: "Mã kế hoạch",
      dataIndex: "planId",
      key: "planId",
      width: 120,
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Thông tin bệnh nhân",
      key: "patientInfo",
      width: 250,
      render: (_, record) => (
        <div>
          <div><Text strong>Chồng:</Text> {record.patientInfo.husName}</div>
          <div><Text strong>Vợ:</Text> {record.patientInfo.wifeName}</div>
          <div><Text type="secondary">Tuổi: {record.patientInfo.husAge}/{record.patientInfo.wifeAge}</Text></div>
        </div>
      ),
    },
    {
      title: "Loại điều trị",
      key: "treatmentType",
      width: 150,
      render: (_, record) => (
        <div>
          {record.treatmentInfo.type.map((type, index) => (
            <Tag key={index} color="blue" style={{ marginBottom: 4 }}>
              {type}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Thời gian",
      key: "timeline",
      width: 150,
      render: (_, record) => (
        <div>
          <div><Text strong>Bắt đầu:</Text> {new Date(record.treatmentInfo.startDate).toLocaleDateString('vi-VN')}</div>
          <div><Text strong>Dự kiến:</Text> {new Date(record.treatmentInfo.estimatedEndDate).toLocaleDateString('vi-VN')}</div>
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
    },
    {
      title: "Tiến độ",
      key: "progress",
      width: 120,
      render: (_, record) => {
        const progress = calculateProgress(record);
        return (
          <div>
            <Progress 
              percent={progress} 
              size="small" 
              status={record.status === 'CANCELLED' ? 'exception' : 'active'}
            />
          </div>
        );
      },
    },
    {
      title: "Chi phí",
      key: "cost",
      width: 120,
      render: (_, record) => (
        <div>
          <Text strong>{record.financialInfo.totalCost.toLocaleString('vi-VN')} VNĐ</Text>
          <div><Text type="secondary">Đã thanh toán: {record.financialInfo.paidAmount.toLocaleString('vi-VN')} VNĐ</Text></div>
        </div>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="link" 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => showPlanDetails(record)}
          >
            Chi tiết
          </Button>
          <Button 
            type="link" 
            size="small" 
            icon={<EditOutlined />}
          >
            Sửa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Title level={3} style={{ margin: 0 }}>
            Quản lý kế hoạch điều trị
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("/doctor/treatment-plans/new")}
          >
            Tạo kế hoạch mới
          </Button>
        </div>

        <Row gutter={16} style={{ marginBottom: "16px" }}>
          <Col span={8}>
            <Input
              placeholder="Tìm kiếm theo tên bệnh nhân hoặc mã kế hoạch..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col span={6}>
            <Select
              placeholder="Lọc theo trạng thái"
              style={{ width: "100%" }}
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Option value="all">Tất cả trạng thái</Option>
              {treatmentPlanStatuses.map(status => (
                <Option key={status.value} value={status.value}>
                  {status.label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={6}>
            <Select
              placeholder="Lọc theo loại điều trị"
              style={{ width: "100%" }}
              value={typeFilter}
              onChange={setTypeFilter}
            >
              <Option value="all">Tất cả loại điều trị</Option>
              {treatmentTypes.map(type => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredPlans}
          rowKey="planId"
          scroll={{ x: 1200 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} kế hoạch điều trị`,
          }}
        />
      </Card>

      {/* Treatment Plan Detail Modal */}
      <Modal
        title={`Chi tiết kế hoạch điều trị - ${selectedPlan?.planId}`}
        open={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Đóng
          </Button>,
          <Button key="edit" type="primary" icon={<EditOutlined />}>
            Chỉnh sửa
          </Button>
        ]}
      >
        {selectedPlan && (
          <div>
            <Descriptions title="Thông tin bệnh nhân" bordered column={2}>
              <Descriptions.Item label="Tên chồng" span={1}>
                <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
                {selectedPlan.patientInfo.husName}
              </Descriptions.Item>
              <Descriptions.Item label="Tuổi chồng">
                {selectedPlan.patientInfo.husAge} tuổi
              </Descriptions.Item>
              <Descriptions.Item label="Tên vợ" span={1}>
                <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
                {selectedPlan.patientInfo.wifeName}
              </Descriptions.Item>
              <Descriptions.Item label="Tuổi vợ">
                {selectedPlan.patientInfo.wifeAge} tuổi
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại" span={2}>
                {selectedPlan.patientInfo.phone}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="Thông tin điều trị" bordered column={2}>
              <Descriptions.Item label="Loại điều trị" span={2}>
                {selectedPlan.treatmentInfo.type.map((type, index) => (
                  <Tag key={index} color="blue" style={{ marginRight: 4 }}>
                    {type}
                  </Tag>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày bắt đầu">
                <CalendarOutlined style={{ marginRight: 4 }} />
                {new Date(selectedPlan.treatmentInfo.startDate).toLocaleDateString('vi-VN')}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày dự kiến kết thúc">
                <CalendarOutlined style={{ marginRight: 4 }} />
                {new Date(selectedPlan.treatmentInfo.estimatedEndDate).toLocaleDateString('vi-VN')}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái" span={2}>
                <Tag color={getStatusColor(selectedPlan.status)}>
                  {getStatusText(selectedPlan.status)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Mô tả" span={2}>
                {selectedPlan.treatmentInfo.description}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="Thông tin tài chính" bordered column={2}>
              <Descriptions.Item label="Tổng chi phí">
                <Text strong style={{ color: '#1890ff' }}>
                  {selectedPlan.financialInfo.totalCost.toLocaleString('vi-VN')} VNĐ
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Đã thanh toán">
                <Text strong style={{ color: '#52c41a' }}>
                  {selectedPlan.financialInfo.paidAmount.toLocaleString('vi-VN')} VNĐ
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Còn lại">
                <Text strong style={{ color: '#f5222d' }}>
                  {(selectedPlan.financialInfo.totalCost - selectedPlan.financialInfo.paidAmount).toLocaleString('vi-VN')} VNĐ
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Phương thức thanh toán">
                {selectedPlan.financialInfo.paymentMethod}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div>
              <Title level={5}>Lịch sử điều trị</Title>
              <Timeline>
                {selectedPlan.treatmentHistory.map((item, index) => (
                  <Timeline.Item 
                    key={index}
                    color={item.type === 'appointment' ? 'blue' : item.type === 'procedure' ? 'green' : 'orange'}
                    dot={item.type === 'appointment' ? <CalendarOutlined /> : 
                         item.type === 'procedure' ? <MedicineBoxOutlined /> : 
                         <ClockCircleOutlined />}
                  >
                    <div>
                      <Text strong>{new Date(item.date).toLocaleDateString('vi-VN')}</Text>
                      <div>{item.description}</div>
                      {item.notes && (
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          Ghi chú: {item.notes}
                        </Text>
                      )}
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TreatmentplanManagement;
