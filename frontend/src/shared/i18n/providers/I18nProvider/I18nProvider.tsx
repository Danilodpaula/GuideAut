import React, { useEffect, useMemo, useState } from "react";
import { IntlProvider } from "react-intl";

import { AppLocalStorage } from "../../../utils/appLocalStorage";
import locales from "../../locales";

type LocalesType = keyof typeof locales;

const defaultLocale = "pt-BR";
const language = Object.keys(locales).includes(navigator.language)
  ? (navigator.language as LocalesType)
  : defaultLocale;

interface II18nProviderContext {
  locale: LocalesType;
  updateLocale: (locale: LocalesType) => unknown;
  isPtBr: boolean;
}

const I18nProviderContext = React.createContext<II18nProviderContext>({
  locale: language,
  updateLocale: () => undefined,
  isPtBr: language === "pt-BR",
});

interface LocaleProviderProps {
  locale?: LocalesType;
  children?: React.ReactNode;
}

const I18nProvider: React.FC<LocaleProviderProps> = ({
  locale: initLocale = language,
  children,
}) => {
  const [locale, setLocale] = useState<LocalesType>(
    (AppLocalStorage.getItem("APP:LOCALE") || initLocale) as LocalesType
  );
  const [messages, setMessages] = useState(locales[locale]);
  const updateLocale = (locale: LocalesType) => {
    AppLocalStorage.setItem("APP:LOCALE", locale);
    setLocale(locale);
  };

  useEffect(() => {
    setMessages(locales[locale]);
  }, [locale]);

  const providerValue = useMemo(
    () => ({
      locale,
      updateLocale,
      isPtBr: locale === "pt-BR",
    }),
    [locale, updateLocale]
  );

  return (
    <I18nProviderContext.Provider value={providerValue}>
      <IntlProvider
        locale={locale}
        messages={messages}
        defaultLocale={language}
        wrapRichTextChunksInFragment={true}
      >
        {children}
      </IntlProvider>
    </I18nProviderContext.Provider>
  );
};

export { I18nProvider,I18nProviderContext };
