import { Suspense, useCallback } from "react";
import { BrowserRouter, Routes } from "react-router-dom";

import Providers from "./contexts/providers";
import { getRoutes } from "./views/routes/routes";
import { CircularProgress } from "@mui/material";

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
      <CircularProgress />
    </div>
  );
};

function App() {
  const getR = useCallback(getRoutes, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Providers>
          <Routes>{getR()}</Routes>
        </Providers>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
