import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

const Privacy = () => {
    const { t } = useLocalization();
  return (
    <div className="bg-card-light dark:bg-card-dark p-6 md:p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-text-light dark:text-text-dark">{t('privacy.title')}</h1>
      <div className="prose dark:prose-invert max-w-none text-text-light dark:text-text-dark">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>MySpeed AI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
        <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
        
        <h3 className="font-semibold mt-4">Speed Test Data</h3>
        <p>When you perform a speed test, we collect the results, which include your download speed, upload speed, ping, and jitter. We also collect your IP address, Internet Service Provider (ISP), and approximate location (city and country) to provide context for the test results. This information is necessary for the functionality of the service.</p>

        <h3 className="font-semibold mt-4">Usage Data</h3>
        <p>We may automatically collect standard log information and device information, such as your browser type, access times, and pages viewed. This data is used for analytics to improve our service.</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">Use of Your Information</h2>
        <p>Having accurate information permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
        <ul>
            <li>Perform and display the results of your internet speed test.</li>
            <li>Provide an AI-generated analysis of your speed test results.</li>
            <li>Allow you to save your speed test results in your browser's local storage for historical tracking.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
            <li>Display third-party advertisements via services like Google AdSense.</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-2">Local Storage</h2>
        <p>We use your browser's local storage to save your speed test history. This data is stored directly on your device and is not transmitted to our servers. You can clear this history at any time through the "History" page or by clearing your browser's cache.</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
        <p>We may use third-party services for the following purposes:</p>
        <ul>
            <li><strong>IP & Location Information:</strong> We use external APIs (e.g., ip-api.com) to determine your IP address and location. Please refer to their respective privacy policies.</li>
            <li><strong>AI Analysis:</strong> Your anonymized test results (speed and ping) are sent to the Google Gemini API to generate an analysis. No personal identifying information is sent.</li>
            <li><strong>Advertisements:</strong> We may use third-party advertising companies to serve ads when you visit the Site. These companies may use information about your visits to this and other websites that are contained in web cookies in order to provide advertisements about goods and services of interest to you.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
        <p>If you have questions or comments about this Privacy Policy, please contact us at contact@myspeedai.com (placeholder).</p>
      </div>
    </div>
  );
};

export default Privacy;