import { useState } from "react";
import { Layout } from "antd";
import Header from "./components/header/Header";
import Banner from "./components/banner/Banner";
import WhyUs from "./components/whyus/WhyUs";
import CardService from "./components/card/cardservice/CardService";
import CardDoctor from "./components/card/carddoctor/CardDoctor";
import Footer from "./components/footer/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <Header />
      <Banner />
      <WhyUs />
      <CardService />
      <div style={{ display: "flex" }}>
        <CardDoctor />
        <CardDoctor />
      </div>
      <Footer />
    </Layout>
  );
}

export default App;
