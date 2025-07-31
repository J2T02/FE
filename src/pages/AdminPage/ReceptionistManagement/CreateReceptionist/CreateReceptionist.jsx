import React, { useState } from "react";
import { Card, Form, Input, Button, Typography, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title } = Typography;

const CreateReceptionist = ({ onBack, onCreateReceptionist }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const receptionistData = {
      fullName: values.fullname,
      phone: values.phone,
      mail: values.mail,
      img: null, // Có thể thêm field upload image sau
    };

    // Gọi API để tạo receptionist mới
    if (onCreateReceptionist) {
      await onCreateReceptionist(receptionistData);
    }
  };

  return (
    <Card bordered={false}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={onBack}
        style={{
          marginBottom: 20,
          backgroundColor: "#f78db3",
          color: "white",
          border: "none",
        }}
      >
        Quay lại
      </Button>

      <Title level={3}>Thêm lễ tân mới</Title>

      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="fullname"
          label="Họ tên"
          rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
        >
          <Input placeholder="Nhập họ tên" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            { pattern: /^\d{9,11}$/, message: "Số điện thoại không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          name="mail"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Tạo lễ tân
        </Button>
      </Form>
    </Card>
  );
};

export default CreateReceptionist;
