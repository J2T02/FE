import { Layout, theme, Carousel } from "antd";
import Header from "~components/header/Header";
import Banner from "~components/banner/Banner";
import WhyUs from "~components/whyus/WhyUs";
import CardService from "~components/card/cardservice/CardService";
import CardDoctor from "~components/card/carddoctor/CardDoctor";
import Footer from "~components/footer/Footer";
import SlideListItem from "~components/slideder/SlideListItem";
import BlogCard from "../../components/card/blogCard/BlogCard";
//data doctor
const doctors = [
  {
    name: "TTND.PGS.TS.BSCKII.BSCC HuyNM",
    specialty: "Chuyên IVF",
    description:
      "Nguyên Giám đốc Bệnh viện E,\nNguyên Phó Giám đốc Bệnh viện K,\nPhó Chủ tịch Hội Hiếm Muộn Hà Nội",
    image: "/doctorhuy.jpg",
  },
  {
    name: "BS. Nguyễn Hoài Khánh",
    specialty: "Chuyên Viên Tư Vấn",
    description: "Nguyên bác sĩ BV Bạch Mai\nHơn 20 năm kinh nghiệm",
    image: "/khanhtuyensinh.jpg",
  },
  {
    name: "BS. Trần Thị B",
    specialty: "Chuyên khoa - Nội tiết",
    description: "BS nội tiết giỏi Hà Nội\nCông tác tại BV Nội tiết TW",
    image: "https://via.placeholder.com/300x180?text=Doctor+B",
  },
];
//
//data blog
const blogList = [
  {
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    title: "Bắt đầu với ReactJS javascript",
    content:
      "ReactJS là thư viện front-end được phát triển bởi Facebook. Bài viết này sẽ hướng dẫn bạn cách tạo một ứng dụng đầu tiên với ReactJS thông qua công cụ Vite.",
  },
  {
    image: "/doctorhuy.jpg",
    title: "Ant Design 5 - Những cập nhật quan trọng",
    content:
      "Ant Design version 5 mang đến nhiều cải tiến về hiệu năng, giao diện và khả năng tùy biến. Hãy cùng điểm qua những thay đổi quan trọng trong bản cập nhật này.",
  },
  {
    image: "/khanhtuyensinh.jpg",
    title: "Tối ưu hiệu suất với React Hooks",
    content:
      "Hooks trong React giúp tái sử dụng logic một cách dễ dàng. Bài viết này chia sẻ mẹo sử dụng useMemo, useCallback và useEffect hiệu quả trong dự án thực tế.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
    title: "Hướng dẫn triển khai Blog với Strapi",
    content:
      "Strapi là CMS mã nguồn mở cực mạnh mẽ cho các ứng dụng headless. Hãy xem cách tích hợp Strapi với React và xây dựng hệ thống blog linh hoạt, dễ mở rộng.",
  },
];
//
function HomePage() {
  const { token } = theme.useToken();
  return (
    <Layout>
      <Header />
      <Banner />
      <WhyUs />
      <div
        className="ServiceList"
        style={{
          paddingTop: 64,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
      </div>
      <div
        className="DoctorList"
        style={{
          paddingTop: 64,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: token.colorBgBase,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
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
            ĐỘI NGŨ CHUYÊN GIA Y TẾ
          </h1>
          <p style={{ color: "#4B5563" }}>số 1 thế giới</p>
        </div>
        <div style={{ width: "70%", margin: "60px auto", paddingLeft: "10%" }}>
          <SlideListItem>
            {doctors.map((doctor, index) => (
              <div key={index} style={{ padding: "10px" }}>
                <CardDoctor
                  name={doctor.name}
                  specialty={doctor.specialty}
                  description={doctor.description}
                  image={doctor.image}
                />
              </div>
            ))}
          </SlideListItem>
        </div>
      </div>
      <div
        className="BlogList"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px ",
          flexDirection: "column",
          backgroundColor: token.colorBgBase,
        }}
      >
        <h1
          style={{
            fontWeight: "700",
            fontFamily: token.fontFamily,
            fontSize: 36,
            color: "#111827",
            padding: 15,
            marginBottom: 32,
          }}
        >
          TIN TỨC Y KHOA
        </h1>
        <div
          style={{
            display: "flex",
            gap: 24,
            width: "1200px",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {blogList.map((blog, index) => (
            <div key={index} style={{ width: "270px" }}>
              <BlogCard
                {...blog}
                onClick={() => console.log("Go to detail", index)}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default HomePage;
