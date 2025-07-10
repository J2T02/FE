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
import ProcessSection from "../../components/ProcessSection/ProcessSection";
import ConsultBanner from "../../components/banner/ConsultBanner";
import Service from "../../components/service/Service";
import DoctorCarousel from "../../components/slideder/DoctorCarousel";
import PatientFeedbackCarousel from "../../components/slideder/PatientFeedbackCarousel/PatientFeedbackCarousel";
import { useNavigate } from "react-router-dom";
//

//
function HomePage() {
  const { token } = theme.useToken();
  const { doctorList, serviceList, blogList } = useBooking();
  const navigate = useNavigate();
  return (
    <Layout>
      <Header />
      <Banner />
      <WhyUs />
      <ProcessSection />
      <ConsultBanner />
      <Service services={serviceList} />
      <DoctorCarousel doctors={doctorList} />
      <PatientFeedbackCarousel />
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
                  <BlogCard
                    blog={blog}
                    onClick={() => navigate(`/blog/${blog.id}`)}
                  />
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
