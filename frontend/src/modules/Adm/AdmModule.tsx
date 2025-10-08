import React from "react";
import { Route, Routes } from "react-router-dom";

import AdmPage from "./pages/Adm";


export const AdmRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<AdmPage />} />
  </Routes>
);

export const AdmModule: React.FC = () => <AdmRoutes />;