import React, { useState, useMemo } from "react";
import { Card, Select, Row, Col, Typography, Tag, Divider, Image, Button, Space, Avatar, Badge } from "antd";
import { LeftOutlined, RightOutlined, CalendarOutlined, ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { 
  mockAppointments, 
  doctorWeeklySchedule, 
  dailyTimeline
} from "../../../data/mockScheduleData";

dayjs.extend(isoWeek);

const { Title, Text, Paragraph } = Typography;

const generateWeekStartDates = (year) => {
  const firstMonday = dayjs(`${year}-01-01`).startOf("isoWeek");
  const weeks = [];
  for (let i = 0; i < 52; i++) {
    const start = firstMonday.add(i, "week");
    const end = start.add(6, "day");
    if (start.year() === parseInt(year)) {
      weeks.push({
        label: `Tuần ${start.format("DD/MM")} - ${end.format("DD/MM")}`,
        value: start.format("YYYY-MM-DD"),
      });
    }
  }
  return weeks;
};

const getWeekDates = (startDateStr) => {
  const start = new Date(startDateStr);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
};

const formatDate = (date) => date.toISOString().split("T")[0];
const formatVNDate = (date) =>
  `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;

const ScheduleManagement = () => {
  const currentYear = dayjs().year().toString();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));

  const weekOptions = useMemo(() => generateWeekStartDates(selectedYear), [selectedYear]);

  const currentWeekStart = dayjs().startOf("isoWeek").format("YYYY-MM-DD");
  const defaultWeek =
    weekOptions.find((w) => w.value === currentWeekStart)?.value || weekOptions[0].value;

  const [selectedWeekStart, setSelectedWeekStart] = useState(defaultWeek);

  const weekDates = getWeekDates(selectedWeekStart);
  const todayAppointments = mockAppointments[selectedDate] || [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#52c41a';
      case 'pending': return '#faad14';
      case 'cancelled': return '#ff4d4f';
      default: return '#d9d9d9';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Đã Xác Nhận';
      case 'pending': return 'Chờ Xử Lý';
      case 'cancelled': return 'Đã Hủy';
      default: return 'Không Xác Định';
    }
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Row gutter={24}>
        {/* Left Panel - Weekly Schedule */}
        <Col xs={24} lg={14}>
          <Card
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              marginBottom: 24
            }}
          >
            <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
              <Col>
                <Title level={4} style={{ marginBottom: 0, color: '#1890ff' }}>
                  Lịch Trình Hàng Tuần
                </Title>
              </Col>
              <Col>
                <Space>
                  <Button type="primary" icon={<LeftOutlined />} size="small" />
                  <Text strong>Hôm Nay</Text>
                  <Button type="primary" icon={<RightOutlined />} size="small" />
                </Space>
              </Col>
            </Row>

            {/* Calendar Grid */}
            <div style={{ marginBottom: 24 }}>
              <Row gutter={[8, 8]}>
                {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => (
                  <Col span={3} key={day} style={{ textAlign: 'center' }}>
                    <Text strong style={{ fontSize: '12px', color: '#666' }}>{day}</Text>
                  </Col>
                ))}
              </Row>
              <Row gutter={[8, 8]} style={{ marginTop: 8 }}>
                {weekDates.map((date, index) => {
                  const isoDate = formatDate(date);
                  const shiftList = doctorWeeklySchedule[isoDate] || [];
                  const isSelected = isoDate === selectedDate;
                  const isToday = isoDate === dayjs().format('YYYY-MM-DD');
                  
                  return (
                    <Col span={3} key={isoDate}>
                      <div
                        onClick={() => setSelectedDate(isoDate)}
                        style={{
                          height: '80px',
                          border: isSelected ? '2px solid #1890ff' : '1px solid #f0f0f0',
                          borderRadius: '8px',
                          padding: '8px 4px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          background: isToday ? '#e6f7ff' : isSelected ? '#f0f9ff' : '#fff',
                          transition: 'all 0.3s'
                        }}
                      >
                        <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>
                          {date.getDate()}
                        </div>
                        <div>
                          {shiftList.includes('morning') && (
                            <div style={{ 
                              background: '#1890ff', 
                              color: 'white', 
                              fontSize: '10px', 
                              padding: '2px 4px', 
                              borderRadius: '4px', 
                              marginBottom: '2px' 
                            }}>
                              Ca Sáng
                            </div>
                          )}
                          {shiftList.includes('afternoon') && (
                            <div style={{ 
                              background: '#fa8c16', 
                              color: 'white', 
                              fontSize: '10px', 
                              padding: '2px 4px', 
                              borderRadius: '4px' 
                            }}>
                              Ca Chiều
                            </div>
                          )}
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>

            {/* Daily Timeline */}
            <div>
              <Title level={5} style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
                <ClockCircleOutlined style={{ marginRight: 8 }} />
                Lịch Trình Hàng Ngày cho {dayjs(selectedDate).format('dddd, DD/MM/YYYY')}
              </Title>
              
              {dailyTimeline[selectedDate] ? (
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {dailyTimeline[selectedDate].map((activity, index) => {
                    const getTypeColor = (type) => {
                      switch (type) {
                        case 'appointment': return '#1890ff';
                        case 'procedure': return '#52c41a';
                        case 'meeting': return '#722ed1';
                        case 'break': return '#faad14';
                        case 'administrative': return '#13c2c2';
                        case 'preparation': return '#fa8c16';
                        default: return '#d9d9d9';
                      }
                    };

                    const getTypeIcon = (type) => {
                      switch (type) {
                        case 'appointment': return '👥';
                        case 'procedure': return '🏥';
                        case 'meeting': return '📋';
                        case 'break': return '☕';
                        case 'administrative': return '📄';
                        case 'preparation': return '📝';
                        default: return '📅';
                      }
                    };

                    const getStatusColor = (status) => {
                      switch (status) {
                        case 'completed': return '#52c41a';
                        case 'in_progress': return '#1890ff';
                        case 'scheduled': return '#faad14';
                        default: return '#d9d9d9';
                      }
                    };

                    return (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        padding: '12px',
                        border: '1px solid #f0f0f0',
                        borderRadius: '8px',
                        marginBottom: '8px',
                        background: '#fafafa',
                        borderLeft: `4px solid ${getTypeColor(activity.type)}`,
                        position: 'relative'
                      }}>
                        <div style={{
                          minWidth: '60px',
                          textAlign: 'center',
                          marginRight: '12px'
                        }}>
                          <Text strong style={{ fontSize: '14px', display: 'block' }}>
                            {activity.time}
                          </Text>
                          <Text style={{ fontSize: '10px', color: '#666' }}>
                            {activity.duration}min
                          </Text>
                        </div>
                        
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <span style={{ marginRight: 6, fontSize: '14px' }}>
                                {getTypeIcon(activity.type)}
                              </span>
                              <Text strong style={{ fontSize: '13px', color: getTypeColor(activity.type) }}>
                                {activity.title}
                              </Text>
                            </div>
                            <Badge 
                              color={getStatusColor(activity.status)} 
                              text={activity.status === 'completed' ? 'Hoàn Thành' : activity.status === 'in_progress' ? 'Đang Thực Hiện' : activity.status === 'scheduled' ? 'Đã Lên Lịch' : activity.status}
                              style={{ fontSize: '10px' }}
                            />
                          </div>
                          
                          <Text style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: 4 }}>
                            {activity.description}
                          </Text>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {activity.room && (
                              <Text style={{ fontSize: '11px', color: '#999' }}>
                                📍 {activity.room}
                              </Text>
                            )}
                            {activity.patientId && (
                              <Text style={{ fontSize: '11px', color: '#999' }}>
                                👤 Patient ID: {activity.patientId}
                              </Text>
                            )}
                            <Tag 
                              color={activity.priority === 'high' ? 'red' : activity.priority === 'medium' ? 'orange' : 'default'}
                              style={{ fontSize: '10px', margin: 0 }}
                            >
                              {activity.priority === 'high' ? 'Ưu tiên cao' : activity.priority === 'medium' ? 'Ưu tiên trung bình' : 'Ưu tiên thấp'}
                            </Tag>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                  <ClockCircleOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                  <div>Không có dữ liệu lịch trình cho ngày này</div>
                </div>
              )}
            </div>
          </Card>
        </Col>
        
        {/* Right Panel - Upcoming Appointments */}
        <Col xs={24} lg={10}>
          <Card
            title={(
              <div>
                <Title level={4} style={{ marginBottom: 0 }}>Lịch Hẹn Sắp Tới</Title>
                <Text type="secondary">Ngày {dayjs(selectedDate).format('DD/MM/YYYY')}</Text>
              </div>
            )}
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              marginBottom: 24
            }}
          >
            <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
              {todayAppointments.filter(apt => apt.status !== 'cancelled').map((appointment) => (
                <div key={appointment.id} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  padding: '16px 0',
                  borderBottom: '1px solid #f0f0f0'
                }}>
                  <Avatar src={appointment.avatar} size={45} style={{ marginRight: 12 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <Text strong style={{ fontSize: '14px' }}>
                        {appointment.patient}
                      </Text>
                      <Badge 
                        color={getStatusColor(appointment.status)} 
                        text={getStatusText(appointment.status)}
                        style={{ fontSize: '11px' }}
                      />
                    </div>
                    <div style={{ color: '#1890ff', fontSize: '13px', marginBottom: '6px', fontWeight: '500' }}>
                      {appointment.type}
                    </div>
                    <div style={{ fontSize: '12px', marginBottom: '4px' }}>
                      <ClockCircleOutlined style={{ marginRight: 6, color: '#666' }} />
                      <Text style={{ color: '#666' }}>{appointment.time}</Text>
                      <Text style={{ color: '#999', marginLeft: 8 }}>({appointment.duration})</Text>
                    </div>
                    {appointment.notes && (
                      <div style={{ 
                        fontSize: '11px', 
                        color: '#999',
                        fontStyle: 'italic',
                        marginTop: 4,
                        padding: '4px 8px',
                        background: '#f9f9f9',
                        borderRadius: '4px'
                      }}>
                        {appointment.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {todayAppointments.filter(apt => apt.status !== 'cancelled').length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                  <CalendarOutlined style={{ fontSize: '32px', marginBottom: '12px' }} />
                  <div>Không có lịch hẹn nào hôm nay</div>
                </div>
              )}
            </div>
          </Card>
          

        </Col>
      </Row>
    </div>
  );
};

export default ScheduleManagement;
