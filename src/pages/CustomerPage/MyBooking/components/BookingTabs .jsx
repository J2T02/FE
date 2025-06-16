import { Tabs } from "antd";
import { useState } from "react";

const tabItems = [
  { key: "all", label: "Tất cả" },
  { key: "confirmed", label: "Đã xác nhận" },
  { key: "pending", label: "Đang chờ" },
  { key: "completed", label: "Đã khám" },
  { key: "cancelled", label: "Đã hủy" },
];

const BookingTabs = ({ onChangeTab }) => {
  const [activeKey, setActiveKey] = useState("all");

  const handleChange = (key) => {
    setActiveKey(key);
    onChangeTab?.(key);
  };

  return (
    <Tabs activeKey={activeKey} onChange={handleChange} items={tabItems} />
  );
};

export default BookingTabs;
