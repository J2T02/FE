// src/utils/cloudinaryUtils.js

// Cấu hình Cloudinary của bạn
// Đảm bảo rằng các biến này được lấy từ biến môi trường (environment variables)
// trong một ứng dụng thực tế để bảo mật.
export const CLOUDINARY_CLOUD_NAME = "dlv29juee";
export const CLOUDINARY_UPLOAD_PRESET = "fpt-uni-hcm";

/**
 * Tải một tệp lên Cloudinary.
 * @param {File} file - Đối tượng File cần tải lên.
 * @returns {Promise<string>} URL an toàn của tệp đã tải lên.
 * @throws {Error} Nếu quá trình tải lên thất bại.
 */
export const uploadFileToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    if (data.secure_url) {
      console.log("Cloudinary URL:", data.secure_url);
      return data.secure_url;
    } else {
      throw new Error(
        "Cloudinary upload failed: " + (data.error?.message || "Unknown error")
      );
    }
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    // Không ném lỗi message ở đây, để component gọi xử lý hiển thị message Antd
    throw error;
  }
};
