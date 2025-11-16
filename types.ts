
export interface IPInfo {
  ip: string;
  isp: string;
  city: string;
  country: string;
}

export interface SpeedTestResult {
  id: string;
  ping: number;
  jitter: number;
  download: number;
  upload: number;
  ipInfo: IPInfo;
  timestamp: number;
  aiAnalysis?: string;
}

export enum TestStatus {
  Idle = 'idle',
  FetchingIP = 'fetching_ip',
  Ping = 'ping',
  Download = 'download',
  Upload = 'upload',
  Analyzing = 'analyzing',
  Finished = 'finished',
  Error = 'error',
}
