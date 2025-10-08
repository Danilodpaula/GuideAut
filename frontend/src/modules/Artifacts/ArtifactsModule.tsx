import React from "react";
import { Route, Routes } from "react-router-dom";

import ArtifactsHome from "./pages/ArtifactsHome";
import ArtifactsPage from "./pages/ArtifactsPage";

export const ArtifactsRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<ArtifactsHome />} />
    <Route path="/page" element={<ArtifactsPage />} />
  </Routes>
);

export const ArtifactsModule: React.FC = () => <ArtifactsRoutes />;
