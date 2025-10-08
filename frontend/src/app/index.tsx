import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import { I18nProvider } from "../shared/i18n";
import Global from "../styles/global";
import AntThemeProvider from "../theme/AntThemeProvider";
import AppHeader from "./components/AppHeader";
import AppRouter from "./router/AppRouter";
import { AppContainer } from "./styles";

export const client = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

export const SharedModule: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <I18nProvider>
    <Global />
    <BrowserRouter>
      <AntThemeProvider>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </AntThemeProvider>
    </BrowserRouter>
  </I18nProvider>
);

export function AppModule() {
  return (
    <AppContainer>
      <AppHeader />
      <AppRouter />
    </AppContainer>
  );
}
