// components/CustomerInfo.jsx
import React from "react";
import { Form, Input, DatePicker, Button, Row, Col, Typography, Card, message } from "antd";
import dayjs from "dayjs";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const isOver18 = (date) => dayjs().diff(date, "year") >= 18;

const CustomerInfo = ({ onNext, onUpdate, data }) => {
  const [form] = Form.useForm();

  // Chuẩn bị initial values với dayjs cho DatePicker
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
    onNext();
  };

  return (
    <Card style={{ maxWidth: 600, margin: "0 auto" }}>
      <Title level={4}>Thông tin cặp đôi</Title>
      <Paragraph>Vui lòng cung cấp thông tin cho cả hai đối tác.</Paragraph>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialFormValues}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="wifeName" label="Tên vợ" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="husbandName" label="Tên chồng" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="wifeDob" label="Ngày sinh vợ" rules={[{ required: true }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="husbandDob" label="Ngày sinh chồng" rules={[{ required: true }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="notes" label="Ghi chú">
              <TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>

        <div style={{ textAlign: "right" }}>
          <Button type="default" style={{ marginRight: 8 }} onClick={onNext}>
            Bỏ qua
          </Button>
          <Button type="primary" htmlType="submit">
            Tiếp theo
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default CustomerInfo;
