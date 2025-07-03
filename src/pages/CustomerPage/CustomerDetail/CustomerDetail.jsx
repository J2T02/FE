import React, { useContext, useEffect, useState } from "react";
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
import { FiPhoneCall } from "react-icons/fi";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";
import dayjs from "dayjs";
import axios from "axios";
import { updateCustomer } from "../../../apis/CustomerService";
import { GetCustomerInfo, BookingHistory } from "../../../apis/bookingService";
import Cookies from "js-cookie";
import { StoreContext } from "../../../contexts/StoreProvider";

const { Title, Text } = Typography;

const CustomerDetail = () => {
  const accountId = Cookies.get("accId");
  const { userInfo } = useContext(StoreContext);
  const { token } = theme.useToken();
  const account = userInfo;

  const [customer, setCustomer] = useState({});

  const [isEditing, setIsEditing] = useState(false);
  const [editCustomer, setEditCustomer] = useState({});
  const [bookings, setBookings] = useState([
    {
      bookingId: 1001,
      acc_ID: 1,
      doc_ID: 5,
      ds_ID: 301,
      status: "Đã xác nhận",
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
      bookingId: 1002,
      acc_ID: 1,
      doc_ID: 2,
      ds_ID: 302,
      status: "Đang chờ",
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
      tpId: 5001,
      startDate: "2025-04-01",
      endDate: null,
      result: null,
      status: "Đang thực hiện",
      serviceInfo: {
        serId: 3,
        serName: "Thụ tinh trong ống nghiệm (IVF)",
        price: 25000000,
        description: "Quy trình IVF cơ bản",
        file_Path: "",
      },
      latestStep: {
        step_Name: "Chọc hút trứng",
      },
    },
    {
      tpId: 5002,
      startDate: "2025-01-15",
      endDate: "2025-04-01",
      result: "Thành công",
      status: "Đã hoàn thành",
      serviceInfo: {
        serId: 2,
        serName: "Khám hiếm muộn",
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
    await GetCustomerInfo(accountId)
      .then((res) => {
        if (res.data.success) {
          setCustomer(res.data.data);

          setEditCustomer(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("không tìm thấy thông tin khách hàng!");
      });
  };

  const fetchBookings = async () => {
    await BookingHistory(accountId)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // setBookings(res.data);
  };

  const fetchTreatmentPlans = async () => {
    // const res = await axios.get(`/api/treatmentplans/recent/${accountId}`);
    // setTreatmentPlans(res.data);
  };

  const handleSave = async () => {
    console.log(editCustomer);
    const { husName, wifeName, husYob, wifeYob } = editCustomer;
    const payload = {
      husName,
      wifeName,
      husYob: dayjs(husYob).format("YYYY-MM-DD"),
      wifeYob: dayjs(wifeYob).format("YYYY-MM-DD"),
    };
    if (accountId) {
      await updateCustomer(accountId, payload)
        .then((res) => {
          if (res.data.success) {
            message.success(res.data.message);
            fetchProfile();
            setIsEditing(false);
          } else {
            message.error(res.data.message);
          }
        })
        .catch((err) => {
          message.error("Cập nhật thông tin thất bại!");
          console.log(err);
        });
    }
    // await axios.put(`/api/customers/${customer.cus_ID}`, {
    //   ...editCustomer,
    //   husYob: editCustomer.husYob
    //     ? dayjs(editCustomer.husYob).format("YYYY-MM-DD")
    //     : null,
    //   wifeYob: editCustomer.wifeYob
    //     ? dayjs(editCustomer.wifeYob).format("YYYY-MM-DD")
    //     : null,
    // });
    // message.success("Cập nhật thành công!");
    // setIsEditing(false);
    // fetchProfile();
  };

  if (!account && !customer) return <div>Đang tải...</div>;

  return (
    <Layout>
      <Header />
      <div style={{ padding: "40px 0", backgroundColor: token.colorBgPage }}>
        <Title style={{ color: token.colorTextHeading }} level={3}>
          Thông tin cá nhân
        </Title>

        <div
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "center",
          }}
        >
          <img
            src={account?.img || "/anhcuong.jpg"}
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
                color: token.colorText,
                fontWeight: 700,
                fontSize: "32px",
              }}
            >
              {account?.fullName}
            </Title>
            <Space direction="vertical">
              <Text>
                <MailOutlined
                  style={{ marginRight: 8, color: token.colorBgSolid }}
                />
                {account?.mail}
              </Text>
              <Text style={{ display: "flex", alignItems: "center" }}>
                <FiPhoneCall
                  style={{ marginRight: 8, color: token.colorBgSolid }}
                />
                {account?.phone}
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
                value={editCustomer.husName || ""}
                onChange={(e) =>
                  setEditCustomer({ ...editCustomer, husName: e.target.value })
                }
              />
            ) : customer.husName ? (
              customer.husName
            ) : (
              <Text type="secondary">Bạn chưa cập nhật thông tin của bạn</Text>
            )}
            <br />
            <Text strong>Năm sinh:</Text>{" "}
            {isEditing ? (
              <DatePicker
                placeholder="Chọn năm sinh"
                value={editCustomer.husYob ? dayjs(editCustomer.husYob) : null}
                format="DD/MM/YYYY"
                onChange={(date) =>
                  setEditCustomer({ ...editCustomer, husYob: date })
                }
              />
            ) : customer.husYob ? (
              dayjs(customer.husYob).format("DD/MM/YYYY")
            ) : (
              <Text type="secondary">Bạn chưa cập nhật thông tin của bạn</Text>
            )}
          </Col>

          <Col span={12}>
            <Text strong>Tên vợ:</Text>{" "}
            {isEditing ? (
              <Input
                placeholder="Nhập tên vợ"
                value={editCustomer.wifeName || ""}
                onChange={(e) =>
                  setEditCustomer({
                    ...editCustomer,
                    wifeName: e.target.value,
                  })
                }
              />
            ) : customer.wifeName ? (
              customer.wifeName
            ) : (
              <Text type="secondary">Bạn chưa cập nhật thông tin của bạn</Text>
            )}
            <br />
            <Text strong>Năm sinh:</Text>{" "}
            {isEditing ? (
              <DatePicker
                placeholder="Chọn năm sinh"
                value={
                  editCustomer.wifeYob ? dayjs(editCustomer.wifeYob) : null
                }
                format="DD/MM/YYYY"
                onChange={(date) =>
                  setEditCustomer({ ...editCustomer, wifeYob: date })
                }
              />
            ) : customer.wifeYob ? (
              dayjs(customer.wifeYob).format("DD/MM/YYYY")
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
                { title: "Mã booking", dataIndex: "bookingId" },
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
                  dataIndex: "status",
                  render: (text) => <Tag color="blue">{text}</Tag>,
                },
                {
                  title: "",
                  dataIndex: "bookingId",
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
              rowKey="bookingId"
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
                { title: "Mã hồ sơ", dataIndex: "tpId" },
                { title: "Dịch vụ", dataIndex: ["serviceInfo", "serName"] },
                {
                  title: "Giai đoạn hiện tại",
                  dataIndex: "latestStep",
                  render: (step) => step?.step_Name || "Chưa có",
                },
                {
                  title: "Trạng thái",
                  dataIndex: "status",
                  render: (s) => <Tag color="green">{s}</Tag>,
                },
                {
                  title: "",
                  dataIndex: "tpId",
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
              rowKey="tpId"
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
