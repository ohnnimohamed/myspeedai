const simulateDelay = (duration) => new Promise(resolve => setTimeout(resolve, duration));

const generateRandomSpeed = (base, variance) => {
  return parseFloat((base + (Math.random() - 0.5) * variance).toFixed(2));
};

export const runSpeedTest = async (onProgress) => {
  // Simulate Ping Test
  onProgress('ping', 0);
  await simulateDelay(1500);
  const ping = Math.round(10 + Math.random() * 50);
  const jitter = Math.round(2 + Math.random() * 10);
  onProgress('ping', ping);
  
  await simulateDelay(500);

  // Simulate Download Test
  onProgress('download', 0);
  for (let i = 0; i < 10; i++) {
    await simulateDelay(400);
    onProgress('download', generateRandomSpeed(80, 50));
  }
  const download = generateRandomSpeed(95, 40);
  onProgress('download', download);

  await simulateDelay(500);

  // Simulate Upload Test
  onProgress('upload', 0);
  for (let i = 0; i < 10; i++) {
    await simulateDelay(400);
    onProgress('upload', generateRandomSpeed(35, 20));
  }
  const upload = generateRandomSpeed(40, 15);
  onProgress('upload', upload);

  await simulateDelay(500);

  return { ping, jitter, download, upload };
};