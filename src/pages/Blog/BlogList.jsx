import { theme, Layout, Row, Col } from "antd";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";
import { useBooking } from "~contexts/BookingContext";
import BlogCard from "~components/card/blogCard/BlogCard";
import { useNavigate } from "react-router-dom";
function BlogList() {
  const { token } = theme.useToken();
  const { blogList } = useBooking();
  const navigate = useNavigate();
  return (
    <Layout>
      <Header />
      <div
        style={{
          padding: "64px 0",
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
          Blog
        </h1>

        <div
          style={{
            maxWidth: 1200,
            width: "100%",
            padding: "0 16px",
            marginTop: 32,
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          {blogList?.map((blog) => (
            <div key={blog.id} style={{ width: "270px" }}>
              <BlogCard
                blog={blog}
                onClick={() => navigate(`/blog/${blog.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default BlogList;
