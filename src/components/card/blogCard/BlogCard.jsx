import { Card, Typography, theme } from "antd";
import { RightOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const MAX_LENGTH = 100;

const BlogCard = ({ blog, onClick }) => {
  const { title, excerpt, thumbnail, author, publishedDate } = blog;
  const { token } = theme.useToken();

  const shortContent =
    excerpt?.length > MAX_LENGTH
      ? excerpt.substring(0, MAX_LENGTH) + "..."
      : excerpt;

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
          src={thumbnail}
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
      <div style={{ marginBottom: 12 }}>
        <Text type="secondary" style={{ marginRight: 12 }}>
          Tác giả: {author}
        </Text>
        <Text type="secondary">Ngày đăng: {publishedDate}</Text>
      </div>
      <Paragraph type="secondary" style={{ marginBottom: 16 }}>
        {shortContent}
      </Paragraph>
      <div
        onClick={onClick}
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
