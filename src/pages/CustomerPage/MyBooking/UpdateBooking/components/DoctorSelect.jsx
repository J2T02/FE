import { Form, Select } from "antd";

const DoctorSelect = ({ doctors, value, onChange }) => {
  return (
    <Form.Item label="Chọn bác sĩ">
      <Select
        showSearch
        placeholder="Chọn bác sĩ"
        optionFilterProp="children"
        value={value}
        onChange={onChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {doctors.map((doc) => (
          <Select.Option key={doc.docId} value={doc.docId}>
            {doc.accountInfo.fullName}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default DoctorSelect;
