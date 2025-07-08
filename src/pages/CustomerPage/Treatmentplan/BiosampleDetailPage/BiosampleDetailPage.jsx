// ... giữ nguyên import ban đầu
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Button,
  Tag,
  Divider,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

// ✅ Mapping cho các bảng phụ
const BIO_TYPE_MAP = {
  1: "Phôi",
  2: "Noãn",
  3: "Tinh trùng",
};

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

export default function BiosampleDetailPage() {
  const { id } = useParams(); // id = BS_ID
  const navigate = useNavigate();

  const [biosample, setBiosample] = useState(null);

  useEffect(() => {
    // 🧪 Mock dữ liệu mẫu sinh học
    const mockBiosample = {
      BS_ID: parseInt(id),
      TP_ID: 1,
      BT_ID: 1,
      BS_Name: "Phôi AB",
      Status: 2,
      CollectionDate: "2025-07-09",
      StorageLocation: "Tủ số 2 - Ngăn A3",
      BQS_ID: 5,
      Note: "Mẫu đạt chất lượng tốt, có thể sử dụng trong lần chuyển phôi tiếp theo.",
    };

    setBiosample(mockBiosample);
  }, [id]);

  if (!biosample) return null;

  return (
    <Layout style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      <Content style={{ padding: 24 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          style={{
            backgroundColor: "#f78db3",
            color: "white",
            border: "none",
            marginBottom: 24,
          }}
          onClick={() => navigate(-1)}
        >
          Quay lại
        </Button>

        <Title level={3} style={{ marginBottom: 4 }}>
          Chi tiết mẫu sinh học
        </Title>
        <Text type="secondary">Mã hồ sơ điều trị: {biosample.TP_ID}</Text>

        <Card
          style={{ marginTop: 24, backgroundColor: "#fff0f5" }}
          title={<Text strong>Thông tin mẫu sinh học</Text>}
          bordered={false}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong>Tên mẫu:</Text>
              <br />
              <Text>{biosample.BS_Name}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Loại mẫu:</Text>
              <br />
              <Tag color="purple">
                {BIO_TYPE_MAP[biosample.BT_ID] || "Không xác định"}
              </Tag>
            </Col>
            <Col span={12}>
              <Text strong>Trạng thái:</Text>
              <br />
              <Tag color="blue">
                {BIO_SAMPLE_STATUS[biosample.Status] || "Không xác định"}
              </Tag>
            </Col>
            <Col span={12}>
              <Text strong>Chất lượng:</Text>
              <br />
              <Tag color="green">
                {BIO_QUALITY_STATUS[biosample.BQS_ID] || "Chưa đánh giá"}
              </Tag>
            </Col>
            <Col span={12}>
              <Text strong>Ngày thu thập:</Text>
              <br />
              <Text>{biosample.CollectionDate}</Text>
            </Col>
            <Col span={12}>
              <Text strong>Vị trí lưu trữ:</Text>
              <br />
              <Text>{biosample.StorageLocation}</Text>
            </Col>
            <Col span={24}>
              <Divider />
              <Text strong>Ghi chú:</Text>
              <br />
              <Text>{biosample.Note || "Không có ghi chú"}</Text>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
}
