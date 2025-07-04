import { Layout, theme, Carousel } from "antd";
import Header from "~components/header/Header";
import Banner from "~components/banner/Banner";
import WhyUs from "~components/whyus/WhyUs";
import CardService from "~components/card/cardservice/CardService";
import CardDoctor from "~components/card/carddoctor/CardDoctor";
import Footer from "~components/footer/Footer";
import SlideListItem from "~components/slideder/SlideListItem";
import BlogCard from "../../components/card/blogCard/BlogCard";
import { useBooking } from "~contexts/BookingContext";
//
function HomePage() {
  const { token } = theme.useToken();
  const { doctorList, serviceList, blogList } = useBooking();
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
          if (index <= 1) {
            return <CardService service={ser} />;
          }
        })}
      </div>
      <div
        className="DoctorList"
        style={{
          paddingTop: 64,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: token.colorBgPage,
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
        </div>
        <div
          style={{
            width: "70%",
            margin: "60px auto",
            backgroundColor: token.colorBgPage,
            cursor: "pointer",
          }}
        >
          <SlideListItem>
            {doctorList?.map((doctor, index) => (
              <div key={index} style={{ padding: "10px" }}>
                <CardDoctor doctor={doctor} />
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
          backgroundColor: token.colorBgPage,
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
            justifyContent: "start",
          }}
        >
          {blogList?.map((blog, index) => {
            if (index <= 3) {
              return (
                <div key={index} style={{ width: "270px" }}>
                  <BlogCard blog={blog} />
                </div>
              );
            }
          })}
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default HomePage;
