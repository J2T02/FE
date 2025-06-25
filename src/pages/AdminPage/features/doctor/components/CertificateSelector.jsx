import { Button, Checkbox, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDoctor } from "../context/DoctorContext";
import React, { useState, useEffect } from "react";

const CertificateSelector = ({
  form,
  name = "certificateIds",
  label = "Chứng chỉ",
  onFilesChange, // Prop để truyền files lên DoctorCreateModal
}) => {
  const { certificates } = useDoctor();

  // State cục bộ để lưu trữ các File object gốc
  // Key là cerId, Value là File object gốc
  const [selectedFilesMap, setSelectedFilesMap] = useState({});

  // useEffect để đồng bộ state cục bộ với Ant Design Form
  // Khi selectedFilesMap thay đổi, cập nhật một trường ẩn trong form
  useEffect(() => {
    // Tạo một đối tượng đơn giản để lưu vào form state cho mục đích hiển thị UI của Ant Design Upload
    const simpleFileInfos = Object.entries(selectedFilesMap).reduce(
      (acc, [cerId, file]) => {
        if (file) {
          // Đảm bảo file có uid, name, status cho Ant Design
          acc[cerId] = {
            uid: file.uid || Math.random().toString(36).substring(7),
            name: file.name,
            status: "done",
          };
        }
        return acc;
      },
      {}
    );

    // Cập nhật trường 'certificateFiles' trong form (chỉ là thông tin hiển thị UI)
    form.setFieldsValue({ certificateFiles: simpleFileInfos });

    // Gọi callback prop để truyền các File object gốc lên component cha
    if (onFilesChange) {
      onFilesChange(selectedFilesMap);
    }
  }, [selectedFilesMap, form, onFilesChange]);

  const handleFileChange = (cerId, info) => {
    // Trong trường hợp này, info.file chính là đối tượng File gốc bạn cần
    const originFile = info.file;

    if (originFile.status === "removed") {
      setSelectedFilesMap((prev) => {
        const newState = { ...prev };
        delete newState[cerId];
        return newState;
      });
      message.success(`Đã xóa tệp cho chứng chỉ ${cerId}.`);
      return;
    }

    if (originFile) {
      // Cập nhật state cục bộ với File object gốc
      setSelectedFilesMap((prev) => ({
        ...prev,
        [cerId]: originFile, // Lưu trực tiếp đối tượng File gốc
      }));
      message.success(`Đã chọn tệp: ${originFile.name}`);
    } else {
      message.error("Không thể lấy tệp đã chọn.");
    }
  };

  return (
    <>
      {/* Checkbox chọn chứng chỉ */}
      <Form.Item name={name} label={label}>
        <Checkbox.Group>
          {certificates.map((cert) => (
            <div
              key={cert.cerId}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Checkbox value={cert.cerId}>{cert.cerName}</Checkbox>
            </div>
          ))}
        </Checkbox.Group>
      </Form.Item>

      {/* Trường ẩn trong Form để Ant Design theo dõi sự thay đổi của files
          Chúng ta không dựa vào trường này để lấy originFileObj nữa */}
      <Form.Item name="certificateFiles" hidden>
        <Input /> {/* Chỉ là một placeholder */}
      </Form.Item>

      {/* Upload file cho từng chứng chỉ đã chọn */}
      <Form.Item
        noStyle
        shouldUpdate={
          (prev, next) =>
            prev[name]?.length !== next[name]?.length ||
            prev.certificateFiles !== next.certificateFiles // Vẫn dùng certificateFiles để trigger re-render
        }
      >
        {({ getFieldValue }) => {
          const selected = getFieldValue(name) || [];
          // Lấy thông tin file đơn giản cho AntD UI từ form state
          const currentFilesFromForm = getFieldValue("certificateFiles") || {};

          return (
            <>
              {selected.map((cerId) => {
                const cert = certificates.find((c) => c.cerId === cerId);
                // Đối tượng file được dùng để hiển thị trên UI của Upload
                const fileToDisplay = currentFilesFromForm[cerId];

                return (
                  <Form.Item
                    key={cerId}
                    label={`Tệp cho chứng chỉ: ${cert?.cerName || cerId}`}
                    style={{ marginBottom: 16 }}
                    rules={[
                      {
                        validator: async () => {
                          // Validate dựa trên selectedFilesMap (nơi lưu File gốc)
                          if (!selectedFilesMap[cerId]) {
                            throw new Error(
                              "Vui lòng tải lên tệp cho chứng chỉ này!"
                            );
                          }
                        },
                      },
                    ]}
                  >
                    <Upload
                      beforeUpload={() => false} // Quan trọng: Ngăn AntD upload tự động
                      onChange={(info) => handleFileChange(cerId, info)}
                      fileList={fileToDisplay ? [fileToDisplay] : []} // Hiển thị file đã chọn
                      maxCount={1}
                      onRemove={(removedFile) => {
                        // Kích hoạt việc xóa file trong state cục bộ
                        handleFileChange(cerId, {
                          file: { ...removedFile, status: "removed" },
                        });
                      }}
                    >
                      <Button type="primary" icon={<UploadOutlined />}>
                        Chọn tệp
                      </Button>
                    </Upload>
                  </Form.Item>
                );
              })}
            </>
          );
        }}
      </Form.Item>
    </>
  );
};

export default CertificateSelector;
