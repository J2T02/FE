import { Select, Input, Row, Col } from "antd";

const { Search } = Input;

const timeOptions = [
  { label: "Tất cả", value: "all" },
  { label: "Tháng trước", value: "1m" },
  { label: "3 tháng trước", value: "3m" },
  { label: "6 tháng trước", value: "6m" },
  { label: "1 năm trước", value: "1y" },
];

const BookingFilter = ({ onFilterChange }) => {
  const handleChange = (field, value) => {
    onFilterChange?.((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Row gutter={16} style={{ marginBottom: 16 }}>
      <Col xs={24} md={12}>
        <Search
          allowClear
          placeholder="Tìm kiếm..."
          onSearch={(value) => handleChange("keyword", value)}
          onChange={(e) => handleChange("keyword", e.target.value)}
        />
      </Col>
      <Col xs={24} md={12}>
        <Select
          style={{ width: "100%" }}
          options={timeOptions}
          defaultValue="all"
          onChange={(value) => handleChange("timeRange", value)}
        />
      </Col>
    </Row>
  );
};

export default BookingFilter;
