
import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

const About = () => {
    const { t } = useLocalization();
  return (
    <div className="bg-card-light dark:bg-card-dark p-6 md:p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-text-light dark:text-text-dark">{t('about.title')}</h1>
      <div className="prose dark:prose-invert max-w-none text-text-light dark:text-text-dark">
        <p>MySpeed AI is a modern, responsive web application designed to provide you with a comprehensive and easy-to-understand analysis of your internet connection.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">Our Mission</h2>
        <p>In today's connected world, a fast and reliable internet connection is essential. However, understanding speed test results can be confusing. Our mission is to demystify internet performance by not only measuring your speed but also providing a clear, AI-generated explanation of what those numbers mean for you. We aim to empower users with the knowledge to optimize their online experience, whether it's for gaming, streaming, working from home, or simply browsing.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Core Features</h2>
        <ul>
            <li><strong>Real-time Speed Measurement:</strong> Accurately measure your download speed, upload speed, ping (latency), and jitter.</li>
            <li><strong>AI Result Assistant:</strong> Leveraging the power of Google's Gemini API, we provide a personalized analysis of your results in simple language, including a quality score, best use cases, and suggestions for improvement.</li>
            <li><strong>Result History & Comparison:</strong> Save your test results locally to track your performance over time and benchmark your speed against the global average.</li>
            <li><strong>User-Friendly Design:</strong> A clean, modern interface with a central speed meter, dark mode support, and multi-language capabilities ensures a great user experience on any device.</li>
            <li><strong>Privacy-Focused:</strong> We are committed to protecting your privacy. We only collect the necessary data to perform the speed test and provide our services.</li>
        </ul>
        
        <p>This application was built using React, TypeScript, and Tailwind CSS, with a modular structure ready for future expansion. Thank you for using MySpeed AI!</p>
      </div>
    </div>
  );
};

export default About;
