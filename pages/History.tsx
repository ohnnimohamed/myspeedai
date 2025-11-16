import React, { useState, useEffect } from 'react';
import { getResultsFromHistory, formatTimestamp, clearHistory as clearHistoryUtil } from '../lib/utils';
import { SpeedTestResult } from '../types';
import { useLocalization } from '../hooks/useLocalization';

// Fix: Moved icon definitions before the component and made them local to resolve declaration conflicts.
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l4 4m0 0l-4 4m4-4H4" /></svg>;
const PingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const JitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2" /></svg>;

const History = () => {
  const { t, language } = useLocalization();
  const [history, setHistory] = useState<SpeedTestResult[]>([]);

  useEffect(() => {
    setHistory(getResultsFromHistory());
  }, []);

  const handleClearHistory = () => {
    clearHistoryUtil();
    setHistory([]);
  };

  if (history.length === 0) {
    return (
      <div className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">{t('history.title')}</h1>
        <p>{t('history.no_results')}</p>
      </div>
    );
  }

  return (
    <div className="bg-card-light dark:bg-card-dark p-6 md:p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">{t('history.title')}</h1>
        <button 
          onClick={handleClearHistory}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          {t('history.clear_history')}
        </button>
      </div>
      <div className="space-y-4">
        {history.map((result) => (
          <div key={result.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <p className="font-semibold text-text-light dark:text-text-dark">
                {formatTimestamp(result.timestamp, language)}
              </p>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1 sm:mt-0">
                {result.ipInfo.isp} - {result.ipInfo.city}, {result.ipInfo.country}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="flex items-center justify-center flex-col">
                <DownloadIcon />
                <span className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">{t('home.download')}</span>
                <span className="font-bold text-lg">{result.download.toFixed(2)} Mbps</span>
              </div>
              <div className="flex items-center justify-center flex-col">
                <UploadIcon />
                <span className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">{t('home.upload')}</span>
                <span className="font-bold text-lg">{result.upload.toFixed(2)} Mbps</span>
              </div>
              <div className="flex items-center justify-center flex-col">
                <PingIcon />
                <span className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">{t('home.ping')}</span>
                <span className="font-bold text-lg">{result.ping} ms</span>
              </div>
              <div className="flex items-center justify-center flex-col">
                <JitterIcon />
                <span className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">{t('home.jitter')}</span>
                <span className="font-bold text-lg">{result.jitter} ms</span>
              </div>
            </div>
             {result.aiAnalysis && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md text-sm">
                    <p className="text-text-light dark:text-text-dark">{result.aiAnalysis}</p>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
