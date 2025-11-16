import React from 'react';
import { Link } from 'react-router-dom';
import { useLocalization } from '../hooks/useLocalization';

const Footer = () => {
    const { t } = useLocalization();
  return (
    <footer className="bg-card-light dark:bg-card-dark mt-auto border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-text-muted-light dark:text-text-muted-dark">
        <div className="flex justify-center space-x-4 md:space-x-6 mb-4">
          <Link to="/about" className="text-sm hover:text-primary dark:hover:text-primary-dark">{t('nav.about')}</Link>
          <Link to="/blog" className="text-sm hover:text-primary dark:hover:text-primary-dark">{t('nav.blog')}</Link>
          <Link to="/faq" className="text-sm hover:text-primary dark:hover:text-primary-dark">{t('nav.faq')}</Link>
          <Link to="/privacy" className="text-sm hover:text-primary dark:hover:text-primary-dark">{t('privacy.title')}</Link>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} MySpeed AI. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
