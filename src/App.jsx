import { Suspense, useState } from "react";
import routers from "~routers/routers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./contexts/BookingContext";
import { StoreProvider } from "./contexts/StoreProvider";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
function App() {
  const [count, setCount] = useState(0);
  dayjs.locale("vi");
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading...</div>}>
        <ConfigProvider locale={viVN}>
          <StoreProvider>
            <BookingProvider>
              <Routes>
                {routers.map((item, index) => {
                  return (
                    <Route
                      key={index}
                      path={item.path}
                      element={<item.component />}
                    />
                  );
                })}
              </Routes>
            </BookingProvider>
          </StoreProvider>
        </ConfigProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
