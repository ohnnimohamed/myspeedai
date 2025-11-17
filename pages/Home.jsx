import React, { useState, useCallback, useMemo } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { getIPInfo } from '../services/ipService';
import { runSpeedTest } from '../services/speedTestService';
import { getAIAnalysis } from '../services/geminiService';
import { saveResultsToHistory } from '../lib/utils';
import SpeedMeter from '../components/SpeedMeter';
import ResultCard from '../components/ResultCard';
import ShareButtons from '../components/ShareButtons';
import AdPlaceholder from '../components/AdPlaceholder';

// Icons with accessibility titles
const PingIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title>Ping Icon</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const JitterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title>Jitter Icon</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2" /></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title>Download Icon</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title>Upload Icon</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l4 4m0 0l-4 4m4-4H4" /></svg>;
const GlobeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><title>Globe Icon</title><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.055A9 9 0 0117.945 11m-10.238 0A9 9 0 002.055 11" /></svg>;

const Home = () => {
  const { t } = useLocalization();
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [ipInfo, setIpInfo] = useState(null);
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [ping, setPing] = useState(0);
  const [jitter, setJitter] = useState(0);
  const [download, setDownload] = useState(0);
  const [upload, setUpload] = useState(0);

  const isTesting = useMemo(() => status !== 'idle' && status !== 'finished' && status !== 'error', [status]);

  const handleProgress = useCallback((progressStatus, value) => {
    switch (progressStatus) {
      case 'ping':
        setPing(value);
        setJitter(Math.round(value / 4 + Math.random() * 5)); // Fake jitter based on ping
        break;
      case 'download':
        setCurrentSpeed(value);
        setDownload(value);
        break;
      case 'upload':
        setCurrentSpeed(value);
        setUpload(value);
        break;
    }
  }, []);

  const startTest = useCallback(async () => {
    setStatus('fetching_ip');
    setResult(null);
    setCurrentSpeed(0);
    setPing(0);
    setJitter(0);
    setDownload(0);
    setUpload(0);

    try {
      const fetchedIpInfo = await getIPInfo();
      setIpInfo(fetchedIpInfo);

      const testResults = await runSpeedTest((s, v) => {
        setStatus(s);
        handleProgress(s, v);
      });

      setStatus('analyzing');
      const aiAnalysis = await getAIAnalysis(testResults);

      const finalResult = {
        id: new Date().toISOString(),
        ...testResults,
        ipInfo: fetchedIpInfo,
        timestamp: Date.now(),
        aiAnalysis,
      };

      setResult(finalResult);
      saveResultsToHistory(finalResult);
      setStatus('finished');
    } catch (error) {
      console.error("Speed test failed:", error);
      setStatus('error');
    }
  }, [handleProgress]);
  
  const getStatusText = () => {
      switch(status) {
          case 'ping': return t('status.ping');
          case 'download': return 'Mbps';
          case 'upload': return 'Mbps';
          case 'analyzing': return t('status.analyzing');
          case 'finished': return 'Mbps';
          case 'fetching_ip': return t('status.fetching_ip');
          default: return 'Mbps';
      }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="sr-only">MySpeed AI: The Ultimate Internet Speed Test</h1>
      <div className="w-full max-w-4xl bg-card-light dark:bg-card-dark rounded-xl shadow-lg p-6 md:p-8">
        <div className="text-center mb-8">
            <SpeedMeter speed={status === 'download' || status === 'upload' ? currentSpeed : (result?.download || 0) } status={getStatusText()} />
        </div>

        <div className="text-center mb-8">
          <button
            onClick={startTest}
            disabled={isTesting}
            className={`px-8 py-4 text-xl font-bold rounded-full text-white transition-all duration-300 transform hover:scale-105 ${
              isTesting ? 'bg-gray-500 cursor-not-allowed' : 'bg-primary hover:bg-primary/90 animate-pulse-fast'
            }`}
          >
            {isTesting ? t('home.testing') : t('home.start_test')}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <ResultCard icon={<PingIcon />} label={t('home.ping')} value={result?.ping || ping} unit="ms" />
          <ResultCard icon={<JitterIcon />} label={t('home.jitter')} value={result?.jitter || jitter} unit="ms" />
          <ResultCard icon={<DownloadIcon />} label={t('home.download')} value={(result?.download || download).toFixed(2)} unit="Mbps" />
          <ResultCard icon={<UploadIcon />} label={t('home.upload')} value={(result?.upload || upload).toFixed(2)} unit="Mbps" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-text-muted-light dark:text-text-muted-dark p-4 bg-background-light dark:bg-background-dark rounded-lg">
          <div className="flex items-center mb-2 md:mb-0">
            <GlobeIcon />
            <span className="mx-2 font-semibold">{t('home.ip_address')}:</span> {ipInfo?.ip || '...'}
          </div>
          <div className="flex items-center mb-2 md:mb-0">
             <span className="mx-2 font-semibold">{t('home.isp')}:</span> {ipInfo?.isp || '...'}
          </div>
           <div className="flex items-center">
            <span className="mx-2 font-semibold">{t('home.location')}:</span> {ipInfo ? `${ipInfo.city}, ${ipInfo.country}` : '...'}
          </div>
        </div>
        
        {status === 'finished' && result && (
          <div className="mt-8 space-y-8 animate-fade-in">
             <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="text-xl font-bold mb-2 text-primary dark:text-primary-dark">{t('home.ai_assistant')}</h3>
              <p className="text-text-light dark:text-text-dark leading-relaxed">{result.aiAnalysis}</p>
            </div>
            <ShareButtons result={result} />
            <div className="text-center">
                <a href="#" className="inline-block px-6 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                    {t('home.vpn_ad')} &rarr;
                </a>
                <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-2">(Affiliate Link)</p>
            </div>
            <AdPlaceholder className="h-24 w-full" />
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;