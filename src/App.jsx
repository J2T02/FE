import { Suspense, useState } from "react";
import routers from "~routers/routers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./contexts/BookingContext";
import { StoreProvider } from "./contexts/StoreProvider";
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading...</div>}>
        <BookingProvider>
          <StoreProvider>
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
          </StoreProvider>
        </BookingProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
