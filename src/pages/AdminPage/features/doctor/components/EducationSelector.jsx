import { Form, Select, Upload, Button, message, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

const educationLevels = [
  { eduId: 1, eduName: "Cử nhân" },
  { eduId: 2, eduName: "Thạc sĩ" },
  { eduId: 3, eduName: "Tiến sĩ" },
];

const EducationSelector = ({ form, onFileChange }) => {
  const [selectedEduId, setSelectedEduId] = useState(undefined);
  const [fileList, setFileList] = useState([]); // State để quản lý fileList của Ant Design Upload

  // Đồng bộ fileList với Ant Design Form để hiển thị UI
  useEffect(() => {
    // Chỉ cần lấy file đầu tiên trong fileList nếu có
    const file = fileList.length > 0 ? fileList[0] : null;
    if (onFileChange) {
      onFileChange(file ? file.originFileObj : null); // Truyền File object gốc lên component cha
    }
    // Cập nhật trường ẩn 'educationFile' trong form (chỉ cho mục đích UI của Ant Design)
    form.setFieldsValue({ educationFile: file ? [file] : [] });
  }, [fileList, form, onFileChange]);

  const handleEducationChange = (value) => {
    setSelectedEduId(value);
    form.setFieldsValue({ eduId: value }); // Cập nhật eduId vào form
    setFileList([]); // Reset file khi thay đổi trình độ học vấn
  };

  const handleUploadChange = (info) => {
    let newFileList = [...info.fileList];

    // Giới hạn chỉ một tệp
    newFileList = newFileList.slice(-1);

    // Cập nhật trạng thái file cho Ant Design Upload UI
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // File is uploaded (or processing in this case as beforeUpload returns false)
        file.status = "done";
        file.url = file.response.url; // Assuming your response has a url
      }
      return file;
    });

    setFileList(newFileList);

    if (info.file.status === "removed") {
      message.success(`Đã xóa tệp.`);
      // onFileChange(null); // Gửi null lên component cha khi tệp bị xóa
    } else if (info.file.status === "done") {
      message.success(`Đã chọn tệp: ${info.file.name}`);
      // onFileChange(info.file.originFileObj); // Gửi File object gốc lên component cha
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} tải lên thất bại.`);
      // onFileChange(null);
    }
  };

  return (
    <>
      <Form.Item
        name="eduId"
        label="Trình độ học vấn"
        rules={[{ required: true, message: "Vui lòng chọn trình độ học vấn" }]}
      >
        <Select
          placeholder="Chọn trình độ học vấn"
          onChange={handleEducationChange}
          value={selectedEduId}
        >
          {educationLevels.map((edu) => (
            <Select.Option key={edu.eduId} value={edu.eduId}>
              {edu.eduName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Trường ẩn trong Form để Ant Design theo dõi sự thay đổi của files */}
      <Form.Item name="educationFile" hidden>
        <Input /> {/* Chỉ là một placeholder */}
      </Form.Item>

      {selectedEduId && (
        <Form.Item
          label={`Tệp cho trình độ học vấn (${
            educationLevels.find((e) => e.eduId === selectedEduId)?.eduName
          })`}
          rules={[
            {
              validator: async () => {
                if (!fileList || fileList.length === 0) {
                  throw new Error("Vui lòng tải lên tệp cho trình độ học vấn!");
                }
              },
            },
          ]}
        >
          <Upload
            beforeUpload={() => false} // Quan trọng: Ngăn AntD upload tự động
            onChange={handleUploadChange}
            fileList={fileList} // Sử dụng state fileList cục bộ
            maxCount={1} // Chỉ cho phép một tệp
            onRemove={(file) => {
              setFileList([]); // Xóa tệp khỏi danh sách
              return true; // Cho phép Ant Design thực hiện xóa
            }}
          >
            <Button type="primary" icon={<UploadOutlined />}>
              Chọn tệp
            </Button>
          </Upload>
        </Form.Item>
      )}
    </>
  );
};

export default EducationSelector;
