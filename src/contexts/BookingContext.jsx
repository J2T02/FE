import { createContext, useContext, useState, useEffect } from "react";
import { getDoctorList } from "../apis/doctorService";
import { GetAllService } from "../apis/service";
import * as contentful from "contentful";

// Contentful API config (reuse from BlogManagement.jsx)
const CONTENTFUL_SPACE_ID = "ew5pmvewqr2w";
const CONTENTFUL_ACCESS_TOKEN = "D2oxDvc0idO0ieQdeIOxgih5W7wWmfi2HU8cBfFSwyg";
const client = contentful.createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

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
        // Lọc ra service có serId khác 1
        const filteredServices = res.data.data.filter(
          (service) => service.serId !== 1
        );
        setServiceList(filteredServices);
      } else {
        setServiceList([]);
      }
    } catch (err) {
      setServiceList([]);
    }
  };

  // Fetch blog list from Contentful
  const fetchBlogList = async () => {
    try {
      const response = await client.getEntries({
        content_type: "BlogPost",
        include: 2,
        order: "-fields.publishedDate",
      });
      const formattedBlogs = response.items.map((item) => ({
        id: item.sys.id,
        title: item.fields.title,
        excerpt: item.fields.excerpt,
        content: item.fields.content, // Rich Text object
        thumbnail: item.fields.thumbnail?.fields?.file?.url,
        author: item.fields.author,
        publishedDate: item.fields.publishedDate
          ? new Date(item.fields.publishedDate).toLocaleDateString("vi-VN")
          : "N/A",
        category: item.fields.category?.fields?.categoryName,
      }));
      setBlogList(formattedBlogs);
    } catch (error) {
      setBlogList([]);
    }
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
