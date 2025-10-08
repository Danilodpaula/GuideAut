import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Login";

export const LoginRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
  </Routes>
);

export const LoginModule: React.FC = () => <LoginRoutes />;
