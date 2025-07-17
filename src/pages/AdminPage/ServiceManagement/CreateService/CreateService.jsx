import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Upload,
  Space,
  message,
} from "antd";
import { ArrowLeftOutlined, PlusOutlined, UploadOutlined, CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title } = Typography;

const CreateService = ({ onBack }) => {
  const [form] = Form.useForm();
  const [steps, setSteps] = useState([]);

  const handleAddStep = () => {
    setSteps([...steps, { Step_Name: "", Description: "" }]);
  };

  const handleRemoveStep = (index) => {
    const updated = [...steps];
    updated.splice(index, 1);
    setSteps(updated);
  };

  const handleStepChange = (index, field, value) => {
    const updated = [...steps];
    updated[index][field] = value;
    setSteps(updated);
  };

  const handleSubmit = (values) => {
    const newService = {
      ser_Name: values.ser_Name,
      price: values.price,
      description: values.description,
      file: values.file?.file || null,
      steps,
    };

    console.log("Dịch vụ mới:", newService);
    message.success("Thêm dịch vụ thành công!");
    form.resetFields();
    setSteps([]);
    onBack();
  };

  return (
    <Card bordered={false}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={onBack}
        style={{ marginBottom: 20,
            backgroundColor: "#f78db3",
            color: "white",
            border: "none",
         }}
      >
        Quay lại
      </Button>

      <Title level={3}>Thêm dịch vụ mới</Title>

      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="ser_Name"
          label="Tên dịch vụ"
          rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ" }]}
        >
          <Input placeholder="Tên dịch vụ" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea rows={3} placeholder="Mô tả dịch vụ" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Giá tiền"
          rules={[{ required: true, message: "Vui lòng nhập giá" }]}
        >
          <Input type="number" placeholder="Giá tiền (VND)" />
        </Form.Item>

        <Form.Item
          name="file"
          label="Ảnh đại diện / Tài liệu dịch vụ"
          valuePropName="file"
        >
          <Upload beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}
                    style={{ marginBottom: 20,
                    backgroundColor: "#f78db3",
                    color: "white",
                    border: "none",
                }}
             >Tải file lên</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Giai đoạn điều trị">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddStep}>
            Thêm giai đoạn
          </Button>
        </Form.Item>

        {steps.map((step, index) => (
          <Space key={index} style={{ display: "flex", marginBottom: 8 }} align="start">
            <Form.Item
              required
              label="Tên giai đoạn"
              style={{ marginBottom: 0 }}
            >
              <Input
                placeholder="Tên giai đoạn"
                value={step.Step_Name}
                onChange={(e) =>
                  handleStepChange(index, "Step_Name", e.target.value)
                }
              />
            </Form.Item>

            <Form.Item
              required
              label="Mô tả"
              style={{ marginBottom: 0 }}
            >
              <Input
                placeholder="Mô tả giai đoạn"
                value={step.Description}
                onChange={(e) =>
                  handleStepChange(index, "Description", e.target.value)
                }
              />
            </Form.Item>

            <Button
              icon={<CloseOutlined />}
              type="text"
              danger
              onClick={() => handleRemoveStep(index)}
            />
          </Space>
        ))}

        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="primary" htmlType="submit">
            Tạo dịch vụ
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateService;
