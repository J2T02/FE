import Header from "~components/header/Header";
import ServiceBanner from "~components/banner/ServiceBanner";
import CardList from "~components/card/cardlist/CardList";
import Footer from "~components/footer/Footer";
import { Layout, theme } from "antd";
import { useLocation, useParams } from "react-router-dom";
function ServiceDetail() {
  const { token } = theme.useToken();
  const { id } = useParams();
  const location = useLocation();
  const serviceData = location.state?.serviceData;
  console.log(serviceData);
  return (
    <Layout>
      <Header />
      <ServiceBanner
        title={serviceData?.serName}
        img={serviceData?.filePath || "/IVF.jpg"}
        price={serviceData?.price}
      />
      <div style={{ padding: 24, margin: "64px 0" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 24,
          }}
        >
          <CardList serId={serviceData?.serId} />
        </div>
      </div>
      <div style={{ margin: "0 64px" }}>
        <h1
          style={{
            color: "#111827",
            fontSize: 30,
            marginBottom: 24,
            fontFamily: token.fontFamily,
            fontWeight: 700,
          }}
        >
          Thông Tin Dịch Vụ
        </h1>
        <p
          style={{
            padding: "32px",
            color: "#374151",
            fontSize: 18,
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
          }}
        >
          {serviceData.description}
        </p>
      </div>
      <Footer />
    </Layout>
  );
}

export default ServiceDetail;
