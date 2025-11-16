import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useLocalization } from '../hooks/useLocalization';

const LanguageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m4.03 7.968a11.025 11.025 0 01-2.064 2.064m-2.064-2.064A11.025 11.025 0 005.97 7.968m2.064 2.064A11.025 11.025 0 019.03 5.906m-2.064 2.063a11.025 11.025 0 00-2.064-2.064m7.124 10.192a9 9 0 01-12.728 0M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);


const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLocalization();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/compare', label: t('nav.compare') },
    { to: '/history', label: t('nav.history') },
    { to: '/tips', label: t('nav.tips') },
    { to: '/blog', label: t('nav.blog') },
    { to: '/about', label: t('nav.about') },
  ];
  
  const languages = [
      { code: 'en', name: 'English' },
      { code: 'fr', name: 'Français' },
      { code: 'ar', name: 'العربية' },
  ];

  return (
    <header className="bg-card-light dark:bg-card-dark shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold text-primary dark:text-primary-dark">
              {t('header.title')}
            </NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text-muted-light dark:text-text-muted-dark hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center space-x-3">
             <div className="relative">
              <button onClick={() => setLangDropdownOpen(!langDropdownOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-text-light dark:text-text-dark">
                <LanguageIcon />
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-card-light dark:bg-card-dark rounded-md shadow-lg py-1 z-10">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as 'en' | 'fr' | 'ar');
                        setLangDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        language === lang.code ? 'bg-primary text-white' : 'text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {menuOpen ? (
                   <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                   </svg>
                ) : (
                   <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                   </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-text-muted-light dark:text-text-muted-dark hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
