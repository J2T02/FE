// File: pages/ReceptionistPage/BookingManagement.jsx
import React, { useEffect, useState, useContext } from "react";
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
} from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { GetAllBooking } from "../../../apis/bookingService";
// 👉 Nếu có DoctorStoreContext thì import (nếu không, truyền docId qua prop)
import { DoctorStoreContext } from "../contexts/DoctorStoreProvider";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const BookingManagement = () => {
  const navigate = useNavigate();
  // 👉 Lấy context bác sĩ đăng nhập (nếu dùng context)
  const { doctorInfo } = useContext(DoctorStoreContext); // Nếu không dùng context thì lấy prop
  const today = dayjs();
  const [dateRange, setDateRange] = useState([today, today]);
  const [selectedShift, setSelectedShift] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await GetAllBooking();
        if (res?.data?.success && Array.isArray(res.data.data)) {
          // Lọc booking của đúng bác sĩ đăng nhập
          const doctorBookings = res.data.data.filter(
            (item) =>
              String(item.doc?.docId) === String(doctorInfo?.docId)
          );
          // Map dữ liệu cho Table
          const mapped = doctorBookings.map((item) => ({
            bookingId: item.bookingId,
            workDate: item.schedule?.workDate,
            slotStart: item.slot?.slotStart?.slice(0, 5),
            slotEnd: item.slot?.slotEnd?.slice(0, 5),
            status: item.status?.statusName,
            // Nếu cần field gì thêm thì add vào đây
          }));
          setBookings(mapped);
          setFilteredBookings(mapped);
        } else {
          setBookings([]);
          setFilteredBookings([]);
        }
      } catch (err) {
        setBookings([]);
        setFilteredBookings([]);
      }
    };
    // Chờ doctorInfo.docId có giá trị mới fetch (tránh lỗi khi context chưa load xong)
    if (doctorInfo?.docId) fetchBookings();
  }, [doctorInfo?.docId]);

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
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: "",
      align: "right",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() =>
            navigate(`/doctorpage/bookingdetail/${record.bookingId}`)
          }
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
    if (selectedShift) {
      filtered = filtered.filter((b) => {
        const time = dayjs(b.slotStart, "HH:mm");
        if (selectedShift === "sang") {
          return (
            time.isSameOrAfter(dayjs("08:00", "HH:mm")) &&
            time.isBefore(dayjs("12:00", "HH:mm"))
          );
        } else if (selectedShift === "chieu") {
          return (
            time.isSameOrAfter(dayjs("13:00", "HH:mm")) &&
            time.isBefore(dayjs("17:00", "HH:mm"))
          );
        }
        return true;
      });
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
  }, [dateRange, selectedShift, searchKeyword, bookings]);

  return (
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
                allowClear
                placeholder="Chọn ca làm việc"
                style={{ width: 180 }}
                value={selectedShift}
                onChange={(value) => setSelectedShift(value)}
              >
                <Option value="sang">Ca sáng (08:00 - 12:00)</Option>
                <Option value="chieu">Ca chiều (13:00 - 17:00)</Option>
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
  );
};

export default BookingManagement;
