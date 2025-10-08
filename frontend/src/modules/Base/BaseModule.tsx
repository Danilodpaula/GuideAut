import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";

export const BaseRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
);

export const BaseModule: React.FC = () => <BaseRoutes />;
