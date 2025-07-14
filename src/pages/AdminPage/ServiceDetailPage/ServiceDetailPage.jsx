import React, { useEffect, useState } from "react";
import {
  Typography,
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  Row,
  Col,
  Table,
  Modal,
  Space,
  message,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

const { Title, Text } = Typography;

const mockServiceDetail = {
  Ser_ID: 1,
  Ser_Name: "Thụ tinh trong ống nghiệm (IVF)",
  Price: 50000000,
  Description: "Dịch vụ hỗ trợ sinh sản cao cấp",
  File_Path: "/Login.jpg",
  TreatmentSteps: [
    {
      TS_ID: 1,
      Step_Name: "Khám tổng quát",
      Description: "Khám lâm sàng và xét nghiệm cơ bản",
    },
    {
      TS_ID: 2,
      Step_Name: "Kích thích buồng trứng",
      Description: "Dùng thuốc kích thích sự phát triển nang noãn",
    },
  ],
};

const ServiceDetailPage = () => {
  const [form] = Form.useForm();
  const [service, setService] = useState(null);
  const [editingStep, setEditingStep] = useState(null);
  const [stepModalOpen, setStepModalOpen] = useState(false);
  const [stepList, setStepList] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Gọi API lấy thông tin chi tiết dịch vụ
    setService(mockServiceDetail); // Thay bằng gọi API sau
    setStepList(mockServiceDetail.TreatmentSteps);
    form.setFieldsValue({
      Ser_Name: mockServiceDetail.Ser_Name,
      Price: mockServiceDetail.Price,
      Description: mockServiceDetail.Description,
    });
  }, [form, id]);

  const handleServiceUpdate = (values) => {
    message.success("Cập nhật dịch vụ thành công!");
    setService({ ...service, ...values });
  };

  const openEditStep = (step) => {
    setEditingStep(step);
    setStepModalOpen(true);
  };

  const handleStepSubmit = (values) => {
    if (editingStep) {
      setStepList((prev) =>
        prev.map((s) => (s.TS_ID === editingStep.TS_ID ? { ...s, ...values } : s))
      );
      message.success("Cập nhật giai đoạn thành công!");
    } else {
      const newStep = {
        TS_ID: Date.now(),
        ...values,
      };
      setStepList((prev) => [...prev, newStep]);
      message.success("Thêm giai đoạn mới thành công!");
    }
    setStepModalOpen(false);
    setEditingStep(null);
  };

  if (!service) return null;

  return (
    <div style={{ padding: 24, background: "#fff0f4", minHeight: "100vh" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: "#f78db3",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "4px 16px",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#ff99bb")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#f78db3")}
          >
            Quay lại
          </Button>
        </Col>
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            🛠️ Chi tiết dịch vụ
          </Title>
        </Col>
      </Row>

      <Card style={{ marginBottom: 24 }}>
        <Form layout="vertical" form={form} onFinish={handleServiceUpdate}>
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item label="Tên dịch vụ" name="Ser_Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Giá tiền" name="Price" rules={[{ required: true }]}>
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  formatter={(v) => `${v} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  parser={(v) => v.replace(/\D/g, "")}
                />
              </Form.Item>
              <Form.Item label="Mô tả" name="Description">
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Cập nhật dịch vụ
                </Button>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Text strong>Hình ảnh minh hoạ:</Text>
              <br />
              <img
                src={service.File_Path}
                alt="service"
                style={{ maxWidth: "100%", borderRadius: 8, marginTop: 8 }}
              />
            </Col>
          </Row>
        </Form>
      </Card>

      <Card
        title="Danh sách các giai đoạn điều trị"
        extra={
          <Button type="primary" onClick={() => setStepModalOpen(true)}>
            Thêm giai đoạn
          </Button>
        }
      >
        <Table
          dataSource={stepList}
          rowKey="TS_ID"
          pagination={false}
          columns={[
            {
              title: "Tên giai đoạn",
              dataIndex: "Step_Name",
              key: "Step_Name",
            },
            {
              title: "Mô tả",
              dataIndex: "Description",
              key: "Description",
            },
            {
              title: "Thao tác",
              key: "actions",
              render: (_, record) => (
                <Button type="link" onClick={() => openEditStep(record)}>
                  Sửa
                </Button>
              ),
            },
          ]}
        />
      </Card>

      <Modal
        title={editingStep ? "Chỉnh sửa giai đoạn" : "Thêm giai đoạn"}
        open={stepModalOpen}
        okText={editingStep ? "Cập nhật" : "Thêm"}
        cancelText="Huỷ"
        okButtonProps={{
          style: {
            backgroundColor: "#f78db3",
            borderColor: "#f78db3",
          },
        }}
        cancelButtonProps={{
          style: {
            backgroundColor: "#f0f0f0",
            borderColor: "#ccc",
            color: "#333",
          },
        }}
        onCancel={() => {
          setStepModalOpen(false);
          setEditingStep(null);
        }}
        onOk={() => {
          document.getElementById("stepFormSubmit").click();
        }}
      >
        <Form
          layout="vertical"
          initialValues={editingStep || {}}
          onFinish={handleStepSubmit}
          id="stepForm"
        >
          <Form.Item
            label="Tên giai đoạn"
            name="Step_Name"
            rules={[{ required: true, message: "Vui lòng nhập tên giai đoạn" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="Description"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit" id="stepFormSubmit" style={{ display: "none" }}>
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceDetailPage;
