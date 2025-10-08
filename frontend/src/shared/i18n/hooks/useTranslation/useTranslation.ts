import { useContext, useEffect, useState } from 'react';

import { getTranslationFromId } from '../../../utils/searchProps';
import locales from '../../locales';
import { I18nProviderContext } from '../../providers/I18nProvider/I18nProvider';
import useI18n from '../useI18n/useI18n';

interface TranslationHookParams {
  id: string;
}

interface PatternToReplace {
  regex: string;
  replaceWith: string;
}

const useTranslation = ({ id }: TranslationHookParams): string => {
  const { updateLocale: updateLocaleFromContext } = useContext(I18nProviderContext);
  const { isPtBr } = useI18n();
  const [translation, setTranslation] = useState('');
  const localeKey = isPtBr ? 'pt-br' : 'en-us';

  const updateLocale = () => {
    const storedLocale = localStorage.getItem(localeKey) as keyof typeof locales;
    if (storedLocale && locales[storedLocale]) {
      updateLocaleFromContext(storedLocale);
    }
  };

  const replacePatterns = (text: string, patternsToReplace: PatternToReplace[]): string => {
    let updatedText = text;
    for (const pattern of patternsToReplace) {
      const regex = new RegExp(pattern.regex, 'g');
      updatedText = updatedText.replace(regex, pattern.replaceWith);
    }
    return updatedText;
  };

  const updateTranslation = () => {
    const storedTranslation = localStorage.getItem(localeKey);
    if (storedTranslation !== 'undefined' && storedTranslation !== null) {
      const translationStrings = JSON.parse(storedTranslation || '').strings;
      const translationList = JSON.parse(translationStrings);

      const patternsToReplace: PatternToReplace[] = [
        { regex: '\\\\', replaceWith: '' },
        { regex: '\\\\n', replaceWith: '\n' },
      ];

      const updatedTranslation = replacePatterns(getTranslationFromId(id, translationList), patternsToReplace);
      setTranslation(updatedTranslation);
    }
  };

  useEffect(() => {
    updateLocale();
  }, [isPtBr, updateLocaleFromContext]);

  useEffect(() => {
    updateTranslation();
  }, [id, isPtBr]);

  return translation;
};

export default useTranslation;
