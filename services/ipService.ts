
import { IPInfo } from '../types';

export const getIPInfo = async (): Promise<IPInfo> => {
  try {
    const response = await fetch('https://ip-api.com/json/?fields=query,isp,city,country');
    if (!response.ok) {
      throw new Error('Failed to fetch IP info');
    }
    const data = await response.json();
    return {
      ip: data.query,
      isp: data.isp,
      city: data.city,
      country: data.country,
    };
  } catch (error) {
    console.error("Error fetching IP info:", error);
    // Return fallback data on error
    return {
      ip: 'Unavailable',
      isp: 'Unavailable',
      city: 'Unknown',
      country: 'Location',
    };
  }
};
