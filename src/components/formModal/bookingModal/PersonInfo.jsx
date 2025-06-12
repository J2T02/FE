import { Form, Input, DatePicker, Button, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const PersonInfo = ({ form, onPrevious, onSubmit }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const selectedProvince = Form.useWatch("province", form);
  const selectedDistrict = Form.useWatch("district", form);

  useEffect(() => {
    // Mock API provinces
    setProvinces([
      { code: "01", name: "Hà Nội" },
      { code: "02", name: "Hồ Chí Minh" },
    ]);
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      // Mock districts
      setDistricts([
        { code: "001", name: "Quận 1" },
        { code: "002", name: "Quận 2" },
      ]);
    } else setDistricts([]);
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      // Mock wards
      setWards([
        { code: "0001", name: "Phường A" },
        { code: "0002", name: "Phường B" },
      ]);
    } else setWards([]);
  }, [selectedDistrict]);

  const disabledDate = (current) => {
    return dayjs().subtract(18, "year").isBefore(current);
  };

  return (
    <Form layout="vertical" form={form} onFinish={onSubmit}>
      <Form.Item
        label="Họ tên"
        name="fullName"
        rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
      >
        <Input placeholder="Nhập họ tên" />
      </Form.Item>

      <Form.Item
        label="Ngày sinh"
        name="dob"
        rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
      >
        <DatePicker style={{ width: "100%" }} disabledDate={disabledDate} />
      </Form.Item>

      <Form.Item
        label="Tỉnh / Thành phố"
        name="province"
        rules={[{ required: true, message: "Vui lòng chọn tỉnh" }]}
      >
        <Select placeholder="Chọn tỉnh/thành">
          {provinces.map((p) => (
            <Select.Option key={p.code} value={p.code}>
              {p.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Quận / Huyện"
        name="district"
        rules={[{ required: true, message: "Vui lòng chọn quận/huyện" }]}
      >
        <Select placeholder="Chọn quận/huyện">
          {districts.map((d) => (
            <Select.Option key={d.code} value={d.code}>
              {d.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Phường / Xã"
        name="ward"
        rules={[{ required: true, message: "Vui lòng chọn phường/xã" }]}
      >
        <Select placeholder="Chọn phường/xã">
          {wards.map((w) => (
            <Select.Option key={w.code} value={w.code}>
              {w.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Số nhà, tên đường"
        name="addressDetail"
        rules={[{ required: true, message: "Vui lòng nhập địa chỉ chi tiết" }]}
      >
        <Input placeholder="Ví dụ: Số 10, đường ABC" />
      </Form.Item>

      <Form.Item className="flex justify-between gap-2">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="primary" onClick={onPrevious}>
            Quay lại
          </Button>
          <Button type="primary" htmlType="submit">
            ĐẶT HẸN
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default PersonInfo;
