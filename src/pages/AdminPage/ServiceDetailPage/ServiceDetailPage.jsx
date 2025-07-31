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
  Spin,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { GetServiceById, UpdateService } from "../../../apis/service";
import { createTreatmentStep } from "../../../apis/treatmentService";

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

const ServiceDetailPage = ({
  serId,
  treatmentSteps = [],
  onBack,
  onStepCreated,
}) => {
  const [form] = Form.useForm();
  const [service, setService] = useState(null);
  const [editingStep, setEditingStep] = useState(null);
  const [stepModalOpen, setStepModalOpen] = useState(false);
  const [stepList, setStepList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  // 👇 Nếu không có serId props thì lấy từ URL
  const id = serId ?? params.id;

  useEffect(() => {
    const fetchServiceDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await GetServiceById(id);
        if (res?.data?.success && res.data.data) {
          const serviceData = res.data.data;

          // Map dữ liệu từ API sang format component
          const mappedService = {
            Ser_ID: serviceData.serId,
            Ser_Name: serviceData.serName,
            Price: serviceData.price,
            Description: serviceData.description,
            File_Path: serviceData.filePath || "/imgdefault.jpg",
            TreatmentSteps: [], // Sẽ được fetch riêng nếu cần
          };

          setService(mappedService);

          // Map treatment steps từ props
          if (treatmentSteps && treatmentSteps.length > 0) {
            const mappedSteps = treatmentSteps.map((step) => ({
              TS_ID: step.tsId,
              Step_Name: step.stepName,
              Description: step.description,
            }));
            setStepList(mappedSteps);
          } else {
            setStepList([]);
          }

          // Set form values
          form.setFieldsValue({
            Ser_Name: mappedService.Ser_Name,
            Price: mappedService.Price,
            Description: mappedService.Description,
          });
        } else {
          setError("Không tìm thấy thông tin dịch vụ");
        }
      } catch (err) {
        console.error("Lỗi khi lấy thông tin dịch vụ:", err);
        setError("Có lỗi xảy ra khi tải thông tin dịch vụ");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchServiceDetail();
    }
  }, [form, id]);

  // Cập nhật stepList khi treatmentSteps thay đổi
  useEffect(() => {
    if (treatmentSteps && treatmentSteps.length > 0) {
      const mappedSteps = treatmentSteps.map((step) => ({
        TS_ID: step.tsId,
        Step_Name: step.stepName,
        Description: step.description,
      }));
      setStepList(mappedSteps);
    } else {
      setStepList([]);
    }
  }, [treatmentSteps]);

  const handleServiceUpdate = async (values) => {
    try {
      const updateData = {
        serName: values.Ser_Name,
        price: values.Price,
        description: values.Description,
      };

      const res = await UpdateService(id, updateData);
      if (res?.data?.success) {
        message.success("Cập nhật dịch vụ thành công!");
        setService({ ...service, ...values });
      } else {
        message.error("Có lỗi xảy ra khi cập nhật dịch vụ");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật dịch vụ:", error);
      message.error("Có lỗi xảy ra khi cập nhật dịch vụ");
    }
  };

  const openEditStep = (step) => {
    setEditingStep(step);
    setStepModalOpen(true);
  };

  const handleStepSubmit = async (values) => {
    if (editingStep) {
      setStepList((prev) =>
        prev.map((s) =>
          s.TS_ID === editingStep.TS_ID ? { ...s, ...values } : s
        )
      );
      message.success("Cập nhật giai đoạn thành công!");
    } else {
      // Thêm giai đoạn mới
      try {
        const stepData = {
          stepName: values.Step_Name,
          description: values.Description,
          serId: serId,
        };

        const res = await createTreatmentStep(stepData);
        if (res?.data?.success) {
          message.success("Thêm giai đoạn mới thành công!");

          // Gọi callback để refresh danh sách
          if (onStepCreated) {
            onStepCreated();
          }
        } else {
          message.error("Có lỗi xảy ra khi thêm giai đoạn");
        }
      } catch (error) {
        console.error("Lỗi khi thêm giai đoạn:", error);
        message.error("Có lỗi xảy ra khi thêm giai đoạn");
      }
    }
    setStepModalOpen(false);
    setEditingStep(null);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#fff0f4",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#fff0f4",
          color: "red",
          fontSize: "16px",
        }}
      >
        {error}
      </div>
    );
  }

  if (!service) return null;

  return (
    <div style={{ padding: 24, background: "#fff0f4", minHeight: "100vh" }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              if (onBack) onBack(); // 👈 Nếu được gọi từ tab, gọi hàm back
              else navigate(-1); // 👈 Nếu từ URL trực tiếp thì quay lại
            }}
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
              <Form.Item
                label="Tên dịch vụ"
                name="Ser_Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Giá tiền"
                name="Price"
                rules={[{ required: true }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  formatter={(v) =>
                    `${v} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  }
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
          <Button
            type="primary"
            htmlType="submit"
            id="stepFormSubmit"
            style={{ display: "none" }}
          >
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ServiceDetailPage;
