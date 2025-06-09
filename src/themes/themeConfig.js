import { Menu } from "antd";
import Item from "antd/es/list/Item";

const themeConfig = {
  token: {
    colorPrimary: "#f78db3", // Hồng nhạt dịu, thân thiện
    colorSecondary: "#ffe4e1", // Màu nền phụ nhẹ nhàng
    colorSuccess: "#10b981", // Xanh lá nhẹ - trạng thái tích cực
    colorWarning: "#fbbf24", // Vàng nhẹ - cảnh báo
    colorError: "#ef4444", // Đỏ tươi - lỗi
    borderRadius: 8,
    fontFamily: "'Inter', 'Quicksand', 'sans-serif'",
    fontSize: 14,
    colorTextBase: "#333",
    colorBgBase: "#fffafc", // Nền tổng thể nhẹ nhàng
  },

  components: {
    Button: {
      colorPrimary: "#f78db3",
      borderRadius: 6,
      colorText: "#ffffff",
      fontWeight: 600,
    },
    Input: {
      borderRadius: 6,
      colorPrimary: "#f78db3",
      colorBgContainer: "#fff",
    },
    Card: {
      borderRadius: 12,
      colorBgContainer: "#ffffff",
      boxShadow: "0 2px 8px rgba(247, 141, 179, 0.15)",
    },
    Modal: {
      borderRadius: 12,
      colorBgElevated: "#fff",
    },
    Typography: {
      fontFamily: "'Inter', 'Quicksand', 'sans-serif'",
      colorText: "#333",
    },
    Tabs: {
      colorPrimary: "#f78db3",
      colorBgContainer: "#fffafc",
    },
    Menu: {
      colorItemBg: "#fffafc",
      colorItemBgSelected: "#fce7ef",
      colorItemText: "#444",
      colorItemTextHover: "#f78db3",
      colorItemTextSelected: "#f78db3",
    },

    Layout: {
      colorBgHeader: "#fffafc", // Màu nền Header
    },
  },
};

export default themeConfig;
