import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Typography,
  Card,
  Tag,
  message,
  Button,
  Row,
  Col,
  Modal,
  Form,
  DatePicker,
  Select,
  Radio,
} from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import axios from "axios";

dayjs.extend(customParseFormat);
const { Title } = Typography;
const { Option } = Select;

const TreatmentplanManagement = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();

  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    fetchTreatmentPlans();
    fetchDoctors();
    fetchServices();
  }, []);

  const fetchTreatmentPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/treatmentplans");
      setPlans(res.data);
    } catch (error) {
      message.error("Không thể tải danh sách hồ sơ bệnh án");
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(res.data);
    } catch {
      message.error("Không thể tải danh sách bác sĩ");
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
      const defaultService = res.data.find((s) => s.Ser_Name === "Khám tổng quát");
      if (defaultService) {
        form.setFieldsValue({ ser_ID: defaultService.Ser_ID });
      }
    } catch {
      message.error("Không thể tải dịch vụ");
    }
  };

  const getStatusTag = (status) => {
    const statusMap = {
      0: { text: "Đang tiến hành", color: "blue" },
      1: { text: "Đã hoàn thành", color: "green" },
      2: { text: "Đã huỷ", color: "red" },
    };
    const s = statusMap[status] || { text: "Không xác định", color: "default" };
    return <Tag color={s.color}>{s.text}</Tag>;
  };

  const columns = [
    {
      title: "Mã Bệnh Án",
      dataIndex: "tp_ID",
      key: "tp_ID",
      render: (id) => <b>#{id}</b>,
    },
    {
      title: "Dịch vụ hiện tại",
      dataIndex: "service_Name",
      key: "service_Name",
      render: (name) => name || "Không rõ",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <a href={`/treatmentplans/${record.tp_ID}`} style={{ color: "#1677ff" }}>
          Xem chi tiết
        </a>
      ),
    },
  ];

  const filteredData = plans.filter((item) =>
    item.tp_ID.toString().includes(searchKeyword)
  );

  const handleSearchAccount = async (value) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/accounts/search`, {
        params: { keyword: value },
      });
      if (res.data) {
        setAccountInfo(res.data);
        form.setFieldsValue({
          husName: res.data.husName,
          wifeName: res.data.wifeName,
          husYOB: dayjs(res.data.husYOB),
          wifeYOB: dayjs(res.data.wifeYOB),
        });
      } else {
        message.warning("Không tìm thấy tài khoản");
      }
    } catch {
      message.error("Lỗi khi tìm tài khoản");
    }
  };

  const validateAge = (_, value) => {
    if (!value) return Promise.reject("Vui lòng chọn ngày sinh");
    const age = dayjs().diff(value, "year");
    return age >= 18
      ? Promise.resolve()
      : Promise.reject("Phải từ 18 tuổi trở lên");
  };

  const validatePhone = (_, value) => {
    const phoneRegex = /^[0-9]{9,11}$/;
    return phoneRegex.test(value)
      ? Promise.resolve()
      : Promise.reject("Số điện thoại không hợp lệ (9-11 chữ số)");
  };

  const validateEmail = (_, value) => {
    if (!value) return Promise.resolve();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value)
      ? Promise.resolve()
      : Promise.reject("Email không đúng định dạng");
  };

  const handleCreate = async (values) => {
    try {
      const payload = {
        ...values,
        startDate: dayjs().format("YYYY-MM-DD"),
      };

      if (isNewCustomer) {
        const accRes = await axios.post("http://localhost:5000/api/accounts", {
          fullName: `${values.husName} & ${values.wifeName}`,
          phone: values.phone,
          mail: values.mail,
          password: values.phone,
        });

        const cusRes = await axios.post("http://localhost:5000/api/customers", {
          acc_ID: accRes.data.acc_ID,
          hus_Name: values.husName,
          wife_Name: values.wifeName,
          hus_YOB: values.husYOB,
          wife_YOB: values.wifeYOB,
        });

        payload.cus_ID = cusRes.data.cus_ID;
      } else {
        payload.cus_ID = accountInfo.cus_ID;
      }

      await axios.post("http://localhost:5000/api/treatmentplans", {
        ...payload,
        status: 0,
      });

      message.success("Tạo hồ sơ thành công");
      setOpenModal(false);
      fetchTreatmentPlans();
      form.resetFields();
      setAccountInfo(null);
    } catch (err) {
      console.error(err);
      message.error("Tạo hồ sơ thất bại");
    }
  };

  return (
    <Card title={<Title level={3}>Danh sách Hồ sơ bệnh án</Title>}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Input
            placeholder="Tìm theo mã bệnh án"
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchKeyword(e.target.value)}
            style={{ width: 250 }}
          />
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenModal(true)}
          >
            Tạo hồ sơ bệnh án mới
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="tp_ID"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        open={openModal}
        title="Tạo Hồ Sơ Bệnh Án Mới"
        onCancel={() => {
          setOpenModal(false);
          form.resetFields();
          setAccountInfo(null);
        }}
        onOk={() => form.submit()}
        okText="Tạo"
        cancelText="Huỷ"
        width={800}
        cancelButtonProps={{
          style: { backgroundColor: "#f5f5f5", color: "#333" },
        }}
      >
        <Form layout="vertical" form={form} onFinish={handleCreate}>
          <Form.Item label="Loại bệnh nhân">
            <Radio.Group
              onChange={(e) => {
                setIsNewCustomer(e.target.value);
                form.resetFields();
                setAccountInfo(null);
              }}
              value={isNewCustomer}
            >
              <Radio value={false}>Bệnh nhân đã có tài khoản</Radio>
              <Radio value={true}>Bệnh nhân chưa có tài khoản</Radio>
            </Radio.Group>
          </Form.Item>

          {!isNewCustomer ? (
            <Form.Item
              label="Tìm theo SĐT hoặc email"
              name="search"
              rules={[{ required: true }]}
            >
              <Input.Search
                placeholder="Nhập SĐT hoặc Email"
                enterButton="Tìm"
                onSearch={handleSearchAccount}
              />
            </Form.Item>
          ) : (
            <>
              <Form.Item
                label="Họ tên chồng"
                name="husName"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Ngày sinh chồng"
                name="husYOB"
                rules={[{ required: true, validator: validateAge }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label="Họ tên vợ"
                name="wifeName"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Ngày sinh vợ"
                name="wifeYOB"
                rules={[{ required: true, validator: validateAge }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, validator: validatePhone }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="mail"
                rules={[{ validator: validateEmail }]}
              >
                <Input />
              </Form.Item>
            </>
          )}

          <Form.Item
            label="Chọn bác sĩ"
            name="doc_ID"
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn bác sĩ">
              {doctors.map((doc) => (
                <Option key={doc.Doc_ID} value={doc.Doc_ID}>
                  {doc.Full_Name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Chọn dịch vụ"
            name="ser_ID"
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn dịch vụ">
              {services.map((ser) => (
                <Option key={ser.Ser_ID} value={ser.Ser_ID}>
                  {ser.Ser_Name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default TreatmentplanManagement;
