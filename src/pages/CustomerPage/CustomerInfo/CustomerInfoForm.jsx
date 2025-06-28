import React from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Row,
  Col,
  Typography,
  Card,
  message,
} from "antd";
import dayjs from "dayjs";

const { Title, Paragraph } = Typography;

const isOver18 = (date) => dayjs().diff(date, "year") >= 18;

const CustomerInfoForm = ({ onUpdate, data }) => {
  const [form] = Form.useForm();

  const initialFormValues = {
    ...data,
    wifeDob: data?.wifeDob ? dayjs(data.wifeDob) : null,
    husbandDob: data?.husbandDob ? dayjs(data.husbandDob) : null,
  };

  const handleFinish = (values) => {
    const { wifeDob, husbandDob } = values;

    if (!isOver18(wifeDob) || !isOver18(husbandDob)) {
      message.error("Cả hai đối tác phải đủ 18 tuổi trở lên.");
      return;
    }

    onUpdate({
      ...values,
      wifeDob: wifeDob.format("YYYY-MM-DD"),
      husbandDob: husbandDob.format("YYYY-MM-DD"),
    });

    message.success("Cập nhật thông tin thành công!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: 24,
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 800,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
        bodyStyle={{ padding: 32 }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 8 }}>
          Thông tin cặp đôi
        </Title>
        <Paragraph style={{ textAlign: "center", marginBottom: 32 }}>
          Vui lòng nhập đầy đủ thông tin để hoàn tất hồ sơ.
        </Paragraph>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={initialFormValues}
        >
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                name="wifeName"
                label="Tên vợ"
                rules={[{ required: true, message: "Vui lòng nhập tên vợ" }]}
              >
                <Input placeholder="Nhập tên vợ" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="husbandName"
                label="Tên chồng"
                rules={[{ required: true, message: "Vui lòng nhập tên chồng" }]}
              >
                <Input placeholder="Nhập tên chồng" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="wifeDob"
                label="Ngày sinh vợ"
                rules={[{ required: true, message: "Vui lòng chọn ngày sinh vợ" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày sinh vợ"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="husbandDob"
                label="Ngày sinh chồng"
                rules={[{ required: true, message: "Vui lòng chọn ngày sinh chồng" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày sinh chồng"
                />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Button type="primary" htmlType="submit" size="large">
              Xác nhận
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CustomerInfoForm;
