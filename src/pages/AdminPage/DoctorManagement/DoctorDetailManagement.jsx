import React, { useEffect, useState } from "react";
import {
  Tag,
  Rate,
  Typography,
  Divider,
  Space,
  Select,
  message,
  Pagination,
  Layout,
  theme,
  Button,
  Input,
  DatePicker,
  Upload,
  Row,
  Col,
  Card,
} from "antd";
import {
  UploadOutlined,
  SaveOutlined,
  EditOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import WorkScheduleManagement from "./WorkScheduleManagement";
import FeedbackCardManagement from "./FeedbackCardManagement";
import { getDoctorInfo } from "../../../apis/doctorService";
import { getFeedbackByDoctorId } from "../../../apis/feedbackService";
// import updateDoctorInfo, getAllEduLevels, uploadCertificate

const { Title, Text } = Typography;
const { Option } = Select;

const DoctorDetailManagement = ({ doctorId, onBack }) => {
  const { token } = theme.useToken();
  const [doctor, setDoctor] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [selectedStar, setSelectedStar] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    yob: null,
    eduId: null,
    isActive: true,
  });
  const [eduLevels, setEduLevels] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const pageSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resDoctor = await getDoctorInfo(doctorId);
        if (resDoctor?.data?.success) {
          const d = resDoctor.data.data;
          setDoctor(d);
          setFormData({
            fullName: d.accountInfo.fullName || "",
            gender: d.gender || "",
            yob: d.yob ? dayjs(d.yob) : null,
            eduId: d.eduInfo?.eduId || null,
            isActive: d.accountInfo?.isActive ?? true,
          });
        }

        const resFeedback = await getFeedbackByDoctorId(doctorId);
        if (resFeedback?.data?.success) {
          const mapped = (resFeedback.data.data || []).map((fb, idx) => ({
            fb_ID: idx + 1,
            star: fb.star,
            content: fb.content,
            createAt: fb.createAt,
            hus_Name: fb.cus?.husName || "",
            wife_Name: fb.cus?.wifeName || "",
          }));
          setFeedbacks(mapped);
        }
      } catch {
        setDoctor(null);
        setFeedbacks([]);
      }
    };

    const fetchEduLevels = async () => {
      try {
        const res = await getAllEduLevels();
        if (res?.data?.success) setEduLevels(res.data.data);
      } catch {}
    };

    if (doctorId) {
      fetchData();
      fetchEduLevels();
    }
  }, [doctorId]);

  useEffect(() => {
    filterFeedbacks(selectedStar);
    setCurrentPage(1);
  }, [selectedStar, feedbacks]);

  const handleSaveChanges = async () => {
    try {
      const payload = {
        docId: doctorId,
        ...formData,
        yob: formData.yob?.format("YYYY-MM-DD"),
      };
      const res = await updateDoctorInfo(payload);
      if (res?.data?.success) {
        message.success("Cập nhật thành công!");
        setEditMode(false);
      } else {
        message.error("Cập nhật thất bại");
      }
    } catch {
      message.error("Lỗi khi cập nhật!");
    }
  };

  const handleCustomUpload = async ({ file }) => {
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("docId", doctorId);
      const res = await uploadCertificate(form);
      if (res.data.success) {
        message.success("Tải chứng chỉ thành công!");
        setDoctor((prev) => ({
          ...prev,
          certificateInfo: [...prev.certificateInfo, res.data.data],
        }));
      }
    } catch {
      message.error("Tải chứng chỉ thất bại!");
    }
  };

  const filterFeedbacks = (star) => {
    if (!star) setFilteredFeedbacks(feedbacks);
    else setFilteredFeedbacks(feedbacks.filter((fb) => fb.star === star));
  };

  const paginatedFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const certificates = doctor?.certificateInfo || [];
  const avgStar = doctor?.avgStar || 4.8;
  const createAt = doctor?.createAt || "";
  const experience = doctor?.experience || 0;
  const img = doctor?.img || "/femaledoctor.jpg";

  const getEduColorById = (eduId) => {
    switch (eduId) {
      case 1: // Bác sĩ
        return "blue";
      case 2: // Thạc sĩ
        return "green";
      case 3: // Tiến sĩ
        return "volcano";
      case 4: // Giáo sư
        return "purple";
      default:
        return "default";
    }
  };

  return (
    <Layout style={{ background: "#fff0f4", minHeight: "100vh" }}>
      <div style={{ padding: 24 }}>
        <Button
          onClick={onBack}
          style={{
            marginBottom: 16,
            backgroundColor: "#f78db3",
            color: "white",
            border: "none",
          }}
        >
          Quay lại
        </Button>

        <Row gutter={[24, 16]} justify="space-between">
          <Col span={12} style={{ display: "flex", gap: 24 }}>
            <img
              src={img}
              alt="Doctor"
              style={{
                width: 160,
                height: 160,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div>
              <Title level={4}>
                {editMode ? (
                  <Input
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                ) : (
                  formData.fullName
                )}
              </Title>
              <Text>{doctor?.accountInfo?.mail}</Text>
              <br />
              <Text>{doctor?.accountInfo?.phone}</Text>
              <br />
              <Rate disabled defaultValue={avgStar} />
            </div>
          </Col>

          <Col span={12} style={{ textAlign: "right" }}>
            <p>
              <b>Trạng thái tài khoản:</b>
            </p>
            {editMode ? (
              <Select
                value={formData.isActive ? "active" : "inactive"}
                onChange={(val) =>
                  setFormData({ ...formData, isActive: val === "active" })
                }
                style={{ width: 180, marginBottom: 12 }}
              >
                <Option value="active">Đang hoạt động</Option>
                <Option value="inactive">Ngừng hoạt động</Option>
              </Select>
            ) : (
              <Card
                size="small"
                style={{
                  backgroundColor: formData.isActive ? "#f6ffed" : "#fff1f0",
                  color: formData.isActive ? "#389e0d" : "#cf1322",
                  border: `1px solid ${
                    formData.isActive ? "#b7eb8f" : "#ffa39e"
                  }`,
                  display: "inline-block",
                }}
              >
                {formData.isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
              </Card>
            )}
            <br />
            <Button
              icon={<EditOutlined />}
              onClick={() => setEditMode((prev) => !prev)}
              style={{
                backgroundColor: "#f78db3",
                color: "white",
                border: "none",
                marginTop: 8,
              }}
            >
              {editMode ? "Hủy chỉnh sửa" : "Chỉnh sửa"}
            </Button>
          </Col>
        </Row>

        <Divider />

        <div>
          <p>
            <b>Giới tính:</b>{" "}
            {editMode ? (
              <Select
                value={formData.gender}
                onChange={(val) => setFormData({ ...formData, gender: val })}
                style={{ width: 160 }}
              >
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
                <Option value="Khác">Khác</Option>
              </Select>
            ) : (
              formData.gender
            )}
          </p>

          <p>
            <b>Năm sinh:</b>{" "}
            {editMode ? (
              <DatePicker
                value={formData.yob}
                onChange={(val) => setFormData({ ...formData, yob: val })}
                format="DD/MM/YYYY"
              />
            ) : (
              formData.yob?.format("DD/MM/YYYY")
            )}
          </p>

          <p>
            <b>Trình độ:</b>{" "}
            {editMode ? (
              <Select
                value={formData.eduId}
                onChange={(val) => setFormData({ ...formData, eduId: val })}
                style={{ width: 200 }}
              >
                {eduLevels.map((edu) => (
                  <Option key={edu.eduId} value={edu.eduId}>
                    {edu.eduName}
                  </Option>
                ))}
              </Select>
            ) : doctor?.eduInfo?.eduId ? (
              <Tag color={getEduColorById(doctor.eduInfo.eduId)}>
                {doctor.eduInfo.eduName}
              </Tag>
            ) : (
              <Tag color="default">chưa rõ</Tag>
            )}
          </p>

          <p>
            <b>Kinh nghiệm:</b> {experience} năm
          </p>

          <p>
            <b>Ngày bắt đầu công tác:</b>{" "}
            {dayjs(createAt).format("DD/MM/YYYY")}
          </p>

          <p>
            <b>Chứng chỉ:</b>
          </p>
          <Space wrap>
            {certificates.map((cer, index) => (
              <Tag
                key={index}
                color="purple"
                style={{ cursor: "pointer" }}
                onClick={() => window.open(cer.filePath, "_blank")}
              >
                {cer.cerName}
              </Tag>
            ))}
          </Space>

          {editMode && (
            <>
              <Upload
                multiple
                customRequest={handleCustomUpload}
                showUploadList={false}
              >
                <Button
                  icon={<UploadOutlined />}
                  style={{ color: "#f78db3", marginTop: 12 }}
                >
                  Tải chứng chỉ
                </Button>
              </Upload>
              <div style={{ marginTop: 16 }}>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={handleSaveChanges}
                >
                  Lưu thay đổi
                </Button>
              </div>
            </>
          )}
        </div>

        <Divider />

        <Title level={4}>Lịch làm việc trong tuần</Title>
        <WorkScheduleManagement doctorId={doctorId} />

        <Divider />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Title level={4}>Đánh giá từ bệnh nhân</Title>
          <Select
            allowClear
            placeholder="Lọc theo số sao"
            value={selectedStar}
            onChange={(value) => setSelectedStar(value)}
            style={{ width: 160 }}
          >
            {[5, 4, 3, 2, 1].map((star) => (
              <Option key={star} value={star}>
                {star} sao
              </Option>
            ))}
          </Select>
        </div>

        {paginatedFeedbacks.map((fb) => (
          <FeedbackCardManagement key={fb.fb_ID} data={fb} doctorId={doctorId} />
        ))}

        {filteredFeedbacks.length > pageSize && (
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredFeedbacks.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DoctorDetailManagement;
