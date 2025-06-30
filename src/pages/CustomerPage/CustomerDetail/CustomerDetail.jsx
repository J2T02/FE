import React, { useEffect, useState } from "react";
import {
  Typography,
  Divider,
  Space,
  Tag,
  Table,
  Button,
  Row,
  Col,
  Input,
  DatePicker,
  message,
  Layout,
  theme,
} from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";
import dayjs from "dayjs";
import axios from "axios";

const { Title, Text } = Typography;

const CustomerDetail = ({ accountId }) => {
  const { token } = theme.useToken();
  const [account, setAccount] = useState({
    acc_ID: 1,
    role_ID: 2,
    full_Name: "Nguyễn Văn Nam",
    password: "hashed_password",
    phone: "0909123456",
    mail: "nam.nguyen@example.com",
    isActive: true,
    createAt: "2020-01-15T08:30:00",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  });

  const [customer, setCustomer] = useState({
    cus_ID: 1,
    acc_ID: 1,
    hus_Name: "Nguyễn Văn Nam",
    wife_Name: "Trần Thị Hồng",
    hus_YOB: "1990-04-20",
    wife_YOB: "1992-08-05",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editCustomer, setEditCustomer] = useState({});
  const [bookings, setBookings] = useState([
    {
      booking_ID: 1001,
      acc_ID: 1,
      doc_ID: 5,
      ds_ID: 301,
      statusText: "Đã xác nhận",
      create_At: "2025-06-10T09:00:00",
      note: "Tái khám",
      doctorSchedule: {
        workDate: "2025-06-15",
        slot: {
          slot_Start: "08:00",
          slot_End: "12:00",
        },
      },
    },
    {
      booking_ID: 1002,
      acc_ID: 1,
      doc_ID: 2,
      ds_ID: 302,
      statusText: "Đang chờ",
      create_At: "2025-06-22T14:00:00",
      note: "Khám hiếm muộn",
      doctorSchedule: {
        workDate: "2025-06-25",
        slot: {
          slot_Start: "13:00",
          slot_End: "17:00",
        },
      },
    },
  ]);
  const [treatmentPlans, setTreatmentPlans] = useState([
    {
      tp_ID: 5001,
      startDate: "2025-04-01",
      endDate: null,
      result: null,
      statusText: "Đang thực hiện",
      service: {
        ser_ID: 3,
        ser_Name: "Thụ tinh trong ống nghiệm (IVF)",
        price: 25000000,
        description: "Quy trình IVF cơ bản",
        file_Path: "",
      },
      latestStep: {
        step_Name: "Chọc hút trứng",
      },
    },
    {
      tp_ID: 5002,
      startDate: "2025-01-15",
      endDate: "2025-04-01",
      result: "Thành công",
      statusText: "Đã hoàn thành",
      service: {
        ser_ID: 2,
        ser_Name: "Khám hiếm muộn",
        price: 500000,
        description: "Khám chẩn đoán nguyên nhân hiếm muộn",
        file_Path: "",
      },
      latestStep: {
        step_Name: "Chẩn đoán sơ bộ",
      },
    },
  ]);

  useEffect(() => {
    fetchProfile();
    fetchBookings();
    fetchTreatmentPlans();
  }, [accountId]);

  const fetchProfile = async () => {
    try {
      const resAcc = await axios.get(`/api/accounts/${accountId}`);
      setAccount(resAcc.data);

      const resCus = await axios.get(`/api/customers/by-account/${accountId}`);
      setCustomer(resCus.data);
      setEditCustomer(resCus.data);
    } catch (err) {
      message.error("Không thể tải thông tin khách hàng.");
    }
  };

  const fetchBookings = async () => {
    const res = await axios.get(`/api/bookings/recent/${accountId}`);
    setBookings(res.data);
  };

  const fetchTreatmentPlans = async () => {
    const res = await axios.get(`/api/treatmentplans/recent/${accountId}`);
    setTreatmentPlans(res.data);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/customers/${customer.cus_ID}`, {
        ...editCustomer,
        hus_YOB: editCustomer.hus_YOB
          ? dayjs(editCustomer.hus_YOB).format("YYYY-MM-DD")
          : null,
        wife_YOB: editCustomer.wife_YOB
          ? dayjs(editCustomer.wife_YOB).format("YYYY-MM-DD")
          : null,
      });
      message.success("Cập nhật thành công!");
      setIsEditing(false);
      fetchProfile();
    } catch (err) {
      message.error("Cập nhật thất bại!");
    }
  };

  if (!account || !customer) return <div>Đang tải...</div>;

  return (
    <Layout>
      <Header />
      <div style={{ padding: "40px 0", backgroundColor: token.colorBgBase }}>
        <Title level={3}>Thông tin cá nhân</Title>

        <div
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "center",
          }}
        >
          <img
            src={account.img}
            alt="avatar"
            style={{
              width: 160,
              height: 160,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <div style={{ flex: 1, textAlign: "center" }}>
            <Title
              level={2}
              style={{
                marginBottom: 8,
                color: "#1677ff",
                fontWeight: 700,
                fontSize: "32px",
              }}
            >
              {account.full_Name}
            </Title>
            <Space direction="vertical">
              <Text>
                <MailOutlined style={{ marginRight: 8, color: "#1677ff" }} />
                {account.mail}
              </Text>
              <Text>
                <PhoneOutlined style={{ marginRight: 8, color: "#1677ff" }} />
                {account.phone}
              </Text>
            </Space>
          </div>
        </div>

        <Divider />

        <Row gutter={24}>
          <Col span={12}>
            <Text strong>Tên chồng:</Text>{" "}
            {isEditing ? (
              <Input
                placeholder="Nhập tên chồng"
                value={editCustomer.hus_Name || ""}
                onChange={(e) =>
                  setEditCustomer({ ...editCustomer, hus_Name: e.target.value })
                }
              />
            ) : customer.hus_Name ? (
              customer.hus_Name
            ) : (
              <Text type="secondary">Bạn chưa cập nhật thông tin của bạn</Text>
            )}
            <br />
            <Text strong>Năm sinh:</Text>{" "}
            {isEditing ? (
              <DatePicker
                placeholder="Chọn năm sinh"
                value={
                  editCustomer.hus_YOB ? dayjs(editCustomer.hus_YOB) : null
                }
                format="DD/MM/YYYY"
                onChange={(date) =>
                  setEditCustomer({ ...editCustomer, hus_YOB: date })
                }
              />
            ) : customer.hus_YOB ? (
              dayjs(customer.hus_YOB).format("DD/MM/YYYY")
            ) : (
              <Text type="secondary">Bạn chưa cập nhật thông tin của bạn</Text>
            )}
          </Col>

          <Col span={12}>
            <Text strong>Tên vợ:</Text>{" "}
            {isEditing ? (
              <Input
                placeholder="Nhập tên vợ"
                value={editCustomer.wife_Name || ""}
                onChange={(e) =>
                  setEditCustomer({
                    ...editCustomer,
                    wife_Name: e.target.value,
                  })
                }
              />
            ) : customer.wife_Name ? (
              customer.wife_Name
            ) : (
              <Text type="secondary">Bạn chưa cập nhật thông tin của bạn</Text>
            )}
            <br />
            <Text strong>Năm sinh:</Text>{" "}
            {isEditing ? (
              <DatePicker
                placeholder="Chọn năm sinh"
                value={
                  editCustomer.wife_YOB ? dayjs(editCustomer.wife_YOB) : null
                }
                format="DD/MM/YYYY"
                onChange={(date) =>
                  setEditCustomer({ ...editCustomer, wife_YOB: date })
                }
              />
            ) : customer.wife_YOB ? (
              dayjs(customer.wife_YOB).format("DD/MM/YYYY")
            ) : (
              <Text type="secondary">Bạn chưa cập nhật thông tin của bạn</Text>
            )}
          </Col>
        </Row>

        <div style={{ marginTop: 16 }}>
          {isEditing ? (
            <>
              <Button type="primary" onClick={handleSave}>
                Lưu
              </Button>{" "}
              <Button type="primary" onClick={() => setIsEditing(false)}>
                Hủy
              </Button>
            </>
          ) : (
            <Button type="primary" onClick={() => setIsEditing(true)}>
              Chỉnh sửa
            </Button>
          )}
        </div>

        <Divider />

        <Row gutter={24}>
          <Col span={24} md={12}>
            <Title level={5}>Lịch sử đặt khám</Title>
            <Table
              columns={[
                { title: "Mã booking", dataIndex: "booking_ID" },
                {
                  title: "Ngày",
                  dataIndex: ["doctorSchedule", "workDate"],
                  render: (d) => dayjs(d).format("DD/MM/YYYY"),
                },
                {
                  title: "Khung giờ",
                  dataIndex: ["doctorSchedule", "slot"],
                  render: (slot) => `${slot.slot_Start} - ${slot.slot_End}`,
                },
                {
                  title: "Trạng thái",
                  dataIndex: "statusText",
                  render: (text) => <Tag color="blue">{text}</Tag>,
                },
                {
                  title: "",
                  dataIndex: "booking_ID",
                  render: (id) => (
                    <Button
                      type="link"
                      href={`/customer/${accountId}/bookings/${id}`}
                    >
                      Xem chi tiết
                    </Button>
                  ),
                },
              ]}
              dataSource={bookings}
              rowKey="booking_ID"
              pagination={false}
            />
            <div style={{ marginTop: 8, textAlign: "center" }}>
              <Button type="link" href={`/customer/${accountId}/bookings`}>
                Xem thêm
              </Button>
            </div>
          </Col>

          <Col span={24} md={12}>
            <Title level={5}>Hồ sơ điều trị</Title>
            <Table
              columns={[
                { title: "Mã hồ sơ", dataIndex: "tp_ID" },
                { title: "Dịch vụ", dataIndex: ["service", "ser_Name"] },
                {
                  title: "Giai đoạn hiện tại",
                  dataIndex: "latestStep",
                  render: (step) => step?.step_Name || "Chưa có",
                },
                {
                  title: "Trạng thái",
                  dataIndex: "statusText",
                  render: (s) => <Tag color="green">{s}</Tag>,
                },
                {
                  title: "",
                  dataIndex: "tp_ID",
                  render: (id) => (
                    <Button
                      type="link"
                      href={`/customer/${accountId}/treatments/${id}`}
                    >
                      Xem chi tiết
                    </Button>
                  ),
                },
              ]}
              dataSource={treatmentPlans}
              rowKey="tp_ID"
              pagination={false}
            />
            <div style={{ marginTop: 8, textAlign: "center" }}>
              <Button type="link" href={`/customer/${accountId}/treatments`}>
                Xem thêm
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </Layout>
  );
};

export default CustomerDetail;
