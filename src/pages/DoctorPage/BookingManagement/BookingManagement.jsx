import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Tag,
  Button,
  Input,
  Row,
  Col,
  Space,
  Select,
  DatePicker,
  message,
  Modal,
  Typography,
  Descriptions,
  Avatar,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  CalendarOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  GetAllBooking,
  checkBooking,
  GetAllDoctor,
  updatebookingDoctor,
  updatebookingSchedule,
  GetSchedule,
} from "../../../apis/bookingService";
import { mockBookings, bookingStatuses, serviceTypes } from "../../../data/mockDoctorPageData";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { RangePicker } = DatePicker;
const { Option } = Select;

const BookingManagement = () => {
  const navigate = useNavigate();
  const today = dayjs();
  const [dateRange, setDateRange] = useState([today, today]);
  const [selectedShift, setSelectedShift] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [filteredBookings, setFilteredBookings] = useState([]);

  const slotSchedule = {
    1: { Slot_Start: "08:00", Slot_End: "10:00" },
    2: { Slot_Start: "10:00", Slot_End: "12:00" },
    3: { Slot_Start: "13:00", Slot_End: "15:00" },
    4: { Slot_Start: "15:00", Slot_End: "17:00" },
  };

  const doctorSchedules = {
    101: { WorkDate: "2025-07-05", Slot_ID: 1 },
    102: { WorkDate: "2025-07-06", Slot_ID: 2 },
    103: { WorkDate: "2025-07-07", Slot_ID: 3 },
    104: { WorkDate: today.format("YYYY-MM-DD"), Slot_ID: 4 },
  };

  const statusMap = {
    2: { label: "Đã xác nhận", color: "green" },
    3: { label: "Checkin", color: "blue" },
    4: { label: "Đang khám", color: "orange" },
    5: { label: "Đã khám", color: "gray" },
  };

  const bookings = Array.from({ length: 40 }, (_, index) => {
    const id = index + 1;
    const statusCycle = [2, 3, 4, 5];
    const status = statusCycle[index % 4];
    const DS_ID = 101 + (index % 4);
    return { Booking_ID: id, DS_ID, Status: status };
  });

  const getFilteredData = () => {
    let filtered = bookings.filter((b) => {
      if (searchKeyword.trim() !== "") {
        return b.Booking_ID.toString().includes(searchKeyword.trim());
      }

      if (selectedStatus) {
        return b.Status === parseInt(selectedStatus);
      }

      return [2, 3, 4].includes(b.Status);
    });

    if (dateRange && dateRange[0] && dateRange[1]) {
      const [start, end] = dateRange;
      filtered = filtered.filter((b) => {
        const workDate = dayjs(doctorSchedules[b.DS_ID]?.WorkDate);
        return (
          workDate.isValid() &&
          workDate.isSameOrAfter(start, "day") &&
          workDate.isSameOrBefore(end, "day")
        );
      });
    }

    if (selectedShift) {
      filtered = filtered.filter((b) => {
        const time = dayjs(
          slotSchedule[doctorSchedules[b.DS_ID]?.Slot_ID]?.Slot_Start,
          "HH:mm"
        );
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

    return filtered.map((b) => {
      const schedule = doctorSchedules[b.DS_ID];
      const slot = slotSchedule[schedule.Slot_ID];
      return {
        key: b.Booking_ID,
        Booking_ID: b.Booking_ID,
        WorkDate: schedule.WorkDate,
        TimeRange: `${slot.Slot_Start} - ${slot.Slot_End}`,
        Status: b.Status,
      };
    });
  };

  const columns = [
    {
      title: "Mã Booking",
      dataIndex: "Booking_ID",
      key: "Booking_ID",
      render: (id) => <b>#{id}</b>,
    },
    {
      title: "Ngày hẹn",
      dataIndex: "WorkDate",
      key: "WorkDate",
    },
    {
      title: "Khung giờ",
      dataIndex: "TimeRange",
      key: "TimeRange",
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      key: "Status",
      render: (status) => (
        <Tag color={statusMap[status]?.color}>
          {statusMap[status]?.label}
        </Tag>
      ),
    },
    {
      title: "",
      key: "action",
      align: "right",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() =>
            navigate(`/doctorpage/bookingdetail/${record.Booking_ID}`)
          }
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  useEffect(() => {
    setFilteredBookings(getFilteredData());
  }, [dateRange, selectedShift, searchKeyword, selectedStatus]);

  return (
    <Card>
      <Row style={{ marginBottom: 12 }}>
        <Col span={24}>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 0 }}>
            📋 Quản lý Booking
          </h2>
        </Col>
      </Row>

      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Input
            allowClear
            placeholder="Tìm mã Booking..."
            prefix={<SearchOutlined />}
            style={{ width: 220 }}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
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
              style={{ width: 160 }}
              value={selectedShift}
              onChange={(value) => setSelectedShift(value)}
            >
              <Option value="sang">Ca sáng (08:00 - 12:00)</Option>
              <Option value="chieu">Ca chiều (13:00 - 17:00)</Option>
            </Select>
            <Select
              allowClear
              placeholder="Lọc theo trạng thái"
              style={{ width: 160 }}
              value={selectedStatus}
              onChange={(value) => setSelectedStatus(value)}
            >
              <Option value="2">Đã xác nhận</Option>
              <Option value="3">Checkin</Option>
              <Option value="4">Đang khám</Option>
              <Option value="5">Đã khám</Option>
            </Select>
          </Space>
        </Col>
      </Row>

      <Table
        dataSource={filteredBookings}
        columns={columns}
        pagination={{ pageSize: 8 }}
      />
    </Card>
  );
};

export default BookingManagement;
