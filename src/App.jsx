import { Suspense, useState } from "react";
import routers from "~routers/routers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading...</div>}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
