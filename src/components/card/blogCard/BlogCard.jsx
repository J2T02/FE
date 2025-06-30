import { Card, Typography, theme } from "antd";
import { RightOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const MAX_LENGTH = 100;

const BlogCard = ({ blog }) => {
  const { title, content, img, authorId, postDate } = blog;
  const { token } = theme.useToken();

  const shortContent =
    content?.length > MAX_LENGTH
      ? content.substring(0, MAX_LENGTH) + "..."
      : content;

  return (
    <Card
      hoverable
      style={{
        borderRadius: 12,
        overflow: "hidden",
        transition: "box-shadow 0.3s",
        boxShadow: token.boxShadowSecondary,
      }}
      cover={
        <img
          alt="blog"
          src={img}
          style={{
            height: 180,
            objectFit: "cover",
            width: "100%",
          }}
        />
      }
      bodyStyle={{ padding: 16 }}
    >
      <Title level={4} style={{ marginBottom: 8 }}>
        {title}
      </Title>

      {/* Author & Date */}
      <div style={{ marginBottom: 12 }}>
        <Text type="secondary" style={{ marginRight: 12 }}>
          Tác giả: {authorId}
        </Text>
        <Text type="secondary">
          Ngày đăng: {new Date(postDate).toLocaleDateString("vi-VN")}
        </Text>
      </div>

      <Paragraph type="secondary" style={{ marginBottom: 16 }}>
        {shortContent}
      </Paragraph>

      {/* Read more link */}
      <div
        // onClick={}
        style={{
          color: token.colorPrimary,
          fontWeight: 500,
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          cursor: "pointer",
        }}
      >
        Xem chi tiết <RightOutlined />
      </div>
    </Card>
  );
};

export default BlogCard;
