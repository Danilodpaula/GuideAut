import { ConfigProvider, theme as antdTheme } from "antd";
import React, { createContext, useContext, useMemo,useState } from "react";
import { ThemeProvider } from "styled-components";

import { AppLocalStorage } from "../shared/utils/appLocalStorage";
import { darkThemeTokens,lightThemeTokens } from "./colors";

type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (m: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("useTheme deve ser usado dentro de AntThemeProvider");
  return ctx;
};

const AntThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initial = AppLocalStorage.getItem("APP:THEME") || "light";
  const [mode, setMode] = useState<ThemeMode>(initial);

  const setTheme = (m: ThemeMode) => {
    setMode(m);
    AppLocalStorage.setItem("APP:THEME", m);
  };

  const toggleTheme = () => setTheme(mode === "light" ? "dark" : "light");

  const algorithm =
    mode === "light" ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm;

  const tokens = mode === "light" ? lightThemeTokens : darkThemeTokens;

  const value = useMemo(() => ({ mode, toggleTheme, setTheme }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider theme={{ token: tokens, algorithm }}>
        <ThemeProvider theme={tokens}>{children}</ThemeProvider>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export default AntThemeProvider;
