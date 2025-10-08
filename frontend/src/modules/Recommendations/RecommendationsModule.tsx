import React from "react";
import { Route, Routes } from "react-router-dom";

import RecommendationsHome from "./pages/RecommendationsHome";
import RecommendationsPage from "./pages/RecommendationsPage";

export const RecommendationsRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<RecommendationsHome />} />
    <Route path="/page" element={<RecommendationsPage />} />
  </Routes>
);

export const RecommendationsModule: React.FC = () => <RecommendationsRoutes />;
