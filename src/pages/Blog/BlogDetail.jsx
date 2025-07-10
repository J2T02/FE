import { useParams, useNavigate } from "react-router-dom";
import { useBooking } from "~contexts/BookingContext";
import { Layout, Typography, Button } from "antd";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

const { Title, Text, Paragraph } = Typography;

const richTextOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { file } = node.data.target.fields;
      return (
        <img
          src={file.url}
          alt={file.description || file.fileName}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      );
    },
  },
};

function BlogDetail() {
  const { id } = useParams();
  const { blogList } = useBooking();
  const navigate = useNavigate();
  const blog = blogList?.find((b) => b.id === id);

  if (!blog) {
    return (
      <Layout>
        <Header />
        <div style={{ padding: 64, textAlign: "center" }}>
          <Title level={3}>Không tìm thấy bài viết</Title>
          <Button onClick={() => navigate(-1)}>Quay lại</Button>
        </div>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <div
        style={{
          maxWidth: 1000,
          margin: "48px auto",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          padding: 32,
        }}
      >
        <Button
          type="link"
          onClick={() => navigate(-1)}
          style={{ marginBottom: 16 }}
        >
          ← Quay lại
        </Button>
        <Title>{blog.title}</Title>
        <div style={{ marginBottom: 16 }}>
          <Text type="secondary" style={{ marginRight: 16 }}>
            Tác giả: {blog.author}
          </Text>
          <Text type="secondary" style={{ marginRight: 16 }}>
            Ngày đăng: {blog.publishedDate}
          </Text>
          {blog.category && (
            <Text type="secondary">Chuyên mục: {blog.category}</Text>
          )}
        </div>
        {blog.thumbnail && (
          <img
            src={blog.thumbnail}
            alt={blog.title}
            style={{
              width: "100%",
              // maxHeight: 600,
              objectFit: "cover",
              borderRadius: 8,
              marginBottom: 24,
            }}
          />
        )}
        <Paragraph style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 24 }}>
          {blog.excerpt}
        </Paragraph>
        {blog.content && (
          <div style={{ marginTop: 32 }}>
            <Title level={4}>Nội dung chi tiết</Title>
            <div>
              {documentToReactComponents(blog.content, richTextOptions)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </Layout>
  );
}

export default BlogDetail;
