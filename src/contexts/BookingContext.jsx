import { createContext, useContext, useState, useEffect } from "react";

const BookingContext = createContext();
export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // Load dữ liệu khi modal mở
  useEffect(() => {
    loadDoctors();
    loadDoctors();
    loadServices();
    loadBlogs();
  }, []);
  // 🧪 Mock: load bác sĩ
  const loadDoctors = async () => {
    const mockDoctors = [
      {
        doctorId: 1,
        doctorName: "Nguyễn Văn A",
        email: "bs.a@gmail.com",
        phone: "0909123456",
        star: 5,
        gender: 1,
        yob: "1990-06-01",
        img: "/anhcuong.jpg",
        experience: 4,
        startDate: "2021-06-01",
        status: 1,
        eduId: 1, // Cử nhân
        filePathEdu: "https://fap.fpt.edu.vn/",
      },
      {
        doctorId: 2,
        doctorName: "Trần Thị B",
        email: "bs.b@gmail.com",
        phone: "0909123457",
        star: 4,
        gender: 2,
        yob: "1985-03-15",
        img: "/anhhuynh.png",
        experience: 10,
        startDate: "2013-04-10",
        status: 1,
        eduId: 2, // Thạc sĩ
        filePathEdu: "https://fap.fpt.edu.vn/",
      },
      {
        doctorId: 3,
        doctorName: "Lê Văn C",
        email: "bs.c@gmail.com",
        phone: "0909123458",
        star: 3,
        gender: 1,
        yob: "1988-12-20",
        img: "/anhket.jpg",
        experience: 7,
        startDate: "2016-01-15",
        status: 2,
        eduId: 1, // Cử nhân
        filePathEdu: "https://fap.fpt.edu.vn/",
      },
      {
        doctorId: 4,
        doctorName: "Phạm Thị D",
        email: "bs.d@gmail.com",
        phone: "0909123459",
        star: 5,
        gender: 2,
        yob: "1992-07-10",
        img: "/anhnhan.jpg",
        experience: 3,
        startDate: "2022-01-01",
        status: 1,
        eduId: 3, // Tiến sĩ
        filePathEdu: "https://fap.fpt.edu.vn/",
      },
      {
        doctorId: 5,
        doctorName: "Đỗ Văn E",
        email: "bs.e@gmail.com",
        phone: "0909123460",
        star: 4,
        gender: 1,
        yob: "1980-09-25",
        img: "/anhthinh.jpg",
        experience: 15,
        startDate: "2009-05-20",
        status: 3,
        eduId: 2, // Thạc sĩ
        filePathEdu: "https://fap.fpt.edu.vn/",
      },
      {
        doctorId: 6,
        doctorName: "Ngô Thị F",
        email: "bs.f@gmail.com",
        phone: "0909123461",
        star: 4,
        gender: 2,
        yob: "1995-01-30",
        img: "/doctorhuy.jpg",
        experience: 2,
        startDate: "2023-03-10",
        status: 1,
        eduId: 1, // Cử nhân
        filePathEdu: "https://fap.fpt.edu.vn/",
      },
      {
        doctorId: 7,
        doctorName: "Võ Văn G",
        email: "bs.g@gmail.com",
        phone: "0909123462",
        star: 3,
        gender: 1,
        yob: "1987-11-11",
        img: "/femaledoctor.jpg",
        experience: 8,
        startDate: "2015-06-20",
        status: 1,
        eduId: 2, // Thạc sĩ
        filePathEdu: "https://fap.fpt.edu.vn/",
      },
      {
        doctorId: 8,
        doctorName: "Huỳnh Thị H",
        email: "bs.h@gmail.com",
        phone: "0909123463",
        star: 5,
        gender: 2,
        yob: "1991-04-05",
        img: "/khanhtuyensinh.jpg",
        experience: 5,
        startDate: "2019-09-01",
        status: 2,
        eduId: 3, // Tiến sĩ
        filePathEdu: "https://fap.fpt.edu.vn/",
      },
      {
        doctorId: 9,
        doctorName: "Bùi Văn I",
        email: "bs.i@gmail.com",
        phone: "0909123464",
        star: 4,
        gender: 1,
        yob: "1983-08-08",
        img: "/maihadoctor.jpg",
        experience: 12,
        startDate: "2011-02-18",
        status: 1,
        eduId: 1, // Cử nhân
        filePathEdu: "https://fap.fpt.edu.vn/",
      },
      {
        doctorId: 10,
        doctorName: "Tô Thị K",
        email: "bs.k@gmail.com",
        phone: "0909123465",
        star: 5,
        gender: 2,
        yob: "1989-10-10",
        img: "/quocanh.jpg",
        experience: 6,
        startDate: "2017-08-01",
        status: 3,
        eduId: 3, // Tiến sĩ
        filePathEdu: "https://fap.fpt.edu.vn/",
      },
    ];
    setDoctors(mockDoctors);
  };
  //Mock: load Services
  const loadServices = async () => {
    const mockService = [
      {
        serId: 1,
        serName: "Điều trị thụ tinh trong ống nghiệm (IVF)",
        price: 30000000,
        description:
          "Chúng tôi cung cấp dịch vụ thụ tinh trong ống nghiệm (IVF) giúp các cặp vợ chồng hiếm muộn có cơ hội trở thành cha mẹ. Quy trình hiện đại, an toàn và tỷ lệ thành công cao.",
        filePath: "/IVF.jpg",
      },
      {
        serId: 2,
        serName:
          "Chữa hiếm muộn bằng phương pháp bơm tinh trùng vào tử cung (IUI)",
        price: 15000000,
        description:
          "Phương pháp bơm tinh trùng vào tử cung (IUI) là một trong những giải pháp hiệu quả cho các cặp vợ chồng gặp vấn đề về khả năng thụ thai tự nhiên. Được thực hiện bởi các chuyên gia giàu kinh nghiệm.",
        filePath: "/IVF.jpg",
      },
      {
        serId: 3,
        serName: "Chữa hiếm muộn bằng phẫu thuật cắt ống dẫn trứng tắc nghẽn",
        price: 25000000,
        description:
          "Chúng tôi cung cấp phẫu thuật điều trị các vấn đề liên quan đến ống dẫn trứng tắc nghẽn, giúp tăng khả năng mang thai tự nhiên cho phụ nữ bị vô sinh do vấn đề này.",
        filePath: "/IVF.jpg",
      },
    ];
    setServices(mockService);
  };

  const loadBlogs = async () => {
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
    setBlogs(mockBlog);
  };
  const handleCustomerSubmit = (customerData) => {
    // setUserInfo(customerData);
    // localStorage.setItem("userInfo", JSON.stringify(customerData));
    setShowCustomerModal(false);
  };
  return (
    <BookingContext.Provider
      value={{
        doctors,
        services,
        blogs,
      }}
    >
      {children}

      {/* {showCustomerModal && (
        <CustomerInfoModal
          open={showCustomerModal}
          accId={1} // ✅ Truyền accId
          onClose={() => setShowCustomerModal(false)}
          onCreated={handleCustomerSubmit}
        />
      )} */}
    </BookingContext.Provider>
  );
};
