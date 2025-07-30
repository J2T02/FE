// File: pages/ReceptionistPage/BookingManagement.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Typography,
  Button,
  Row,
  Col,
  DatePicker,
  Select,
  Card,
  Space,
  Input,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { GetAllBooking, checkBooking } from "../../../apis/bookingService";
import BookingDetailPage from "../BookingDetail/BookingDetailPage"; // ✅ THÊM

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const BookingManagement = () => {
  const today = dayjs();
  const [dateRange, setDateRange] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("1"); // Mặc định là "Chờ xác nhận"
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);


    const fetchBookings = async () => {
      try {
        const res = await GetAllBooking();
        if (res?.data?.success && Array.isArray(res.data.data)) {
          const mapped = res.data.data.map((item) => ({
            bookingId: item.bookingId,
            workDate: item.schedule?.workDate || "",
            slotStart: item.slot?.slotStart?.slice(0, 5) || "",
            slotEnd: item.slot?.slotEnd?.slice(0, 5) || "",
            statusId: item.status?.statusId,
            status: item.status?.statusName || "",
          }));
          setBookings(mapped);
        } else {
          setBookings([]);
        }
      } catch (err) {
        setBookings([]);
      }
    };
  useEffect(() => {
    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Đã xác nhận":
        return "green";
      case "Chờ xác nhận":
        return "orange";
      case "Checkin":
        return "blue";
      case "Đang khám":
        return "purple";
      case "Đã khám":
        return "cyan";
      case "Hủy":
        return "red";
      default:
        return "default";
    }
  };

  const handleConfirmBooking = async (bookingId) => {
    await checkBooking(bookingId, 2)
      .then((res) => {
        if (res.data.success) {
          setBookings((prev) =>
            prev.map((b) =>
              b.bookingId === bookingId
                ? { ...b, status: "Đã xác nhận", statusId: 2 }
                : b
            )
          );
          message.success(`Đã xác nhận booking #${bookingId}`);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(`Thất bại xác nhận booking #${bookingId}`);
      });
  };

  const columns = [
    {
      title: "Mã Booking",
      dataIndex: "bookingId",
      render: (id) => <b>#{id}</b>,
    },
    {
      title: "Ngày hẹn",
      dataIndex: "workDate",
    },
    {
      title: "Khung giờ",
      render: (_, record) => `${record.slotStart} - ${record.slotEnd}`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status, record) => (
        <Space>
          <Tag color={getStatusColor(status)}>{status}</Tag>
          {status === "Chờ xác nhận" && (
            <Button
              size="small"
              type="link"
              onClick={() => handleConfirmBooking(record.bookingId)}
            >
              Xác nhận
            </Button>
          )}
        </Space>
      ),
    },
    {
      title: "",
      align: "right",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => setSelectedBookingId(record.bookingId)} // ✅ SỬA
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const handleFilter = () => {
    let filtered = [...bookings];

    if (dateRange && dateRange[0] && dateRange[1]) {
      const [start, end] = dateRange;
      filtered = filtered.filter((b) => {
        const d = dayjs(b.workDate);
        return (
          d.isValid() &&
          d.isSameOrAfter(start, "day") &&
          d.isSameOrBefore(end, "day")
        );
      });
    }

    if (selectedStatus && selectedStatus !== "all") {
      filtered = filtered.filter(
        (b) => b.statusId === parseInt(selectedStatus)
      );
    }

    if (searchKeyword.trim() !== "") {
      filtered = filtered.filter((b) =>
        b.bookingId?.toString().includes(searchKeyword.trim())
      );
    }

    setFilteredBookings(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [dateRange, selectedStatus, searchKeyword, bookings]);

  if (selectedBookingId !== null) {
    return (
      <BookingDetailPage
        bookingId={selectedBookingId}
        onBack={() => {
        setSelectedBookingId(null);
        fetchBookings(); // ✅ GỌI LẠI API để lấy danh sách mới
      }}
      />
    );
  }

  return (
    <div style={{ background: "#fff0f4", minHeight: "100vh", padding: 24 }}>
      <Card
        title={
          <Row justify="space-between" align="middle">
            <Col>
              <Space wrap>
                <Title level={3} style={{ margin: 0 }}>
                  Danh sách lịch hẹn
                </Title>
                <Input
                  allowClear
                  placeholder="Tìm mã Booking..."
                  prefix={<SearchOutlined />}
                  style={{ width: 220 }}
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
              </Space>
            </Col>
            <Col>
              <Space wrap>
                <RangePicker
                  format="YYYY-MM-DD"
                  value={dateRange}
                  onChange={(values) => setDateRange(values)}
                />
                <Select
                  placeholder="Chọn trạng thái"
                  style={{ width: 180 }}
                  value={selectedStatus}
                  onChange={(value) => setSelectedStatus(value)}
                >
                  <Option value="all">Tất cả trạng thái</Option>
                  <Option value="1">Chờ xác nhận</Option>
                  <Option value="2">Đã xác nhận</Option>
                  <Option value="3">Checkin</Option>
                  <Option value="4">Đang khám</Option>
                  <Option value="5">Đã khám</Option>
                  <Option value="6">Đã hủy</Option>
                </Select>
              </Space>
            </Col>
          </Row>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredBookings}
          rowKey="bookingId"
          pagination={{ pageSize: 8 }}
        />
      </Card>
    </div>
  );
};

export default BookingManagement;
