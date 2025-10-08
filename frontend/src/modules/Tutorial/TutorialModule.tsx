import React from "react";
import { Route, Routes } from "react-router-dom";

import TutorialHome from "./pages/TutorialHome";
import TutorialPage from "./pages/TutorialPage";

export const TutorialRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<TutorialHome />} />
    <Route path="/page" element={<TutorialPage />} />
  </Routes>
);

export const TutorialModule: React.FC = () => <TutorialRoutes />;

