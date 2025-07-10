import React from "react";
import { Card, Row, Col, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";

const { Text, Link } = Typography;

const TEST_TYPE_MAP = {
  1: "Siêu âm tử cung - buồng trứng",
  2: "Xét nghiệm nội tiết tố",
  3: "Xét nghiệm tinh dịch đồ",
  4: "Xét nghiệm bệnh truyền nhiễm",
  5: "Xét nghiệm sức khỏe tổng quát",
  6: "Chụp tử cung vòi trứng",
  7: "Siêu âm đánh giá ống dẫn trứng",
  8: "Xét nghiệm di truyền",
  9: "Xét nghiệm dịch âm đạo",
};

const TEST_STATUS = {
  1: "Chờ xét nghiệm",
  2: "Đang xét nghiệm",
  3: "Chờ kết quả",
  4: "Đã có kết quả",
  5: "Đã trả kết quả",
};

const TEST_QUALITY_RESULT_STATUS = {
  1: "Bình thường",
  2: "Bất thường",
  3: "Dương tính",
  4: "Âm tính",
};

export default function TestListCard({ tests, tpId }) {
  const navigate = useNavigate();

  if (!Array.isArray(tests) || tests.length === 0) return null;

  return (
    <Card
      title={
        <Space>
          <Text strong>Danh sách xét nghiệm</Text>
          <Link style={{ color: "#f78db3" }} onClick={() => navigate(`/doctorpage/testlist/${tpId}`)}>
            Xem đầy đủ
          </Link>
        </Space>
      }
      bodyStyle={{ backgroundColor: "#fef2f6" }}
    >
      <div style={{ maxHeight: 220, overflowY: "auto" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          {tests.map((test) => (
            <Card key={test.Test_ID} type="inner" style={{ borderLeft: "5px solid #f78db3" }}>
              <Row justify="space-between">
                <Col>
                  <Text strong>Loại xét nghiệm: </Text>{TEST_TYPE_MAP[test.TestType_ID] || "Không rõ"}<br />
                  <Text strong>Ngày xét nghiệm: </Text>{test.TestDate}<br />
                  <Text strong>Người xét nghiệm: </Text>{test.Person}<br />
                  <Text strong>Trạng thái: </Text>{TEST_STATUS[test.Status] || "Không xác định"}<br />
                  <Text strong>Tình trạng kết quả: </Text>{TEST_QUALITY_RESULT_STATUS[test.TQS_ID] || "Chưa có"}
                </Col>
                <Col>
                  <Link
                    style={{ color: "#f78db3" }}
                    onClick={() => navigate(`/doctorpage/testdetail/${test.Test_ID}`)}
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
