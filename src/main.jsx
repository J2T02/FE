import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";
import themeConfig from "./themes/themeConfig";
import "antd/dist/reset.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider theme={themeConfig}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
