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
import { getTreatmentStepList } from "../../../../../apis/treatmentService";
import { getDoctorScheduleByDoctorId } from "../../../../../apis/doctorService";
import { createStepDetail } from "../../../../../apis/stepDetailService";
import { data } from "react-router-dom";
const { Option } = Select;

const drugOptions = [
  "Clomiphene Citrate",
  "hCG",
  "Utrogestan",
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
  const [doctorSchedule, setDoctorSchedule] = useState([]);
  const [drugFields, setDrugFields] = useState([]);
  const [showDrugFields, setShowDrugFields] = useState(false);

  useEffect(() => {
    if (!visible) return;

    const fetchData = async () => {
      try {
        // Lấy danh sách giai đoạn điều trị từ API chuẩn
        const stepRes = await getTreatmentStepList();
        if (stepRes?.data?.success && Array.isArray(stepRes.data.data)) {
          setStepOptions(stepRes.data.data);
        } else {
          setStepOptions([]);
        }

        // Lấy lịch làm việc của bác sĩ
        const scheduleRes = await getDoctorScheduleByDoctorId(doctorId);
        if (
          scheduleRes?.data?.success &&
          Array.isArray(scheduleRes.data.data)
        ) {
          setDoctorSchedule(scheduleRes.data.data);
        } else {
          setDoctorSchedule([]);
        }

        const defaultTSID = latestTSID || stepRes.data?.data?.[0]?.tsId || 1;

        form.setFieldsValue({
          TS_ID: defaultTSID,
          Doc_ID: doctorId,
          Status: 1,
          PlanDate: dayjs(),
        });
      } catch (err) {
        message.error("Không thể tải dữ liệu khởi tạo.");
      }
    };

    fetchData();
  }, [visible]);

  // Xử lý disableDate cho DatePicker
  const availableDates = doctorSchedule.map((item) => item.workDate);
  const disabledDate = (current) => {
    return !availableDates.includes(current.format("YYYY-MM-DD"));
  };
  const handleDateChange = (date) => {
    const selected = doctorSchedule.find(
      (item) => item.workDate === date.format("YYYY-MM-DD")
    );
    if (selected) {
      form.setFieldsValue({ DS_ID: selected.dsId });
    } else {
      form.setFieldsValue({ DS_ID: undefined });
    }
  };

  const addDrugField = () => {
    setDrugFields([...drugFields, { key: drugFields.length }]);
  };

  const handleRemoveDrugField = (key) => {
    const updated = drugFields.filter((item) => item.key !== key);
    setDrugFields(updated);
  };
  const createStep = async (newStep) => {
    await createStepDetail(newStep)
      .then((res) => {
        if (res.data.success) {
          message.success("Tạo bước điều trị thành công!");
          message.success("Thêm bước điều trị thành công!");
          form.resetFields();
          setDrugFields([]);
          setShowDrugFields(false);
          onSuccess();
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Tạo bước điều trị thất bại!");
      });
  };
  const handleSubmit = async () => {
    try {
      // cc;
      const values = await form.validateFields();

      const drugData = drugFields
        .map(({ key }) => ({
          Drug_Name: values[`Drug_Name_${key}`],
          Dosage: values[`Dosage_${key}`],
        }))
        .filter((d) => d.Drug_Name && d.Dosage);

      const DrugName = drugData.map((d) => d.Drug_Name).join("\n");
      const Dosage = drugData.map((d) => d.Dosage).join("\n");

      const payload = {
        tpId: tpId,
        tsId: values.TS_ID,
        stepName: values.Step_Name,
        note: values.Note || "",
        Status: 1,
        docId: doctorId,
        dsId: values.DS_ID,
        drugName: DrugName,
        dosage: Dosage,
      };
      console.log(payload);
      createStep(payload);
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
        style: {
          backgroundColor: "#f78db3",
          borderColor: "#f78db3",
          color: "#fff",
        },
      }}
    >
      <Form layout="vertical" form={form}>
        <Form.Item name="TS_ID" label="Giai đoạn điều trị">
          <Select>
            {stepOptions.map((step) => (
              <Option key={step.tsId} value={step.tsId}>
                {step.stepName}
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
            disabledDate={disabledDate}
            onChange={handleDateChange}
          />
        </Form.Item>
        <Form.Item name="DS_ID" style={{ display: "none" }}>
          <Input />
        </Form.Item>

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
              <Button danger onClick={() => handleRemoveDrugField(key)}>
                X
              </Button>
            </Col>
          </Row>
        ))}

        {drugFields.length === 0 && (
          <Button
            type="dashed"
            block
            icon={<PlusOutlined />}
            onClick={() => {
              setShowDrugFields(true);
              setDrugFields([{ key: 0 }]);
            }}
            style={{ color: "#f78db3" }}
          >
            Thêm thuốc
          </Button>
        )}
      </Form>
    </Modal>
  );
};

export default AddStepModal;
