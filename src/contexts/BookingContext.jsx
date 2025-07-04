import { createContext, useContext, useState, useEffect } from "react";
import { getDoctorList } from "../apis/doctorService";
import { GetAllService } from "../apis/service";

const BookingContext = createContext();
export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [doctorList, setDoctorList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [blogList, setBlogList] = useState([]); // Still mock, no API

  useEffect(() => {
    fetchDoctorList();
    fetchServiceList();
    fetchBlogList();
  }, []);

  const fetchDoctorList = async () => {
    try {
      const res = await getDoctorList();
      if (res?.data?.success && Array.isArray(res.data.data)) {
        setDoctorList(res.data.data);
      } else {
        setDoctorList([]);
      }
    } catch (err) {
      setDoctorList([]);
    }
  };

  const fetchServiceList = async () => {
    try {
      const res = await GetAllService();
      if (res?.data?.success && Array.isArray(res.data.data)) {
        setServiceList(res.data.data);
      } else {
        setServiceList([]);
      }
    } catch (err) {
      setServiceList([]);
    }
  };

  // Blog vẫn mock vì chưa có API
  const fetchBlogList = async () => {
    const mockBlog = [
      {
        blogId: 1,
        authorId: 201,
        title: "Dấu hiệu vô sinh và khi nào cần đi khám",
        img: "https://clinic.example.com/images/infertility-signs.jpg",
        content:
          "Bài viết giúp bạn nhận diện các dấu hiệu phổ biến của tình trạng vô sinh và thời điểm thích hợp để thăm khám sớm.",
        postDate: "2025-06-01",
        isActive: true,
      },
      {
        blogId: 2,
        authorId: 202,
        title: "Quy trình IVF: Bước chuẩn bị cho hành trình làm cha mẹ",
        img: "https://clinic.example.com/images/ivf-prep.jpg",
        content:
          "Hướng dẫn từng bước từ tư vấn ban đầu đến khi bắt đầu chu kỳ IVF tại phòng khám của chúng tôi.",
        postDate: "2025-06-03",
        isActive: true,
      },
      {
        blogId: 3,
        authorId: 203,
        title: "Hiểu đúng về thụ tinh nhân tạo (IUI)",
        img: "https://clinic.example.com/images/iui-explained.jpg",
        content:
          "Thụ tinh nhân tạo là một lựa chọn đơn giản, tiết kiệm chi phí. Bài viết giải thích quy trình và hiệu quả của phương pháp này.",
        postDate: "2025-06-05",
        isActive: true,
      },
      {
        blogId: 4,
        authorId: 204,
        title: "Chế độ dinh dưỡng hỗ trợ khả năng sinh sản",
        img: "https://clinic.example.com/images/fertility-nutrition.jpg",
        content:
          "Cùng khám phá những thực phẩm và thói quen ăn uống giúp tăng cường sức khỏe sinh sản cho cả nam và nữ.",
        postDate: "2025-06-07",
        isActive: true,
      },
      {
        blogId: 5,
        authorId: 201,
        title: "Yếu tố tâm lý trong điều trị hiếm muộn",
        img: "https://clinic.example.com/images/emotional-support.jpg",
        content:
          "Áp lực tinh thần ảnh hưởng lớn đến khả năng thụ thai. Chúng tôi chia sẻ các phương pháp hỗ trợ tinh thần hiệu quả.",
        postDate: "2025-06-10",
        isActive: true,
      },
      {
        blogId: 6,
        authorId: 202,
        title: "Nguyên nhân vô sinh thường gặp ở nam giới",
        img: "https://clinic.example.com/images/male-infertility.jpg",
        content:
          "Bài viết tập trung phân tích các nguyên nhân dẫn đến vô sinh nam và các xét nghiệm cần thiết.",
        postDate: "2025-06-12",
        isActive: true,
      },
      {
        blogId: 7,
        authorId: 204,
        title: "Khi nào nên chọn trữ đông trứng?",
        img: "https://clinic.example.com/images/egg-freezing.jpg",
        content:
          "Trữ đông trứng là giải pháp lý tưởng cho phụ nữ hiện đại muốn chủ động về thời gian sinh con.",
        postDate: "2025-06-14",
        isActive: true,
      },
      {
        blogId: 8,
        authorId: 203,
        title: "Các xét nghiệm cần thiết trước điều trị hiếm muộn",
        img: "https://clinic.example.com/images/fertility-tests.jpg",
        content:
          "Tìm hiểu các bước kiểm tra quan trọng trước khi tiến hành IVF hoặc IUI tại phòng khám.",
        postDate: "2025-06-16",
        isActive: true,
      },
      {
        blogId: 9,
        authorId: 201,
        title: "Câu chuyện thành công: Bé Phúc và hành trình hy vọng",
        img: "https://clinic.example.com/images/success-baby.jpg",
        content:
          "Chia sẻ chân thực từ chị Hạnh sau 5 năm điều trị và hành trình hạnh phúc đón bé Phúc chào đời.",
        postDate: "2025-06-18",
        isActive: false,
      },
      {
        blogId: 10,
        authorId: 202,
        title: "Tư thế quan hệ dễ thụ thai: Sự thật hay huyền thoại?",
        img: "https://clinic.example.com/images/positions-myth.jpg",
        content:
          "Có thực sự tư thế quan hệ ảnh hưởng đến khả năng thụ thai? Bài viết phân tích theo góc nhìn y khoa.",
        postDate: "2025-06-20",
        isActive: true,
      },
    ];
    setBlogList(mockBlog);
  };

  return (
    <BookingContext.Provider
      value={{
        doctorList,
        serviceList,
        blogList,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
