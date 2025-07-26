// components/CustomerInfo.jsx
import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  DatePicker,
  message,
  theme,
} from "antd";
import { updateCustomer } from "../../../apis/CustomerService";
import dayjs from "dayjs";
import Cookies from "js-cookie";
const { Title, Paragraph, Text } = Typography;

const isOver18 = (date) => dayjs().diff(date, "year") >= 18;

const CustomerInfo = ({ onNext, onUpdate, data }) => {
  const [form] = Form.useForm();

  const initialFormValues = {
    wifeName: data?.wifeName || "",
    husName: data?.husName || "",
    wifeYob: data?.wifeYob ? dayjs(data.wifeYob) : null,
    husYob: data?.husYob ? dayjs(data.husYob) : null,
  };
  const { token } = theme.useToken();

  // Hàm xử lý khi bỏ qua (không cần validation)
  const handleSkip = () => {
    message.info(
      "Đã bỏ qua bước nhập thông tin. Bạn có thể cập nhật thông tin sau."
    );
    onNext();
  };

  // Hàm xử lý khi submit form (có validation)
  const handleFinish = async (values) => {
    const { wifeName, husName, wifeYob, husYob } = values;

    if (!wifeYob || !husYob) {
      message.error("Vui lòng chọn ngày sinh cho cả hai đối tác.");
      return;
    }

    if (!isOver18(wifeYob) || !isOver18(husYob)) {
      message.error("Cả hai đối tác phải từ 18 tuổi trở lên.");
      return;
    }

    const acCusId = Cookies.get("accCusId");
    console.log(acCusId);

    if (acCusId) {
      const cusInfo = {
        husName,
        wifeName,
        husYob: husYob.format("YYYY-MM-DD"),
        wifeYob: wifeYob.format("YYYY-MM-DD"),
      };
      console.log(cusInfo);
      try {
        const res = await updateCustomer(acCusId, cusInfo);
        if (res.data.success) {
          message.success("Cập nhật thông tin thành công!");
        } else {
          message.error(res.data.message || "Cập nhật thất bại");
        }
      } catch (error) {
        message.error("Cập nhật thông tin thất bại!");
        console.log(error);
      }
    } else {
      message.warning(
        "Không tìm thấy thông tin tài khoản. Thông tin sẽ được lưu tạm thời."
      );
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
      <Paragraph>
        Vui lòng cung cấp thông tin cho cả hai đối tác.
        {data?.wifeName && data?.husName && (
          <Text type="success" style={{ marginLeft: 8 }}>
            ✓ Đã có thông tin cơ bản
          </Text>
        )}
      </Paragraph>
      <Paragraph type="secondary" style={{ fontSize: 12, marginBottom: 16 }}>
        Bạn có thể bỏ qua bước này nếu muốn đặt lịch ngay, hoặc cập nhật thông
        tin để được phục vụ tốt hơn.
      </Paragraph>

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
              rules={[{ required: true, message: "Vui lòng nhập tên vợ" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="husName"
              label="Tên chồng"
              rules={[{ required: true, message: "Vui lòng nhập tên chồng" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="wifeYob"
              label="Ngày sinh vợ"
              rules={[
                { required: true, message: "Vui lòng chọn ngày sinh vợ" },
                {
                  validator: (_, value) => {
                    if (value && !isOver18(value)) {
                      return Promise.reject(
                        new Error("Vợ phải từ 18 tuổi trở lên")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="husYob"
              label="Ngày sinh chồng"
              rules={[
                { required: true, message: "Vui lòng chọn ngày sinh chồng" },
                {
                  validator: (_, value) => {
                    if (value && !isOver18(value)) {
                      return Promise.reject(
                        new Error("Chồng phải từ 18 tuổi trở lên")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <div style={{ textAlign: "right" }}>
          <Button
            type="default"
            style={{ marginRight: 8, color: token.colorPrimary }}
            onClick={handleSkip}
          >
            Bỏ qua bước này
          </Button>
          <Button type="primary" htmlType="submit">
            {data?.wifeName && data?.husName
              ? "Cập nhật & Tiếp theo"
              : "Lưu & Tiếp theo"}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default CustomerInfo;
