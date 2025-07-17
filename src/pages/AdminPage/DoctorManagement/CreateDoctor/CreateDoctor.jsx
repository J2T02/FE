import { Form, Input, Button, Typography, Card, message, DatePicker, Select, Radio, Upload, Space } from "antd";
import { ArrowLeftOutlined, PlusOutlined, UploadOutlined, CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useState } from "react";

const { Title } = Typography;
const { Option } = Select;

const CreateDoctor = ({ onBack }) => {
  const [form] = Form.useForm();
  const [certificates, setCertificates] = useState([]);

  const handleAddCertificate = () => {
    setCertificates([...certificates, { Cer_Name: "", File_Path: null }]);
  };

  const handleCertificateChange = (index, field, value) => {
    const newCertificates = [...certificates];
    newCertificates[index][field] = value;
    setCertificates(newCertificates);
  };

  const handleRemoveCertificate = (index) => {
    const newCertificates = [...certificates];
    newCertificates.splice(index, 1);
    setCertificates(newCertificates);
  };

  const handleSubmit = (values) => {
    const newDoctor = {
      accId: Math.floor(Math.random() * 10000),
      roleId: 3,
      fullName: values.fullname,
      password: values.phone,
      phone: values.phone,
      mail: values.mail,
      isActive: true,
      createAt: dayjs().format(),
      img: null,
      gender: values.gender,
      yob: values.yob.format("YYYY-MM-DD"),
      experience: values.experience,
      status: 1,
      eduId: values.educationLevel,
      certificates,
    };

    console.log("Thông tin bác sĩ mới:", newDoctor);
    message.success("Đã tạo tài khoản bác sĩ thành công!");

    form.resetFields();
    setCertificates([]);
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

      <Title level={3}>Thêm bác sĩ mới</Title>

      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item name="fullname" label="Họ tên" rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}>
          <Input placeholder="Nhập họ tên" />
        </Form.Item>

        <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }, { pattern: /^\d{9,11}$/, message: "Số điện thoại không hợp lệ!" }]}>
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item name="mail" label="Email" rules={[{ required: true, message: "Vui lòng nhập email!" }, { type: "email", message: "Email không hợp lệ!" }]}>
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="Nam">Nam</Radio>
            <Radio value="Nữ">Nữ</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="yob" label="Ngày tháng năm sinh" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="experience" label="Kinh nghiệm (năm)" rules={[{ required: true }]}>
          <Input type="number" placeholder="Nhập số năm kinh nghiệm" />
        </Form.Item>

        <Form.Item name="educationLevel" label="Trình độ" rules={[{ required: true }]}>
          <Select placeholder="Chọn trình độ">
            <Option value={1}>Cử nhân</Option>
            <Option value={2}>Bác sĩ chuyên khoa I</Option>
            <Option value={3}>Bác sĩ chuyên khoa II</Option>
            <Option value={4}>Thạc sĩ Y khoa</Option>
            <Option value={5}>Tiến sĩ Y khoa</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Bằng cấp">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCertificate}>
            Thêm bằng cấp
          </Button>
        </Form.Item>

        {certificates.map((cer, index) => (
          <Space key={index} align="baseline" style={{ display: "flex", marginBottom: 8 }}>
            <Form.Item required label="Tên bằng cấp">
              <Input placeholder="Nhập tên bằng cấp" value={cer.Cer_Name} onChange={(e) => handleCertificateChange(index, "Cer_Name", e.target.value)} />
            </Form.Item>

            <Form.Item required label="Tải chứng chỉ">
              <Upload beforeUpload={() => false} onChange={(info) => handleCertificateChange(index, "File_Path", info.file)}>
                <Button icon={<UploadOutlined />} 
                style={{ marginBottom: 20,
                backgroundColor: "#f78db3",
                color: "white",
                border: "none",
         }}
                >Chọn file</Button>
              </Upload>
            </Form.Item>

            <Button icon={<CloseOutlined />} danger type="text" onClick={() => handleRemoveCertificate(index)} />
          </Space>
        ))}

        <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="primary" htmlType="submit">
            Tạo bác sĩ
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateDoctor;
