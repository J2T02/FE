import { Card, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import "./BlogCard.css";

const { Title, Paragraph } = Typography;

const BlogCard = ({ image, title, content, onClick }) => {
  const MAX_LENGTH = 100;
  const shortContent =
    content.length > MAX_LENGTH
      ? content.substring(0, MAX_LENGTH) + "..."
      : content;

  return (
    <Card
      hoverable
      className="blog-card"
      cover={<img alt="blog" src={image} className="blog-image" />}
      bodyStyle={{ padding: "16px" }}
    >
      <Title level={4} style={{ marginBottom: "8px" }}>
        {title}
      </Title>
      <Paragraph type="secondary" style={{ marginBottom: "16px" }}>
        {shortContent}
      </Paragraph>
      <div className="read-more" onClick={onClick}>
        Xem chi tiết <RightOutlined />
      </div>
    </Card>
  );
};

export default BlogCard;
