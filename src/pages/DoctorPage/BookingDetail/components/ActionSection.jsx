// File: components/ActionSection.jsx
import React from "react";
import { Button, Space, Tag } from "antd";
import { CheckOutlined, CloseOutlined, EditOutlined, PrinterOutlined } from "@ant-design/icons";
import { bookingStatuses } from "../../../../data/mockDoctorPageData";

export default function ActionSection({ statusId, onConfirm }) {
  // Get status information
  const getStatusInfo = (statusId) => {
    return bookingStatuses.find(status => status.value === statusId) || 
           { label: 'Không xác định', color: 'default' };
  };

  const statusInfo = getStatusInfo(statusId);
  const renderActionButtons = () => {
    switch (statusId) {
      case 'PENDING':
        return (
          <Space>
            <Button 
              type="primary" 
              icon={<CheckOutlined />}
              onClick={() => onConfirm('CONFIRMED')}
            >
              Xác nhận lịch hẹn
            </Button>
            <Button 
              danger 
              icon={<CloseOutlined />}
              onClick={() => onConfirm('CANCELLED')}
            >
              Từ chối
            </Button>
          </Space>
        );
      case 'CONFIRMED':
        return (
          <Space>
            <Button 
              type="primary" 
              icon={<CheckOutlined />}
              onClick={() => onConfirm('COMPLETED')}
            >
              Hoàn thành khám
            </Button>
            <Button 
              icon={<EditOutlined />}
              onClick={() => onConfirm('RESCHEDULED')}
            >
              Đổi lịch
            </Button>
            <Button 
              danger 
              icon={<CloseOutlined />}
              onClick={() => onConfirm('CANCELLED')}
            >
              Hủy lịch
            </Button>
          </Space>
        );
      case 'COMPLETED':
        return (
          <Space>
            <Button 
              icon={<PrinterOutlined />}
              onClick={() => window.print()}
            >
              In kết quả
            </Button>
            <Button 
              icon={<EditOutlined />}
            >
              Xem chi tiết
            </Button>
          </Space>
        );
      case 'CANCELLED':
      case 'NO_SHOW':
        return (
          <Button 
            type="dashed" 
            disabled
          >
            Không có thao tác
          </Button>
        );
      case 'RESCHEDULED':
        return (
          <Space>
            <Button 
              type="primary" 
              icon={<CheckOutlined />}
              onClick={() => onConfirm('CONFIRMED')}
            >
              Xác nhận lịch mới
            </Button>
            <Button 
              danger 
              icon={<CloseOutlined />}
              onClick={() => onConfirm('CANCELLED')}
            >
              Hủy lịch
            </Button>
          </Space>
        );
      default:
        return (
          <Button type="dashed" disabled>
            Trạng thái không xác định
          </Button>
        );
    }
  };

  return (
    <div style={{ 
      padding: '16px', 
      backgroundColor: '#f5f5f5', 
      borderRadius: '8px',
      marginTop: '16px'
    }}>
      <div style={{ marginBottom: '12px' }}>
        <span style={{ fontWeight: 'bold', marginRight: '8px' }}>Trạng thái hiện tại:</span>
        <Tag color={statusInfo.color}>{statusInfo.label}</Tag>
      </div>
      <div>
        <span style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>Thao tác:</span>
        {renderActionButtons()}
      </div>
    </div>
  );
}
