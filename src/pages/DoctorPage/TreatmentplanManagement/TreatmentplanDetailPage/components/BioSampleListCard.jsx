import React from "react";
import { Card, Row, Col, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";

const { Text, Link } = Typography;

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

export default function BioSampleListCard({ biosamples, tpId }) {
  const navigate = useNavigate();

  if (!Array.isArray(biosamples) || biosamples.length === 0) return null;

  return (
    <Card
      title={
        <Space>
          <Text strong>Danh sách mẫu sinh học</Text>
          <Link style={{ color: "#f78db3" }} onClick={() => navigate(`/doctorpage/biosamplelist/${tpId}`)}>
            Xem đầy đủ
          </Link>
        </Space>
      }
      bodyStyle={{ backgroundColor: "#fff0f5" }}
    >
      <div style={{ maxHeight: 220, overflowY: "auto" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          {biosamples.map((bs) => (
            <Card key={bs.BS_ID} type="inner" style={{ borderLeft: "5px solid #f78db3" }}>
              <Row justify="space-between">
                <Col>
                  <Text strong>Tên mẫu: </Text>{bs.BS_Name}<br />
                  <Text strong>Ngày thu thập: </Text>{bs.CollectionDate}<br />
                  <Text strong>Trạng thái: </Text>{BIO_SAMPLE_STATUS[bs.Status] || "Không xác định"}<br />
                  <Text strong>Chất lượng: </Text>{BIO_QUALITY_STATUS[bs.BQS_ID] || "Chưa đánh giá"}<br />
                </Col>
                <Col>
                  <Link
                    style={{ color: "#f78db3" }}
                    onClick={() => navigate(`/doctorpage/biosampledetail/${bs.BS_ID}`)}
                  >
                    Xem chi tiết
                  </Link>
                </Col>
              </Row>
            </Card>
          ))}
        </Space>
      </div>
    </Card>
  );
}
