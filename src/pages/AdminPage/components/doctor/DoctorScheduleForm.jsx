import {
  Card,
  Form,
  Select,
  DatePicker,
  TimePicker,
  Input,
  Button,
  message,
} from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const DoctorScheduleForm = ({
  doctors = [],
  defaultDoctorId = null,
  onAdd,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const schedule = {
          doctorId: values.doctorId,
          date: values.date.format("YYYY-MM-DD"),
          start: values.start.format("HH:mm"),
          end: values.end.format("HH:mm"),
          note: values.note || "",
        };
        onAdd(schedule);
        message.success("Đã thêm lịch làm việc");
        form.resetFields();
      })
      .catch(() => {});
  };

  return (
    <Card>
      <Form
        layout="vertical"
        form={form}
        initialValues={{ doctorId: defaultDoctorId }}
      >
        <Form.Item
          name="doctorId"
          label="Bác sĩ"
          rules={[{ required: true, message: "Vui lòng chọn bác sĩ" }]}
        >
          <Select placeholder="Chọn bác sĩ">
            {doctors.map((doc) => (
              <Option key={doc.id} value={doc.id}>
                {doc.fullName || doc.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="date"
          label="Ngày làm việc"
          rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
        >
          <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          name="start"
          label="Giờ bắt đầu"
          rules={[{ required: true, message: "Vui lòng chọn giờ bắt đầu" }]}
        >
          <TimePicker style={{ width: "100%" }} format="HH:mm" />
        </Form.Item>

        <Form.Item
          name="end"
          label="Giờ kết thúc"
          rules={[{ required: true, message: "Vui lòng chọn giờ kết thúc" }]}
        >
          <TimePicker style={{ width: "100%" }} format="HH:mm" />
        </Form.Item>

        <Form.Item name="note" label="Ghi chú">
          <Input.TextArea rows={3} placeholder="Ghi chú (nếu có)" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block onClick={handleSubmit}>
            Thêm lịch
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default DoctorScheduleForm;
