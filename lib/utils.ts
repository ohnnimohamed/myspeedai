
import { SpeedTestResult } from '../types';

export const saveResultsToHistory = (result: SpeedTestResult): SpeedTestResult[] => {
  const history = getResultsFromHistory();
  const newHistory = [result, ...history].slice(0, 10); // Keep last 10 results
  localStorage.setItem('speedTestHistory', JSON.stringify(newHistory));
  return newHistory;
};

export const getResultsFromHistory = (): SpeedTestResult[] => {
  const historyJson = localStorage.getItem('speedTestHistory');
  return historyJson ? JSON.parse(historyJson) : [];
};

export const clearHistory = (): void => {
  localStorage.removeItem('speedTestHistory');
};

export const formatTimestamp = (timestamp: number, locale: string): string => {
  return new Date(timestamp).toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
