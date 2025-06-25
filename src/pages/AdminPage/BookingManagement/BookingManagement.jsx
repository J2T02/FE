import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Typography,
  Space,
  Card,
  Tag,
  message,
  DatePicker,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";

const { Title } = Typography;

const BookingManagement = () => {
  const [bookings, setBookings] = useState([{
    booking_ID: 101,
    acc_ID: 1,
    doc_ID: 1,
    ds_ID: 11,
    status: 0,
    create_At: "2025-06-25T09:00:00",
    note: "Khám lần đầu"
  },
  {
    booking_ID: 102,
    acc_ID: 2,
    doc_ID: 2,
    ds_ID: 12,
    status: 1,
    create_At: "2025-06-25T14:00:00",
    note: "Tái khám"
  },
  {
    booking_ID: 103,
    acc_ID: 3,
    doc_ID: 1,
    ds_ID: 13,
    status: 2,
    create_At: "2025-06-24T10:30:00",
    note: "Check-in sớm"
  },
  {
    booking_ID: 104,
    acc_ID: 4,
    doc_ID: 3,
    ds_ID: 14,
    status: 3,
    create_At: "2025-06-24T16:00:00",
    note: "Khám IVF"
  },
  {
    booking_ID: 105,
    acc_ID: 5,
    doc_ID: 2,
    ds_ID: 15,
    status: 4,
    create_At: "2025-06-23T08:45:00",
    note: "Đã khám"
  },
  {
    booking_ID: 106,
    acc_ID: 6,
    doc_ID: 1,
    ds_ID: 16,
    status: 5,
    create_At: "2025-06-22T15:00:00",
    note: "Bệnh nhân huỷ"
  },
  {
    booking_ID: 107,
    acc_ID: 7,
    doc_ID: 3,
    ds_ID: 17,
    status: 0,
    create_At: "2025-06-21T11:15:00",
    note: "Chờ xác nhận"
  },
  {
    booking_ID: 108,
    acc_ID: 8,
    doc_ID: 1,
    ds_ID: 18,
    status: 1,
    create_At: "2025-06-20T13:30:00",
    note: "Đặt lịch lại"
  },
  {
    booking_ID: 109,
    acc_ID: 9,
    doc_ID: 2,
    ds_ID: 19,
    status: 3,
    create_At: "2025-06-20T17:00:00",
    note: "Đang khám"
  },
  {
    booking_ID: 110,
    acc_ID: 10,
    doc_ID: 1,
    ds_ID: 20,
    status: 4,
    create_At: "2025-06-26T09:45:00",
    note: "Lịch khám cuối kỳ"
  }]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState(dayjs().startOf("day"));
  const [endDate, setEndDate] = useState(dayjs().endOf("day"));

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (error) {
      message.error("Không thể tải danh sách booking");
    } finally {
      setLoading(false);
    }
  };

  const getStatusTag = (status) => {
    const statusMap = {
      0: { text: "Chờ xác nhận", color: "orange" },
      1: { text: "Đã xác nhận", color: "blue" },
      2: { text: "Check-in", color: "cyan" },
      3: { text: "Đang khám", color: "purple" },
      4: { text: "Đã khám", color: "green" },
      5: { text: "Đã huỷ", color: "red" },
    };
    const s = statusMap[status] || { text: "Không xác định", color: "default" };
    return <Tag color={s.color}>{s.text}</Tag>;
  };

  const columns = [
    {
      title: "Mã Booking",
      dataIndex: "booking_ID",
      key: "booking_ID",
      render: (id) => <b>#{id}</b>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Ngày đặt lịch",
      dataIndex: "create_At",
      key: "create_At",
      render: (date) =>
        date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "Không có",
    },
    {
      title: "",
      key: "actions",
      align: "right",
      render: (_, record) => (
        <a href={`/bookings/${record.booking_ID}`} style={{ color: "#1677ff" }}>
          Xem chi tiết
        </a>
      ),
    },
  ];

  const filteredData = bookings.filter((item) => {
    const matchKeyword = item.booking_ID
      .toString()
      .includes(searchKeyword.trim());

    const createDate = dayjs(item.create_At);
    const inRange =
      createDate.isAfter(startDate.subtract(1, "second")) &&
      createDate.isBefore(endDate.add(1, "second"));

    return matchKeyword && inRange;
  });

  return (
    <Card title={<Title level={3}>Danh sách Booking</Title>}>
      <Space style={{ marginBottom: 16 }} wrap>
        <Input
          placeholder="Tìm theo mã booking"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <DatePicker
          value={startDate}
          onChange={(date) => setStartDate(date?.startOf("day"))}
          placeholder="Từ ngày"
          format="DD/MM/YYYY"
        />
        <DatePicker
          value={endDate}
          onChange={(date) => setEndDate(date?.endOf("day"))}
          placeholder="Đến ngày"
          format="DD/MM/YYYY"
        />
      </Space>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="booking_ID"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
};

export default BookingManagement;
