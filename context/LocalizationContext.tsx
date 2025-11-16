import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';

type Language = 'en' | 'fr' | 'ar';
type Translations = Record<string, string>;

interface LocalizationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const initialTranslations: Record<Language, Translations> = {
  en: {},
  fr: {},
  ar: {},
};

export const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language | null;
    return savedLang || 'en';
  });

  const [translations, setTranslations] = useState<Record<Language, Translations>>(initialTranslations);

  const dir = useMemo(() => (language === 'ar' ? 'rtl' : 'ltr'), [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    localStorage.setItem('language', language);
  }, [language, dir]);

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const [enRes, frRes, arRes] = await Promise.all([
          fetch('./locales/en.json'),
          fetch('./locales/fr.json'),
          fetch('./locales/ar.json')
        ]);
        const [en, fr, ar] = await Promise.all([
            enRes.json(),
            frRes.json(),
            arRes.json()
        ]);
        setTranslations({ en, fr, ar });
      } catch (error) {
          console.error("Failed to load translations:", error);
      }
    };
    fetchTranslations();
  }, []);

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language, translations]);

  const value = useMemo(() => ({ language, setLanguage, t, dir }), [language, t, dir]);

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
};
