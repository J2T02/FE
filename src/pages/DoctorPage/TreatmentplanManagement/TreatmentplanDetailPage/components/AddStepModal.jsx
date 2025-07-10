import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Button,
  message,
  Divider,
  Radio,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";

const { Option } = Select;

const drugOptions = [
  "Follitropin alfa", "Follitropin beta", "Urofollitropin", "Menotropins",
  "Lutropin alfa", "hCG", "Triptorelin", "Leuprolide", "Cetrorelix",
  "Ganirelix", "Buserelin", "Nafarelin",
];

const AddStepModal = ({
  visible,
  onCancel,
  tpId,
  doctorId,
  serviceId,
  latestTSID,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [stepOptions, setStepOptions] = useState([]);
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [drugFields, setDrugFields] = useState([]);
  const [showDrugFields, setShowDrugFields] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const fetchData = async () => {
      try {
        const stepRes = await axios.get(`/api/treatmentstep/service/${serviceId}`);
        setStepOptions(stepRes.data || []);

        const defaultTSID = latestTSID || stepRes.data?.[0]?.TS_ID || 1;

        form.setFieldsValue({
          TS_ID: defaultTSID,
          Doc_ID: doctorId,
          Status: 1,
          PlanDate: dayjs(),
        });

        fetchDoctorSchedules(dayjs());
      } catch (err) {
        message.error("Không thể tải dữ liệu khởi tạo.");
      }
    };

    fetchData();
  }, [visible]);

  const fetchDoctorSchedules = async (date) => {
    try {
      const res = await axios.get("/api/doctorschedule/available", {
        params: {
          Doc_ID: doctorId,
          WorkDate: date.format("YYYY-MM-DD"),
        },
      });
      setAvailableSchedules(res.data || []);
    } catch (err) {
      message.error("Không thể tải lịch bác sĩ.");
    }
  };

  const onDateChange = (date) => {
    form.setFieldValue("PlanDate", date);
    fetchDoctorSchedules(date);
  };

  const addDrugField = () => {
    setDrugFields([...drugFields, { key: drugFields.length }]);
  };

  const handleRemoveDrugField = (key) => {
    const updated = drugFields.filter((item) => item.key !== key);
    setDrugFields(updated);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const drugData = drugFields.map(({ key }) => ({
        Drug_Name: values[`Drug_Name_${key}`],
        Dosage: values[`Dosage_${key}`],
      })).filter(d => d.Drug_Name && d.Dosage);

      const DrugName = drugData.map(d => d.Drug_Name).join("\n");
      const Dosage = drugData.map(d => d.Dosage).join("\n");

      const payload = {
        TP_ID: tpId,
        TS_ID: values.TS_ID,
        Step_Name: values.Step_Name,
        Note: values.Note || "",
        Status: 1,
        Doc_ID: doctorId,
        DS_ID: values.DS_ID,
        DrugName,
        Dosage,
      };

      await axios.post("/api/stepdetail/create", payload);
      message.success("Thêm bước điều trị thành công!");
      form.resetFields();
      setDrugFields([]);
      setShowDrugFields(false);
      onSuccess();
    } catch {
      message.error("Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <Modal
      open={visible}
      title="Thêm bước điều trị mới"
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="Thêm"
      cancelText="Hủy"
      width={700}
      cancelButtonProps={{
        style: { color: "#f78db3", borderColor: "#f78db3" },
      }}
      okButtonProps={{
        style: { backgroundColor: "#f78db3", borderColor: "#f78db3", color: "#fff" },
      }}
    >
      <Form layout="vertical" form={form}>
        <Form.Item name="TS_ID" label="Giai đoạn điều trị">
          <Select>
            {stepOptions.map(step => (
              <Option key={step.TS_ID} value={step.TS_ID}>
                {step.Step_Name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="Step_Name"
          label="Tên bước điều trị"
          rules={[{ required: true, message: "Nhập tên bước điều trị" }]}
        >
          <Input placeholder="Nhập tên bước" />
        </Form.Item>

        <Form.Item name="Note" label="Ghi chú">
          <Input.TextArea placeholder="Ghi chú thêm (nếu có)" />
        </Form.Item>

        <Form.Item
          name="PlanDate"
          label="Ngày hẹn"
          rules={[{ required: true }]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
            onChange={onDateChange}
            disabledDate={(current) => {
              const today = dayjs().startOf("day");
              return current && current < today;
            }}
          />
        </Form.Item>

        {availableSchedules.length > 0 && (
          <Form.Item
            name="DS_ID"
            label="Khung giờ"
            rules={[{ required: true, message: "Chọn khung giờ" }]}
          >
            <Radio.Group style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {availableSchedules.map(sch => (
                <Radio key={sch.DS_ID} value={sch.DS_ID}>
                  {`${sch.WorkDate} | ${sch.Slot_Start} - ${sch.Slot_End}`}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        )}

        <Divider orientation="left">Thuốc kê (nếu có)</Divider>

        {drugFields.map(({ key }) => (
          <Row gutter={8} key={key} style={{ marginBottom: 8 }}>
            <Col span={12}>
              <Form.Item name={`Drug_Name_${key}`}>
                <Select placeholder="Tên thuốc" allowClear>
                  {drugOptions.map((name) => (
                    <Option key={name} value={name}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item name={`Dosage_${key}`}>
                <Input placeholder="Liều lượng" />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Button danger onClick={() => handleRemoveDrugField(key)}>X</Button>
            </Col>
          </Row>
        ))}

        <Button
          type="dashed"
          block
          icon={<PlusOutlined />}
          onClick={() => {
            setShowDrugFields(true);
            setDrugFields([...drugFields, { key: drugFields.length }]);
          }}
          style={{ color: "#f78db3" }}
        >
          Thêm thuốc
        </Button>
      </Form>
    </Modal>
  );
};

export default AddStepModal;
