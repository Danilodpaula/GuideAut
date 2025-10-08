import { GlobalOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Segmented, Tooltip } from "antd";
import React, { useContext } from "react";

import { useI18n } from "../../../shared/i18n";
import { I18nProviderContext } from "../../../shared/i18n/providers/I18nProvider/I18nProvider";
import { AppLocalStorage } from "../../../shared/utils/appLocalStorage";
import { useTheme } from "../../../theme/AntThemeProvider";
import { HeaderBar, LeftGroup, RightGroup, Title } from "./styles";

const AppHeader: React.FC = () => {
  const { locale, updateLocale } = useContext(I18nProviderContext);
  const { mode, setTheme } = useTheme();
  const {translate} = useI18n();

  const handleLangChange = (val: "pt-BR" | "en-US") => {
    updateLocale(val);
    AppLocalStorage.setItem("APP:LOCALE", val);
  };

  const handleThemeChange = (val: "light" | "dark") => setTheme(val);

  return (
    <HeaderBar>
      <LeftGroup>
        <Tooltip title="Idioma">
          <GlobalOutlined />
        </Tooltip>
        <Segmented
          size="small"
          value={locale}
          options={[
            { label: "PT-BR", value: "pt-BR" },
            { label: "EN-US", value: "en-US" },
          ]}
          onChange={(v) => handleLangChange(v as "pt-BR" | "en-US")}
        />
      </LeftGroup>

       <Title>{translate({ id: "header.title" })}</Title>

      <RightGroup>
        <Segmented
          size="small"
          value={mode}
          options={[
            { label: <SunOutlined />, value: "light" },
            { label: <MoonOutlined />, value: "dark" },
          ]}
          onChange={(v) => handleThemeChange(v as "light" | "dark")}
        />
      </RightGroup>
    </HeaderBar>
  );
};

export default AppHeader;
