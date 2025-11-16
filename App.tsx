import React, { Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LocalizationProvider } from './context/LocalizationContext';
import Layout from './components/Layout';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Compare = React.lazy(() => import('./pages/Compare'));
const History = React.lazy(() => import('./pages/History'));
const Tips = React.lazy(() => import('./pages/Tips'));
const About = React.lazy(() => import('./pages/About'));
const Privacy = React.lazy(() => import('./pages/Privacy'));
const Blog = React.lazy(() => import('./pages/Blog'));
const FAQ = React.lazy(() => import('./pages/FAQ'));

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <LocalizationProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Suspense fallback={<LoadingSpinner />}><Home /></Suspense>} />
              <Route path="compare" element={<Suspense fallback={<LoadingSpinner />}><Compare /></Suspense>} />
              <Route path="history" element={<Suspense fallback={<LoadingSpinner />}><History /></Suspense>} />
              <Route path="tips" element={<Suspense fallback={<LoadingSpinner />}><Tips /></Suspense>} />
              <Route path="blog" element={<Suspense fallback={<LoadingSpinner />}><Blog /></Suspense>} />
              <Route path="blog/:slug" element={<Suspense fallback={<LoadingSpinner />}><Blog /></Suspense>} />
              <Route path="faq" element={<Suspense fallback={<LoadingSpinner />}><FAQ /></Suspense>} />
              <Route path="about" element={<Suspense fallback={<LoadingSpinner />}><About /></Suspense>} />
              <Route path="privacy" element={<Suspense fallback={<LoadingSpinner />}><Privacy /></Suspense>} />
            </Route>
          </Routes>
        </HashRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
