import { theme } from "antd";

import Header from "~components/header/Header";

import Footer from "~components/footer/Footer";
import { Layout } from "antd";
import CardService from "~components/card/cardservice/CardService";
import { useBooking } from "~contexts/BookingContext";
function Service() {
  const { token } = theme.useToken();
  const { serviceList } = useBooking();
  return (
    <Layout>
      <Header />
      <div
        style={{
          paddingTop: 64,
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
          Dịch Vụ Điều Trị
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
          Các giải pháp điều trị cá nhân hóa cho từng trường hợp vô sinh – hiếm
          muộn
        </p>
        {serviceList?.map((ser, index) => {
          return <CardService service={ser} />;
        })}
      </div>

      <Footer />
    </Layout>
  );
}

export default Service;
