
import { TestStatus } from '../types';

const simulateDelay = (duration: number) => new Promise(resolve => setTimeout(resolve, duration));

const generateRandomSpeed = (base: number, variance: number) => {
  return parseFloat((base + (Math.random() - 0.5) * variance).toFixed(2));
};

export const runSpeedTest = async (onProgress: (status: TestStatus, value: number) => void) => {
  // Simulate Ping Test
  onProgress(TestStatus.Ping, 0);
  await simulateDelay(1500);
  const ping = Math.round(10 + Math.random() * 50);
  const jitter = Math.round(2 + Math.random() * 10);
  onProgress(TestStatus.Ping, ping);
  
  await simulateDelay(500);

  // Simulate Download Test
  onProgress(TestStatus.Download, 0);
  for (let i = 0; i < 10; i++) {
    await simulateDelay(400);
    onProgress(TestStatus.Download, generateRandomSpeed(80, 50));
  }
  const download = generateRandomSpeed(95, 40);
  onProgress(TestStatus.Download, download);

  await simulateDelay(500);

  // Simulate Upload Test
  onProgress(TestStatus.Upload, 0);
  for (let i = 0; i < 10; i++) {
    await simulateDelay(400);
    onProgress(TestStatus.Upload, generateRandomSpeed(35, 20));
  }
  const upload = generateRandomSpeed(40, 15);
  onProgress(TestStatus.Upload, upload);

  await simulateDelay(500);

  return { ping, jitter, download, upload };
};
