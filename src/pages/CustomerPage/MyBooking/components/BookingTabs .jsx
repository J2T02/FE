import { Tabs } from "antd";

const tabItems = [
  { key: "all", label: "Tất cả" },
  { key: "chờ xác nhận", label: "Chờ xác nhận" },
  { key: "đã xác nhận", label: "Đã xác nhận" },
  { key: "hoàn thành", label: "Hoàn thành" },
  { key: "đã hủy", label: "Đã hủy" },
];

const BookingTabs = ({ onChangeTab }) => {
  return (
    <Tabs
      defaultActiveKey="all"
      onChange={onChangeTab}
      items={tabItems.map((tab) => ({
        key: tab.key,
        label: tab.label,
      }))}
      style={{ marginBottom: 16 }}
    />
  );
};

export default BookingTabs;
