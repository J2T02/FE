import { useMemo, useState } from "react";
import { theme, Layout, Row, Col, Input, Select, Space, Button } from "antd";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";
import { useBooking } from "~contexts/BookingContext";
import CardDoctor from "../../components/card/carddoctor/CardDoctor";

const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

function DoctorList() {
  const { token } = theme.useToken();
  const { doctors } = useBooking();

  const [searchText, setSearchText] = useState("");
  const [selectedStar, setSelectedStar] = useState(null);
  const [selectedEdu, setSelectedEdu] = useState(null);

  // ✅ Hàm reset filter
  const handleResetFilters = () => {
    setSearchText("");
    setSelectedStar(null);
    setSelectedEdu(null);
  };

  // ✅ Lọc theo tên, sao, trình độ
  const filteredDoctors = useMemo(() => {
    return doctors?.filter((doctor) => {
      const matchName = doctor.doctorName
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchStar =
        selectedStar == null ? true : doctor.star === selectedStar;

      const matchEdu =
        selectedEdu == null ? true : doctor.eduId === selectedEdu;

      return matchName && matchStar && matchEdu;
    });
  }, [doctors, searchText, selectedStar, selectedEdu]);

  return (
    <Layout>
      <Header />
      <Content
        style={{
          padding: "64px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: token.colorBgBase,
        }}
      >
        <h1
          style={{
            fontWeight: "700",
            fontFamily: token.fontFamily,
            fontSize: 36,
            color: "#111827",
          }}
        >
          Đội ngũ y khoa
        </h1>
        <p
          style={{
            color: "#4B5563",
            fontSize: 16,
            fontWeight: 700,
            lineHeight: "1.6",
            maxWidth: 600,
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Cam kết đồng hành cùng bạn trên hành trình tìm con
        </p>

        {/* Filter controls */}
        <Space size="middle" style={{ marginBottom: 32 }} wrap>
          <Search
            placeholder="Tìm bác sĩ theo tên"
            allowClear
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 240 }}
          />
          <Select
            placeholder="Lọc theo sao"
            allowClear
            value={selectedStar}
            onChange={(value) => setSelectedStar(value)}
            style={{ width: 160 }}
          >
            {[5, 4, 3, 2, 1].map((star) => (
              <Option key={star} value={star}>
                {`${star} sao`}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Lọc theo trình độ"
            allowClear
            value={selectedEdu}
            onChange={(value) => setSelectedEdu(value)}
            style={{ width: 180 }}
          >
            <Option value={1}>Cử nhân</Option>
            <Option value={2}>Thạc sĩ</Option>
            <Option value={3}>Tiến sĩ</Option>
          </Select>
          <Button ty onClick={handleResetFilters}>
            Reset bộ lọc
          </Button>
        </Space>

        {/* Grid layout */}
        <div
          style={{
            maxWidth: 1200,
            width: "100%",
            padding: "0 16px",
          }}
        >
          <Row gutter={[24, 24]}>
            {filteredDoctors?.length > 0 ? (
              filteredDoctors.map((doc, index) => (
                <Col key={index} xs={24} sm={12} md={8}>
                  <CardDoctor doctor={doc} />
                </Col>
              ))
            ) : (
              <p>Không tìm thấy bác sĩ phù hợp.</p>
            )}
          </Row>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}

export default DoctorList;
