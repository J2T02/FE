import { theme } from "antd";

import Header from "~components/header/Header";

import Footer from "~components/footer/Footer";
import { Layout } from "antd";
import CardService from "~components/card/cardservice/CardService";

function Service() {
  const { token } = theme.useToken();
  return (
    <Layout>
      <Header />
      <div
        style={{
          marginTop: 64,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
        <p style={{ color: "#4B5563" }}>Demo</p>
        <CardService
          image="/IVF.jpg"
          title="IVF - Dịch vụ thụ tinh trong ống nghiệm"
          content="Hành trình làm cha làm mẹ là điều thiêng liêng và quý giá nhất trong cuộc đời mỗi người. Tuy nhiên, với nhiều cặp vợ chồng, con đường này không phải lúc nào cũng suôn sẻ. Tại Vinmec, chúng tôi không tính bằng số ca chuyển phôi hay số ca có thai mà tính bằng số em bé được đón về nhà an toàn lên tới 60%. Vinmec không chỉ ươm mầm hạnh phúc cho hàng nghìn gia đình hiếm muộn có thai, mà còn đồng hành trọn vẹn trong quá trình chăm sóc thai kỳ và đảm bảo em bé khỏe mạnh chào đời. Với mô hình chăm sóc đa chuyên khoa khép kín, kết hợp công nghệ tiên tiến và đội ngũ chuyên gia đầu ngành là lời cam kết mạnh mẽ của Vinmec trong hành trình “đón em bé về nhà”"
        />
        <CardService
          image="/IVF.jpg"
          title="IVF - Dịch vụ thụ tinh trong ống nghiệm"
          content="Hành trình làm cha làm mẹ là điều thiêng liêng và quý giá nhất trong cuộc đời mỗi người. Tuy nhiên, với nhiều cặp vợ chồng, con đường này không phải lúc nào cũng suôn sẻ. Tại Vinmec, chúng tôi không tính bằng số ca chuyển phôi hay số ca có thai mà tính bằng số em bé được đón về nhà an toàn lên tới 60%. Vinmec không chỉ ươm mầm hạnh phúc cho hàng nghìn gia đình hiếm muộn có thai, mà còn đồng hành trọn vẹn trong quá trình chăm sóc thai kỳ và đảm bảo em bé khỏe mạnh chào đời. Với mô hình chăm sóc đa chuyên khoa khép kín, kết hợp công nghệ tiên tiến và đội ngũ chuyên gia đầu ngành là lời cam kết mạnh mẽ của Vinmec trong hành trình “đón em bé về nhà”"
        />
        <CardService
          image="/IVF.jpg"
          title="IVF - Dịch vụ thụ tinh trong ống nghiệm"
          content="Hành trình làm cha làm mẹ là điều thiêng liêng và quý giá nhất trong cuộc đời mỗi người. Tuy nhiên, với nhiều cặp vợ chồng, con đường này không phải lúc nào cũng suôn sẻ. Tại Vinmec, chúng tôi không tính bằng số ca chuyển phôi hay số ca có thai mà tính bằng số em bé được đón về nhà an toàn lên tới 60%. Vinmec không chỉ ươm mầm hạnh phúc cho hàng nghìn gia đình hiếm muộn có thai, mà còn đồng hành trọn vẹn trong quá trình chăm sóc thai kỳ và đảm bảo em bé khỏe mạnh chào đời. Với mô hình chăm sóc đa chuyên khoa khép kín, kết hợp công nghệ tiên tiến và đội ngũ chuyên gia đầu ngành là lời cam kết mạnh mẽ của Vinmec trong hành trình “đón em bé về nhà”"
        />
        <CardService
          image="/IVF.jpg"
          title="IVF - Dịch vụ thụ tinh trong ống nghiệm"
          content="Hành trình làm cha làm mẹ là điều thiêng liêng và quý giá nhất trong cuộc đời mỗi người. Tuy nhiên, với nhiều cặp vợ chồng, con đường này không phải lúc nào cũng suôn sẻ. Tại Vinmec, chúng tôi không tính bằng số ca chuyển phôi hay số ca có thai mà tính bằng số em bé được đón về nhà an toàn lên tới 60%. Vinmec không chỉ ươm mầm hạnh phúc cho hàng nghìn gia đình hiếm muộn có thai, mà còn đồng hành trọn vẹn trong quá trình chăm sóc thai kỳ và đảm bảo em bé khỏe mạnh chào đời. Với mô hình chăm sóc đa chuyên khoa khép kín, kết hợp công nghệ tiên tiến và đội ngũ chuyên gia đầu ngành là lời cam kết mạnh mẽ của Vinmec trong hành trình “đón em bé về nhà”"
        />
      </div>

      <Footer />
    </Layout>
  );
}

export default Service;
