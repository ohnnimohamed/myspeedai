
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AdPlaceholder from './AdPlaceholder';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-grow w-full">
        <main className="flex-1 py-8">
            <AdPlaceholder className="h-24 w-full mb-6" />
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-1/4 hidden lg:block space-y-8">
                <AdPlaceholder className="h-64 w-full"/>
                <AdPlaceholder className="h-64 w-full"/>
              </div>
              <div className="w-full lg:w-3/4">
                <Outlet />
              </div>
            </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
