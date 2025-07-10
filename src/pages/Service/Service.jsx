import { theme } from "antd";

import Header from "~components/header/Header";

import Footer from "~components/footer/Footer";
import { Layout } from "antd";
import ServiceList from "../../components/service/Service";
import { useBooking } from "~contexts/BookingContext";
function Service() {
  const { token } = theme.useToken();
  const { serviceList } = useBooking();
  return (
    <Layout>
      <Header />
      <ServiceList services={serviceList} />

      <Footer />
    </Layout>
  );
}

export default Service;
