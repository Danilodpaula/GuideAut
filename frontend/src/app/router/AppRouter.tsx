import { Spin } from "antd";
import React, { Suspense } from "react";
import { Route,Routes } from "react-router-dom";

import { LoadingContainer } from "./styles";

const LazyAdmBaseModule = React.lazy(() =>
  import("../../modules/Base/BaseModule").then((m) => ({
    default: m.BaseModule,
  }))
);

const LazyLoginModule = React.lazy(() =>
  import("../../modules/Login/LoginModule").then((m) => ({
    default: m.LoginModule,
  }))
);

const LazyAdmModule = React.lazy(() =>
  import("../../modules/Adm/AdmModule").then((m) => ({
    default: m.AdmModule,
  }))
);

const LazyArtifactsModule = React.lazy(() =>
  import("../../modules/Artifacts/ArtifactsModule").then((m) => ({
    default: m.ArtifactsModule,
  }))
);

const LazyRecommendationsModule = React.lazy(() =>
  import("../../modules/Recommendations/RecommendationsModule").then((m) => ({
    default: m.RecommendationsModule,
  }))
);

const LazyTutorialModule = React.lazy(() =>
  import("../../modules/Tutorial/TutorialModule").then((m) => ({
    default: m.TutorialModule,
  }))
);

const Fallback = () => (
  <LoadingContainer>
    <Spin size="large" tip="Carregando módulo..." />
  </LoadingContainer>
);

const AppRouter: React.FC = () => (
  <Routes>
    {/* Raiz */}
    <Route
      path="/"
      element={
        <Suspense fallback={<Fallback />}>
          <LazyAdmBaseModule />
        </Suspense>
      }
    />

    {/* Adm */}
    <Route
      path="/adm/*"
      element={
        <Suspense fallback={<Fallback />}>
          <LazyAdmModule />
        </Suspense>
      }
    />

    {/* Login */}
    <Route
      path="/login/*"
      element={
        <Suspense fallback={<Fallback />}>
          <LazyLoginModule />
        </Suspense>
      }
    />

    {/* Artefatos */}
    <Route
      path="/artifacts/*"
      element={
        <Suspense fallback={<Fallback />}>
          <LazyArtifactsModule />
        </Suspense>
      }
    />

    {/* Recomendações */}
    <Route
      path="/recommendations/*"
      element={
        <Suspense fallback={<Fallback />}>
          <LazyRecommendationsModule />
        </Suspense>
      }
    />

    {/* Tutorial */}
    <Route
      path="/tutorial/*"
      element={
        <Suspense fallback={<Fallback />}>
          <LazyTutorialModule />
        </Suspense>
      }
    />
  </Routes>
);

export default AppRouter;
