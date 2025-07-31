import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Card,
  Radio,
  Typography,
  Space,
  Button,
  message,
  Row,
  Col,
  Avatar,
  Divider,
  Spin,
  Calendar,
  Alert,
  Modal,
  Tabs,
  Input,
  theme,
} from "antd";
import { PiStudentBold } from "react-icons/pi";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  StarOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import FeedbackSection from "~/components/feedback/FeedbackSection";
import { getFeedbacksByDoctorId } from "~/apis/mockData";
import { GetSchedule } from "../../../apis/bookingService";
import styles from "./DoctorScheduleSelection.module.css";
import { getAllSlotBooking } from "../../../apis/bookingService";
// Constants
const SLOT_CONFIG = {
  sang: {
    start: "07:00:00",
    // end: "12:00:00",
    id: 1,
    label: "Ca sáng (08:00 - 12:00)",
  },
  chieu: {
    start: "13:00:00",
    // end: "17:00:00",
    id: 2,
    label: "Ca chiều (13:00 - 17:00)",
  },
};

const EDUCATION_LEVELS = {
  1: "Cử nhân",
  2: "Thạc sĩ",
  3: "Tiến sĩ",
};

const MESSAGES = {
  PAST_DATE_WARNING: "Không thể chọn ngày trong quá khứ.",
  PAST_DATE_ERROR: "Không thể đặt lịch cho ngày trong quá khứ.",
  SELECT_DATE_SLOT: "Vui lòng chọn ngày và ca khám.",
  NO_SCHEDULE: "Bác sĩ này chưa có lịch khám trong thời gian tới.",
  SCHEDULE_ERROR: "Không thể tải lịch khám của bác sĩ.",
  NO_DOCTORS: "Không có bác sĩ nào khả dụng",
};

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const DoctorScheduleSelection = ({
  data,
  doctors = [],
  onUpdate,
  onNext,
  onPrev,
  disablePrev,
  loading,
  defaultDoctorId,
}) => {
  // Doctor selection states
  const [selectedDoctor, setSelectedDoctor] = useState(
    data?.doctorId || defaultDoctorId || null
  );
  const [selectedDoctorDetail, setSelectedDoctorDetail] = useState(null);
  const { token } = theme.useToken();
  // Schedule states
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotBooking, setSlotBooking] = useState([]);
  const [availableSchedules, setAvailableSchedules] = useState([]);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [scheduleError, setScheduleError] = useState(null);

  // Notes state
  const [notes, setNotes] = useState(data?.notes || "");

  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalDoctor, setModalDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  // Initialize data from props
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await getAllSlotBooking();

        const slots = Array.isArray(res?.data?.data) ? res.data.data : [];
        setSlotBooking(slots);
      } catch (error) {
        console.error("Lỗi khi tải danh sách slot:", error);
        setSlotBooking([]); // fallback để tránh crash nếu slot không có
      }
    };

    fetchSlots();
  }, []);
  useEffect(() => {
    if (data?.date) {
      setSelectedDate(dayjs(data.date));
    }
    if (data?.slot) {
      setSelectedSlot(data.slot);
    }
    if (data?.notes) {
      setNotes(data.notes);
    }
  }, [data]);

  // Update doctor details when selected
  useEffect(() => {
    if (selectedDoctor && doctors.length > 0) {
      const selected = doctors.find((doc) => doc.docId === selectedDoctor);
      if (selected) {
        setSelectedDoctorDetail(selected);
        onUpdate({
          doctorId: selectedDoctor,
          doctorName: selected.accountInfo?.fullName || "Không rõ",
        });
      }
    } else {
      setSelectedDoctorDetail(null);
    }
  }, [selectedDoctor, doctors, onUpdate]);

  // Nếu defaultDoctorId thay đổi (khi mount), set lại selectedDoctor
  useEffect(() => {
    if (defaultDoctorId) {
      setSelectedDoctor(Number(defaultDoctorId));
    }
  }, [defaultDoctorId]);

  // Fetch schedule when doctor is selected with improved error handling
  useEffect(() => {
    let isCancelled = false;

    const fetchSchedule = async () => {
      if (!selectedDoctor) {
        setAvailableSchedules([]);
        setScheduleError(null);
        return;
      }

      setScheduleLoading(true);
      setScheduleError(null);

      try {
        const res = await GetSchedule(selectedDoctor);

        if (isCancelled) return; // Prevent state update if component unmounted

        const schedules = Array.isArray(res?.data?.data) ? res.data.data : [];
        setAvailableSchedules(schedules);
        console.log(schedules);
        if (schedules.length === 0) {
          setScheduleError(MESSAGES.NO_SCHEDULE);
        }
      } catch (error) {
        if (isCancelled) return;

        console.error("Lỗi khi tải lịch khám:", error);
        const errorMessage =
          error?.response?.data?.message || MESSAGES.SCHEDULE_ERROR;
        setScheduleError(errorMessage);
        setAvailableSchedules([]);

        // Show user-friendly error message
        message.error(`Không thể tải lịch khám: ${errorMessage}`);
      } finally {
        if (!isCancelled) {
          setScheduleLoading(false);
        }
      }
    };

    fetchSchedule();

    // Cleanup function to prevent memory leaks
    console.log(slotBooking);
    return () => {
      isCancelled = true;
    };
  }, [selectedDoctor]);

  // Update schedule data when date and slot are selected
  useEffect(() => {
    if (selectedDate && selectedSlot) {
      const dateStr = selectedDate.format("YYYY-MM-DD");

      if (!selectedDoctor) {
        // No doctor selected - use slotBooking thay vì SLOT_CONFIG
        const slotObj = slotBooking.find((s) => s.slotId === selectedSlot);
        if (slotObj) {
          onUpdate({
            date: dateStr,
            slot: slotObj.slotId,
            slotStart: slotObj.slotStart,
            slotEnd: slotObj.slotEnd,
            notes: notes,
          });
        } else {
          // fallback về SLOT_CONFIG nếu không tìm thấy
          const slotConfig = SLOT_CONFIG[selectedSlot];
          if (slotConfig) {
            onUpdate({
              date: dateStr,
              slot: slotConfig.id,
              slotStart: slotConfig.start,
              slotEnd: slotConfig.end,
              notes: notes,
            });
          }
        }
      } else {
        // Doctor selected - use specific schedule
        const selectedSlotInfo = getSlotsForSelectedDate().find(
          (item) => item.slot.slotId === selectedSlot
        );

        if (selectedSlotInfo) {
          onUpdate({
            date: dateStr,
            slot: selectedSlotInfo.slot.slotId,
            slotStart: selectedSlotInfo.slot.slotStart,
            slotEnd: selectedSlotInfo.slot.slotEnd,
            notes: notes,
          });
        }
      }
    }
  }, [
    selectedDate,
    selectedSlot,
    selectedDoctor,
    onUpdate,
    slotBooking,
    notes,
  ]);

  // Memoized functions for better performance
  const getSlotsForSelectedDate = useCallback(() => {
    const dateStr = selectedDate?.format("YYYY-MM-DD");
    return availableSchedules.filter((s) => s.workDate === dateStr);
  }, [selectedDate, availableSchedules]);

  const availableDates = useMemo(() => {
    return availableSchedules.map((s) => s.workDate);
  }, [availableSchedules]);

  const disabledDate = useCallback(
    (current) => {
      // Don't allow past dates
      if (current && current < dayjs().startOf("day")) {
        return true;
      }

      // If doctor is selected, only allow dates with schedule
      if (selectedDoctor) {
        return !availableDates.includes(current.format("YYYY-MM-DD"));
      }

      return false;
    },
    [selectedDoctor, availableDates]
  );

  const selectedDoctorInfo = useMemo(() => {
    if (!selectedDoctor) return null;
    return doctors.find((d) => d.docId === selectedDoctor);
  }, [selectedDoctor, doctors]);

  const getSelectedDoctorName = useCallback(() => {
    return (
      selectedDoctorInfo?.accountInfo?.fullName || `Bác sĩ #${selectedDoctor}`
    );
  }, [selectedDoctorInfo, selectedDoctor]);

  const getEducationLevel = useCallback((eduId) => {
    return EDUCATION_LEVELS[eduId] || "Chưa có";
  }, []);

  // Event handlers with improved error handling
  const handleSkip = useCallback(() => {
    try {
      // Kiểm tra xem đã chọn ngày và khung giờ chưa
      if (!selectedDate || !selectedSlot) {
        return message.warning(
          "Vui lòng chọn ngày và ca khám trước khi bỏ qua chọn bác sĩ."
        );
      }

      if (selectedDate && selectedDate < dayjs().startOf("day")) {
        return message.error(MESSAGES.PAST_DATE_ERROR);
      }

      // Xóa thông tin bác sĩ nhưng giữ nguyên thông tin ngày và khung giờ
      onUpdate({
        doctorId: null,
        doctorName: null,
        // Giữ nguyên thông tin ngày và khung giờ đã chọn
        date: selectedDate.format("YYYY-MM-DD"),
        slot: selectedSlot,
        slotStart: SLOT_CONFIG[selectedSlot]?.start,
        slotEnd: SLOT_CONFIG[selectedSlot]?.end,
        notes: notes,
      });

      setSelectedDoctorDetail(null);
      setSelectedDoctor(null);

      message.success(
        "Đã bỏ qua chọn bác sĩ. Bạn có thể tiếp tục với lịch hẹn."
      );
      onNext();
    } catch (error) {
      console.error("Error in handleSkip:", error);
      message.error("Có lỗi xảy ra khi bỏ qua chọn bác sĩ.");
    }
  }, [onUpdate, onNext, selectedDate, selectedSlot, notes]);

  const handleDoctorSelect = useCallback(
    (doctorId) => {
      try {
        if (selectedDoctor === doctorId) {
          setSelectedDoctor(null);
          setSelectedDoctorDetail(null);
          onUpdate({ doctorId: null, doctorName: null });
        } else {
          setSelectedDoctor(doctorId);
          // Reset schedule selection when doctor changes
          setSelectedDate(null);
          setSelectedSlot(null);
        }
      } catch (error) {
        console.error("Error in handleDoctorSelect:", error);
        message.error("Có lỗi xảy ra khi chọn bác sĩ.");
      }
    },
    [selectedDoctor, onUpdate]
  );

  const showDoctorModal = useCallback(
    (doctorId, e) => {
      try {
        e?.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
        const doctor = doctors.find((doc) => doc.docId === doctorId);
        if (!doctor) {
          message.warning("Không tìm thấy thông tin bác sĩ.");
          return;
        }
        setModalDoctor(doctor);
        setActiveTab("info"); // Luôn mở tab thông tin đầu tiên
        setIsModalVisible(true);
      } catch (error) {
        console.error("Error in showDoctorModal:", error);
        message.error("Có lỗi xảy ra khi hiển thị thông tin bác sĩ.");
      }
    },
    [doctors]
  );

  const handleModalClose = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleTabChange = useCallback((key) => {
    setActiveTab(key);
  }, []);

  const handleDateSelect = useCallback((date) => {
    try {
      if (date && date < dayjs().startOf("day")) {
        message.warning(MESSAGES.PAST_DATE_WARNING);
        return;
      }

      setSelectedDate(date);
      setSelectedSlot(null);
    } catch (error) {
      console.error("Error in handleDateSelect:", error);
      message.error("Có lỗi xảy ra khi chọn ngày.");
    }
  }, []);

  const handleSlotSelect = useCallback((slot) => {
    try {
      setSelectedSlot(slot);
    } catch (error) {
      console.error("Error in handleSlotSelect:", error);
      message.error("Có lỗi xảy ra khi chọn ca khám.");
    }
  }, []);

  const handleNext = useCallback(() => {
    try {
      if (!selectedDate || !selectedSlot) {
        return message.warning(MESSAGES.SELECT_DATE_SLOT);
      }

      if (selectedDate && selectedDate < dayjs().startOf("day")) {
        return message.error(MESSAGES.PAST_DATE_ERROR);
      }

      // Cho phép tiếp tục mà không cần chọn bác sĩ
      // Nếu có chọn bác sĩ thì sẽ update thông tin bác sĩ
      // Nếu không chọn bác sĩ thì vẫn có thể tiếp tục với ngày và khung giờ đã chọn
      onNext();
    } catch (error) {
      console.error("Error in handleNext:", error);
      message.error("Có lỗi xảy ra khi tiếp tục.");
    }
  }, [selectedDate, selectedSlot, onNext]);

  const handleNotesChange = useCallback((e) => {
    setNotes(e.target.value);
  }, []);

  const handleDoctorSelectFromModal = useCallback(() => {
    try {
      if (modalDoctor?.docId) {
        handleDoctorSelect(modalDoctor.docId);
        handleModalClose();
      }
    } catch (error) {
      console.error("Error in handleDoctorSelectFromModal:", error);
      message.error("Có lỗi xảy ra khi chọn bác sĩ từ modal.");
    }
  }, [modalDoctor, handleDoctorSelect, handleModalClose]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <Spin size="large" tip="Đang tải danh sách bác sĩ..." />
      </div>
    );
  }
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto" }}>
      <div
        style={{
          backgroundColor: "#f6ffed",
          border: "1px solid #b7eb8f",
          padding: 16,
          borderRadius: 8,
          marginBottom: 24,
        }}
      >
        <Title level={4} style={{ color: "#52c41a", marginBottom: 8 }}>
          🩺 Đặt lịch khám tư vấn chuyên sâu
        </Title>
        <Paragraph style={{ marginBottom: 0 }}>
          Chào mừng bạn đến với bước đầu tiên trong hành trình chăm sóc sức khỏe! Đây là <strong>lịch hẹn tư vấn ban đầu</strong>, giúp bác sĩ chẩn đoán chính xác và đưa ra phương án điều trị phù hợp nhất với tình trạng của bạn.
          <br />
          👉 Giá mỗi lượt tư vấn:{" "}
          <Text strong style={{ fontSize: 40, color: "#fa541c" }}>
            200.000 VNĐ
          </Text>
          <br />
          📅 Vui lòng chọn <strong>bác sĩ</strong> và <strong>thời gian khám</strong> phù hợp bên dưới để hoàn tất đặt lịch.
        </Paragraph>
      </div>
      <Modal
        title={modalDoctor?.accountInfo?.fullName || "Thông tin bác sĩ"}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button type="primary" key="close" onClick={handleModalClose}>
            Đóng
          </Button>,
          <Button
            key="select"
            type="primary"
            onClick={() => {
              handleDoctorSelect(modalDoctor?.docId);
              handleModalClose();
            }}
          >
            Chọn bác sĩ này
          </Button>,
        ]}
        width={700}
      >
        {modalDoctor && (
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            items={[
              {
                key: "info",
                label: (
                  <span>
                    <InfoCircleOutlined /> Thông tin
                  </span>
                ),
                children: (
                  <div>
                    <div style={{ textAlign: "center", marginBottom: 16 }}>
                      <Avatar
                        src={modalDoctor?.img || null}
                        size={200}
                        icon={!modalDoctor.img && <UserOutlined />}
                        style={{ marginBottom: 12 }}
                      />
                      <Title level={4}>
                        {modalDoctor.accountInfo?.fullName || "Chưa có tên"}
                      </Title>
                      <Text type="secondary">
                        {modalDoctor.gender === 1 ? "Nam" : "Nữ"} •{" "}
                        {modalDoctor.experience} năm kinh nghiệm
                      </Text>
                    </div>

                    <Divider />

                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ width: "100%" }}
                    >
                      <div>
                        <Text strong>Thông tin cá nhân:</Text>
                        <Paragraph style={{ marginTop: 8 }}>
                          <CalendarOutlined
                            style={{ marginRight: 8, color: "#1890ff" }}
                          />
                          <Text>Năm sinh: {modalDoctor.yob}</Text>
                        </Paragraph>
                      </div>

                      <div>
                        <Text strong>Thông tin liên hệ:</Text>
                        <Paragraph style={{ marginTop: 8 }}>
                          <MailOutlined
                            style={{ marginRight: 8, color: "#1890ff" }}
                          />
                          <Text>
                            Email: {modalDoctor.accountInfo?.mail || "Chưa có"}
                          </Text>
                          <br />
                          <PhoneOutlined
                            style={{ marginRight: 8, color: "#1890ff" }}
                          />
                          <Text>
                            Số điện thoại:{" "}
                            {modalDoctor.accountInfo?.phone || "Chưa có"}
                          </Text>
                        </Paragraph>
                      </div>

                      <div>
                        <Text strong>Chuyên môn:</Text>
                        <Paragraph style={{ marginTop: 8 }}>
                          <StarOutlined
                            style={{ marginRight: 8, color: "#1890ff" }}
                          />
                          <Text>Kinh nghiệm: {modalDoctor.experience} năm</Text>
                          <br />
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <PiStudentBold
                              style={{
                                marginRight: 8,
                                color: "#1890ff",
                                fontSize: 18,
                              }}
                            />
                            <Text>
                              Trình độ:{modalDoctor?.eduInfo?.eduName}
                            </Text>
                          </div>
                        </Paragraph>
                      </div>

                      {modalDoctor.filePathEdu && (
                        <div>
                          <Text strong>Chứng chỉ:</Text>
                          <Paragraph style={{ marginTop: 8 }}>
                            <a
                              href={modalDoctor.filePathEdu}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Xem chứng chỉ
                            </a>
                          </Paragraph>
                        </div>
                      )}
                    </Space>
                  </div>
                ),
              },
              {
                key: "feedback",
                label: (
                  <span>
                    <CommentOutlined /> Phản hồi
                  </span>
                ),
                children: (
                  <div>
                    <Text strong>Phản hồi từ bệnh nhân:</Text>
                    <FeedbackSection
                      // feedbacks={getFeedbacksByDoctorId(modalDoctor.docId)}
                      docId={modalDoctor?.docId}
                    />
                  </div>
                ),
              },
            ]}
          />
        )}
      </Modal>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={3}>Chọn bác sĩ và lịch khám</Title>
        </div>

        <Row gutter={24}>
          {/* Left side - Doctor Selection */}
          <Col span={12}>
            <Card
              title="Chọn bác sĩ"
              style={{ height: 700, overflowY: "auto" }}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <Alert
                  message="Thông tin"
                  description="Bạn có thể chọn bác sĩ cụ thể hoặc bỏ qua để đặt lịch với bất kỳ bác sĩ nào có sẵn trong khung giờ đã chọn."
                  type="info"
                  showIcon
                  style={{ marginBottom: 16 }}
                />

                {doctors.length === 0 ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#999",
                    }}
                  >
                    <UserOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                    <Text>Không có bác sĩ nào khả dụng</Text>
                  </div>
                ) : (
                  <Radio.Group
                    onChange={(e) => handleDoctorSelect(e.target.value)}
                    value={selectedDoctor}
                    style={{ width: "100%" }}
                  >
                    <Space direction="vertical" style={{ width: "100%" }}>
                      {doctors.map((doc) => (
                        <Card
                          key={doc.docId}
                          size="small"
                          style={{
                            cursor: "pointer",
                            border:
                              selectedDoctor === doc.docId
                                ? "2px solid #1890ff"
                                : "1px solid #d9d9d9",
                            marginBottom: 8,
                          }}
                          onClick={() => handleDoctorSelect(doc.docId)}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                flex: 1,
                              }}
                            >
                              <Avatar
                                size={40}
                                icon={<UserOutlined />}
                                style={{ marginRight: 12 }}
                              />
                              <div>
                                <Text strong>
                                  {doc.accountInfo?.fullName || "Chưa có tên"}
                                </Text>
                                <br />
                                <Text type="secondary">
                                  {doc.gender === 1 ? "Nam" : "Nữ"} •{" "}
                                  {doc.experience} năm kinh nghiệm
                                </Text>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              <Button
                                type="primary"
                                ghost
                                icon={<InfoCircleOutlined />}
                                size="small"
                                onClick={(e) => showDoctorModal(doc.docId, e)}
                                title="Xem thông tin"
                                className={styles.infoButton}
                                style={{
                                  borderColor: "#1890ff",
                                  color: "#1890ff",
                                  borderRadius: "6px",
                                  fontWeight: 500,
                                  transition: "all 0.3s ease",
                                  boxShadow:
                                    "0 2px 4px rgba(24, 144, 255, 0.2)",
                                }}
                              />
                              <Radio
                                value={doc.docId}
                                style={{ marginLeft: 8 }}
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </Space>
                  </Radio.Group>
                )}
              </Space>
            </Card>
          </Col>

          {/* Right side - Schedule Selection */}
          <Col span={12}>
            <Card
              title="Chọn lịch khám"
              style={{ height: 700, overflowY: "auto" }}
            >
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                <div>
                  <Title level={5}>
                    <CalendarOutlined style={{ marginRight: 8 }} />
                    Chọn ngày khám
                  </Title>
                  {selectedDoctor && (
                    <Text type="secondary">
                      Đang xem lịch của:{" "}
                      <Text strong>{getSelectedDoctorName()}</Text>
                    </Text>
                  )}
                  <div style={{ marginTop: 8 }}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      ⚠️ Không thể đặt lịch cho ngày trong quá khứ
                    </Text>
                  </div>
                </div>

                <Calendar
                  fullscreen={false}
                  value={selectedDate || dayjs()}
                  onSelect={handleDateSelect}
                  disabledDate={disabledDate}
                />

                <Card title="Khung giờ" size="small" style={{ marginTop: 16 }}>
                  {scheduleLoading ? (
                    <div style={{ textAlign: "center", padding: "20px" }}>
                      <Spin size="small" tip="Đang tải..." />
                    </div>
                  ) : scheduleError ? (
                    <Alert
                      message="Lỗi"
                      description={scheduleError}
                      type="warning"
                      showIcon
                      size="small"
                    />
                  ) : selectedDate ? (
                    <div>
                      <Text
                        style={{
                          display: "block",
                          marginBottom: 12,
                          fontSize: 12,
                        }}
                      >
                        Ngày:{" "}
                        <Text strong>{selectedDate.format("DD/MM/YYYY")}</Text>
                      </Text>

                      <Radio.Group
                        onChange={(e) => handleSlotSelect(e.target.value)}
                        value={selectedSlot}
                        style={{ width: "100%" }}
                      >
                        <Row gutter={[12, 12]}>
                          {selectedDoctor
                            ? getSlotsForSelectedDate().map((item) => (
                                <Col
                                  xs={24}
                                  sm={12}
                                  md={8}
                                  lg={6}
                                  key={item.dsId}
                                >
                                  <Radio.Button
                                    value={item.slot.slotId}
                                    style={{
                                      width: "100%",
                                      textAlign: "center",
                                      height: "auto",
                                      padding: "8px 6px",
                                      borderRadius: "6px",
                                    }}
                                  >
                                    <div>
                                      <ClockCircleOutlined
                                        style={{
                                          marginRight: 4,
                                          color: "#1890ff",
                                          fontSize: "12px",
                                        }}
                                      />
                                      <Text strong style={{ fontSize: "13px" }}>
                                        {item.slot.slotStart}
                                      </Text>
                                      <br />
                                      <Text
                                        type="secondary"
                                        style={{ fontSize: 10 }}
                                      >
                                        Ca{" "}
                                        {item.slot.slotId === 1
                                          ? "sáng"
                                          : "chiều"}
                                      </Text>
                                      <br />
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          color: "#52c41a",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        200K
                                      </Text>
                                    </div>
                                  </Radio.Button>
                                </Col>
                              ))
                            : [
                                <Row gutter={[16, 16]}>
                                  {slotBooking.map((slot) => (
                                    <Col
                                      xs={24}
                                      sm={12}
                                      md={8}
                                      lg={6}
                                      key={slot.slotId}
                                    >
                                      <Radio.Button
                                        value={slot.slotId}
                                        style={{
                                          width: "100%",
                                          textAlign: "center",
                                          height: "auto",
                                          padding: "8px 6px",
                                          borderRadius: "6px",
                                        }}
                                      >
                                        <div>
                                          <ClockCircleOutlined
                                            style={{
                                              marginRight: 4,
                                              color: "#1890ff",
                                              fontSize: "12px",
                                            }}
                                          />
                                          <Text
                                            strong
                                            style={{ fontSize: "13px" }}
                                          >
                                            {slot.slotStart.slice(0, 5)}{" "}
                                            {/* ví dụ: 07:00 */}
                                          </Text>
                                          <br />
                                          <Text
                                            type="secondary"
                                            style={{ fontSize: 10 }}
                                          >
                                            {slot.slotId === 1
                                              ? "Ca sáng"
                                              : slot.slotId === 2
                                              ? "Ca chiều"
                                              : "Ca khác"}
                                          </Text>
                                          <br />
                                          <Text
                                            style={{
                                              fontSize: 12,
                                              color: "#52c41a",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            200K
                                          </Text>
                                        </div>
                                      </Radio.Button>
                                    </Col>
                                  ))}
                                </Row>,
                              ]}
                        </Row>
                      </Radio.Group>
                    </div>
                  ) : (
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Vui lòng chọn ngày khám trước
                    </Text>
                  )}
                </Card>

                {/* Ghi chú section */}
                <Card title="Ghi chú" size="small" style={{ marginTop: 16 }}>
                  <TextArea
                    rows={3}
                    value={notes}
                    onChange={handleNotesChange}
                    placeholder="Nhập ghi chú cho lịch hẹn (nếu có)..."
                    style={{ resize: "none" }}
                  />
                  <Text
                    type="secondary"
                    style={{ fontSize: 12, marginTop: 8, display: "block" }}
                  >
                    Ghi chú sẽ được gửi đến bác sĩ để hiểu rõ hơn về tình trạng
                    của bạn
                  </Text>
                </Card>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Navigation buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 24,
          }}
        >
          <Button
            onClick={onPrev}
            disabled={disablePrev}
            style={{ color: token.colorPrimary }}
            size="large"
          >
            Quay lại
          </Button>

          <div style={{ display: "flex", gap: 12 }}>
            {selectedDate && selectedSlot && (
              <Button
                onClick={handleSkip}
                size="large"
                style={{
                  borderColor: "#faad14",
                  color: "#faad14",
                }}
              >
                Bỏ qua chọn bác sĩ
              </Button>
            )}
            <Button type="primary" onClick={handleNext} size="large">
              Tiếp tục
            </Button>
          </div>
        </div>
      </Space>
    </div>
  );
};

export default DoctorScheduleSelection;
