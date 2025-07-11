import React, { useEffect, useState, useContext } from "react";
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
import { ReceptionistStoreContext } from "../contexts/ReceptionistStoreProvider";
import { findCustomerByPhoneOrEmail } from "../../../apis/CustomerService";
import CustomerInfoCard from "../BookingDetail/components/CustomerInfoCard";
import {
  createTreatment,
  createTreatmentForGuest,
} from "../../../apis/treatmentService";
import { useNavigate } from "react-router-dom";
dayjs.extend(customParseFormat);
const { Title } = Typography;
const { Option } = Select;

const TreatmentplanManagement = () => {
  // Remove local plans and loading state
  // const [plans, setPlans] = useState([]);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();

  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [accountInfo, setAccountInfo] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);

  // Use context for treatment list
  const {
    treatmentList,
    treatmentListLoading,
    fetchTreatmentList,
    doctorList,
    doctorListLoading,
    serviceList,
    serviceListLoading,
    fetchDoctorList,
    fetchServiceList,
  } = useContext(ReceptionistStoreContext);

  useEffect(() => {
    // fetchTreatmentPlans();
    // fetchDoctors();
    // fetchServices();
  }, []);

  // Map API data to table data
  const mappedPlans = (treatmentList || []).map((item) => ({
    tp_ID: item.tpId,
    service_Name: item.serviceInfo?.serName,
    status: item.status,
    doctor: item.doctorInfo?.accountInfo?.fullName,
    cusInfo: item.cusInfo,
  }));

  const getStatusTag = (statusObj) => {
    if (!statusObj) return <Tag color="default">Không xác định</Tag>;
    const colorMap = {
      1: "blue", // Đang tiến hành
      2: "green", // Đã hoàn thành
      3: "red", // Đã huỷ
    };
    return (
      <Tag color={colorMap[statusObj.statusId] || "default"}>
        {statusObj.statusName}
      </Tag>
    );
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
      title: "Bác sĩ",
      dataIndex: "doctor",
      key: "doctor",
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
        <a
          href={`/receptionist/treatmentplandetail/${record.tp_ID}`}
          style={{ color: "#1677ff" }}
        >
          Xem chi tiết
        </a>
      ),
    },
  ];

  const filteredData = mappedPlans.filter((item) =>
    item.tp_ID?.toString().includes(searchKeyword)
  );

  const handleSearchAccount = async (value) => {
    try {
      const res = await findCustomerByPhoneOrEmail(value);
      if (res.data && res.data.success && res.data.data) {
        setCustomerInfo(res.data.data);
        setAccountInfo(res.data.data); // for compatibility with form submit
        form.setFieldsValue({
          husName: res.data.data.husName,
          wifeName: res.data.data.wifeName,
          husYOB: dayjs(res.data.data.husYob),
          wifeYOB: dayjs(res.data.data.wifeYob),
        });
      } else {
        setCustomerInfo(null);
        message.warning("Không tìm thấy tài khoản");
      }
    } catch {
      setCustomerInfo(null);
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
    let payload = null;
    if (isNewCustomer) {
      payload = {
        husName: values.husName,
        husYob: values.husYOB.format("YYYY-MM-DD"),
        wifeName: values.wifeName,
        wifeYob: values.wifeYOB.format("YYYY-MM-DD"),
        phone: values.phone,
        mail: values.mail,
        docId: values.doc_ID,
        serId: values.ser_ID,
      };
      await createTreatmentForGuest(payload)
        .then((res) => {
          if (res.data.success) {
            message.success(res.data.message);
            setOpenModal(false);
            fetchTreatmentList();
            form.resetFields();
            setAccountInfo(null);
            const newTpId = res.data.data.tpId;
            navigate(`/receptionist/treatmentplandetail/${newTpId}`);
          } else {
            message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          message.error("Tạo hồ sơ thất bại!");
        });
    } else {
      payload = {
        docId: values.doc_ID,
        serId: values.ser_ID,
        cusId: customerInfo.cusId,
      };

      await createTreatment(payload)
        .then((res) => {
          if (res.data.success) {
            message.success(res.data.message);
            setOpenModal(false);
            fetchTreatmentList();
            form.resetFields();
            setAccountInfo(null);
            const newTpId = res.data.data.tpId;
            navigate(`/receptionist/treatmentplandetail/${newTpId}`);
          } else {
            message.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          message.error("Tạo hồ sơ thất bại!");
        });
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
        loading={treatmentListLoading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        open={openModal}
        title="Tạo Hồ Sơ Bệnh Án Mới"
        onCancel={() => {
          setOpenModal(false);
          form.resetFields();
          setAccountInfo(null);
          setCustomerInfo(null);
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
            <>
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
              {customerInfo && (
                <div style={{ marginBottom: 16 }}>
                  <CustomerInfoCard data={customerInfo} />
                </div>
              )}
            </>
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
            <Select placeholder="Chọn bác sĩ" loading={doctorListLoading}>
              {doctorList.map((doc) => (
                <Option key={doc.docId} value={doc.docId}>
                  {doc.accountInfo?.fullName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Chọn dịch vụ"
            name="ser_ID"
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn dịch vụ" loading={serviceListLoading}>
              {serviceList.map((ser) => (
                <Option key={ser.serId} value={ser.serId}>
                  {ser.serName}
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
