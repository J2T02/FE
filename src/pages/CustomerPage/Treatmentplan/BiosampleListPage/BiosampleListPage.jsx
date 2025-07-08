import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Button,
  Space,
} from "antd";
import {
  ArrowLeftOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text, Link } = Typography;

// Mappings
const BIO_SAMPLE_STATUS = {
  1: "Kiểm tra chất lượng",
  2: "Đang trữ",
  3: "Đã dùng",
  4: "Đã hủy",
};

const BIO_QUALITY_STATUS = {
  1: "Tốt",
  2: "Khá",
  3: "Trung bình",
  4: "Kém",
  5: "Có thể thụ tinh",
  6: "Không thể thụ tinh",
  7: "Cần xử lý thêm",
};

export default function BiosampleListPage() {
  const { id } = useParams(); // TP_ID
  const tpId = parseInt(id);
  const navigate = useNavigate();
  const [biosamples, setBiosamples] = useState([]);

  useEffect(() => {
    // Giả lập dữ liệu
    const mockBiosamples = tpId === 1
      ? [
          {
            BS_ID: 101,
            BS_Name: "Mẫu máu",
            CollectionDate: "2025-07-08",
            Status: 1,
            BQS_ID: 1,
            Note: "Mẫu ổn định",
          },
          {
            BS_ID: 102,
            BS_Name: "Tinh trùng",
            CollectionDate: "2025-07-09",
            Status: 2,
            BQS_ID: 5,
            Note: "Cần kiểm tra thêm",
          },
          {
            BS_ID: 103,
            BS_Name: "Nội mạc tử cung",
            CollectionDate: "2025-07-10",
            Status: 3,
            BQS_ID: 2,
            Note: "Chất lượng ổn",
          },
        ]
      : [];

    setBiosamples(mockBiosamples);
  }, [tpId]);

  return (
    <Layout style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      <Content style={{ padding: 24 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: "#f78db3",
            color: "white",
            border: "none",
            marginBottom: 24,
          }}
        >
          Quay lại
        </Button>

        <Title level={3} style={{ color: "#f78db3" }}>
          Danh sách mẫu sinh học
        </Title>
        <Text style={{ color: "#333", fontWeight: 500 }}>
          Mã hồ sơ: #{tpId}
        </Text>

        <Space direction="vertical" size="middle" style={{ width: "100%", marginTop: 24 }}>
          {biosamples.map((bs) => (
            <Card
              key={bs.BS_ID}
              title={
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text strong>{bs.BS_Name}</Text>
                  </Col>
                  <Col>
                    <Link
                      style={{ color: "#f78db3" }}
                      onClick={() => navigate(`/biosampledetail/${bs.BS_ID}`)}
                    >
                      Xem chi tiết
                    </Link>
                  </Col>
                </Row>
              }
              type="inner"
              style={{ borderLeft: "5px solid #f78db3" }}
            >
              <Row gutter={[16, 8]}>
                <Col span={12}>
                  <Text strong>Ngày thu thập:</Text> {bs.CollectionDate}
                </Col>
                <Col span={12}>
                  <Text strong>Trạng thái:</Text> {BIO_SAMPLE_STATUS[bs.Status]}
                </Col>
                <Col span={12}>
                  <Text strong>Chất lượng:</Text> {BIO_QUALITY_STATUS[bs.BQS_ID]}
                </Col>
                <Col span={24}>
                  <Text strong>Ghi chú:</Text> {bs.Note}
                </Col>
              </Row>
            </Card>
          ))}
        </Space>
      </Content>
    </Layout>
  );
}
