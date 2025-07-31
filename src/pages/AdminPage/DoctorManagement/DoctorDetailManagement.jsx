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
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import WorkScheduleManagement from "./WorkScheduleManagement";
import FeedbackCardManagement from "./FeedbackCardManagement";
import { getDoctorInfo } from "../../../apis/doctorService";
import { getFeedbackByDoctorId } from "../../../apis/feedbackService";
import { updateDoctor } from "../../../apis/adminService";
import { uploadFileToCloudinary } from "../../../utils/cloudinaryUtils";
// import updateDoctorInfo, getAllEduLevels, uploadCertificate

const { Title, Text } = Typography;
const { Option } = Select;

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/jpg",
];

const validateFile = (file) => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    message.error("Chỉ chấp nhận file .pdf, .jpg, .jpeg, .png");
    return false;
  }
  if (file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
    message.error("Kích thước file không được vượt quá 5MB");
    return false;
  }
  return true;
};

const DoctorDetailManagement = ({ doctorId, onBack, onUpdateSuccess }) => {
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
    status: 1, // 1 = đang làm việc, 2 = nghỉ phép, 3 = nghỉ việc
  });
  const [eduLevels, setEduLevels] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCertificates, setNewCertificates] = useState([]);
  const pageSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resDoctor = await getDoctorInfo(doctorId);
        if (resDoctor?.data?.success) {
          const d = resDoctor.data.data;
          console.log(d);
          setDoctor(d);
          setFormData({
            fullName: d.accountInfo.fullName || "",
            gender: d.gender || "",
            yob: d.yob ? dayjs(d.yob) : null,
            eduId: d.eduInfo?.eduId || null,
            status: d.status.statusId || 1, // Lấy status từ API
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

  const handleAddCertificate = () => {
    setNewCertificates([...newCertificates, { cerName: "", file: null }]);
  };

  const handleCertificateChange = (index, field, value) => {
    const updatedCertificates = [...newCertificates];
    updatedCertificates[index][field] = value;
    setNewCertificates(updatedCertificates);
  };

  const handleRemoveCertificate = (index) => {
    const updatedCertificates = [...newCertificates];
    updatedCertificates.splice(index, 1);
    setNewCertificates(updatedCertificates);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Đang làm việc";
      case 2:
        return "Nghỉ phép";
      case 3:
        return "Nghỉ việc";
      default:
        return "Không xác định";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1:
        return { bg: "#f6ffed", color: "#389e0d", border: "#b7eb8f" };
      case 2:
        return { bg: "#fff7e6", color: "#d46b08", border: "#ffd591" };
      case 3:
        return { bg: "#fff1f0", color: "#cf1322", border: "#ffa39e" };
      default:
        return { bg: "#f5f5f5", color: "#666", border: "#d9d9d9" };
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      // Xử lý upload file chứng chỉ mới
      const uploadedNewCertificates = await Promise.all(
        newCertificates.map(async (cer) => {
          if (cer.file) {
            try {
              const filePath = await uploadFileToCloudinary(cer.file);
              return {
                cerName: cer.cerName,
                filePath,
              };
            } catch (err) {
              message.error("Tải file chứng chỉ lên Cloudinary thất bại");
              throw err;
            }
          }
          return null;
        })
      );

      // Lọc bỏ các certificate null
      const validNewCertificates = uploadedNewCertificates.filter(
        (cer) => cer !== null
      );

      // Kết hợp chứng chỉ cũ và mới
      const existingCertificates = (doctor?.certificateInfo || []).map(
        (cer) => ({
          cerName: cer.cerName || cer.Cer_Name || "",
          filePath: cer.filePath || cer.File_Path || "",
        })
      );

      const allCertificates = [
        ...existingCertificates,
        ...validNewCertificates,
      ];

      const payload = {
        docId: doctorId,
        fullName: formData.fullName,
        gender: formData.gender,
        yob: formData.yob?.format("YYYY-MM-DD"),
        edu_Id: formData.eduId,
        status: formData.status, // Sử dụng status từ form
        img: doctor?.img || "",
        certificates: allCertificates,
      };

      // Log payload để review trước khi gọi API
      console.log("=== PAYLOAD REVIEW ===");
      console.log("Doctor ID:", doctorId);
      console.log("Full Payload:", payload);
      console.log("Form Data:", formData);
      console.log("YOB formatted:", formData.yob?.format("YYYY-MM-DD"));
      console.log(
        "Status:",
        formData.status,
        "(",
        getStatusText(formData.status),
        ")"
      );
      console.log("All Certificates:", allCertificates);
      console.log("=====================");

      const res = await updateDoctor(payload);
      if (res?.data?.success) {
        message.success("Cập nhật thành công!");
        setEditMode(false);
        setNewCertificates([]);

        // Gọi onUpdateSuccess để refresh list nếu có
        if (onUpdateSuccess) {
          onUpdateSuccess();
        }

        // Refresh data local sau khi update thành công
        const resDoctor = await getDoctorInfo(doctorId);
        if (resDoctor?.data?.success) {
          setDoctor(resDoctor.data.data);
        }
      } else {
        message.error("Cập nhật thất bại");
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
      message.error("Lỗi khi cập nhật!");
    } finally {
      setLoading(false);
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
      case 1: // Cử nhân
        return "blue";
      case 2: // Bác sĩ chuyên khoa I
        return "green";
      case 3: // Bác sĩ chuyên khoa II
        return "volcano";
      case 4: // Thạc sĩ Y khoa
        return "purple";
      case 5: // Tiến sĩ Y khoa
        return "red";
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
                value={formData.status}
                onChange={(val) => setFormData({ ...formData, status: val })}
                style={{ width: 180, marginBottom: 12 }}
              >
                <Option value={1}>Đang làm việc</Option>
                <Option value={2}>Nghỉ phép</Option>
                <Option value={3}>Nghỉ việc</Option>
              </Select>
            ) : (
              <Card
                size="small"
                style={{
                  backgroundColor: getStatusColor(formData.status).bg,
                  color: getStatusColor(formData.status).color,
                  border: `1px solid ${getStatusColor(formData.status).border}`,
                  display: "inline-block",
                }}
              >
                {getStatusText(formData.status)}
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
                placeholder="Chọn trình độ"
              >
                <Option value={1}>Cử nhân</Option>
                <Option value={2}>Bác sĩ chuyên khoa I</Option>
                <Option value={3}>Bác sĩ chuyên khoa II</Option>
                <Option value={4}>Thạc sĩ Y khoa</Option>
                <Option value={5}>Tiến sĩ Y khoa</Option>
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
            <b>Ngày bắt đầu công tác:</b> {dayjs(createAt).format("DD/MM/YYYY")}
          </p>

          <p>
            <b>Chứng chỉ hiện tại:</b>
          </p>
          <Space wrap>
            {certificates.map((cer, index) => (
              <Tag
                key={index}
                color="purple"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (cer.filePath) {
                    window.open(cer.filePath, "_blank");
                  }
                }}
              >
                {cer.cerName || cer.Cer_Name || "Chứng chỉ"}
              </Tag>
            ))}
          </Space>

          {editMode && (
            <>
              <p style={{ marginTop: 16 }}>
                <b>Thêm chứng chỉ mới:</b>
              </p>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAddCertificate}
                style={{ marginBottom: 16 }}
              >
                Thêm chứng chỉ
              </Button>

              {newCertificates.map((cer, index) => (
                <Space
                  key={index}
                  align="baseline"
                  style={{ display: "flex", marginBottom: 8 }}
                >
                  <Input
                    placeholder="Nhập tên chứng chỉ"
                    value={cer.cerName}
                    onChange={(e) =>
                      handleCertificateChange(index, "cerName", e.target.value)
                    }
                    style={{ width: 200 }}
                  />

                  <Upload
                    beforeUpload={(file) => {
                      if (!validateFile(file)) return Upload.LIST_IGNORE;
                      return false;
                    }}
                    onChange={(info) =>
                      handleCertificateChange(index, "file", info.file)
                    }
                    maxCount={1}
                    showUploadList={{ showRemoveIcon: true }}
                  >
                    <Button
                      icon={<UploadOutlined />}
                      style={{
                        backgroundColor: "#f78db3",
                        color: "white",
                        border: "none",
                      }}
                    >
                      Chọn file
                    </Button>
                  </Upload>

                  <Button
                    icon={<CloseOutlined />}
                    danger
                    type="text"
                    onClick={() => handleRemoveCertificate(index)}
                  />
                </Space>
              ))}

              <div style={{ marginTop: 16 }}>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={handleSaveChanges}
                  loading={loading}
                  disabled={loading}
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
          <FeedbackCardManagement
            key={fb.fb_ID}
            data={fb}
            doctorId={doctorId}
          />
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
