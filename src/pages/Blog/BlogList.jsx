import { theme, Layout, Row, Col } from "antd";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";
import { useBooking } from "~contexts/BookingContext";
import BlogCard from "~components/card/blogCard/BlogCard";
function BlogList() {
  const { token } = theme.useToken();
  const { doctors } = useBooking;
  return (
    <Layout>
      <Header />
      <div
        style={{
          padding: "64px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: token.colorBgPage,
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
          Blog
        </h1>
        <p style={{ color: "#4B5563" }}>Demo</p>

        {/* Grid layout */}
        <div
          style={{
            maxWidth: 1200,
            width: "100%",
            padding: "0 16px",
            marginTop: 32,
          }}
        >
          {/* <Row gutter={[24, 24]}>
            {doctors?.map((doc, index) => (
              <Col key={index} xs={24} sm={12} md={8}>
                <CardDoctor doctor={doc} />
              </Col>
            ))}
          </Row> */}
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default BlogList;
