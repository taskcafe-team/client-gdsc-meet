import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./router";
import Providers from "./contexts/providers";

export const Loading = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Loading
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Providers>
          <Router />
        </Providers>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
