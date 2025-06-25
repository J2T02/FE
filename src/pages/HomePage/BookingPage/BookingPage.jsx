import { theme, Layout, Row, Col } from "antd";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";
function BookingPage() {
  const { token } = theme.useToken();
  return (
    <Layout>
      <Header />
      <div
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
          Booking
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
        ></div>
      </div>
      <Footer />
    </Layout>
  );
}

export default BookingPage;
