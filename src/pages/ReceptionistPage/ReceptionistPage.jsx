import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Select,
  Button,
  Card,
  Space,
  Modal,
  Typography,
  Tag,
  DatePicker,
  Row,
  Col,
  theme,
  Spin,
  message, // Import message for notifications
} from "antd";
import {
  SearchOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

// Import các hàm API từ file mới
import {
  fetchAllBookingsApi,
  updateBookingStatusApi,
} from "/src/apis/bookingService";

const { Option } = Select;
const { Title, Text } = Typography;
const { useToken } = theme;

// Hàm để xác định Ca hẹn từ khung giờ (giữ nguyên ở đây nếu bạn muốn nó là logic UI)
const getShiftFromSlotTime = (slotTime) => {
  if (!slotTime) return "N/A";
  const [startTimeStr] = slotTime.split(" - ");
  const [hours, minutes] = startTimeStr.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;

  if (totalMinutes >= 420 && totalMinutes < 720) {
    return "Ca sáng";
  } else if (totalMinutes >= 780 && totalMinutes < 1080) {
    return "Ca chiều";
  }
  return "Không xác định";
};

// Map status IDs to names and colors
const bookingStatusMap = {
  1: { name: "Đã xác nhận", color: "blue" },
  3: { name: "Đã Check-out", color: "gray" },
  4: { name: "Đã hủy", color: "red" },
  5: { name: "Đang khám", color: "green" }, // New status for 'Đang khám'
};

const BookingManagement = () => {
  const { token } = useToken();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("1"); // Default to 'Đã xác nhận' (ID 1)
  const [dateFilter, setDateFilter] = useState(dayjs()); // Default to today
  const [allBookings, setAllBookings] = useState([]); // Store all bookings fetched from API
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [checkinNote, setCheckinNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for modal submit
  const [isLoadingTable, setIsLoadingTable] = useState(true); // Loading state for the table

  // Load all bookings on component mount
  useEffect(() => {
    const loadBookings = async () => {
      setIsLoadingTable(true); // Show loading spinner for table
      try {
        const data = await fetchAllBookingsApi();
        setAllBookings(data);
        // After loading, apply initial filters
        filterBookings(data, searchText, statusFilter, dateFilter);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        message.error("Không thể tải dữ liệu lịch hẹn.");
      } finally {
        setIsLoadingTable(false); // Hide loading spinner
      }
    };
    loadBookings();
  }, []); // Empty dependency array means this runs once on mount

  // Re-filter when search/filter states change or when allBookings updates
  useEffect(() => {
    filterBookings(allBookings, searchText, statusFilter, dateFilter);
  }, [searchText, statusFilter, dateFilter, allBookings]);

  const filterBookings = (
    bookingsToFilter,
    currentSearchText,
    currentStatusFilter,
    currentDateFilter
  ) => {
    let tempBookings = [...bookingsToFilter];

    // Search by customer name or phone
    if (currentSearchText) {
      tempBookings = tempBookings.filter(
        (booking) =>
          booking.fullName
            .toLowerCase()
            .includes(currentSearchText.toLowerCase()) ||
          booking.phone.includes(currentSearchText)
      );
    }

    // Filter by status
    if (currentStatusFilter !== "all") {
      tempBookings = tempBookings.filter(
        (booking) => String(booking.status) === currentStatusFilter
      );
    }

    // Filter by work date
    if (currentDateFilter) {
      const selectedDate = currentDateFilter.format("YYYY-MM-DD");
      tempBookings = tempBookings.filter(
        (booking) => booking.workDate === selectedDate
      );
    }

    setFilteredBookings(tempBookings);
  };

  const showCheckinModal = (booking) => {
    setSelectedBooking(booking);
    setCheckinNote(""); // Reset note
    setIsModalVisible(true);
  };

  const handleCheckinSubmit = async () => {
    if (!selectedBooking) return;

    setIsSubmitting(true);
    try {
      const payload = {
        bookingId: selectedBooking.bookingId,
        newStatus: 5, // Change status to 'Đang khám' (ID 5)
        note: checkinNote,
        // Add other necessary data to payload based on your API requirements
      };
      console.log("Submitting payload:", payload);

      const response = await updateBookingStatusApi(
        payload.bookingId,
        payload.newStatus,
        payload.note
      );

      if (response.success) {
        // Assuming your API returns { success: true } or similar
        // After successful API call, re-fetch all data to ensure consistency
        const updatedAllBookings = await fetchAllBookingsApi();
        setAllBookings(updatedAllBookings); // Update the master list
        message.success(
          "Check-in thành công! Trạng thái đã được cập nhật thành 'Đang khám'."
        );
        setIsModalVisible(false);
      } else {
        // Handle API specific errors if any from response
        message.error(response.message || "Có lỗi xảy ra khi Check-in.");
      }
    } catch (error) {
      console.error("Check-in error:", error);
      message.error("Có lỗi xảy ra khi Check-in. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
      setSelectedBooking(null);
      setCheckinNote("");
    }
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
    setSelectedBooking(null);
    setCheckinNote("");
  };

  const columns = [
    {
      title: "Mã lịch hẹn",
      dataIndex: "bookingId",
      key: "bookingId",
    },
    {
      title: "Khách hàng",
      key: "customerInfo",
      render: (_, record) => (
        <>
          <Text strong>{record.fullName}</Text>
          <br />
          <Text type="secondary">{record.phone}</Text>
        </>
      ),
    },
    {
      title: "Bác sĩ",
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "Ngày hẹn",
      dataIndex: "workDate",
      key: "workDate",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Ca hẹn",
      dataIndex: "slotTime",
      key: "shift",
      render: (slotTime) => getShiftFromSlotTime(slotTime),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (statusId) => {
        const statusInfo = bookingStatusMap[statusId];
        return statusInfo ? (
          <Tag color={statusInfo.color}>{statusInfo.name}</Tag>
        ) : (
          <Tag>Không xác định</Tag>
        );
      },
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          {record.status === 1 && ( // Only show Check-in button if status is 'Đã xác nhận' (ID 1)
            <Button
              type="primary"
              onClick={() => showCheckinModal(record)}
              icon={<CheckCircleOutlined />}
              style={{
                backgroundColor: token.colorPrimary,
                borderColor: token.colorPrimary,
                color: "#fff",
              }}
            >
              Check-in
            </Button>
          )}
          {record.status === 5 && ( // If status is 'Đang khám' (ID 5)
            <Button
              onClick={() => {
                Modal.info({
                  title: "Thông tin chi tiết",
                  content: `Lịch hẹn ${record.bookingId} của khách hàng ${record.fullName} đang được khám.`,
                });
              }}
              icon={<InfoCircleOutlined />}
              style={{
                backgroundColor: token.colorSuccess, // Green for 'Đang khám' status
                borderColor: token.colorSuccess,
                color: "#fff",
              }}
            >
              Đang khám
            </Button>
          )}
          {record.status === 3 && ( // For Checked-out bookings
            <Button
              onClick={() => {
                Modal.info({
                  title: "Lịch hẹn đã hoàn tất",
                  content: `Lịch hẹn ${record.bookingId} đã Check-out.`,
                });
              }}
              icon={<CheckCircleOutlined />}
              disabled
            >
              Đã hoàn tất
            </Button>
          )}
          {record.status === 4 && ( // For Cancelled bookings
            <Button
              onClick={() => {
                Modal.info({
                  title: "Lịch hẹn đã hủy",
                  content: `Lịch hẹn ${record.bookingId} đã bị hủy.`,
                });
              }}
              icon={<CloseCircleOutlined />}
              danger
              disabled
            >
              Đã hủy
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // Calculate statistics for the info cards based on allBookings, not just filtered
  const today = dayjs().format("YYYY-MM-DD");

  const todaysExaminingCount = allBookings.filter(
    (b) => b.workDate === today && b.status === 5
  ).length; // Count 'Đang khám'
  const totalBookingsToday = allBookings.filter(
    (b) => b.workDate === today
  ).length;

  return (
    <div style={{ padding: "24px", background: token.colorBgBase }}>
      <Title
        level={3}
        style={{ color: token.colorTextBase, marginBottom: "24px" }}
      >
        Quản lý Lịch hẹn
      </Title>

      <Card
        style={{
          borderRadius: token.borderRadius,
          marginBottom: 24,
          boxShadow: token.boxShadow,
        }}
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={10} lg={12}>
              <Input
                placeholder="Tìm kiếm theo tên hoặc SĐT khách hàng..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{
                  borderRadius: token.borderRadius,
                  borderColor: token.colorPrimary,
                }}
              />
            </Col>
            <Col xs={24} md={7} lg={6}>
              <Select
                value={statusFilter}
                onChange={(value) => setStatusFilter(value)}
                style={{ width: "100%", borderRadius: token.borderRadius }}
                placeholder="Lọc theo trạng thái"
              >
                <Option value="all">Tất cả trạng thái</Option>
                {Object.entries(bookingStatusMap).map(([id, info]) => (
                  <Option key={id} value={id}>
                    {info.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} md={7} lg={6}>
              <DatePicker
                value={dateFilter}
                onChange={(date) => setDateFilter(date)}
                style={{ width: "100%", borderRadius: token.borderRadius }}
                placeholder="Lọc theo ngày hẹn"
                format="DD/MM/YYYY"
              />
            </Col>
          </Row>
        </Space>
      </Card>

      {/* Booking Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: token.borderRadius,
              borderLeft: `4px solid ${token.colorSuccess}`,
              boxShadow: token.boxShadow,
            }}
          >
            <Space
              align="center"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <div>
                <Text type="secondary">Đang khám hôm nay</Text>
                <Title
                  level={4}
                  style={{ margin: 0, color: token.colorTextBase }}
                >
                  {todaysExaminingCount}
                </Title>
              </div>
              <div
                style={{
                  backgroundColor: token.colorSuccess + "1A",
                  padding: "8px",
                  borderRadius: token.borderRadius,
                }}
              >
                <CheckCircleOutlined
                  style={{ fontSize: "24px", color: token.colorSuccess }}
                />
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            bordered={false}
            style={{
              borderRadius: token.borderRadius,
              borderLeft: `4px solid ${token.colorPrimary}`,
              boxShadow: token.boxShadow,
            }}
          >
            <Space
              align="center"
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              <div>
                <Text type="secondary">Tổng số lịch hẹn hôm nay</Text>
                <Title
                  level={4}
                  style={{ margin: 0, color: token.colorTextBase }}
                >
                  {totalBookingsToday}
                </Title>
              </div>
              <div
                style={{
                  backgroundColor: token.colorPrimary + "1A",
                  padding: "8px",
                  borderRadius: token.borderRadius,
                }}
              >
                <CalendarOutlined
                  style={{ fontSize: "24px", color: token.colorPrimary }}
                />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Card
        style={{
          borderRadius: token.borderRadius,
          boxShadow: token.boxShadow,
          overflowX: "auto",
        }}
      >
        <Spin spinning={isLoadingTable} tip="Đang tải dữ liệu...">
          <Table
            columns={columns}
            dataSource={filteredBookings}
            rowKey="bookingId"
            pagination={{ pageSize: 10 }}
            locale={{ emptyText: "Không tìm thấy lịch hẹn nào." }}
          />
        </Spin>
      </Card>

      {/* Check-in Modal */}
      <Modal
        title={
          <span style={{ color: token.colorTextBase, fontWeight: 600 }}>
            Check-in Lịch hẹn
          </span>
        }
        open={isModalVisible}
        onOk={handleCheckinSubmit}
        onCancel={handleCancelModal}
        confirmLoading={isSubmitting}
        footer={[
          <Button
            key="back"
            onClick={handleCancelModal}
            disabled={isSubmitting}
          >
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleCheckinSubmit}
            loading={isSubmitting}
            icon={isSubmitting ? <LoadingOutlined /> : <CheckCircleOutlined />}
            style={{
              backgroundColor: token.colorSuccess,
              borderColor: token.colorSuccess,
              color: "#fff",
            }}
          >
            {isSubmitting ? "Đang xử lý..." : "Hoàn tất Check-in"}
          </Button>,
        ]}
        width={500}
        styles={{
          header: {
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            paddingBottom: "16px",
            marginBottom: "16px",
          },
          content: {
            padding: "24px",
          },
          footer: {
            borderTop: `1px solid ${token.colorBorderSecondary}`,
            paddingTop: "16px",
            marginTop: "16px",
            display: "flex",
            justifyContent: "flex-end",
          },
        }}
      >
        {selectedBooking && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <Row justify="space-between">
              <Col>
                <Text type="secondary">Mã lịch hẹn:</Text>
              </Col>
              <Col>
                <Text strong>{selectedBooking.bookingId}</Text>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <Text type="secondary">Tên khách hàng:</Text>
              </Col>
              <Col>
                <Text strong>{selectedBooking.fullName}</Text>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <Text type="secondary">Số điện thoại:</Text>
              </Col>
              <Col>
                <Text strong>{selectedBooking.phone}</Text>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <Text type="secondary">Bác sĩ:</Text>
              </Col>
              <Col>
                <Text strong>{selectedBooking.doctorName}</Text>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <Text type="secondary">Ngày hẹn:</Text>
              </Col>
              <Col>
                <Text strong>
                  {dayjs(selectedBooking.workDate).format("DD/MM/YYYY")}
                </Text>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <Text type="secondary">Ca hẹn:</Text>
              </Col>
              <Col>
                <Text strong>
                  {getShiftFromSlotTime(selectedBooking.slotTime)}
                </Text>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col>
                <Text type="secondary">Tổng tiền ước tính:</Text>
              </Col>
              <Col>
                <Text strong>{selectedBooking.amount}</Text>
              </Col>
            </Row>
            <div style={{ marginTop: "16px" }}>
              <Text strong style={{ marginBottom: "8px", display: "block" }}>
                Ghi chú thêm
              </Text>
              <Input.TextArea
                rows={2}
                placeholder="Nhập ghi chú..."
                value={checkinNote}
                onChange={(e) => setCheckinNote(e.target.value)}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BookingManagement;
