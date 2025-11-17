export const saveResultsToHistory = (result) => {
  const history = getResultsFromHistory();
  const newHistory = [result, ...history].slice(0, 10); // Keep last 10 results
  localStorage.setItem('speedTestHistory', JSON.stringify(newHistory));
  return newHistory;
};

export const getResultsFromHistory = () => {
  const historyJson = localStorage.getItem('speedTestHistory');
  return historyJson ? JSON.parse(historyJson) : [];
};

export const clearHistory = () => {
  localStorage.removeItem('speedTestHistory');
};

export const formatTimestamp = (timestamp, locale) => {
  return new Date(timestamp).toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};