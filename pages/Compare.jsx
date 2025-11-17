import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getResultsFromHistory } from '../lib/utils';
import { useLocalization } from '../hooks/useLocalization';
import { useTheme } from '../hooks/useTheme';
import { GLOBAL_AVERAGE_SPEEDS } from '../constants';

const Compare = () => {
  const { t } = useLocalization();
  const { theme } = useTheme();
  const [latestResult, setLatestResult] = useState(null);

  useEffect(() => {
    const history = getResultsFromHistory();
    if (history.length > 0) {
      setLatestResult(history[0]);
    }
  }, []);

  const chartData = latestResult ? [
    { name: t('home.download'), [t('compare.your_result')]: latestResult.download, [t('compare.global_average')]: GLOBAL_AVERAGE_SPEEDS.download },
    { name: t('home.upload'), [t('compare.your_result')]: latestResult.upload, [t('compare.global_average')]: GLOBAL_AVERAGE_SPEEDS.upload },
  ] : [];

  const latencyData = latestResult ? [
    { name: t('home.ping'), [t('compare.your_result')]: latestResult.ping, [t('compare.global_average')]: GLOBAL_AVERAGE_SPEEDS.ping },
    { name: t('home.jitter'), [t('compare.your_result')]: latestResult.jitter, [t('compare.global_average')]: GLOBAL_AVERAGE_SPEEDS.jitter },
  ] : [];

  const tickColor = theme === 'dark' ? '#EAEAEA' : '#212529';
  const yourResultColor = theme === 'dark' ? '#3395ff' : '#007BFF';
  const globalAvgColor = theme === 'dark' ? '#9ca3af' : '#6c757d';

  if (!latestResult) {
    return (
      <div className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">{t('history.no_results')}</h1>
        <p>{t('history.no_results')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-card-light dark:bg-card-dark p-6 md:p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-2 text-text-light dark:text-text-dark">{t('compare.title')}</h1>
        <p className="text-text-muted-light dark:text-text-muted-dark mb-8">{t('compare.description')}</p>
        
        <h2 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">Speed (Mbps)</h2>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#ccc'} />
                    <XAxis dataKey="name" stroke={tickColor} />
                    <YAxis stroke={tickColor} />
                    <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFFFFF', border: `1px solid ${tickColor}` }} />
                    <Legend wrapperStyle={{ color: tickColor }}/>
                    <Bar dataKey={t('compare.your_result')} fill={yourResultColor} />
                    <Bar dataKey={t('compare.global_average')} fill={globalAvgColor} />
                </BarChart>
            </ResponsiveContainer>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4 text-text-light dark:text-text-dark">Latency (ms)</h2>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={latencyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#444' : '#ccc'} />
                    <XAxis dataKey="name" stroke={tickColor} />
                    <YAxis stroke={tickColor} />
                    <Tooltip contentStyle={{ backgroundColor: theme === 'dark' ? '#1E1E1E' : '#FFFFFF', border: `1px solid ${tickColor}` }} />
                    <Legend wrapperStyle={{ color: tickColor }} />
                    <Bar dataKey={t('compare.your_result')} fill={yourResultColor} />
                    <Bar dataKey={t('compare.global_average')} fill={globalAvgColor} />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Compare;