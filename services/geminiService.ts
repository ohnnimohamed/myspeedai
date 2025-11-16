
import { GoogleGenAI } from "@google/genai";
import { SpeedTestResult } from '../types';

export const getAIAnalysis = async (result: Omit<SpeedTestResult, 'id' | 'timestamp' | 'ipInfo'>): Promise<string> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is not set.");
    return "AI analysis is currently unavailable. Please configure your API key.";
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const { download, upload, ping } = result;
    
    const prompt = `
      Analyze the following internet speed test results:
      - Download Speed: ${download.toFixed(2)} Mbps
      - Upload Speed: ${upload.toFixed(2)} Mbps
      - Latency (Ping): ${ping} ms

      Provide a short, user-friendly analysis in one paragraph (max 3 sentences).
      The tone should be simple and helpful.
      Start by giving a quality score (Excellent, Good, Medium, or Bad).
      Then, mention the best use cases (e.g., Gaming, Streaming in 4K, HD video calls, Web browsing).
      Finally, give one simple, actionable suggestion for improvement if applicable.

      Example output style: "Your download speed is ${download.toFixed(2)} Mbps and latency is ${ping} ms — that’s good for watching YouTube and Netflix in HD, but not ideal for gaming. Try using 5G Wi-Fi or resetting your router."
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching AI analysis:", error);
    return "Could not generate AI analysis at this time.";
  }
};
