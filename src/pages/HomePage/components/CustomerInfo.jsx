// components/CustomerInfo.jsx
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
import Cookies from "js-cookie";
import { updateCustomer } from "../../../apis/CustomerService";
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const isOver18 = (date) => dayjs().diff(date, "year") >= 18;

const CustomerInfo = ({ onNext, onUpdate, data }) => {
  const [form] = Form.useForm();

  // Chuẩn bị initial values với dayjs cho DatePicker
  const initialFormValues = {
    ...data,
    wifeYob: data?.wifeYob ? dayjs(data.wifeYob) : null,
    husYob: data?.husYob ? dayjs(data.husYob) : null,
  };

  const handleFinish = async (values) => {
    const { husName, wifeName, wifeYob, husYob } = values;
    if (!isOver18(wifeYob) || !isOver18(husYob)) {
      message.error("Cả hai đối tác phải đủ 18 tuổi trở lên.");
      return;
    }
    const acCusId = Cookies.get("accId");

    if (acCusId) {
      const cusInfo = {
        husName,
        wifeName,
        husYob: husYob.format("YYYY-MM-DD"),
        wifeYob: wifeYob.format("YYYY-MM-DD"),
      };
      console.log(cusInfo);
      await updateCustomer(acCusId, cusInfo)
        .then((res) => {
          if (res.data.success) {
            message.success(res.data.message);
          } else {
            message.error(res.data.message);
          }
        })
        .catch((error) => {
          message.error("cập nhật thông tin thất bại!");
          console.log(error);
        });
    }
    onUpdate({
      ...values,
      wifeYob: wifeYob.format("YYYY-MM-DD"),
      husYob: husYob.format("YYYY-MM-DD"),
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
            <Form.Item
              name="wifeName"
              label="Tên vợ"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="husName"
              label="Tên chồng"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="wifeYob"
              label="Ngày sinh vợ"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="husYob"
              label="Ngày sinh chồng"
              rules={[{ required: true }]}
            >
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
          <Button type="primary" style={{ marginRight: 8 }} onClick={onNext}>
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
