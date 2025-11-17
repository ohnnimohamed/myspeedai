import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';

const initialTranslations = {
  en: {},
  fr: {},
  ar: {},
};

export const LocalizationContext = createContext(undefined);

export const LocalizationProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('language');
    return savedLang || 'en';
  });

  const [translations, setTranslations] = useState(initialTranslations);

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

  const t = useCallback((key) => {
    return translations[language]?.[key] || key;
  }, [language, translations]);

  const value = useMemo(() => ({ language, setLanguage, t, dir }), [language, setLanguage, t, dir]);

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
};