import Header from "~components/header/Header";
import ServiceBanner from "~components/banner/ServiceBanner";
import CardList from "~components/card/cardlist/CardList";
import Footer from "~components/footer/Footer";
import { Layout, theme } from "antd";

function ServiceDetail() {
  const { token } = theme.useToken();
  return (
    <Layout>
      <Header />
      <ServiceBanner />
      <div style={{ padding: 24, margin: "64px 0" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          <CardList />
          <CardList />
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
          IUI thường được khuyến nghị là phương pháp điều trị đầu tay cho các
          cặp đôi bị vô sinh không rõ nguyên nhân hoặc các vấn đề nhẹ về khả
          năng sinh sản. Quy trình này bao gồm việc căn thời gian cẩn thận với
          chu kỳ tự nhiên của phụ nữ hoặc với các loại thuốc hỗ trợ sinh sản để
          tăng khả năng thụ thai. Phòng khám của chúng tôi sử dụng các kỹ thuật
          rửa tinh trùng tiên tiến để cô đặc tinh trùng khỏe mạnh nhất, sau đó
          được đưa trực tiếp vào tử cung thông qua một ống thông mỏng. Quy trình
          này bỏ qua các rào cản cổ tử cung tiềm ẩn và đưa tinh trùng đến gần
          ống dẫn trứng hơn, nơi diễn ra quá trình thụ tinh.
        </p>
      </div>
      <Footer />
    </Layout>
  );
}

export default ServiceDetail;
