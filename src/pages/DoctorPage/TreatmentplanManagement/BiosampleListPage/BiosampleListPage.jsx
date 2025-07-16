import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout, Typography, Card, Row, Col, Button, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getBioSampleByPlanId } from "../../../../apis/bioSampleService";
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
    const fetchBiosamples = async () => {
      try {
        const res = await getBioSampleByPlanId(tpId);
        if (res?.data?.success && Array.isArray(res.data.data)) {
          const mapped = res.data.data.map((bs) => ({
            BS_ID: bs.bsId,
            BS_Name: bs.bsName,
            CollectionDate: bs.collectionDate,
            Status: bs.bioSampleStatus?.id,
            StatusName: bs.bioSampleStatus?.name,
            BQS_ID: bs.qualityStatus?.id,
            BQS_Name: bs.qualityStatus?.name,
            StorageLocation: bs.storageLocation,
            Note: bs.note,
            BioType: bs.bioType?.name,
            Step_Name: bs.stepDetail?.stepName,
            Doctor: bs.stepDetail?.docInfo?.accountInfo?.fullName || "Chưa rõ",
          }));
          setBiosamples(mapped);
        } else {
          setBiosamples([]);
        }
      } catch (err) {
        setBiosamples([]);
      }
    };
    fetchBiosamples();
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

        <Space
          direction="vertical"
          size="middle"
          style={{ width: "100%", marginTop: 24 }}
        >
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
                      onClick={() =>
                        navigate(`/doctorpage/biosampledetail/${bs.BS_ID}`)
                      }
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
                  <Text strong>Trạng thái:</Text>{" "}
                  {bs.StatusName || BIO_SAMPLE_STATUS[bs.Status]}
                </Col>
                <Col span={12}>
                  <Text strong>Chất lượng:</Text>{" "}
                  {bs.BQS_Name || BIO_QUALITY_STATUS[bs.BQS_ID]}
                </Col>
                <Col span={12}>
                  <Text strong>Vị trí lưu trữ:</Text>{" "}
                  {bs.StorageLocation || "-"}
                </Col>
                <Col span={12}>
                  <Text strong>Loại mẫu:</Text> {bs.BioType || "-"}
                </Col>
                <Col span={12}>
                  <Text strong>Bước điều trị:</Text> {bs.Step_Name || "-"}
                </Col>
                <Col span={12}>
                  <Text strong>Bác sĩ:</Text> {bs.Doctor || "-"}
                </Col>
                <Col span={24}>
                  <Text strong>Ghi chú:</Text> {bs.Note || "-"}
                </Col>
              </Row>
            </Card>
          ))}
        </Space>
      </Content>
    </Layout>
  );
}
