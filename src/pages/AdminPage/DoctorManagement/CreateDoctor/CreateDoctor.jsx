import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  message,
  DatePicker,
  Select,
  Radio,
  Upload,
  Space,
} from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  UploadOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useState } from "react";
import { createDoctor } from "../../../../apis/doctorService";
import { uploadFileToCloudinary } from "../../../../utils/cloudinaryUtils";
const { Title } = Typography;
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

const CreateDoctor = ({ onBack, onSuccess }) => {
  const [form] = Form.useForm();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false); // Thêm state loading
  const [avatarFile, setAvatarFile] = useState(null); // State cho file ảnh đại diện

  const handleAddCertificate = () => {
    setCertificates([...certificates, { Cer_Name: "", File_Path: null }]);
  };

  const handleCertificateChange = (index, field, value) => {
    const newCertificates = [...certificates];
    newCertificates[index][field] = value;
    setCertificates(newCertificates);
  };

  const handleRemoveCertificate = (index) => {
    const newCertificates = [...certificates];
    newCertificates.splice(index, 1);
    setCertificates(newCertificates);
  };

  const handleSubmit = async (values) => {
    setLoading(true); // Bắt đầu loading
    try {
      // Upload ảnh đại diện lên Cloudinary nếu có
      let avatarUrl = "";
      if (avatarFile) {
        try {
          avatarUrl = await uploadFileToCloudinary(avatarFile);
        } catch (err) {
          message.error("Tải ảnh đại diện lên Cloudinary thất bại");
          throw err;
        }
      }
      // Upload từng file bằng cấp lên Cloudinary trước khi tạo payload
      const uploadedCertificates = await Promise.all(
        certificates.map(async (cer) => {
          let filePath = "";
          if (cer.File_Path) {
            try {
              filePath = await uploadFileToCloudinary(cer.File_Path);
            } catch (err) {
              message.error("Tải file bằng cấp lên Cloudinary thất bại");
              throw err;
            }
          }
          return {
            cerName: cer.Cer_Name,
            filePath: filePath,
          };
        })
      );

      const payload = {
        mail: values.mail,
        fullName: values.fullname,
        phone: values.phone,
        gender: values.gender,
        yob: values.yob.format("YYYY-MM-DD"),
        experience: values.experience,
        edu_Id: values.educationLevel,
        status: 1,
        img: avatarUrl,
        certificates: uploadedCertificates,
      };
      console.log(payload);
      await createDoctor(payload)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            message.success("Đã tạo bác sĩ thành công!");
            // Gọi onSuccess thay vì onBack để refresh list
            if (onSuccess) {
              onSuccess();
            } else {
              onBack();
            }
          } else {
            message.error(res.data.message);
          }
        })
        .catch((err) => {
          message.error("tạo bác sĩ thất bại");
        });

      form.resetFields();
      setCertificates([]);
      setAvatarFile(null);
    } finally {
      setLoading(false); // Kết thúc loading dù thành công hay thất bại
    }
  };

  return (
    <Card bordered={false}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={onBack}
        style={{
          marginBottom: 20,
          backgroundColor: "#f78db3",
          color: "white",
          border: "none",
        }}
      >
        Quay lại
      </Button>

      <Title level={3}>Thêm bác sĩ mới</Title>

      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="fullname"
          label="Họ tên"
          rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
        >
          <Input placeholder="Nhập họ tên" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            { pattern: /^\d{9,11}$/, message: "Số điện thoại không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          name="mail"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="Nam">Nam</Radio>
            <Radio value="Nữ">Nữ</Radio>
          </Radio.Group>
        </Form.Item>
        {/* Upload ảnh đại diện */}
        <Form.Item label="Ảnh đại diện">
          <Upload
            beforeUpload={(file) => {
              if (!validateFile(file)) return Upload.LIST_IGNORE;
              return false;
            }}
            onChange={(info) => {
              if (info.fileList && info.fileList.length > 0) {
                setAvatarFile(info.fileList[0].originFileObj);
              } else {
                setAvatarFile(null);
              }
            }}
            maxCount={1}
            showUploadList={{ showRemoveIcon: true }}
          >
            <Button
              icon={<UploadOutlined />}
              style={{
                marginBottom: 10,
                backgroundColor: "#f78db3",
                color: "white",
                border: "none",
              }}
            >
              Chọn ảnh
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="yob"
          label="Ngày tháng năm sinh"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="experience"
          label="Kinh nghiệm (năm)"
          rules={[{ required: true }]}
        >
          <Input type="number" placeholder="Nhập số năm kinh nghiệm" />
        </Form.Item>

        <Form.Item
          name="educationLevel"
          label="Trình độ"
          rules={[{ required: true }]}
        >
          <Select placeholder="Chọn trình độ">
            <Option value={1}>Cử nhân</Option>
            <Option value={2}>Bác sĩ chuyên khoa I</Option>
            <Option value={3}>Bác sĩ chuyên khoa II</Option>
            <Option value={4}>Thạc sĩ Y khoa</Option>
            <Option value={5}>Tiến sĩ Y khoa</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Bằng cấp">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddCertificate}
          >
            Thêm bằng cấp
          </Button>
        </Form.Item>

        {certificates.map((cer, index) => (
          <Space
            key={index}
            align="baseline"
            style={{ display: "flex", marginBottom: 8 }}
          >
            <Form.Item required label="Tên bằng cấp">
              <Input
                placeholder="Nhập tên bằng cấp"
                value={cer.Cer_Name}
                onChange={(e) =>
                  handleCertificateChange(index, "Cer_Name", e.target.value)
                }
              />
            </Form.Item>

            <Form.Item required label="Tải chứng chỉ">
              <Upload
                beforeUpload={(file) => {
                  if (!validateFile(file)) return Upload.LIST_IGNORE;
                  return false;
                }}
                onChange={(info) =>
                  handleCertificateChange(index, "File_Path", info.file)
                }
              >
                <Button
                  icon={<UploadOutlined />}
                  style={{
                    marginBottom: 20,
                    backgroundColor: "#f78db3",
                    color: "white",
                    border: "none",
                  }}
                >
                  Chọn file
                </Button>
              </Upload>
            </Form.Item>

            <Button
              icon={<CloseOutlined />}
              danger
              type="text"
              onClick={() => handleRemoveCertificate(index)}
            />
          </Space>
        ))}

        <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
          >
            Tạo bác sĩ
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateDoctor;
